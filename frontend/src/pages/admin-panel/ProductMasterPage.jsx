import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductMasterPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ category: '', brand: '', status: '' });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, [filters, searchTerm]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/global-products', {
        params: {
          search: searchTerm,
          category: filters.category,
          brand: filters.brand,
          status: filters.status
        }
      });

      const data = response.data;

      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data.data)) {
        setProducts(data.data);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching global products:', error);
      setProducts([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`/api/global-products/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key];
    const valB = b[sortConfig.key];
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const toggleStatus = async (product) => {
    try {
      await axios.put(`/api/global-products/${product._id}/toggle-status`);
      fetchProducts();
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  };

  const handleSelectProduct = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const handleBulkDelete = async () => {
    if (!window.confirm('Delete selected products?')) return;
    try {
      await axios.post('/api/global-products/bulk-delete', { ids: selectedProducts });
      setSelectedProducts([]);
      fetchProducts();
    } catch (error) {
      console.error('Bulk delete error:', error);
    }
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Name', 'SKU', 'Category', 'Brand', 'Price', 'Status'],
      ...products.map(p => [p.name, p.sku, p.category, p.brand, p.price, p.status])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'global_products.csv');
    link.click();
  };

  return (
 <>
 <div className="vh-100 "
  style={{
        backgroundImage: `url("")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh", // Full screen height
        width: "100%",
  
     
      }}>
       <div className="container p-5 ">
      <h2 className='mb-4'>Global Product Master</h2>

      <div className="row mb-3">
        <div className="col-md-3">
          <input
            type="text"
            placeholder="Search products"
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={filters.category}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={filters.brand}
            onChange={handleFilterChange}
            className="form-control"
          />
        </div>
        <div className="col-md-3">
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="form-control"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="mb-4 d-flex justify-content-end" >
        <button  
         style={{ border: "1px solid #ccc" ,gap: "10px",padding: "10px" }}
        onClick={handleExportCSV}>Export CSV</button>
        {selectedProducts.length > 0 && (
          <button onClick={handleBulkDelete}>Delete Selected</button>
        )}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th onClick={() => handleSort('name')}>Name</th>
            <th onClick={() => handleSort('sku')}>SKU</th>
            <th onClick={() => handleSort('category')}>Category</th>
            <th onClick={() => handleSort('brand')}>Brand</th>
            <th onClick={() => handleSort('price')}>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length === 0 ? (
            <tr><td colSpan="8" className="text-center">No products found</td></tr>
          ) : (
            currentProducts.map(product => (
              <tr key={product._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product._id)}
                    onChange={() => handleSelectProduct(product._id)}
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.sku}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => toggleStatus(product)}>
                    {product.status === 'active' ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                  <button onClick={() => console.log('Edit', product)}>Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination d-flex justify-content-center align-items-center gap-3 p-3" >
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={ { border: "1px solid #ccc" ,gap: "10px",padding: "5px 20px",backgroundColor: "gray",color: "white" }}
        >Previous</button>
        <span className="mx-2">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
           style={ { border: "1px solid #ccc" ,gap: "10px",padding: "5px 20px",backgroundColor: "gray",color: "white" }}
        >Next</button>
      </div>
    </div>
 </div>
 </>
  );
};

export default ProductMasterPage;