import React, { useState, useEffect, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const videos = [
  "../../public/thiaworld.mp4",
  "../../public/sample2.mp4",
  "../../public/sample3.mp4",
  "../../public/thiaworld.mp4",
  "../../public/sample2.mp4",
  "../../public/sample3.mp4",
];

const HeroVideoCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRefs = useRef([]);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video) {
        if (idx === activeIndex && isPlaying) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [activeIndex, isPlaying]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) next();
    }, 5000);
    return () => clearInterval(interval);
  }, [activeIndex, isPlaying]);

  const next = () => {
    setActiveIndex((prev) => (prev + 1) % videos.length);
  };

  const prev = () => {
    setActiveIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      isPlaying ? currentVideo.pause() : currentVideo.play();
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) {
      next();
    } else if (touchEndX.current - touchStartX.current > 50) {
      prev();
    }
  };

  return (
    <div
      className="position-relative rounded-3 overflow-hidden video-carousel"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="video-container d-flex align-items-center justify-content-center transition-all flex-nowrap">
        {videos.map((video, idx) => {
          const isActive = idx === activeIndex;
          const isLeft = idx === (activeIndex - 1 + videos.length) % videos.length;
          const isRight = idx === (activeIndex + 1) % videos.length;

          let style = {
            transform: "scale(0.9) translateY(5px)",
            opacity: 0.5,
            filter: "blur(2px)",
            zIndex: 1,
          };
          if (isActive) {
            style = {
              transform: "scale(1)",
              opacity: 1,
              filter: "none",
              zIndex: 10,
            };
          } else if (isLeft) {
            style = {
              transform: "scale(0.95) translateX(-20px)",
              opacity: 0.7,
              zIndex: 5,
            };
          } else if (isRight) {
            style = {
              transform: "scale(0.95) translateX(20px)",
              opacity: 0.7,
              zIndex: 5,
            };
          }

          return (
            <div
              key={idx}
              className="position-relative overflow-hidden rounded shadow-lg mx-2"
              style={{
                ...style,
                width: isActive ? "80vw" : "20vw",
                maxWidth: isActive ? "1000px" : "250px",
                height: isActive ? "40vh" : "30vh",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <video
                ref={(el) => (videoRefs.current[idx] = el)}
                src={video}
                autoPlay={isActive && isPlaying}
                muted
                loop
                preload="metadata"
                playsInline
                className="w-100 h-100 object-fit-cover rounded"
              />
              {isActive && (
                <>
                  <button
                    onClick={togglePlay}
                    className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle shadow"
                  >
                    {isPlaying ? <FaPause /> : <FaPlay />}
                  </button>
                  <button className="position-absolute bottom-0 start-50 translate-middle-x mb-3 btn btn-danger btn-sm">
                    View
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        className="btn btn-light btn-lg rounded-circle shadow nav-btn-left"
      >
        ❮
      </button>

      <button
        onClick={next}
        className="btn btn-light btn-lg rounded-circle shadow nav-btn-right"
      >
        ❯
      </button>

      <style>{`
        .video-container {
          width: 100%;
          padding: 2.8vh 5vw;
          background-color: #f1e6ff;
          // background-image: url("https://img.freepik.com/premium-photo/wine-bread-vegetables-home-delivery-food-purchase-order-via-internet-your-smartphone-food-arriving-any-address-flyer-with-copyspace-ad-shopping-deliverying-goods-concept_489646-5503.jpg");
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(185, 21, 21, 0.26);
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
          border-radius: 5px;
        }

        .video-carousel {
          width: 100%;
          height: 100%;
          padding: 2.5rem 5rem;
        }

        .nav-btn-left, .nav-btn-right {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          padding: 12px;
          z-index: 20;
        }

        .nav-btn-left {
          left: 100px;
        }

        .nav-btn-right {
          right: 100px;
        }

        @media (max-width: 768px) {
          .nav-btn-left, .nav-btn-right {
            padding: 8px;
            font-size: 1rem;
          }

          .video-container {
            flex-direction: column;
            padding: 3vh 3vw;
          }

          .video-carousel {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .video-container {
            padding: 2vh 2vw;
          }

          .nav-btn-left {
            left: 10px;
          }

          .nav-btn-right {
            right: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroVideoCarousel;
