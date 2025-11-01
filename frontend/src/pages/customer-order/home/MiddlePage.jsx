import React, { useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { IoArrowRedoSharp } from "react-icons/io5";
import VideoHero from "./VideoHero";
import { useNavigate } from "react-router-dom";
import DealsOffersPage from "../DealsOffersPage";
function MiddlePage() {
  const navigate = useNavigate();

  const productboxs = [
    {
      id: 1,
      image:
        "https://th.bing.com/th/id/R.6c1787e507c532e25b09141afd4378f6?rik=kJoQQ%2bKlAYYfaw&riu=http%3a%2f%2fpluspng.com%2fimg-png%2ffood-png--1242.png&ehk=KuD28GlBQ8kJD6ySafWcdFTrSJX2iXMa7Xo0Leen1ZE%3d&risl=&pid=ImgRaw&r=0",
      title: "Food",
    },
    {
      id: 2,
      image:
        "https://th.bing.com/th/id/OIP.DOsiTIHbkp5GVm1AwEiDmwHaHa?rs=1&pid=ImgDetMain",
      title: "Item 2",
    },
    {
      id: 3,
      image:
        "https://static.vecteezy.com/system/resources/previews/028/882/817/original/restaurant-food-food-transparent-restaurant-food-ai-generated-free-png.png",
      title: "Item 3",
    },
    {
      id: 4,
      image:
        "https://pluspng.com/img-png/png-jewellery-jewellery-png-transparent-images-image-36045-1000.png",
      title: "Item 4",
    },
    {
      id: 5,
      image:
        "https://static.vecteezy.com/system/resources/previews/027/143/677/original/fresh-single-orange-fruit-isolated-on-transparent-background-png.png",
      title: "Item 5",
    },
    {
      id: 6,
      image:
        "https://www.pngall.com/wp-content/uploads/8/Restaurant-Food-PNG-Clipart.png",
      title: "Item 6",
    },
    {
      id: 7,
      image:
        "https://th.bing.com/th/id/R.25c878d8dd11e96ba48604718e7ff0ef?rik=aGT4a0FDjxDfkw&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f5%2fJewel-Set-PNG-Transparent.png&ehk=gt0IWs6IUQkXeMBsXPbXTpCx6IeEUkdKidYUcDZKV2s%3d&risl=&pid=ImgRaw&r=0",
      title: "Item 7",
    },
    {
      id: 8,
      image:
        "https://th.bing.com/th/id/OIF.nPoN7HQmVgEp3zfmjrZYrQ?rs=1&pid=ImgDetMain",
      title: "Item 8",
    },
    {
      id: 9,
      image:
        "https://th.bing.com/th/id/OIP.EYQvPZSz9QsI_CChKK6qaAAAAA?rs=1&pid=ImgDetMain",
      title: "Item 9",
    },
    {
      id: 10,
      image: "https://www.pngmart.com/files/22/Jewelry-PNG-HD-Isolated.png",
      title: "Item 10",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 6;

  const handleNext = () => {
    if (startIndex + visibleCount < productboxs.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleProducts = productboxs.slice(
    startIndex,
    startIndex + visibleCount
  );

  return (
    <>
      <VideoHero />
      <div className="middle-page-container">
        <div className="middle-page">
          <button
            className="arrow"
            onClick={handlePrev}
            disabled={startIndex === 0}
          >
            <IoArrowUndo className="arrow-icon" />
          </button>

          <div className="images-container">
            {visibleProducts.map((product) => (
              <div
                className="image-box"
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: "pointer" }}
              > 
                <img src={product.image} alt={product.title} />
                <p>{product.title}</p>
              </div>
            ))}
          </div>
         
          <button
            className="arrow"
            onClick={handleNext}
            disabled={startIndex + visibleCount >= productboxs.length}
          >
            <IoArrowRedoSharp />
          </button>
        </div>

        <div className="middle-page-title">
          <div className="middle-page-title-text">
            <h1>BBSCART</h1>
            <p>All Smart and Luxury Jewellery</p>
            <button onClick={() => navigate("/contact")}>Shop Now</button>
          </div>
        </div>
        <div className="my-5">
           <DealsOffersPage />
        </div>
        <style>{`
        .middle-page-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
         
          padding: 20px 75px;
        }
        .middle-page {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 60px;
          width: 100%;
          gap: 10px;
        }
        .middle-page-title{
            background-image: url('https://wallpaperbat.com/img/601164-gold-jewellery-wallpaper-1920x1080-download-hd-wallpaper.jpg');
            background-size:cover;
            background-repeat: no-repeat;
            background-position: center;
            color: white;
            height: 60vh;
            width: 100%;
              border: 5px solid rgb(236, 205, 84);
            }

            .middle-page-title-text{
              display: flex;
              flex-direction: column;
              align-items: start;
              justify-content: center; 
              padding: 100px 160px;
              width: 60%;
            }
         .middle-page-title-text h1{
           font-size: 4rem;
           font-weight: bold;
           family:'Poppins', sans-serif;
           text-shadow: 2px 2px 25px rgba(233, 26, 26, 0.88);
           color: rgba(233, 218, 4, 0.93);
         }

         .middle-page-title-text p{
           font-size: 1.5rem;
           font-weight: bold;
           family:'Poppins', sans-serif;
           padding: 5px 5px;
         }

         .middle-page-title-text button{
           background-color:rgba(218, 179, 25, 0.72);
           padding: 5px 30px;
           border-radius: 15px;
           cursor: pointer;
           font-size: 15px;
           font-weight: bold;   
           margin: 0 55px;
         }

        .arrow {
          font-size: 2rem;
          background: black;
          border: none;
          cursor: pointer;
        }
        

        .arrow:disabled {
          color: #ccc;
          cursor: not-allowed;
        }

        .images-container {
          display: flex;
          gap: 10px;
          overflow: hidden;
        }

        .image-box {
          width: 200px;
          text-align: center;
        }

        .image-box img {
          width: 200px;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .image-box p{
          font-size: 20px;
          color: black;
          margin-top: 10px;
          padding: 5px 10px;
         
        }

        @media (max-width: 1024px) {
  .middle-page-title-text {
    padding: 40px;
    width: 70%;
  }

  .middle-page-title-text h1 {
    font-size: 3rem;
  }

  .middle-page-title-text p {
    font-size: 1.2rem;
  }

  .middle-page-title-text button {
    font-size: 14px;
    margin: 0 40px;
  }
}

@media (max-width: 768px) {
  .middle-page-title {
    height: auto;
    padding: 20px 0;
  }

  .middle-page-title-text {
    width: 90%;
    padding: 20px;
  }

  .middle-page-title-text h1 {
    font-size: 2.5rem;
  }

  .middle-page-title-text p {
    font-size: 1rem;
    padding: 0;
  }

  .middle-page-title-text button {
    font-size: 13px;
    margin: 10px 0;
    padding: 8px 20px;
  }
}

@media (max-width: 480px) {
  .middle-page-title-text {
    width: 100%;
    padding: 15px;
    align-items: center;
    text-align: center;
  }

  .middle-page-title-text h1 {
    font-size: 2rem;
  }

  .middle-page-title-text p {
    font-size: 0.95rem;
  }

  .middle-page-title-text button {
    padding: 6px 16px;
    font-size: 12px;
  }
}

        
      `}</style>
      </div>
    </>
  );
}

export default MiddlePage;
