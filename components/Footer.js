import Link from "next/link";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsInstagram,
  BsGithub,
} from "react-icons/bs";

import { AiFillLinkedin } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className=" py-5 pb-10 gap-2 flex flex-col justify-center bg-green-800 items-center ">
      <style jsx>
        {`
          footer {
            background: linear-gradient(
                rgba(0, 0, 0, 0.8) 0%,
                rgba(2, 5, 0, 0.8) 100%
              ),
              url("/images/Gallery/gallery-2.jpg") no-repeat center;
            background-size: cover;
          }
        `}
      </style>

      {/* <Newslatter /> */}
      <div
        className=" mt-10 px-12 flex flex-col gap-3  text-center w-full lg:flex-row justify-between items-center"
        id="footer"
      >
        <p className="text-2xl text-yellow-100  w-[300px]">
          All rights reserved 2023
        </p>
        <div className="flex justify-between w-[300px] items-center">
          <a href="https://www.facebook.com/ram.gurav.79">
            <BsFacebook
              size={20}
              className="text-yellow-100 hover:text-yellow-500"
            />
          </a>
          <a href="https://twitter.com/Raamathecoder">
            <BsTwitter
              size={20}
              className="text-yellow-100 hover:text-yellow-500"
            />
          </a>
          <a href="https://www.linkedin.com/in/ramkumar-gurav-645585250">
            <AiFillLinkedin
              size={20}
              className="text-yellow-100 hover:text-yellow-500"
            />
          </a>
          <a href="https://www.instagram.com/ram.gurav">
            <RiInstagramFill
              size={20}
              className="text-yellow-100 hover:text-yellow-500"
            />
          </a>
          <a href="https://github.com/RamkumarGurav">
            <BsGithub
              size={20}
              className="text-yellow-100 hover:text-yellow-500"
            />
          </a>
        </div>
        <p className="text-2xl text-yellow-100 w-[300px]">
          Designed by: Ramkumar Gurav
        </p>
      </div>
    </footer>
  );
};

export default Footer;
