import React, { useState } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

function ProductBox() {
  const productboxs = [
    { id: 1, image: "https://img.freepik.com/premium-photo/shopping-basket-containing-fresh-foods-with-blurry-background-isolated-supermarket-grocery-food_327072-53513.jpg", title: "Item 1" },
    { id: 2, image: "https://wallpaperaccess.com/full/3492959.jpg", title: "Item 2" },
    { id: 3, image: "https://img.freepik.com/premium-photo/food-item-background-wallpaper_492154-7058.jpg", title: "Item 3" },
    { id: 4, image: "https://th.bing.com/th/id/OIP.K8Ex1RM8nQy8LrASO8AqvAHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7", title: "Item 4" },
    { id: 5, image: "https://media.gettyimages.com/id/171302954/photo/groceries.jpg?s=612x612&w=gi&k=20&c=V1rR0STPdGb4AF4N9cvx0ZjNQodolWAOVHkLDqj4ATI=", title: "Item 5" },
    { id: 6, image: "https://thumbs.dreamstime.com/b/grocery-and-groceries-134030070.jpg", title: "Item 6" },
    { id: 7, image: "https://st2.depositphotos.com/3963855/7460/i/450/depositphotos_74600911-stock-photo-groceries.jpg", title: "Item 7" },
    { id: 8, image: "https://cdn.pixabay.com/photo/2016/04/21/11/32/groceries-1343141_640.jpg", title: "Item 8" },
    { id: 9, image: "https://static.vecteezy.com/system/resources/previews/035/942/069/non_2x/ai-generated-fruits-and-vegetables-on-shop-stand-in-supermarket-grocery-store-ai-generated-free-photo.jpg", title: "Item 9" },
    { id: 10, image: "https://images.pexels.com/photos/4020557/pexels-photo-4020557.jpeg", title: "Item 10" },
  ];

  const productBoxTwo = [
    { id: 1, image: "https://wallpapercave.com/wp/wp8149661.jpg", title: "Gold Necklace" },
    { id: 2, image: "https://i.pinimg.com/originals/27/f9/ba/27f9ba2388a11648b2bdf9b5e840f334.jpg", title: "Bangle Set" },
    { id: 3, image: "https://th.bing.com/th/id/R.7b1722186d0a608cd87208dda23d7eed?rik=6iaiyHT%2bahuPhQ&riu=http%3a%2f%2f1.bp.blogspot.com%2f-D02HNQ7XtaY%2fUUEB8hL7wEI%2fAAAAAAAABCE%2fT4hkmAjFKNg%2fs1600%2findian-gold-jewellery-753330.jpg&ehk=8sfV%2fuf%2fRi96yzmjN6UHA%2f8WHkau8PuIg14h89y11L4%3d&risl=&pid=ImgRaw&r=0", title: "Gold Ring" },
    { id: 4, image: "https://cdn.pixabay.com/photo/2016/02/02/15/54/jewellery-1175533_960_720.jpg", title: "Jewelry Set" },
    { id: 5, image: "https://2.bp.blogspot.com/-Avz08GINVSY/UCu9W226RRI/AAAAAAAACiA/qnUhz1aeD8M/s1600/necklace-zoom-DSC_9776.jpg", title: "Bracelet" },
    { id: 6, image: "https://thumbs.dreamstime.com/b/gold-jewellery-11153202.jpg", title: "Gold Chain" },
    { id: 7, image: "https://img.freepik.com/free-photo/gold-necklace-with-gold-red-beads-matching-necklace_1340-42899.jpg", title: "Gold Chain" },
    { id: 8, image: "https://thumbs.dreamstime.com/z/gold-jewellery-11153174.jpg?w=360", title: "Gold Chain" },
    { id: 9, image: "https://www.goldforever.co.uk/wp-content/uploads/2018/11/NS1003-1.jpg", title: "Gold Chain" },
    { id: 10, image: "https://wallpaperaccess.com/full/3714374.jpg", title: "Gold Chain" },
  ];

  const visibleCount = 4;
  const [startIndexOne, setStartIndexOne] = useState(0);
  const [startIndexTwo, setStartIndexTwo] = useState(0);

  const handleNextOne = () => {
    if (startIndexOne + visibleCount < productboxs.length) {
      setStartIndexOne(startIndexOne + 1);
    }
  };

  const handlePrevOne = () => {
    if (startIndexOne > 0) {
      setStartIndexOne(startIndexOne - 1);
    }
  };

  const handleNextTwo = () => {
    if (startIndexTwo + visibleCount < productBoxTwo.length) {
      setStartIndexTwo(startIndexTwo + 1);
    }
  };

  const handlePrevTwo = () => {
    if (startIndexTwo > 0) {
      setStartIndexTwo(startIndexTwo - 1);
    }
  };

  const visibleProductsOne = productboxs.slice(
    startIndexOne,
    startIndexOne + visibleCount
  );

  const visibleProductsTwo = productBoxTwo.slice(
    startIndexTwo,
    startIndexTwo + visibleCount
  );

  return (
    <>
      <div className="product-box">
        {/* Box One */}
        <div className="product-box-one">
          <div className="product-description">
            <h1>Grocery</h1>
            <p>Product description</p>
          </div>
          <div className="product-images">
            <button className="arrow" onClick={handlePrevOne} disabled={startIndexOne === 0}>
              <IoMdArrowDropleft />
            </button>

            <div className="images-container">
              {visibleProductsOne.map((product) => (
                <div className="image-box" key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              ))}
            </div>

            <button className="arrow" onClick={handleNextOne} disabled={startIndexOne + visibleCount >= productboxs.length}>
              <IoMdArrowDropright />
            </button>
          </div>
        </div>

        {/* Box Two */}
        <div className="product-box-two">
          <div className="product-description">
            <h1>Jewelry</h1>
            <p>Shiny & Traditional</p>
          </div>
          <div className="product-images">
            <button className="arrow" onClick={handlePrevTwo} disabled={startIndexTwo === 0}>
             <IoMdArrowDropleft />
            </button>

            <div className="images-container">
              {visibleProductsTwo.map((product) => (
                <div className="image-box" key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <span>{product.title}</span>
                </div>
              ))}
            </div>

            <button className="arrow" onClick={handleNextTwo} disabled={startIndexTwo + visibleCount >= productBoxTwo.length}>
              <IoMdArrowDropright />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .product-box {
          display: flex;
          flex-direction: row;
          justify-content: center;
          padding: 30px 85px;
          width: 100%;
        }

        .product-box-one,
        .product-box-two {
          width: 50%;
          height: 380px;
          margin: 10px;
          border-radius: 10px;
          background-size: cover;
          background-repeat: no-repeat;

        }
        
        .product-box-one {
          background-image: url("https://img.freepik.com/premium-photo/supermarket-grocery-cart-full-healthy-food-wooden-table-dark-background-generative-ai_634053-7888.jpg");
        
          }

        .product-box-two {
          background-image: url("https://static.vecteezy.com/system/resources/thumbnails/031/713/527/small_2x/gold-jewelry-diwali-background-ai-generated-free-photo.jpg");
        }

        .product-description {
          padding: 10px 40px;
      
        
        }

        .product-description h1 {
  font-size: clamp(2rem, 6vw, 6rem); /* Responsive font size */
  font-weight: bold;
  color: rgba(12, 245, 101, 0.52);
  font-family: "fantasy";
  // text-align: center; /* Center the text */
  margin: 0 auto;     /* Center the element itself */
}

        .product-description p {
          font-size: 1.5rem;
          color: rgba(197, 204, 200, 0.52);
          font-family: "exo";
          padding: 0px 30px;
        }

        .product-images {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 20px;
          width: 100%;
        }

        .images-container {
          display: flex;
          gap: 10px;
        }

        .image-box {
          text-align: center;
        }

        .image-box img {
          width: 120px;
          height: 100px;
          object-fit: cover;
          border-radius: 8px;
        }

        .image-box span {
          display: block;
          margin-top: 5px;
          font-weight: 600;
          color: white;
        }

        .arrow {
          font-size: 2rem;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }

        .arrow:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}

export default ProductBox;
