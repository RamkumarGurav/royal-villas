import React, { useEffect, useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("profile")) &&
      Cookies.get("loggedIn")
    ) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleHam = function () {
    setIsOpen(!isOpen);
  };
  return (
    <section id="header">
      <div className={`nav-bar ${isOpen ? "active" : " "}`}>
        <nav>
          <ul>
            <li>
              <Link href="#header" className="no-underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/buy-packages" className="no-underline">
                Buy Villa Packages
              </Link>
            </li>
            <li>
              <Link href="#bookings" className="no-underline">
                Reservation
              </Link>
            </li>
            <li>
              <Link href="#rates" className="no-underline">
                Prices
              </Link>
            </li>
            <li>
              <Link href="#events" className="no-underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="#features " className="no-underline">
                Features
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link href="/admin/dashboard" className="no-underline">
                  Admin Dashboard
                </Link>{" "}
              </li>
            ) : (
              <li>
                <Link href="/login" className="no-underline">
                  Admin Dashboard
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
      <div className="ham-div relative" onClick={handleHam}>
        <div className={`line line-1 ${isOpen ? "line-1-active" : " "}`}></div>
        <div className="line line-2"></div>
        <div className={`line line-3 ${isOpen ? "line-3-active" : " "}`}></div>
        <div className="line line-4"></div>
        <div className={`line line-5 ${isOpen ? "line-5-active" : " "}`}></div>
      </div>

      <div className="hero">
        <div className="hero-container">
          <h1 className="title-xl">RELAX YOUR SOUL</h1>
          <h3 className="sub-title-para">
            The team of Royal Villas welcomes you. Start relaxing your soul and
            enjoy your stay.
          </h3>
          <Link className="more-bbtn text-white no-underline" href={"#sliderX"}>
            Discover More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Header;
