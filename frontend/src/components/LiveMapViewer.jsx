import React from "react";

const LiveMapViewer = ({ digiPIN }) => {
  if (!digiPIN) return <p style={{ color: "gray" }}>No DigiPIN provided.</p>;

  return (
    <div>
      <h3>Agent Live Map</h3>
      <iframe
        title="Agent Location - OLA Maps"
        src={`https://olamaps.com/embed/digipin/${digiPIN}`} // You can update with actual OLA URL format
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
};

export default LiveMapViewer;
