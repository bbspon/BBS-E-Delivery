  import Header from "../components/Header";
  import MiddlePage from "./customer-order/home/MiddlePage";
  import ProductBox from "./customer-order/home/ProductBox";
  import LiveShopping from "./customer-order/home/LiveShopping";
  import WhyChoose from "./customer-order/home/WhyChoose";
  import Footer from "../components/Footer";
  import ProductList from "./customer-order/home/ProductList";


  function HomePage() {
    return (
      <>
        <Header />
        
        <MiddlePage />
       
        <ProductBox />
        <LiveShopping />
        <ProductList />
        <WhyChoose />
        <Footer /> 

      </>
    );
  }

  export default HomePage;
