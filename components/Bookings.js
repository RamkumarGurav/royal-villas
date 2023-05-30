import React, { useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Button, Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import ButtonLoader from "./ButtonLoader";
import { useMutation } from "react-query";

const Bookings = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [bookingMsg, setBookingMsg] = useState(" ");
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    rooms: 1,
    checkInDate: "",
    checkOutDate: "",
  };

  const [formValue, setFormValue] = useState(initialValues);
  const { name, email, phone, rooms, checkInDate, checkOutDate } = formValue;

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const fetcherRegister = async (formValue) => {
    return await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-reservations`,
      formValue,
      {
        withCredentials: true,
      }
    );
  };
  const {
    mutate: mutateRegister,
    data: dataRegister,
    isError: isErrorRegister,
    isLoading: isLoadingRegister,
    error: errorRegister,
  } = useMutation(fetcherRegister, {
    onSuccess: (data) => {
      setBtnLoading(false);
      setFormValue(initialValues);
      toast.success("Your Reservation is Successfull ,Check Your Email");
    },
    onError: (err) => {
      setBtnLoading(false);
      console.log(err.response.data.message);
      toast.error("Something Went Wrong!..Try Again..");
    },
  }); //here mutate is the function that passes input data to fetcher function directly
  const handleSubmit = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    if (phone.length !== 10) {
      setBtnLoading(false);
      return toast.error("Phone Number must have 10 digits");
    }
    if (
      new Date(checkInDate).getTime() * 1 >
      new Date(checkOutDate).getTime() * 1
    ) {
      setBtnLoading(false);
      return toast.error("Checkout Date must be greater than checkin date");
    }
    // console.log(formValue);
    mutateRegister(formValue);
  };

  return (
    <section id="bookings" className="py-10">
      <div>
        <h1 className="text-center text-green-700/80 font-bold text-[25px] sm:text-[40px]">
          Make a Reservation
        </h1>
      </div>
      <div className="bookings-container">
        {/* <div className="bookings-left w-[90%]">
          <div>
            <h2 className="sub-title">Discover Serenity</h2>
          </div>
          <div>
            <p className="para">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              perferendis numquam, ipsam cupiditate at molestias. Sequi
              similique, molestiae nostrum dicta, unde modi libero fugiat
              suscipit, labore neque dolorum quos iste!
            </p>
          </div>
        </div> */}

        <div className="bookings-right">
          <form
            className="w-[100%] grid sm:grid-cols-2 gap-5 md:gap-x-[50px]"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="name" className="para">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name"
                value={name}
                required
                onChange={handleChange}
                className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div>
              <label htmlFor="email" className="para">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                required
                onChange={handleChange}
                className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div>
              <label htmlFor="phone" className="para">
                Phone
              </label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder="Enter Your Phone Number"
                value={phone}
                required
                onChange={handleChange}
                className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div>
              <label htmlFor="rooms" className="para">
                Rooms (max 3 persons per room)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                id="rooms"
                name="rooms"
                placeholder="Enter Number of Rooms"
                value={rooms}
                required
                onChange={handleChange}
                className="shadow  border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div>
              <label htmlFor="checkInDate" className="para">
                Check-In Date
              </label>
              <input
                type="date"
                id="checkInDate"
                min={`${new Date().toISOString().slice(0, 10)}`}
                name="checkInDate"
                placeholder="Select Check-in Date"
                value={checkInDate}
                required
                onChange={handleChange}
                className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div>
              <label htmlFor="checkOutDate" className="para">
                Check-Out Date
              </label>
              <input
                type="date"
                id="checkOutDate"
                min={`${new Date().toISOString().slice(0, 10)}`}
                name="checkOutDate"
                placeholder="Select Check-out Date"
                value={checkOutDate}
                required
                onChange={handleChange}
                className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
              />
            </div>
            <div></div>
            <div className="flex items-center sm:justify-end justify-center my-10">
              <button
                type="submit"
                className="relative active:scale-105 ease-in-out cg-safron h-cg-safron w-[300px]  text-white py-4 text-center poppins text-2xl uppercase backdrop-blur-lg rounded-md flex items-center justify-center"
              >
                Make a Reservation
                <div className="absolute right-[50px] top-8 flex flex-col justify-center  items-center">
                  {" "}
                  {btnLoading ? <ButtonLoader /> : null}
                </div>
              </button>
            </div>
          </form>
          <div className="bookings-right-bottom small-txt my-10">
            <p> Reservation Hotline : +91 1800-8965-6547 </p>
            <p>Reservation Assistance Available 24 Hours</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Bookings;
