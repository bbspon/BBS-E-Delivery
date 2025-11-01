import React, { useState } from "react";
import * as XLSX from "xlsx";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Alert,
  Form,
  Card,
} from "react-bootstrap";
import {
  FaCloudUploadAlt,
  FaDownload,
  FaCheckCircle,
  FaTimesCircle,
  FaClipboardList,
} from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
const BulkProductUploadPage = ({ userRole = "vendor" }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState("add");
  const navigate = useNavigate();
  const headers = [
    "Product Name",
    "SKU",
    "Category",
    "Price",
    "MRP",
    "Stock",
    "Image URLs",
    "Tags",
    "Brand",
    "Discount (%)",
    "Weight",
    "Unit",
  ];

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    parseExcel(uploadedFile);
  };

  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const wb = XLSX.read(e.target.result, { type: "binary" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet);
      validateRows(rows);
    };
    reader.readAsBinaryString(file);
  };

  const validateRows = (rows) => {
    let validatedData = [];
    let errorList = [];

    rows.forEach((row, index) => {
      let rowErrors = {};
      headers.forEach((header) => {
        if (!row[header]) rowErrors[header] = "Required";
      });
      if (Object.keys(rowErrors).length > 0) {
        errorList.push({ rowIndex: index + 2, errors: rowErrors });
      }
      validatedData.push({ ...row, rowErrors });
    });

    setData(validatedData);
    setErrors(errorList);
  };

  const handleEditCell = (rowIndex, field, value) => {
    const updatedData = [...data];
    updatedData[rowIndex][field] = value;
    delete updatedData[rowIndex].rowErrors?.[field];
    setData(updatedData);
  };

  const handleUpload = () => {
    const failedRows = data.filter((d) => Object.keys(d.rowErrors || {}).length > 0);
    if (failedRows.length) {
      alert("Fix all errors before uploading.");
      return;
    }

    const uploadMeta = {
      fileName: file?.name,
      timestamp: new Date().toLocaleString(),
      successCount: data.length,
      failureCount: 0,
    };
    setHistory([uploadMeta, ...history]);
    alert("Upload successful (simulated)!");
    setData([]);
    setFile(null);
  };

  const downloadTemplate = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet([], { header: headers });
    XLSX.utils.book_append_sheet(wb, ws, "Template");
    XLSX.writeFile(wb, "ProductUploadTemplate.xlsx");
  };

  return (
    <Container fluid className="my-4 px-4">
      <Card className="shadow-lg p-4" style={{ maxWidth: "1400px", margin: "0 auto", borderRadius: "10px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
           <h3 className="mb-3 text-warning fw-bold border-bottom pb-2 d-flex align-items-center gap-2 justify-content-between w-100 ">
                  Bulk Product Upload
                    <GiCancel
                      className="text-danger fs-4 cursor-pointer"
                      title="Go to Home"
                      onClick={() => navigate("/")}
                    />
                  </h3>

          {userRole === "admin" && (
            <Button variant="outline-dark" size="sm">
              <FaClipboardList className="me-1" />
              Go to Admin Monitoring Page
            </Button>
          )}
        </div>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label><strong>Select Upload Mode:</strong></Form.Label>
              <Form.Select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="add">Add New Products</option>
                <option value="update">Update Existing Products</option>
                <option value="delete">Delete Products</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6} className="d-flex align-items-end justify-content-end">
            <Button variant="secondary" onClick={downloadTemplate}>
              <FaDownload className="me-2" />
              Download Template
            </Button>
          </Col>
        </Row>

        <Form.Group controlId="formFile" className="mb-4">
          <Form.Label><strong>Upload CSV/Excel File:</strong></Form.Label>
          <Form.Control type="file" accept=".csv,.xlsx,.xls" onChange={handleFileChange} />
        </Form.Group>

        {data.length > 0 && (
          <>
            <h5 className="text-success mb-2">
              Preview & Validate ({data.length} Rows)
            </h5>
            <div className="table-responsive" style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table bordered striped hover size="sm">
                <thead className="table-dark">
                  <tr>
                    {headers.map((head, idx) => (
                      <th key={idx}>{head}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {headers.map((field, colIndex) => (
                        <td key={colIndex}>
                          <Form.Control
                            size="sm"
                            value={row[field] || ""}
                            isInvalid={!!(row.rowErrors && row.rowErrors[field])}
                            onChange={(e) =>
                              handleEditCell(rowIndex, field, e.target.value)
                            }
                          />
                          <Form.Control.Feedback type="invalid">
                            {row.rowErrors?.[field]}
                          </Form.Control.Feedback>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

            <Button variant="success" className="mt-3" onClick={handleUpload}>
              <FaCloudUploadAlt className="me-2" />
              Submit Bulk Upload
            </Button>
          </>
        )}

        {errors.length > 0 && (
          <Alert variant="danger" className="mt-3">
            ⚠️ {errors.length} row(s) have issues. Please correct before submitting.
          </Alert>
        )}

        <hr className="my-5" />
        <h4 className="text-info mb-3">📄 Upload History</h4>
        {history.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead className="table-light">
              <tr>
                <th>File Name</th>
                <th>Uploaded At</th>
                <th>Success</th>
                <th>Failed</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, idx) => (
                <tr key={idx}>
                  <td>{h.fileName}</td>
                  <td>{h.timestamp}</td>
                  <td>{h.successCount}</td>
                  <td>{h.failureCount}</td>
                  <td>
                    {h.failureCount === 0 ? (
                      <span className="text-success">
                        <FaCheckCircle /> Success
                      </span>
                    ) : (
                      <span className="text-danger">
                        <FaTimesCircle /> Partial
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-muted">No uploads yet.</p>
        )}
      </Card>
    </Container>
  );
};

export default BulkProductUploadPage;
