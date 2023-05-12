import React, { useState, useEffect } from 'react'
import { useParams, withRouter, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
const Catalogs = ({prop1}) => {
  const navigate = useNavigate();
  const { slug } = useParams('');
  const[info, setinfo] = useState([])
  
  useEffect(()=>{
    fetch('/api/products/'+ slug).then((response) => 
    response.json()).then((data) => {
      setinfo(data.products)
      
    });


  }, []);
  const handlepress_cart =() => {
    
    fetch('/api/cart-retrieve/'+ prop1).then((response) => response.json()).then((data) => {navigate('/cart/' + data.id), setcart(data.id), console.log(cart)}

    );

    
}
  return (
    <div>
      <div class='header' id='fresh'>
                      <a href='#' class='logo'><img src= "/static/images/logo.png"/></a>
                      <ul class='navmenu'>
                        <li><Link to={`/`}><a>Home</a></Link></li>
                        <li><Link to={`/catalog/`}><a href='#'>Products</a></Link></li>
                        <li><Link to={`/aboutus/`}><a>About Us</a></Link></li>
                        <li><a>Contact Us</a></li>
                          

                      </ul> 
                      <div class='nav-icon'>
                          <a><i class='bx bx-search-alt-2'></i></a>
                          <a><i class='bx bx-user-circle' ></i></a>
                          <a onClick={handlepress_cart}><i class='bx bx-cart' ></i></a>
                          <a><div class='bx bx-menu' id='menu-icon'></div></a>
                      </div>

      </div>
      <div className='catalogs-container'>
        <div className='products-container'>
          {info.map(item => (
            <div className='catalog-product' key={item.id}>
              <img src={item.get_image}/>
              <h3>{item.name}</h3>
              <div class='catalog-price'>${item.price}</div>            
              <Link to={`/product/${item.id}`}><button className='main-btn' >Buy Now</button></Link>
            </div>
          ))}
          
        </div>
      </div>
      <section className='contact'>
                    <div className='contact-info'>
                        <div className='first-info'>
                            <img src= '/static/images/logo.png'/>
                            <p>901 Flint Avenue,Lubbock <br/> TX 79406, USA</p>
                            <p>806-224-9344</p>
                            <p>rager.chisom@gmail.com</p>
                            <div className='social-icon'>
                                <a href="#"><i className='bx bxl-instagram'></i></a>
                                <a href="#"><i className='bx bxl-twitter' ></i></a>
                                <a href="#"><i className='bx bxl-linkedin' ></i></a>
                            </div>
                        </div>
                        <div className='second-info'>
                            <h4>Navigation Menu</h4>
                            <p><Link to={`/`}><a>Home</a></Link></p>
                            <p><a onClick={handlepress_cart}>Go To Cart</a></p>
                            <p><Link to={`catalog/`}><a href='#'>Products</a></Link></p>
                            <p>Search</p>

                        </div>
                        <div className='second-info'>
                            <h4>Support</h4>
                            <p>Contact Us</p>
                            <p>About Page</p>
                            <p>Shopping and Returns</p>

                        </div>
                        <div className='third-info'>
                            <h4>Shop</h4>
                            <p>Men's</p>
                            <p>Women's</p>
                            <p>Discounts</p>

                        </div>
                        <div className='fourth-info'>
                            <h4>Company</h4>
                            <p>About</p>
                            <p>Affiliate</p>
                        

                        </div>

                    </div>

      </section>
    </div>
  )
}

export default Catalogs