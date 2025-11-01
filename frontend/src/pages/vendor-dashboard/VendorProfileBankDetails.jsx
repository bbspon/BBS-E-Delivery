import React, { useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  ProgressBar,
  Alert,
} from "react-bootstrap";

const VendorProfileBankDetails = () => {
  const [profile, setProfile] = useState({
    businessName: "",
    category: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    logo: null,
    banner: null,
    hours: "",
    acceptingOrders: true,
  });

  const [bank, setBank] = useState({
    holderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifsc: "",
    bankName: "",
    branchName: "",
    accountType: "savings",
    upi: "",
    gst: "",
    pan: "",
    kycDocs: null,
  });

  const [alerts, setAlerts] = useState({
    profileSaved: false,
    bankSaved: false,
  });

  const handleProfileChange = (e) => {
    const { name, value, files, type } = e.target;
    setProfile({
      ...profile,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleBankChange = (e) => {
    const { name, value, files, type } = e.target;
    setBank({
      ...bank,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setAlerts({ ...alerts, profileSaved: true });
  };

  const handleBankSubmit = (e) => {
    e.preventDefault();
    if (bank.accountNumber !== bank.confirmAccountNumber) {
      alert("Account numbers do not match");
      return;
    }
    setAlerts({ ...alerts, bankSaved: true });
  };

  const profileCompletion =
    (Object.values(profile).filter(Boolean).length /
      Object.keys(profile).length) *
    100;

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url('https://cdn.vectorstock.com/i/500p/13/33/milk-splash-swirl-shape-and-butterfly-silhouettes-vector-25791333.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="container py-4 p-5 " >
          <h2 className="mb-4">Vendor Profile & Bank Details</h2>

          <div className="d-flex flex-row gap-3 justify-content-center ">
            {alerts.profileSaved && (
              <Alert variant="success">Profile updated successfully!</Alert>
            )}
            <Card className="mb-4">
              <Card.Header style={{ backgroundColor: "rgba(0, 0, 0, 0.24)" ,padding:"15px 20px" ,fontWeight: "bold"}}>Vendor Profile</Card.Header>
              <Card.Body>
                <Form onSubmit={handleProfileSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label >Business Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="businessName"
                          value={profile.businessName}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Select
                          name="category"
                          value={profile.category}
                          onChange={handleProfileChange}
                        >
                          <option>Grocery</option>
                          <option>Restaurant</option>
                          <option>Water Can</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group >
                        <Form.Label>Contact Person</Form.Label>
                        <Form.Control
                          name="contactPerson"
                          value={profile.contactPerson}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          name="address"
                          value={profile.address}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>City</Form.Label>
                        <Form.Control
                          name="city"
                          value={profile.city}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>State</Form.Label>
                        <Form.Control
                          name="state"
                          value={profile.state}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>Pincode</Form.Label>
                        <Form.Control
                          name="pincode"
                          value={profile.pincode}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      name="description"
                      value={profile.description}
                      onChange={handleProfileChange}
                    />
                  </Form.Group>
                  <Row className="my-2">
                    <Col>
                      <Form.Group>
                        <Form.Label>Logo</Form.Label>
                        <Form.Control
                          type="file"
                          name="logo"
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Banner</Form.Label>
                      <Form.Control
                        type="file"
                        name="banner"
                        onChange={handleProfileChange}
                      />
                    </Form.Group>
                  </Col>

                  <ProgressBar
                    now={profileCompletion}
                    label={`${Math.round(profileCompletion)}%`}
                    className="my-3"
                  />
                  <Button variant="primary" type="submit">
                    Save Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            {alerts.bankSaved && (
              <Alert variant="success">
                Bank details updated successfully!
              </Alert>
            )}
            <Card>
              <Card.Header style={{ backgroundColor: "rgba(0, 0, 0, 0.24)" ,padding:"15px 20px" ,fontWeight: "bold" }}>Bank & KYC Details</Card.Header>
              <Card.Body>
                <Form onSubmit={handleBankSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Account Holder Name</Form.Label>
                        <Form.Control
                          name="holderName"
                          value={bank.holderName}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Account Number</Form.Label>
                        <Form.Control
                          name="accountNumber"
                          value={bank.accountNumber}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Confirm Account Number</Form.Label>
                        <Form.Control
                          name="confirmAccountNumber"
                          value={bank.confirmAccountNumber}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>IFSC Code</Form.Label>
                        <Form.Control
                          name="ifsc"
                          value={bank.ifsc}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          name="bankName"
                          value={bank.bankName}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label>Branch Name</Form.Label>
                        <Form.Control
                          name="branchName"
                          value={bank.branchName}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6} className="mt-3">
                      <Form.Group>
                        <Form.Label className="me-3">Account Type</Form.Label>
                        <Form.Check
                          inline
                          label="Savings"
                          name="accountType"
                          type="radio"
                          value="savings"
                          checked={bank.accountType === "savings"}
                          onChange={handleBankChange}
                        />
                        <Form.Check
                          inline
                          label="Current"
                          name="accountType"
                          type="radio"
                          value="current"
                          checked={bank.accountType === "current"}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                
                  </Row>

                      <Col md={6}>
                      <Form.Group>
                        <Form.Label>UPI ID (optional)</Form.Label>
                        <Form.Control
                          name="upi"
                          value={bank.upi}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                  <Row>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>GST No.</Form.Label>
                        <Form.Control
                          name="gst"
                          value={bank.gst}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>PAN No.</Form.Label>
                        <Form.Control
                          name="pan"
                          value={bank.pan}
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4} className="mt-3">
                      <Form.Group>
                        <Form.Label>KYC Documents</Form.Label>
                        <Form.Control
                          type="file"
                          name="kycDocs"
                          onChange={handleBankChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button variant="success" type="submit" className="mt-3">
                    Save Bank Details
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorProfileBankDetails;
