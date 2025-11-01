import React, { useState } from "react";

const initialTemplates = [
  {
    id: 1,
    type: "SMS",
    name: "Order Confirmation",
    message: "Your order has been confirmed. Thank you for shopping with us!",
    tags: ["order", "confirmation"],
    active: true,
  },
  {
    id: 2,
    type: "Email",
    name: "Welcome Email",
    message: "Welcome to BBSCART! Start shopping with us today.",
    tags: ["welcome", "signup"],
    active: true,
  },
];

export default function TemplateManagerPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [type, setType] = useState("SMS");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleAddTemplate = () => {
    if (!name || !message) return;
    const newTemplate = {
      id: templates.length + 1,
      type,
      name,
      message,
      tags: tags.split(",").map((t) => t.trim()),
      active: true,
    };
    setTemplates([...templates, newTemplate]);
    setName("");
    setMessage("");
    setTags("");
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter((tpl) => tpl.id !== id));
  };

  const handleToggleStatus = (id) => {
    setTemplates(
      templates.map((tpl) =>
        tpl.id === id ? { ...tpl, active: !tpl.active } : tpl
      )
    );
  };

  const filteredTemplates = templates.filter((tpl) =>
    tpl.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="sms-email-template-container">
      <h2 className="text-center text-2xl font-semibold mb-6 mt-4">
        SMS & Email Template Manager
      </h2>

      <input
        type="text"
        placeholder="Search templates..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="sms-email-template-form">
        <div className="flex items-center gap-4">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-100 border mb-3 p-2 rounded-lg bg-blue-50 text-blue-700 font-semibold"
          >
            <option value="SMS">SMS</option>
            <option value="Email">Email</option>
          </select>
          <input
            type="text"
            placeholder="Template Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-100 flex-1 border p-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <textarea
          placeholder="Message content..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-sm h-28 focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border p-2 rounded-lg shadow-sm bg-yellow-50"
        />

        <button
          onClick={handleAddTemplate}
          className="bg-gradient-to-r from-green-500 to-green-600 text-black border border-green-600 py-2 px-4 rounded-lg hover:from-green-600 hover:to-green-700 shadow-md"
        >
          + Save Template
        </button>
      </div>

      <div className="space-y-6">
        {filteredTemplates.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white p-5 rounded-xl shadow-md border-l-4 border-blue-500 flex justify-between items-start hover:shadow-lg transition"
          >
            <div>
              <h3 className="font-bold text-lg text-blue-800">
                {tpl.name} ({tpl.type})
              </h3>
              <p className="text-gray-600 mt-1">{tpl.message}</p>
              <div className="mt-2 space-x-2">
                {tpl.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 text-right mt-4 flex flex-col column-gap-2">
              <button
                onClick={() => setPreviewTemplate(tpl)}
                className="text-sm text-blue-600 hover:underline font-medium me-2"
              >
                Preview
              </button>
              <button
                onClick={() => handleToggleStatus(tpl.id)}
                className={`text-sm font-medium ${
                  tpl.active ? "text-green-600" : "text-gray-500"
                }`}
              >
                {tpl.active ? "Active" : "Inactive"}
              </button>
              <button
                onClick={() => handleDelete(tpl.id)}
                className="text-sm text-red-500 hover:underline font-medium mx-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-xl shadow-2xl border-2 border-blue-100">
            <h3 className="text-xl font-bold text-blue-700 mb-4">
              {previewTemplate.name} ({previewTemplate.type})
            </h3>
            <p className="text-gray-800 whitespace-pre-wrap">
              {previewTemplate.message}
            </p>
            <button
              onClick={() => setPreviewTemplate(null)}
              className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style>{
      `
       .sms-email-template-container{
        max-width: 1000px;
        margin: 0 auto;
        }
        .search-input{
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        margin: 20px 0;
        }

        .sms-email-template-form{
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px 0;
        border: 1px solid #ccc;
        padding: 20px;
        }
      `}</style>
    </div>
  );
}
