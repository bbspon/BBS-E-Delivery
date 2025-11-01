import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const WaterCanSubscriptionPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [address, setAddress] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [startDate, setStartDate] = useState('');
  const [error, setError] = useState(null);
  const [subscribing, setSubscribing] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.get('/api/water/plans');
      const fetchedPlans = Array.isArray(res.data) ? res.data : res.data.data;
      setPlans(fetchedPlans || []);
    } catch (err) {
      console.error("Error fetching plans:", err);
      setError("Failed to load subscription plans.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async () => {
    if (!selectedPlan || !address || !startDate) {
      setError("Please complete all required fields.");
      return;
    }
    setSubscribing(true);
    setError(null);
    try {
      await axios.post('/api/water/subscribe', {
        planId: selectedPlan,
        address,
        frequency,
        startDate,
      });
      setSuccess(true);
    } catch (err) {
      console.error("Subscription error:", err);
      setError("Subscription failed. Please try again later.");
    } finally {
      setSubscribing(false);
    }
  };

  return (
     <>
     <Header/>
       <Container className="d-flex flex-column justify-content-center"
       style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '60px', maxWidth: '600px', margin: '50px auto',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
        }}
       >
      <h2 className="mb-4 text-center">Water Can Subscription</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <>
          {Array.isArray(plans) && plans.length > 0 ? (
            <Row className="mb-4">
              {plans.map(plan => (
                <Col md={4} className="mb-3" key={plan._id}>
                  <Card
                    className={selectedPlan === plan._id ? 'border-primary' : ''}
                    onClick={() => setSelectedPlan(plan._id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Card.Body>
                      <Card.Title>{plan.name}</Card.Title>
                      <Card.Text>
                        ₹{plan.price} for {plan.duration} days <br />
                        {plan.description}
                      </Card.Text>
                      <Button
                        variant={selectedPlan === plan._id ? 'primary' : 'outline-primary'}
                        className="w-100"
                      >
                        {selectedPlan === plan._id ? 'Selected' : 'Select Plan'}
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p className="text-center">No plans available.</p>
          )}

          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Delivery Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Frequency</Form.Label>
              <Form.Select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
                <option value="daily">Daily</option>
                <option value="alternate">Alternate Days</option>
                <option value="weekly">Weekly</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subscription Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>

            {success && <Alert variant="success ">Subscription successful!</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button  className="w-50 mt-5 d-block mx-auto align-self-center" variant="success" disabled={subscribing} onClick={handleSubscribe}>
              {subscribing ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </Form>
        </>
      )}
    </Container>
     <Footer/>
     </>
  );
};

export default WaterCanSubscriptionPage;
