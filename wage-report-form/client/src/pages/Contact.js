import React, { useEffect } from "react";
import "./ContactPage.css";

function ContactPage() {
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
          src="https://c.files.bbci.co.uk/D581/production/_111775645_swahili1.jpg"
          alt="Image 1"
          className="active"
        />
        <img
          src="https://hakicommunity.org/wp-content/uploads/2020/03/Gallery-Photo-11.png"
          alt="Image 2"
        />
        <img
          src="https://cdn.standardmedia.co.ke/images/wysiwyg/images/QHfgrvTvJAKaZT59BAyZOkNCm4zUAoDgETn3Kz1B.jpg"
          alt="Image 3"
        />
      </div>

      <h1>Contact Us</h1>
      <span>
        We'd love to hear from you! Whether you have questions, feedback, or want
        to learn more about wage transparency in East Africa, the HakiPay team is
        here to help.
      </span>

      <h2>📬 General Inquiries</h2>
      <p>Email: info@hakipay.org</p>

      <h2>📍 Our Office</h2>
      <p>Dar Es Salaam, Tanzania</p>
      <p>(open by appointment only)</p>

      <h2>📱 Follow Us</h2>
      <p>Instagram: @hakipay</p>
      <p>X (Twitter): @hakipay</p>
      <p>LinkedIn: HakiPay</p>

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

export default ContactPage;
