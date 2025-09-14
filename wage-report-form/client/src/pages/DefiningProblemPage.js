import React, { useEffect } from "react";
import "./DefiningProblemPage.css";

function DefiningProblemPage() {
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
        <a href="/">Home</a>
        <a href="/about">About</a>
        <div className="dropdown">
          <button className="dropbtn">Services ▾</button>
          <div className="dropdown-content">
            <a href="/documents">Share your wages now</a>
            <a href="/contact">Contact Us</a>
          </div>
        </div>
        <a href="/definingtheproblem">Defining the Problem</a>
        <a href="/solutions">Solution</a>
      </div>

      <div className="banner">
        <img
          src="https://www.brookings.edu/wp-content/uploads/2018/12/Global_Factory_Workers_Rwanda.jpg"
          alt="Image 1"
          className="active"
        />
        <img
          src="https://c.files.bbci.co.uk/D581/production/_111775645_swahili1.jpg"
          alt="Image 2"
        />
        <img
          src="https://live.staticflickr.com/8122/8671574915_eeeb3395b1_z.jpg"
          alt="Image 3"
        />
      </div>

      <h1>Defining the Problem</h1>
      <p>
        In many sectors across East Africa, conversations around pay remain taboo,
        and wage data is kept behind closed doors. This lack of transparency leaves
        countless workers—especially women, youth, and those in informal or low-wage
        jobs—vulnerable to unfair compensation, discrimination, and exploitation.
        Without access to reliable information on industry standards or what peers
        in similar roles earn, workers are left in the dark about their own value.
        This systemic opacity not only reinforces income inequality but also prevents
        meaningful progress toward economic justice. HakiPay seeks to break this
        silence and bridge the information gap by making wage data accessible,
        anonymous, and community-driven.
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

export default DefiningProblemPage;
