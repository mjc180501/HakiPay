import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
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
                <a href="http://localhost:5000" target="_blank" rel="noopener noreferrer">
                Personal Financial Calculator
                </a>
              </div>

            </div>
            <Link to="/defining-the-problem">Defining the Problem</Link>
            <Link to="/solutions">Solution</Link>
            <Link to="/map">Wage Map</Link>
          </div>

      <h1>HakiPay</h1>

      <div className="banner">
        <img
          src="https://unsdg.un.org/sites/default/files/styles/hero_header_2xl_1x/public/2023-09/KJP_2.jpeg?itok=l3PFXAUL"
          alt="Image 1"
          className="active"
        />
        <img
          src="https://www.sotheycan.org/wp-content/uploads/2024/06/Blog-Feature-Image-Template-5.png"
          alt="Image 2"
        />
        <img
          src="https://www.aljazeera.com/wp-content/uploads/2022/04/2010-05-04T120000Z_231311732_GM1E65503PU01_RTRMADP_3_TANZANIA.jpg?resize=1800%2C1800"
          alt="Image 3"
        />
      </div>

      <h2>Our Mission</h2>
      <h3>At HakiPay, our mission is simple but powerful:</h3>
      <center>
        <i>
          <span>
            To bring wage transparency and fairness to every worker across East
            Africa.
          </span>
        </i>
      </center>

      <p>
        We believe that every person has the right to know whether they are
        being paid fairly for the work they do. Yet, in many industries across
        the region, pay information is shrouded in silence, leaving workers
        vulnerable to exploitation, underpayment, and inequality.
      </p>

      <center>
        <table>
            <tbody>
                <tr>
                <td>
                    <Link to="/defining-the-problem">
                    <div className="image-hover">
                        <img src="https://www.robertharding.com/watermark.php?type=preview&im=RM/RH/HORIZONTAL/357-1983" alt="Image 4"></img>
                        <div className="overlay-text">Defining the Problem</div>
                    </div>
                    </Link>
                </td>
                <td>
                    <Link to="/solutions">
                    <div class="image-hover">
                        <img src="https://www.globaltimes.cn/Portals/0/attachment/2022/2022-05-11/59b075b4-7964-4518-92dd-f53a445c70ac.jpeg" alt="Image 5"></img>
                        <div class="overlay-text">Solution</div>
                    </div>
                    </Link>
                </td>
                <td>
                    <Link to="/contact">
                    <div className="image-hover">
                        <img src="https://untf.unwomen.org/sites/default/files/Field%20Office%20UNTF/Images/tanzania%20small%20Betty%20Mtewele%20-%20Vendor%20Mchikichini%20market.webp?la=en" alt="Image 6"></img>
                        <div className="overlay-text">Contact Us</div>
                    </div>
                    </Link>
                </td>
                </tr>
            </tbody>
        </table>

      </center>

      <center>
        <Link to="/wage-report">
            <button>Share your wages now</button>
        </Link>
      </center>

    </div>
  );
}

export default HomePage;
