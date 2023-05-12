import React from 'react'
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import { useParams, withRouter, useNavigate } from 'react-router-dom';
const AboutUs = ({prop1}) => {
    const navigate = useNavigate();
    const handlepress_cart =() => {

        fetch('/api/cart-retrieve/'+ prop1).then((response) => response.json()).then((data) => {navigate('/cart/' + data.id), setcart(data.id), console.log(cart)}

        );

        
    }
  return (

    <div className='about-bod'>
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
        <div className='about-section'>
            <div className='inner-container'>
                <h1>About Us</h1>
                <p className='text-about'>
                    Welcome to our ecommerce website, your ultimate destination for all things hype!
                    At our store, we are passionate about bringing you the most coveted and trendy brands in the market. From streetwear to luxury fashion, we have everything you need to elevate your style game. Our collection is carefully curated to offer you a unique shopping experience, with a focus on quality, exclusivity, and style.
                    We understand that fashion is more than just clothes; it's an expression of your personality and individuality. That's why we strive to offer a diverse range of products that cater to different styles, tastes, and preferences. From bold and statement-making pieces to timeless and classic designs, we have something for everyone.
                    We are committed to providing our customers with a seamless and enjoyable shopping experience. Our website is designed to be user-friendly and easy to navigate, so you can find what you're looking for quickly and easily. We also offer a range of payment and shipping options to make your shopping experience as hassle-free as possible.
                    We value our customers and are committed to providing the best possible service. If you have any questions or feedback, our customer support team is always on hand to assist you. We also offer a hassle-free returns policy, so you can shop with confidence.
                    Thank you for choosing our ecommerce website as your go-to destination for all things hype. We look forward to providing you with an exceptional shopping experience and helping you elevate your style game.
                </p>
                <div className='skills'>
                    <span>Efficient</span>
                    <span>Secure</span>
                    <span>User-Friendly</span>

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

export default AboutUs