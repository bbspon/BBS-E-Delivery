import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Table, Alert, Spinner } from 'react-bootstrap';
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
const OrderConfirmationPage = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    navigate("/");
  };


  useEffect(() => {
    // Fetch from API or localStorage mock
    const sampleOrder = JSON.parse(localStorage.getItem('latestOrder')) || {
      orderId: 'ORD123456',
      status: 'Paid',
      date: new Date().toLocaleString(),
      customer: {
        name: 'Rahul Sharma',
        phone: '98XXXXXX23',
        address: '221B Baker Street, Bangalore',
      },
      items: [
        {
          name: 'Amul Milk 1L',
          vendor: 'Dairy Fresh',
          qty: 2,
          price: 56,
          image: '/milk.png',
        },
        {
          name: 'Organic Banana 1kg',
          vendor: 'Nature Basket',
          qty: 1,
          price: 80,
          image: '/banana.png',
        },
      ],
      deliveryCharges: 20,
      couponDiscount: 30,
      tax: 18,
      total: 200,
      paymentMethod: 'UPI',
      deliveryInstructions: 'Leave with security guard',
    };
    setOrder(sampleOrder);
  }, []);

  if (!order) return <Spinner animation="border" className="mt-5 mx-auto d-block" />;

  return (
   <>
    {/* <Header /> */}
     <div> 
      <div className=' d-flex  justify-content-around align-items-center'>
        <img src='/delivery.png' alt=""  style={{width: '120px', height: '150px'}}/>
        <h3 className='fw-bold mt-3 pe-5'> E-Delivery</h3>
      </div>
      <Container className="mb-5 " style={{maxWidth: '800px'}}>
      <Alert variant="success">
        <h4 className="mb-1 fw-bold d-flex align-items-center gap-2"><IoCheckmarkDoneCircleSharp /> Thank you for your order!</h4>
        <p className='px-5 pt-2' >Order ID: <strong>{order.orderId}</strong> | Status: <strong>{order.status}</strong></p>
        <p className='px-5' >Placed on: <strong>{order.date}</strong></p>
      </Alert>

      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Header><strong>🧾 Invoice Summary</strong></Card.Header>
            <Card.Body>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Vendor</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, i) => (
                    <tr key={i}>
                      <td><img src={item.image} alt="" width="40" className="me-2" /> {item.name}</td>
                      <td>{item.vendor}</td>
                      <td>{item.qty}</td>
                      <td>₹{item.price}</td>
                      <td>₹{item.qty * item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <hr />
              <p>Delivery Charges: ₹{order.deliveryCharges}</p>
              <p>Coupon Discount: -₹{order.couponDiscount}</p>
              <p>Tax (GST): ₹{order.tax}</p>
              <h5>Total: ₹{order.total}</h5>
              <p>Payment Method: <strong>{order.paymentMethod}</strong></p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="mb-4">
            <Card.Header><strong>📦 Delivery Details</strong></Card.Header>
            <Card.Body>
              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
              {order.deliveryInstructions && (
                <p><strong>Instructions:</strong> {order.deliveryInstructions}</p>
              )}
            </Card.Body>
          </Card>

          <div className="d-grid gap-2" >
            <Button variant="primary" onClick={() => window.print()}>🖨️ Print Invoice</Button>
            <Button variant="success">🔁 Reorder</Button>
            <Button variant="outline-secondary" onClick={handleContinueShopping}>🛍️ Continue Shopping</Button>
          </div>
        </Col>
      </Row>
    </Container>
     </div>
   </>
  );
};

export default OrderConfirmationPage;
