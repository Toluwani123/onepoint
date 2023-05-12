import React, { useState, useEffect } from 'react'
import {render} from "react-dom"
import { useParams, withRouter, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import {PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js"

const Cart = ({prop1}) => {
  const navigate = useNavigate();
  const { code } = useParams("");
  const[total, settotal] = useState([])
  const[final, setfinal] = useState(0)
  const[calc, setcalc] = useState(0)
  const[tax, settax] = useState(0)
  const [inputValue, setInputValue] = useState(0);

  useEffect(()=>{
    fetch('/api/cart-retrieve/'+ code + '/items').then((response) => 
    response.json()).then((data) => {
      settotal(data),
      setInputValue(data[0].quantity)
      
    });


  }, []);
  useEffect(()=>{
    fetch('/api/cart-retrieve/'+ code).then((response) => 
    response.json()).then((data) => {
      setfinal(data.total_sum_cart),
      settax(data.total_tax_cart),
      setcalc(data.final_sum_cart)


      
    });


  }, []);
  const handlepress =(id) => {
    const requestOptions = {
      method: "DELETE",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify({
      }),


  }
    fetch('/api/cart-retrieve/' + prop1 + '/item/' + id, requestOptions).then((response) => response.json()).then((data)=> {console.log(data), window.location.reload();})

    
}

  
  const handleInputChange = (event, id) => {
    const value = event.target.value;
    setInputValue(value);
    const requestOptions = {
      method: "PUT",
      headers : {"Content-Type" : "application/json"},
      body: JSON.stringify({
        quantity: value
      }),


  }
    fetch('/api/cart-retrieve/' + prop1 + '/item/' + id, requestOptions).then((response) => response.json()).then((data)=> {console.log(data), window.location.reload();})

    
  };
  const handlepress_cart =() => {
    
    fetch('/api/cart-retrieve/'+ prop1).then((response) => response.json()).then((data) => {navigate('/cart/' + data.id), setcart(data.id), console.log(cart)}

    );

    
}
  const handlepress_checkout =() => {
    
  fetch('/api/cart-retrieve/'+ prop1).then((response) => response.json()).then((data) => {navigate('/checkout/' + data.id), setcart(data.id), console.log(cart)}

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
      
      <div className='cartwrapper'>
        <h1>Shopping Cart</h1>
        <div className='project'>
          <div className='shop'>
            {total.map(item => (                
              <div className='cartbox' key={item.id}>
                <img src={item.product.get_image}/>
                <div class='cartcontent'>
                  <h3>{item.product.name}</h3>
                  <h4>{item.product.price}</h4>
                  
                  <p class='unit'>Quantity:{item.quantity}
                    <input type="text"  onChange={(event) => handleInputChange(event, item.id)}/>
                  </p>
                  <p class='btn-area'onClick={() => handlepress(item.id)}>
                    <i class='bx bx-trash'></i>
                    <span class='btn2'>Remove</span>
                  </p>
                </div>
                
                
              </div>
            ))}
          </div>
          <div class='right-bar'>
            <p><span>Subtotal </span><span>${final}</span></p>
            <hr/>
            <p><span>Tax(8.25%) </span><span>${tax}</span></p>
            <hr/>
            <p><span>Shipping </span><span>$40</span></p>
            <hr/>
            <p><span>Total </span><span>${calc}</span></p>
            
            
            
            
            <a onClick={handlepress_checkout}><i class='bx bx-cart' ></i> Checkout</a>
          </div>
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
                            <p><Link to={`/catalog/`}><a href='#'>Products</a></Link></p>
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

export default Cart
