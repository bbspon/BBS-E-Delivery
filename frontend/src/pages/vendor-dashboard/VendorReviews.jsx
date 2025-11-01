// VendorReviewsPage.jsx

import React, { useState, useEffect } from "react";
import { Table, Modal, Button, Form, Badge } from "react-bootstrap";

const VendorReviewsPage = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [search, setSearch] = useState("");
  const [replyModal, setReplyModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reply, setReply] = useState("");

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        reviewer: "John Doe",
        rating: 4,
        comment: "Fast delivery, quality product!",
        date: "2025-06-01",
        reply: "Thanks!",
      },
      {
        id: 2,
        reviewer: "Jane Smith",
        rating: 2,
        comment: "Late delivery and stale item.",
        date: "2025-06-02",
        reply: null,
      },
    ];
    setReviews(dummy);
    setFilteredReviews(dummy);
  }, []);

  const handleSearch = () => {
    const results = reviews.filter(
      (r) =>
        r.reviewer.toLowerCase().includes(search.toLowerCase()) ||
        r.comment.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredReviews(results);
  };

  const averageRating = (
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  ).toFixed(1);

  const openReplyModal = (review) => {
    setSelectedReview(review);
    setReply(review.reply || "");
    setReplyModal(true);
  };

  const submitReply = () => {
    const updated = reviews.map((r) =>
      r.id === selectedReview.id ? { ...r, reply } : r
    );
    setReviews(updated);
    setFilteredReviews(updated);
    setReplyModal(false);
  };

  return (
    <>
    <div
  style={{
  
    backgroundImage: "url('https://img.freepik.com/premium-photo/five-star-rating-review-slider-bar-button-background-best-ranking-service-quality-satisfaction-5-score-customer-feedback-rate-symbol-success-evaluation-user-experience-excellent-stars_79161-2308.jpg')",
    backgroundSize: "cover", // optional for full coverage
    // backgroundPosition: "center", // optional for better centering
    // backgroundRepeat: "no-repeat", // optional to prevent repeating
    height: "100vh",
    width: "100%"
  }}
>

      <div className=" " 
      style={{  padding: "100px", backgroundColor: "rgba(65, 64, 85, 0.28)"}}>
      <h3 className="mb-4 text-white" >Vendor Reviews & Ratings</h3>

      <div className="mb-3 text-white">
        <strong>Average Rating:</strong>{" "}
        <Badge bg="info">{averageRating} ⭐</Badge>
      </div>

      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search reviewer or comment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Reviewer</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Date</th>
            <th>Reply</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredReviews.map((review, i) => (
            <tr key={review.id}>
              <td>{i + 1}</td>
              <td>{review.reviewer}</td>
              <td>
                <span className="text-warning">{`⭐`.repeat(review.rating)}</span>
              </td>
              <td>{review.comment}</td>
              <td>{review.date}</td>
              <td>{review.reply || <em>No reply</em>}</td>
              <td>
                <Button size="sm" onClick={() => openReplyModal(review)}>
                  Reply
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={replyModal} onHide={() => setReplyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Reply to Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Your Reply</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setReplyModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitReply}>
            Submit Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
   
    </>
  );
};

export default VendorReviewsPage;
