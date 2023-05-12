import React, {useState, useEffect}from 'react'
import Cart from "./Cart";
import Items from "./Items";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { withRouter, useNavigate } from 'react-router-dom';
import Catalog from './Catalog';
import Checkout from './Checkout';
import Catalogs from './Catalogs';
import AboutUs from './AboutUs';

const HomePage = () => {
  const navigate = useNavigate();
  const[name_1, setname_1] = useState('');
  const[image_1, setimage_1] = useState('');
  const[image_2, setimage_2] = useState('');
  const[image_3, setimage_3] = useState('');
  const[image_4, setimage_4] = useState('');
  const[name_2, setname_2] = useState('');
  const[name_3, setname_3] = useState('');
  const[name_4, setname_4] = useState('');
  const[price_1, setprice_1] = useState(0);
  const[price_2, setprice_2] = useState(0);
  const[price_3, setprice_3] = useState(0);
  const[price_4, setprice_4] = useState(0);
  const[id_1, setid_1] = useState(0);
  const[id_2, setid_2] = useState(0);
  const[id_3, setid_3] = useState(0);
  const[id, setid] = useState('');
  
  useEffect(() =>{
    fetch('/api/latest-products-1').then((response) => response.json()).then((data) =>{
        setid_1(data.id);
        setname_1(data.name);
        setimage_1(data.get_image);
        setprice_1(data.price)
      
    })

  }, [])
  useEffect(() =>{
    fetch('/api/latest-products-2').then((response) => response.json()).then((data) =>{
        setid_2(data.id);
        setname_2(data.name);
        setimage_2(data.get_image);
        setprice_2(data.price)
      
    })

  }, [])
  useEffect(() =>{
    fetch('/api/latest-products-3').then((response) => response.json()).then((data) =>{
        setid_3(data.id);
        setname_3(data.name);
        setimage_3(data.get_image);
        setprice_3(data.price)
      
    })

  }, [])
  const handleClick = () => {
    setid(id + 1);
  }
  useEffect(() => {
    const requestOptions = {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({}),


    }
    fetch('/api/cart-create', requestOptions).then((response) => response.json()).then((data) => { setid(data.id), console.log(id)}

    );


  }, [])
  const handlepress_cart =() => {
    
    fetch('/api/cart-retrieve/'+ id).then((response) => response.json()).then((data) => {navigate('/cart/' + data.id), setcart(data.id), console.log(cart)}

    );

    
}
const handlepress_1 =() => {
    const requestOptions = {
        method: "POST",
        headers : {"Content-Type" : "application/json"},
        body: JSON.stringify({
            product_id: 2,
            quantity: 1,
        }),


    }
    fetch('/api/cart-retrieve/' + id + '/items', requestOptions).then((response) => response.json()).then((data) => {console.log(id)});

    
}
  
  return (
    <Routes>
        <Route path='/' element={
            <div>
                                
                <div class='header' id='fresh'>
                    <a href='#' class='logo'><img src= "static/images/logo.png"/></a>
                    <ul class='navmenu'>
                        <li><Link to={`/`}><a>Home</a></Link></li>
                        <li><Link to={`catalog/`}><a href='#'>Products</a></Link></li>
                        <li><Link to={'aboutus/'}><a>About Us</a></Link></li>
                        <li><a>Contact Us</a></li>
                      
                        

                    </ul> 
                    <div class='nav-icon'>
                        <a><i class='bx bx-search-alt-2'></i></a>
                        <a><i class='bx bx-user-circle' ></i></a>
                        <a onClick={handlepress_cart}><i class='bx bx-cart' ></i></a>
                        <a><div class='bx bx-menu' id='menu-icon'></div></a>
                    </div>

                </div>
                <section className='main-home'>
                    <div className='main-text'>
                        <h5>Shop our Collection</h5>
                        <h1>Effortless Style.  <br/>Endless Choices.</h1>
                        <p>Elevate your style game with our carefully curated collection of fashion-forward pieces.</p>
                        <a href='#' className='main-btn'>Shop Now <i className='bx bx-right-arrow-alt' ></i> </a>
                    </div>
                    <div className='down-arrow'>
                        <a href='#latest' className='down'><i className='bx bx-down-arrow-alt' ></i></a>
                    </div>
                </section>
                <section className='trending-product' id='#latest'>
                    <div className='center-text'>
                        <h2>Our Latest <span>Products</span></h2> 

                    </div>
                    <div className='products'>
                        <div className='row'>
                            <Link to={`/product/${id_1}`}><img src={image_1}/></Link>
                            <div className='product-text'>
                                <h5>Sale</h5>

                            </div>
                            <div className='price'>
                            <h4>{name_1}</h4>
                                <p>${price_1}</p>
                            </div>
                            
                        </div>
                        <div className='row'>
                            <Link to={`/product/${id_2}`}><img src={image_2}/></Link>
                            <div className='product-text'>
                                <h5>Sale</h5>

                            </div>
                            <div className='price'>
                                <h4>{name_2}</h4>
                                <p>${price_2}</p>
                            </div>
                            
                        </div>
                        <div className='row'>
                            <Link to={`/product/${id_3}`}><img src={image_3}/></Link>
                            <div className='product-text'>
                                <h5>Sale</h5>

                            </div>
                            <div className='price'>
                                <h4>{name_3}</h4>
                                <p>${price_3}</p>
                            </div>
                            
                        </div>


                    </div>

                </section>
                <section className='contact'>
                    <div className='contact-info'>
                        <div className='first-info'>
                            <img src= 'static/images/logo.png'/>
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
        }/>
        <Route path = 'product/:id' element={<Items prop1={id}/>}/>
        <Route path = 'cart/:code' element={<Cart prop1={id}/>}/>
        <Route path='catalog/' element={<Catalog prop1={id}/>}/>
        <Route path='catalogs/:slug' element={<Catalogs prop1={id}/>}/>
        <Route path='checkout/:val' element={<Checkout prop1={id}/>}/>
        <Route path='aboutus/' element={<AboutUs prop1={id}/>}/>
    </Routes>
  )
}

export default HomePage