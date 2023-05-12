import React, { useState, useEffect } from 'react'
import {render} from "react-dom";
import { withRouter, useNavigate, BrowserRouter, Routes, Route, Link, Redirect } from 'react-router-dom';


const Catalog = ({prop1}) => {
  const navigate = useNavigate();
  const[image_1, setimage_1] = useState();
  const[image_2, setimage_2] = useState();
  const[image_3, setimage_3] = useState();
  const[name_1, setname_1] = useState();
  const[name_2, setname_2] = useState();
  const[name_3, setname_3] = useState();
  const[id_1, setid_1] = useState();
  const[id_2, setid_2] = useState();
  const[id_3, setid_3] = useState();


  useEffect(() =>{
    fetch('/api/latest-products-1').then((response) => response.json()).then((data) =>{
        setid_1(data.id);
        setimage_1(data.get_image);
        setname_1(data.name);
       
      
    })

  }, []);
  useEffect(() =>{
    fetch('/api/latest-products-2').then((response) => response.json()).then((data) =>{
        setimage_2(data.get_image);
        setname_2(data.name);
        setid_2(data.id);
    })

  }, []);
  useEffect(() =>{
    fetch('/api/latest-products-3').then((response) => response.json()).then((data) =>{
       
        setimage_3(data.get_image);
        setname_3(data.name);
        setid_3(data.id);
   
      
    })

  }, []);
  const press_1 =()=>{
    navigate('/catalogs/shirts')
  }
  const press_2 =()=>{
    navigate('/catalogs/trousers')
  }
  const press_3 =()=>{
    navigate('/catalogs/shoes')
  }
  const press_5 =()=>{
    navigate('/catalogs/accessories')
  }
  const press_4 = (val) =>{
    navigate('/product/' + val)
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
        <div class = "product-collection">
            <div class = "catalogcontainer">
                <div class = "product-collection-wrapper">
                    
                    <div class = "product-col-left flex">
                        <div class = "product-col-content">
                            
                            <h2 class = "md-title">Shoes</h2>
                            <p class = "text-light">New Shoes</p>
                            <button type = "button" class = "catalogbtn-dark" onClick={press_3}>Shop now</button>
                        </div>
                    </div>

                    
                    <div class = "product-col-right">
                        <div class = "product-col-r-top flex">
                            <div class = "product-col-content">
                                
                                <h2 class = "md-title">Shirts </h2>
                                <p class = "text-light">New Shirts</p>
                                <button type = "button" class = "catalogbtn-dark"onClick={press_1}>Shop now</button>
                            </div>
                        </div>

                        <div class = "product-col-r-bottom">
                            
                            <div class = "flex">
                                <div class = "product-col-content">
                                    
                                    <h2 class = "md-title">Accessories </h2>
                                    <p class = "text-light">New Accessories</p>
                                    <button type = "button" class = "catalogbtn-dark" onClick={press_5} >Shop now</button>
                                </div>
                            </div>
                            
                            <div class = "flex">
                                <div class = "product-col-content">
                                    
                                    <h2 class = "md-title">Bottoms</h2>
                                    <p class = "text-light">New Bottoms</p>
                                    <button type = "button" class = "catalogbtn-dark"onClick={press_2}>Shop now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='catalogproducts'>
            
            
            <div className='catalogcontainer'>
                <h1 className='lg-title'>
                    Our Products
                </h1>
                <p className='text-light'>We have a large collection of stuff</p>
                <div className='catalogproduct-items'>
                    <div className='catalogproduct'>
                        <div className='catalogproduct-content'>
                            <div className='catalogproduct-img'>
                                <img src={image_1}/>
                            </div>
                            <div className='catalogproduct-btns'>
                                <button type='button' className='catalogbtn-cart'>
                                    Add To Cart
                                    <span><i class='bx bx-cart-add'></i></span>
                                </button>
                                <button type='button' className='catalogbtn-buy' onClick={() => press_4(id_1)}>
                                    View Product
                                    <span><i class='bx bxs-shopping-bags' ></i></span>
                                </button>
                            </div>
                        </div>
                        <div className='catalogproduct-info'>
                            <div className='catalogproduct-info-top'>
                                <h2 className='sm-title'>
                                    Shirt
                                </h2>
                            </div>
                            <a href='#' className='catalogproduct-name'>{name_1}</a>
                            <p className='catalogproduct-price'>$150.00</p>
                            <p className='catalogproduct-price'>$150.00</p>
                        </div>

                    </div>
                    <div className='catalogproduct'>
                        <div className='catalogproduct-content'>
                            <div className='catalogproduct-img'>
                                <img src={image_3}/>
                            </div>
                            <div className='catalogproduct-btns'>
                                <button type='button' className='catalogbtn-cart'>
                                    Add To Cart
                                    <span><i class='bx bx-cart-add'></i></span>
                                </button>
                                <button type='button' className='catalogbtn-buy' onClick={() => press_4(id_3)}>
                                    View Product
                                    <span><i class='bx bxs-shopping-bags' ></i></span>
                                </button>
                            </div>
                        </div>
                        <div className='catalogproduct-info'>
                            <div className='catalogproduct-info-top'>
                                <h2 className='sm-title'>
                                    Lifestyle
                                </h2>
                            </div>
                            <a href='#' className='catalogproduct-name'>{name_3}</a>
                            <p className='catalogproduct-price'>$150.00</p>
                            <p className='catalogproduct-price'>$150.00</p>
                        </div>

                    </div>
                    <div className='catalogproduct'>
                        <div className='catalogproduct-content'>
                            <div className='catalogproduct-img'>
                                <img src={image_2}/>
                            </div>
                            <div className='catalogproduct-btns'>
                                <button type='button' className='catalogbtn-cart'>
                                    Add To Cart
                                    <span><i class='bx bx-cart-add'></i></span>
                                </button>
                                <button type='button' className='catalogbtn-buy' onClick={() => press_4(id_2)}>
                                    View Product
                                    <span><i class='bx bxs-shopping-bags' ></i></span>
                                </button>
                            </div>
                        </div>
                        <div className='catalogproduct-info'>
                            <div className='catalogproduct-info-top'>
                                <h2 className='sm-title'>
                                    Lifestyle
                                </h2>
                            </div>
                            <a href='#' className='catalogproduct-name'>{name_2}</a>
                            <p className='catalogproduct-price'>$150.00</p>
                            <p className='catalogproduct-price'>$150.00</p>
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

export default Catalog