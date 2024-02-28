import React from 'react';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPiggyBank, faWallet, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import './Style.css';


function LandingPage() {
  return (
    <div>
     

      <div id="home" className="container-fluid text-center content-section">
        <h1 className="display-3 mb-3 animate__animated animate__fadeInUp"><strong>WELCOME TO</strong></h1>
        <h1 className="display-4 fw-bold  animate__animated animate__fadeInUp">MAVERICK BANK</h1>
        <p className="lead mt-3 animate__animated animate__fadeInUp">Your Trusted Partner in Financial Success</p>
      </div>

      <section id="pic-car">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 block-element ">
              <FontAwesomeIcon icon={faPiggyBank} className="fa-3x icon" />
              <h3>Easy to use.</h3>
              <p>Seamlessly manage your finances with our intuitive interface at EasyBank. Simplify your banking experience today.</p>
            </div>
            <div className="col-lg-4 block-element">
              <FontAwesomeIcon icon={faWallet} className="fa-3x icon" />
              <h3>Loans</h3>
              <p>Unlock your aspirations with our flexible loan solutions tailored to your needs. Achieve your goals with our hassle-free loan process.</p>
            </div>
            <div className="col-lg-4 block-element">
              <FontAwesomeIcon icon={faCreditCard} className="fa-3x icon" />
              <h3>Easy Transactions</h3>
              <p>Experience smooth and secure transactions with our user-friendly platform. Simplify your financial interactions with just a few clicks.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <h2>Enjoy swift and secure money transfers at your fingertips, with our intuitive banking platform designed for effortless transactions.</h2>
              <img className="d-block w-100" src="https://media.istockphoto.com/id/1370840294/vector/cartoon-money-payment-mobile-bank-electronic-transaction-transfer-money-via-online-mobile.jpg?s=612x612&w=0&k=20&c=FEHF_NosZ-3ZiUm5Y0VxXn2BfjocO8ieMq_SEeU9qQ0=" alt="dog-profile" />
            </div>
            <div className="carousel-item">
              <h2 className="testimonial-text">Secure hassle-free loans with competitive rates, tailored to meet your financial needs, empowering you to achieve your goals with confidence.</h2>
              <img className="d-block w-100" src="https://media.istockphoto.com/id/1333110055/video/female-student-getting-online-loan-offer.jpg?s=640x640&k=20&c=JNb7RESLv6hEgJMY0vpqSMFOptLO4Qg5aTCQmv31lm0=" alt="lady-profile" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </section>

      <section id="login-signup" className="content-section">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <h2>Login</h2>
            <p>Already have an account? Log in here.</p>
            <a href="/login.html" className="btn btn-primary btn-lg">Login</a>
          </div>
          <div className="col-md-6 text-center">
            <h2>Don't have an account yet?</h2>
            <p>Sign up now to get started!</p>
            <a href="/register.html" className="btn btn-success btn-lg">Sign Up</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
