import React, { useState, useEffect } from 'react'
import {render} from "react-dom"
import { useParams, withRouter, useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";

import Popup from './Popup';

const Items = ({prop1}) => {
  const navigate = useNavigate();
  const[price, setprice] = useState(0);
  const[name, setname] = useState('');
  const[description, setdescription]= useState('');
  const[image, setimage] = useState('');
  const[val, setval] = useState(1);
  const { id } = useParams();
  const[cart, setcart] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const[quantity, setquantity] = useState(0)
  const[text, settext] = useState("Enter")
  useEffect(()=>{
    fetch('/api/get-product' + '?id=' + id).then((response) => 
    response.json()).then((data) => {
      setval(data.id),
      setprice(data.price),
      setname(data.name),
      setdescription(data.description),
      setimage(data.get_image)

    });


  }, []);
  const handlepress =() => {
    
    fetch('/api/cart-retrieve/'+prop1).then((response) => response.json()).then((data) => {navigate('/cart/' + data.id), setcart(data.id), console.log(cart)}

    );

    
}
  const handlepress_1 =(prod) => {
    settext("Added")
    const requestOptions = {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({
            product_id: prod,   
            quantity: quantity
        }),


    }
    fetch('/api/cart-retrieve/' + prop1 + '/items/', requestOptions).then((response) => response.json()).then((data) => {console.log(id)});

    
}
const handleInputChange = (e) => {
  const value = e.target.value;
  setquantity(value);
  console.log('Input value:', quantity);
}

  const press =() => {
    
    setIsVisible(true)
  }
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
      <div className= 'main-wrapper'>
        <div className='container-product'>
          <div className='product-div'>
            <div className='product-div-left'>
              <div className='img-product-container'>
            
                <img src={image}/>
        

              </div>

            </div>
            <div className='product-div-right'>
              <span class='product-name'>
                {name}
              </span>
              <span className='product-price'>
                ${price}
              </span>
              <p className='product-description'>{description}</p>
              <div className='btn-groups'>
                <button type='button' class='add-cart-btn' onClick={() => press()}>
                  <i class='bx bx-cart-add'></i> Add to Cart

                </button>
                <Popup trigger={isVisible} setTrigger={setIsVisible}>
                  <h3>Quantity: </h3> <input type="text" value={quantity} onChange={handleInputChange} /> 
                  <button className='enter-button'onClick={() => handlepress_1(val)}> <h3>{text}</h3> </button>
                </Popup>
                <button type='button' class='buy-now-btn'onClick={handlepress}>
                  <i class='bx bx-wallet-alt' ></i> Buy Now 

                </button>
              </div>

            </div>

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

export default Items

