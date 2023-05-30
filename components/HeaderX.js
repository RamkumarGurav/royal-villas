import Link from "next/link";
import Image from "next/image";
import { BsFillPersonFill } from "react-icons/bs";
import { ImBlog } from "react-icons/im";

// import { GiHamburgerMenu, GiClose } from "react-icons/gi";
// import { BiClose, BiHamburgerMenu } from "react-icons/bi";
// import { AiClose, AiHamburgerMenu ,AiOutlineMenu} from "react-icons/ai";
import { HiMenu } from "react-icons/hi";
import { CgClose } from "react-icons/cg";
import { useState, useEffect } from "react";

import axios from "axios";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const HeaderX = ({ home }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const user = JSON.parse(localStorage.getItem("profile"));
  const [userInfo, setUserInfo] = useState({
    data: { user: { name: "Unknown" } },
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      if (JSON.parse(localStorage.getItem("profile"))) {
        const profile = JSON.parse(localStorage.getItem("profile"));

        Cookies.set("jwt", profile.token);
        Cookies.set("loggedIn", true);
        setIsLoggedIn(true);
        setUserInfo(profile);
      }
    }
  }, []);

  const fetcher = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/users/logout`
    );
    return data;
  };

  const onSuccess = () => {
    localStorage.removeItem("profile");
    Cookies.remove("loggedIn");
    Cookies.remove("jwt");
    setIsLoggedIn(false);
    toast.success("Logged out Successfully");
    router.push("/");
  };
  const onError = () => {
    toast.error("Logout failed, Something went wrong");
  };

  const { isLoading, isError, data, isFetching, refetch } = useQuery(
    "logout",
    fetcher,
    {
      enabled: false,
      onSuccess,
      onError,
    }
  );

  return (
    <header className="bgx-primary backdrop-blur-md shadow-md border-b-2 border-white/60 w-full relative z-[999] ">
      <div className="relative  px-[2vmax] lg:px-[4vmax]  flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-center ">
        <div className="flex py-10 bgx-primary   justify-between items-center  z-[500] ">
          <div className="flex justify-between items-center gap-12 ">
            <Link
              href="/"
              className="no-underline merriweather lato text-4xl  flex items-center rounded-2xl px-2  text-[#fafafa] "
            >
              RoyalVillas
            </Link>
          </div>

          {open ? (
            <CgClose
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          ) : (
            <HiMenu
              size={30}
              color={"white"}
              onClick={handleOpen}
              className="visible lg:hidden cursor-pointer"
            />
          )}
        </div>

        <div
          className={`flex pb-5 pl-6 pt-5  bgx-primary w-full text-white duration-500 ease-in-out  flex-col items-start gap-12 absolute lg:static  ${
            !open
              ? "top-[-500%] left-0  items-start w-full shadow-md gap-8"
              : "top-28  left-0"
          } lg:flex-row lg:justify-between lg:items-center  lg:w-fit lg:p-0 lg:shadow-none z-[200]`}
        >
          <span className="text-white text-4xl uppercase mr-20">
            Admin: {userInfo?.data.user.name}
          </span>
          <Link
            href={"/"}
            className="no-underline para navlink relative text-white hover:text-gray-50 duration-300 "
          >
            Home
          </Link>
          <Link
            href={"/admin/dashboard"}
            className="no-underline para navlink relative text-white hover:text-gray-50 duration-300 "
          >
            Reservations
          </Link>
          <Link
            href={"/admin/dashboard/manage-package-bookings"}
            className="no-underline para navlink relative text-white hover:text-gray-50 duration-300 "
          >
            Bookings
          </Link>

          {isLoggedIn && (
            <div className="flex flex-col items-start lg:flex-row lg:items-center gap-4">
              <button
                onClick={refetch}
                className="para  text-[#fff] duration-300 border-2 border-gray-50 px-2 py-1 rounded-2xl hover:bg-[#fff] hover:text-[#ffa600]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderX;
