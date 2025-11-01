import React from "react";

function ProductContainer({ title, products }) {
  return (
    <>
      <div className="d-flex flex-column align-items-center justify-content-start w-100 h-100 rounded ">
        <h4
          style={{ fontSize: "20px",
            fontWeight: "bold",
            // display: "flex",
            // justifyContent: "center",
            color: "#000",
            fontFamily: "sans-serif",
            marginBottom: "15px",
          }}
        >
          {title}
        </h4>

        <div className=" d-flex flex-row flex-wrap justify-content-center align-items-center gap-3 w-100 h-100">
          {products.map((product) => (
            <div className="d-flex flex-column align-items-center cursor-pointer" key={product.id}>
              <img
                src={product.image}
                alt={product.title}
                className={`product-image  ${
                  product.id === 1 ? "first-img" : ""
                }`}
              />
              <p>{product.title}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ProductList() {
  const grocery = [
    {
      id: 1,
      image:
        "https://img.freepik.com/premium-photo/shopping-basket-containing-fresh-foods-with-blurry-background-isolated-supermarket-grocery-food_327072-53513.jpg",
      title: "Groceries",
    },
    {
      id: 2,
      image: "https://wallpaperaccess.com/full/3492959.jpg",
      title: "Rice & Grains",
    },
    {
      id: 3,
      image:
        "https://img.freepik.com/premium-photo/food-item-background-wallpaper_492154-7058.jpg",
      title: "Oil & Ghee",
    },
    {
      id: 4,
      image:
        "https://th.bing.com/th/id/OIP.K8Ex1RM8nQy8LrASO8AqvAHaE8?w=253&h=180&c=7&r=0&o=5&pid=1.7",
      title: "Vegetables",
    },
    {
      id: 5,
      image:
        "https://media.gettyimages.com/id/171302954/photo/groceries.jpg?s=612x612&w=gi&k=20&c=V1rR0STPdGb4AF4N9cvx0ZjNQodolWAOVHkLDqj4ATI=",
      title: "Fruits",
    },
    {
      id: 6,
      image:
        "https://thumbs.dreamstime.com/b/grocery-and-groceries-134030070.jpg",
      title: "Snacks",
    },
    {
      id: 7,
      image:
        "https://st2.depositphotos.com/3963855/7460/i/450/depositphotos_74600911-stock-photo-groceries.jpg",
      title: "Dairy",
    },
  ];

  const fruits = [
    {
      id: 1,
      image:
        "data:image/jpeg;base64,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",
      title: "Apples",
    },
    {
      id: 2,
      image:
        "https://th.bing.com/th/id/OIP.rANDri7Bf326RuaAZCKImAHaEO?rs=1&pid=ImgDetMain",
      title: "Bananas",
    },
    {
      id: 3,
      image:
        "https://images.news18.com/ibnlive/uploads/2023/01/untitled-1-247-167447200616x9.jpg",
      title: "Mixed Fruits",
    },
    {
      id: 4,
      image:
        "https://th.bing.com/th/id/OIP.AVdLst7xBWVtYREjGVCIzwHaEK?rs=1&pid=ImgDetMain",
      title: "Pineapple",
    },
    {
      id: 5,
      image:
        "https://th.bing.com/th/id/R.6020fe43e9d144ecd9ea7370934689e6?rik=FPj331Pd4S886A&riu=http%3a%2f%2f4.bp.blogspot.com%2f-hIceA2tZil0%2fVbepzZVYYOI%2fAAAAAAAAAgc%2fTLaTUyO6NBY%2fs1600%2fpineapples-373769_1280.jpg&ehk=E7W4cOu%2fsnwikTTweyAmARXUvGIEvU9PjXYRoUZVPw0%3d&risl=&pid=ImgRaw&r=0",
      title: "Fruit Basket",
    },
    {
      id: 6,
      image:
        "https://th.bing.com/th/id/OIP.t2jmiRL9EKaW1k237Z1gFwHaFj?rs=1&pid=ImgDetMain",
      title: "Mixed Fruits",
    },
    {
      id: 7,
      image:
        "https://th.bing.com/th/id/OIP.ERNquRXwpPKStAO_7wwBSgHaE7?rs=1&pid=ImgDetMain",
      title: "Mixed Fruits",
    },
  ];

  const foods = [
    {
      id: 1,
      image:
        "https://www.acouplecooks.com/wp-content/uploads/2020/12/Honey-Garlic-Shrimp-026.jpg",
      title: "Chips",
    },
    {
      id: 2,
      image:
        "https://www.eatwell101.com/wp-content/uploads/2019/05/chicken-and-green-beans-recipe4.jpg",
      title: "Chocolates",
    },
    {
      id: 3,
      image:
        "https://th.bing.com/th/id/R.02d47182166f7f137888d2d8519b2891?rik=jrr3hYWlP6cGdA&riu=http%3a%2f%2fdel.h-cdn.co%2fassets%2f17%2f26%2f1498851545-shot-1-61.jpg&ehk=wt9Bue9AAEl%2fx5ToUvhQWkcCSfD51oI83Ai43XXzkIY%3d&risl=1&pid=ImgRaw&r=0",
      title: "Namkeen",
    },
    {
      id: 4,
      image:
        "https://insanelygoodrecipes.com/wp-content/uploads/2020/07/spaghetti-and-meatballs.jpg",
      title: "Namkeen",
    },
    {
      id: 5,
      image: "https://wallpapercave.com/wp/wp8465834.jpg",
      title: "Namkeen",
    },
    {
      id: 6,
      image:
        "https://www.rachaelattard.com/wp-content/uploads/2015/10/IMG_4002-e1445232437511.jpg",
      title: "Namkeen",
    },
    {
      id: 7,
      image:
        "https://img.sndimg.com/food/image/upload/q_92,fl_progressive/v1/img/recipes/74/48/3/nxAqazgQa2Lq3bQreAAU_098-grilled-beer-chicken.jpg",
      title: "Namkeen",
    },
  ];

  const jewelry = [
    {
      id: 1,
      image:
        "https://i.pinimg.com/originals/ac/11/9e/ac119e6f01360ef96f5d7a64171fad51.jpg",
      title: "Necklace",
    },
    {
      id: 2,
      image:
        "https://i.pinimg.com/originals/27/f9/ba/27f9ba2388a11648b2bdf9b5e840f334.jpg",
      title: "Bracelet",
    },
    {
      id: 3,
      image:
        "https://th.bing.com/th/id/R.0f01a5c0a775c20ab258e15f0195defa?rik=JAJ83Pwy3a2r6A&riu=http%3a%2f%2fsouthindiajewels.com%2fwp%2fwp-content%2fuploads%2f2017%2f09%2fsouth-indian-jewellery-designs-in-catalogue-7.jpg&ehk=mdQLuozojVpWfu%2bVuRVRKXLpCPON2QRiSLlskmF4VcQ%3d&risl=&pid=ImgRaw&r=0",
      title: "Earrings",
    },
    {
      id: 4,
      image:
        "https://blog.southindiajewels.com/wp-content/uploads/2019/11/imitation-antique-jewellery-designs-9.jpg",
      title: "Earrings",
    },
    {
      id: 5,
      image:
        "https://th.bing.com/th/id/R.9893ace9a43388c3f7bfabfebdf6e784?rik=jZLyM8%2b%2fydtVHw&riu=http%3a%2f%2f1.bp.blogspot.com%2f-eA_p4L_nZkc%2fTlVJNpej2NI%2fAAAAAAAABOA%2fKdUUUpyUZmk%2fs1600%2fnecklace-zoom-DSC_9797.jpg&ehk=BQOvs%2bEbgckC%2fJlZoZqZ9o95%2fZfqMPS3XFFfZgukbv8%3d&risl=&pid=ImgRaw&r=0",
      title: "Earrings",
    },
    {
      id: 6,
      image:
        "https://www.southjewellery.com/wp-content/uploads/2019/11/bridal-wedding-diamond-necklace-designs.jpg",
      title: "Earrings",
    },
    {
      id: 7,
      image: "https://wallpapercave.com/wp/wp8149661.jpg",
      title: "Earrings",
    },
  
    
  ];

  return (
    <>
      <ProductContainer title="Grocery & Kitchen" products={grocery} />
      <ProductContainer title="Fresh Fruits" products={fruits} />
      <ProductContainer title="Foods" products={foods} />
      <ProductContainer title="Jewelry Collection" products={jewelry} />

      <style>
        {`
          .product-image {
            width: 120px;
            height: 150px;
            object-fit: cover;
            border-radius: 8px;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .product-image:hover {
            transform: scale(1.05);
          }

          .first-img {
            width:280px; 
            border: 2px solid rgba(206, 240, 14, 0.52);
          }
        `}
      </style>
    </>
  );
}

export default ProductList;
