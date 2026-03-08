import React, { useEffect, useState } from 'react';
import './Home.css'; // Keep this for any external styles
import Three from '../../Three.js/Three';
import Sections from './Section';

const Home = () => {
  // useEffect(() => {
  //   const css = `
  //     .impact {
  //       padding: 80px 10%;
  //       text-align: center;
  //       background: #fafafa;
  //     }
  //     .impact h2 {
  //       font-size: 36px;
  //       margin-bottom: 40px;
  //     }
  //     .impact-grid {
  //       display: grid;
  //       grid-template-columns: repeat(4, 1fr);
  //       gap: 20px;
  //     }
  //     .impact-card {
  //       background: white;
  //       padding: 30px;
  //       border-radius: 10px;
  //       box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  //     }
  //     .impact-card h3 {
  //       color: #e63946;
  //       font-size: 28px;
  //     }
  //     .help {
  //       padding: 80px 10%;
  //       text-align: center;
  //     }
  //     .help h2 {
  //       font-size: 36px;
  //       margin-bottom: 40px;
  //     }
  //     .help-grid {
  //       display: grid;
  //       grid-template-columns: repeat(3, 1fr);
  //       gap: 20px;
  //       max-width: 800px;
  //       margin: 0 auto;
  //     }
  //     .help-grid > div {
  //       padding: 30px;
  //       background: white;
  //       border-radius: 10px;
  //       box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  //     }
  //     .donate-cta {
  //       padding: 80px 10%;
  //       text-align: center;
  //       background: linear-gradient(135deg, #e63946, #f77f00);
  //       color: white;
  //     }
  //     .donate-cta h2 {
  //       font-size: 36px;
  //       margin-bottom: 20px;
  //     }
  //     .donate-cta p {
  //       font-size: 20px;
  //       margin-bottom: 30px;
  //     }
  //     .donate-cta button {
  //       background: white;
  //       color: #e63946;
  //       border: none;
  //       padding: 15px 40px;
  //       font-size: 18px;
  //       border-radius: 50px;
  //       cursor: pointer;
  //       font-weight: bold;
  //     }
  //     .donate-cta button:hover {
  //       transform: scale(1.05);
  //     }
  //   `;
  //   const style = document.createElement('style');
  //   style.textContent = css;
  //   document.head.appendChild(style);

  //   return () => {
  //     document.head.removeChild(style);
  //   };
  // }, []);

  // const stats = [
  //   { number: "10K+", label: "Children Helped" },
  //   { number: "$2M+", label: "Funds Raised" },
  //   { number: "50+", label: "Communities" },
  //   { number: "500+", label: "Volunteers" },
  // ];

  return (
    <>
      <Three />
      <Sections />
      {/* <section className="impact">
        <h2>Our Impact</h2>
        <div className="impact-grid">
          {stats.map((item, index) => (
            <div key={index} className="impact-card">
              <h3>{item.number}</h3>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="help">
        <h2>How You Can Help</h2>
        <div className="help-grid">
          <div>
            <h3>Donate</h3>
            <p>Your donations provide food and education.</p>
          </div>
          <div>
            <h3>Volunteer</h3>
            <p>Join our community and help make a difference.</p>
          </div>
          <div>
            <h3>Spread Awareness</h3>
            <p>Share our mission with your friends.</p>
          </div>
        </div>
      </section>

      <section className="donate-cta">
        <h2>Make a Difference Today</h2>
        <p>Your small act of kindness can change a life.</p>
        <button>Donate Now</button>
      </section> */}
    </>
  );
};

export default Home;
