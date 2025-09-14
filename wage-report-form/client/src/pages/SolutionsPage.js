import "./ContactPage.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function SolutionsPage() {
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

      <h1>💡 Our Solution: How HakiPay Makes a Difference</h1>
      <h2>1. Anonymous Wage Data Collection</h2>
      <p>
        We allow workers to securely and anonymously submit their wage
        information—position, industry, location, experience level—without fear
        of retaliation or exposure.
      </p>
      <h2>2. Community-Driven Transparency</h2>
      <p>
        By aggregating submitted data, HakiPay builds a dynamic, searchable wage
        database powered by real people—not corporations or government reports.
      </p>
      <h2>3. Regional & Role-Based Comparisons</h2>
      <p>
        Users can compare their pay to others in similar roles, industries, and
        locations—empowering them with insights to assess fairness and negotiate
        better.
      </p>
      <h2>4. Advocacy Through Data</h2>
      <p>
        We partner with labor organizations, journalists, and researchers to use
        our data in advocating for fair pay policies, gender equity, and
        improved labor protections.
      </p>
      <h2>5. Education & Empowerment</h2>
      <p>
        HakiPay provides resources and guides to help workers understand their
        rights, calculate their worth, and take steps toward financial equity.
      </p>

      <center>
        <table>
          <tbody>
            <tr>
              <td>
                <Link to="/defining-the-problem">
                  <div className="image-hover">
                    <img
                      src="https://www.robertharding.com/watermark.php?type=preview&im=RM/RH/HORIZONTAL/357-1983"
                      alt="Image 4"
                    />
                    <div className="overlay-text">Defining the Problem</div>
                  </div>
                </Link>
              </td>
              <td>
                <Link to="/solutions">
                  <div className="image-hover">
                    <img
                      src="https://www.globaltimes.cn/Portals/0/attachment/2022/2022-05-11/59b075b4-7964-4518-92dd-f53a445c70ac.jpeg"
                      alt="Image 5"
                    />
                    <div className="overlay-text">Solution</div>
                  </div>
                </Link>
              </td>
              <td>
                <Link to="/contact">
                  <div className="image-hover">
                    <img
                      src="https://untf.unwomen.org/sites/default/files/Field%20Office%20UNTF/Images/tanzania%20small%20Betty%20Mtewele%20-%20Vendor%20Mchikichini%20market.webp?la=en"
                      alt="Image 6"
                    />
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

export default SolutionsPage;

