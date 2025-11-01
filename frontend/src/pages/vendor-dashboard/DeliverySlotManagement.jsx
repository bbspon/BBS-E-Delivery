import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Table,
  Row,
  Col,
  ToggleButton,
  InputGroup
} from "react-bootstrap";

const DeliverySlotManagementPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [slots, setSlots] = useState([
    {
      id: 1,
      day: "Monday",
      startTime: "10:00",
      endTime: "12:00",
      maxOrders: 20,
      zone: "Zone A",
      active: true,
    },
    {
      id: 2,
      day: "Tuesday",
      startTime: "14:00",
      endTime: "16:00",
      maxOrders: 15,
      zone: "Zone B",
      active: false,
    },
  ]);

  const [formData, setFormData] = useState({
    id: null,
    day: "",
    startTime: "",
    endTime: "",
    maxOrders: 0,
    zone: "",
    active: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddOrUpdate = () => {
    if (formData.id) {
      setSlots(
        slots.map((slot) =>
          slot.id === formData.id ? { ...formData } : slot
        )
      );
    } else {
      setSlots([...slots, { ...formData, id: Date.now() }]);
    }
    setShowModal(false);
    setFormData({
      id: null,
      day: "",
      startTime: "",
      endTime: "",
      maxOrders: 0,
      zone: "",
      active: true,
    });
  };

  const handleEdit = (slot) => {
    setFormData(slot);
    setShowModal(true);
  };

  const handleToggleStatus = (slotId) => {
    setSlots(
      slots.map((slot) =>
        slot.id === slotId ? { ...slot, active: !slot.active } : slot
      )
    );
  };

  const handleDelete = (slotId) => {
    setSlots(slots.filter((slot) => slot.id !== slotId));
  };

  return (
    <div className="container mt-4 vh-100 p-5">
      <div className="d-flex justify-content-between  mb-4">
          <h2 style={{ fontWeight: "bold" }}>Delivery Slot Management</h2>
      <Button variant="primary" className="mb-3 px-4" onClick={() => setShowModal(true)}>
        + Add New Slot
      </Button>
      </div>

      <Table striped bordered hover className="mt-5 "> 
        <thead>
          <tr className="  fw-bold " >
            <th style={{ backgroundColor: "#3b82"}}>Day</th>
            <th style={{ backgroundColor: "#3b82"}}>Time</th>
            <th style={{ backgroundColor: "#3b82"}}>Max Orders</th>
            <th style={{ backgroundColor: "#3b82"}}>Zone</th>
            <th style={{ backgroundColor: "#3b82"}}>Status</th>
            <th style={{ backgroundColor: "#3b82"}}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id}>
              <td  >{slot.day}</td>
              <td>
                {slot.startTime} - {slot.endTime}
              </td>
              <td>{slot.maxOrders}</td>
              <td>{slot.zone}</td>
              <td>
                <Form.Check
                  type="switch"
                  checked={slot.active}
                  onChange={() => handleToggleStatus(slot.id)}
                />
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEdit(slot)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(slot.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal  show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton style={{ backgroundColor: "#3b1ec" }}>
          <Modal.Title className="fw-xl ">{formData.id ? "Edit Slot" : "Add New Slot"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Day</Form.Label>
              <Form.Control
                type="text"
                name="day"
                value={formData.day}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Max Orders</Form.Label>
              <Form.Control
                type="number"
                name="maxOrders"
                value={formData.maxOrders}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Zone</Form.Label>
              <Form.Control
                type="text"
                name="zone"
                value={formData.zone}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Check
              type="switch"
              label="Active"
              name="active"
              checked={formData.active}
              onChange={handleInputChange}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="warning" onClick={handleAddOrUpdate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DeliverySlotManagementPage;
