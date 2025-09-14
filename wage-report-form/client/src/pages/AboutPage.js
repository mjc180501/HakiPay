import React, { useEffect } from "react";
import "./ContactPage.css";
import { Link } from "react-router-dom";

function AboutPage() {
  useEffect(() => {
    const images = document.querySelectorAll(".banner img");
    let current = 0;
    const showNextImage = () => {
      images[current].classList.remove("active");
      current = (current + 1) % images.length;
      images[current].classList.add("active");
    };
    const interval = setInterval(showNextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="navbar">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <div className="dropdown">
          <button className="dropbtn">Services ▾</button>
          <div className="dropdown-content">
            <Link to="/wage-report">Share your wages now</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
        <Link to="/defining-the-problem">Defining the Problem</Link>
        <Link to="/solutions">Solution</Link>
        <Link to="/map">Wage Map</Link>
      </div>

      <div className="banner">
        <img
          src="https://hakicommunity.org/wp-content/uploads/2020/03/Gallery-Photo-11.png"
          alt="Image 1"
          className="active"
        />
        <img
          src="https://c.files.bbci.co.uk/D581/production/_111775645_swahili1.jpg"
          alt="Image 2"
        />
        <img
          src="https://cdn.standardmedia.co.ke/images/wysiwyg/images/QHfgrvTvJAKaZT59BAyZOkNCm4zUAoDgETn3Kz1B.jpg"
          alt="Image 3"
        />
      </div>

      <h1>About</h1>
      <p>
        HakiPay is a platform built on the belief that transparency is the first
        step toward justice. We collect anonymous wage data from workers across
        East Africa and compare it to fair market standards, helping individuals
        understand their true earning potential. By shedding light on pay
        disparities and giving workers access to real, community-driven wage
        information, we aim to challenge inequality and empower people to
        advocate for fairer compensation. Our vision is a future where wage
        transparency is the norm — not the exception — and where every worker,
        regardless of role or industry, knows their worth and is paid
        accordingly.
      </p>

      <center>
        <table>
          <tbody>
            <tr>
              <td>
                <a href="/definingtheproblem">
                  <div className="image-hover">
                    <img
                      src="https://www.robertharding.com/watermark.php?type=preview&im=RM/RH/HORIZONTAL/357-1983"
                      alt="Image 4"
                    />
                    <div className="overlay-text">Defining the Problem</div>
                  </div>
                </a>
              </td>
              <td>
                <a href="/solutions">
                  <div className="image-hover">
                    <img
                      src="https://www.globaltimes.cn/Portals/0/attachment/2022/2022-05-11/59b075b4-7964-4518-92dd-f53a445c70ac.jpeg"
                      alt="Image 5"
                    />
                    <div className="overlay-text">Solution</div>
                  </div>
                </a>
              </td>
              <td>
                <a href="/contact">
                  <div className="image-hover">
                    <img
                      src="https://untf.unwomen.org/sites/default/files/Field%20Office%20UNTF/Images/tanzania%20small%20Betty%20Mtewele%20-%20Vendor%20Mchikichini%20market.webp?la=en"
                      alt="Image 6"
                    />
                    <div className="overlay-text">Contact Us</div>
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </center>

      <center>
        <a href="/documents">
          <button>Share your wages now</button>
        </a>
      </center>
    </div>
  );
}

export default AboutPage;
