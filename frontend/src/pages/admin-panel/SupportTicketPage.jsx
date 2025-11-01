import React, { useState, useEffect } from "react";

const dummyTickets = [
  {
    id: "TCKT-1001",
    subject: "Refund not processed",
    user: "John Doe",
    role: "Customer",
    priority: "High",
    status: "Open",
    createdAt: "2025-06-01",
    messages: [
      { sender: "User", content: "I requested a refund 3 days ago.", timestamp: "2025-06-01 10:00" },
      { sender: "Admin", content: "We are checking on this.", timestamp: "2025-06-01 11:00" },
    ],
  },
  {
    id: "TCKT-1002",
    subject: "Unable to login",
    user: "VendorMart",
    role: "Vendor",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2025-06-03",
    messages: [],
  },
];

function SupportTicketManagement() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [reply, setReply] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    setTickets(dummyTickets);
  }, []);

  const handleReply = () => {
    if (!reply) return;
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === selectedTicket.id) {
        return {
          ...ticket,
          messages: [...ticket.messages, { sender: "Admin", content: reply, timestamp: new Date().toLocaleString() }],
          status: "In Progress",
        };
      }
      return ticket;
    });
    setTickets(updatedTickets);
    setReply("");
  };

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.subject.toLowerCase().includes(search.toLowerCase()) &&
      (filterStatus === "" || ticket.status === filterStatus)
  );

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          background: #f0f4f8;
          color: #333;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .container {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          padding: 24px;
          max-width: 1200px;
          margin: 0 auto;
        //   background: white;
          border-radius: 12px;
        //   box-shadow: 0 6px 18px rgba(167, 46, 46, 0.1);
        }
        .tickets-list {
          flex: 1 1 560px;
          max-width: 560px;
          border-radius: 10px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          height: 650px;
          box-shadow: 0 4px 10px rgba(0,123,255,0.15);
          border: 1px solid #007bff;
        }
        .tickets-list header {
          padding: 16px 20px;
          background: linear-gradient(90deg, #007bff, #00d4ff);
          color: white;
          font-weight: 700;
          font-size: 1.5rem;
          letter-spacing: 1.1px;
        }
        .filters {
          display: flex;
          gap: 12px;
          padding: 14px 20px;
          background: #e0f7ff;
          border-bottom: 1px solid #007bff;
        }
        .filters input,
        .filters select {
          padding: 8px 14px;
          font-size: 1rem;
          flex: 1;
          border: 2px solid #00aaff;
          border-radius: 6px;
          transition: border-color 0.3s ease;
          outline-offset: 2px;
        }
        .filters input:focus,
        .filters select:focus {
          border-color: #005f99;
          outline: none;
        }
        table {
        //   width: 100%;
        //   border-collapse: collapse;
        //   flex: 1 1 auto;
        //   display: block;
        //   overflow-y: auto;
        //   max-height: 480px;
        }
        thead {
          background: #007bff;
          color: white;
          position: sticky;
          top: 0;
          z-index: 10;
        }
        th,
        td {
          padding: 14px 18px;
          border-bottom: 1px solid #cce6ff;
          text-align: center;
          font-size: 1rem;
          white-space: nowrap;
          transition: background-color 0.3s ease;
        }
        tbody tr {
        //   display: table;
          width: 100%;
          table-layout: fixed;
          cursor: pointer;
          background-color: #f8fcff;
        //   border-left: 6px solid transparent;
          transition: border-color 0.3s ease, background-color 0.3s ease;
        }
        tbody tr:hover {
          background-color: #d0ebff;
          border-left-color: #007bff;
        }
        tbody tr.selected {
          background-color: #b3e0ff;
          border-left-color: #0056b3;
          font-weight: 600;
        }
        .ticket-details {
          flex: 2 1 350px;
          border-radius: 10px;
          padding: 24px;
          height: 650px;
          overflow-y: auto;
          box-shadow: 0 4px 12px rgba(0,123,255,0.2);
          border: 1px solid #007bff;
          background: #f0f9ff;
          display: flex;
          flex-direction: column;
        }
        .ticket-details h3 {
          margin-top: 0;
          font-size: 2rem;
          color: #004a99;
          font-weight: 700;
          margin-bottom: 16px;
        }
        .ticket-meta p {
          margin: 4px 0;
          font-size: 1.1rem;
          color: #005f99;
        }
        .messages {
          flex: 1 1 auto;
          background-color: white;
          border: 1px solid #a0d2ff;
          margin-top: 18px;
          padding: 14px 20px;
          border-radius: 8px;
          overflow-y: auto;
          max-height: 320px;
          box-shadow: inset 0 0 8px #d4f1ff;
        }
        .message {
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid #d0e7ff;
        }
        .message:last-child {
          border-bottom: none;
        }
        .message strong {
          display: block;
          color: #007bff;
          margin-bottom: 6px;
          font-size: 1.1rem;
        }
        .message span {
          font-size: 1rem;
          color: #333;
        }
        .message small {
          color: #99caff;
          font-size: 0.85rem;
          margin-top: 4px;
          display: block;
        }
        textarea {
          margin-top: 20px;
          width: 100%;
          min-height: 100px;
          font-size: 1.1rem;
          padding: 12px 16px;
          border-radius: 10px;
          border: 2px solid #007bff;
          outline-offset: 3px;
          resize: vertical;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }
        textarea:focus {
          border-color: #004a99;
          outline: none;
          background-color: #e6f0ff;
        }
        button.send-btn {
          margin-top: 16px;
          padding: 14px 28px;
          font-size: 1.1rem;
          background: linear-gradient(45deg, #007bff, #00d4ff);
          border: none;
          color: white;
          border-radius: 12px;
          cursor: pointer;
          font-weight: 700;
          box-shadow: 0 5px 12px rgba(0, 123, 255, 0.6);
          transition: background 0.3s ease, box-shadow 0.3s ease;
          align-self: flex-start;
        }
        button.send-btn:hover {
          background: linear-gradient(45deg, #0056b3, #0099cc);
          box-shadow: 0 8px 20px rgba(0, 86, 179, 0.8);
        }
        @media (max-width: 960px) {
          .container {
            flex-direction: column;
            padding: 16px;
          }
          .tickets-list,
          .ticket-details {
            max-width: 100%;
            height: auto;
          }
          table tbody {
            max-height: 280px;
          }
          .messages {
            max-height: 200px;
          }
          textarea {
            min-height: 80px;
          }
        }
      `}</style>

      <div className="container">
        <div className="tickets-list">
          <header>Support Tickets</header>
          <div className="filters">
            <input
              type="text"
              placeholder="Search by subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>User</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                    No tickets found.
                  </td>
                </tr>
              ) : (
                filteredTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className={selectedTicket?.id === ticket.id ? "selected" : ""}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td>{ticket.id}</td>
                    <td>{ticket.subject}</td>
                    <td>{ticket.user}</td>
                    <td>{ticket.status}</td>
                    <td>{ticket.priority}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="ticket-details">
          {selectedTicket ? (
            <>
              <h3>{selectedTicket.subject}</h3>
              <div className="ticket-meta">
                <p>
                  <strong>User:</strong> {selectedTicket.user} ({selectedTicket.role})
                </p>
                <p>
                  <strong>Status:</strong> {selectedTicket.status}
                </p>
                <p>
                  <strong>Priority:</strong> {selectedTicket.priority}
                </p>
                <p>
                  <strong>Created At:</strong> {selectedTicket.createdAt}
                </p>
              </div>
              <div className="messages">
                {selectedTicket.messages.length === 0 && <p>No messages yet.</p>}
                {selectedTicket.messages.map((msg, idx) => (
                  <div key={idx} className="message">
                    <strong>{msg.sender}:</strong>
                    <span> {msg.content}</span>
                    <small>{msg.timestamp}</small>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="Type your reply here..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button className="send-btn" onClick={handleReply}>
                Send Reply
              </button>
            </>
          ) : (
            <p>Please select a ticket to view details.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default SupportTicketManagement;
