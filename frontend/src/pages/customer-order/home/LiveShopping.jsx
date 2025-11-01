import React, { useEffect, useState } from "react";

import { HiMiniVideoCamera } from "react-icons/hi2";

const LiveShopping = () => {
  const [liveEvents, setLiveEvents] = useState([]);

  useEffect(() => {
    // Using mock data instead of API call
    const mockEvents = [
      {
        _id: "1",
        title: "Gold Jewelry Launch",
        description: "Explore our new premium gold necklace collection live.",
        videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      },
      {
        _id: "2",
        title: "Bridal Jewelry Showcase",
        description: "Get wedding-ready with our exclusive bridal sets.",
        videoUrl: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
      },
      {
        _id: "3",
        title: "Festive Diamond Deals",
        description: "Huge discounts on diamonds this festive season!",
        videoUrl: "https://www.youtube.com/watch?v=aqz-KE-bpKQ",
      },
    ];

    setLiveEvents(mockEvents);
  }, []);

  return (
    <div
      className="d-flex flex-wrap "
      style={{ padding: "20px 6%", marginBottom: "35px" }}
    >
      <h2>Live Shopping Events</h2>
      <div
        className="justify-content-center"
        style={{
          width: "100%",
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {liveEvents.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <a
              className="watch-now"
              href={event.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <HiMiniVideoCamera className="me-2" />
              Watch Now
            </a>
          </div>
        ))}
      </div>
      <style>
        {`

.live-shopping  h2{
  font-family:Georgia, 'Times New Roman', Times, serif;
  font-size: 30px;
  margin-left: 25px;
  margin-bottom: 30px;
}

.event-list {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

}

.event-card {
  background: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  /* Background image settings */
  background-image: url('https://png.pngtree.com/thumb_back/fh260/background/20230703/pngtree-d-rendering-of-a-shopping-bag-being-held-by-a-hand-image_3709011.jpg');
  background-size: cover;         /* Makes sure the image covers the card */
  background-position: center;    /* Keeps image centered */
  background-repeat: no-repeat;   /* Prevents tiling */
  color: black;                   /* Ensure text is readable */
}


.event-card h3 {
  margin: 0 0 10px;
  font-size: 25px;
  color: #020202b4;
  
  box-shadow: 0 2px 6px rgba(224, 4, 4, 0.329);
  background-color: #f0f8ff8c;
  padding:20px;
  border-radius: 10px;
  text-align: center;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.event-card p{
  margin: 0 0 10px;
  font-size: 15px;
  color: #020202;
}

.event-card a {
  color: #0c0c0c;
  text-decoration: none;
  font-weight: bold;
  box-shadow: #db0707;
}

.watch-now{
  text-align: center;
  margin-top: 20px;
  align-items: center;
  display: flex;
  justify-content:end;
  color: #020202;
}

    `}
      </style>
    </div>
  );
};

export default LiveShopping;
