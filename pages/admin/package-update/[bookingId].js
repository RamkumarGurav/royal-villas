// import dynamic from "next/dynamic";
// import UpdateReservation from "../../../clientPages/UpdateReservation";

// export default dynamic(() => Promise.resolve(UpdateReservation), {
//   ssr: false,
// });

import React, { useEffect, useState } from "react";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
import { Button, Box, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { toast } from "react-toastify";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import ButtonLoader from "../../../components/ButtonLoader";
import { useQuery, useMutation } from "react-query";
import { useRouter } from "next/router";
import Spinner from "@/components/Spinner";
import Error from "@/components/Error";
import Cookies from "js-cookie";
import Layout from "@/components/Layout";
import Link from "next/link";
import Head from "next/head";

const UpdateReservation = ({ initialData }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();
  const { bookingId } = router.query;

  const initialValues = {
    name: initialData?.data.villaPackageBooking.name,
    email: initialData?.data.villaPackageBooking.email,
    phone: initialData?.data.villaPackageBooking.phone,
    rooms: initialData?.data.villaPackageBooking.rooms,
    days: initialData?.data.villaPackageBooking.days,
    price: initialData?.data.villaPackageBooking.price,
    packageName: initialData?.data.villaPackageBooking.packageName,
    checkInDate: initialData?.data.villaPackageBooking.checkInDate.slice(0, 10),
    checkOutDate: initialData?.data.villaPackageBooking.checkOutDate.slice(
      0,
      10
    ),
    paymentInfo: {
      sessionId: initialData?.data.villaPackageBooking.paymentInfo.sessionId,
      status: initialData?.data.villaPackageBooking.paymentInfo.status,
    },
  };

  const [formValue, setFormValue] = useState(initialValues);
  // console.log(initialData?.data.villaPackageBooking.packageName);
  const [pStatus, setPStatus] = useState(
    initialData?.data.villaPackageBooking.paymentInfo.status
  );
  const {
    name,
    email,
    phone,
    rooms,
    days,
    checkInDate,
    price,
    packageName,
    checkOutDate,
    paymentInfo,
  } = formValue;

  // useEffect(() => {
  //   setFormValue({
  //     name: initialData?.data.villaPackageBooking.name,
  //     email: initialData?.data.villaPackageBooking.email,
  //     phone: initialData?.data.villaPackageBooking.phone,
  //     rooms: initialData?.data.villaPackageBooking.rooms,
  //     days: initialData?.data.villaPackageBooking.days,
  //     price: initialData?.data.villaPackageBooking.price,
  //     packangeName: initialData?.data.villaPackageBooking.packageName,
  //     checkInDate: initialData?.data.villaPackageBooking.checkInDate.slice(
  //       0,
  //       10
  //     ),
  //     checkOutDate: initialData?.data.villaPackageBooking.checkOutDate.slice(
  //       0,
  //       10
  //     ),
  //     paymentInfo: {
  //       sessionId: initialData?.data.villaPackageBooking.paymentInfo.sessionId,
  //       status: initialData?.data.villaPackageBooking.paymentInfo.status,
  //     },
  //   });
  // }, [initialData, setFormValue]);

  // useEffect(() => {
  //   if (rooms && packageName) {
  //     setFormValue({
  //       ...formValue,
  //       price:
  //         Number(packageName.split("-")[0]) +
  //         Number(packageName.split("-")[0]) * (rooms - 1) * 1,
  //       days: Number(packageName.split("-")[1]),
  //     });
  //   }
  //   if (packageName && checkInDate && rooms) {
  //     let time =
  //       new Date(checkInDate).getTime() +
  //       Number(packageName.split("-")[1] - 1) * 24 * 60 * 60 * 1000;
  //     setFormValue({
  //       ...formValue,
  //       price:
  //         Number(packageName.split("-")[0]) +
  //         Number(packageName.split("-")[0]) * (rooms - 1) * 1,
  //       days: Number(packageName.split("-")[1]),
  //       checkOutDate: new Date(time).toISOString().slice(0, 10),
  //     });
  //   }
  // }, [rooms, packageName, checkInDate, setFormValue]);

  const handleChange = (e) => {
    setFormValue({
      ...formValue,
      [e.target.name]: e.target.value,
      paymentInfo: { ...paymentInfo },
    });
  };

  const fetcherRegister = async (formValue) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-package-bookings/${bookingId}`,
      formValue
    );

    return res.data;
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
      toast.success("succefully Updated the Booking");
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
    if (formValue.phone.toString().length !== 10) {
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
    <Layout>
      <Head>
        <title>Update Booking | RoyalVillas.com</title>
      </Head>
      <section id="bookings" className="py-10 min-h-[77vh]">
        <div className="">
          <h1 className="text-center text-yellow-500 font-bold text-[25px] sm:text-[40px]">
            Update Villa Package
          </h1>
        </div>
        <div className="bookings-container">
          <div className="bookings-right">
            <form onSubmit={handleSubmit}>
              <div className="w-[100%] grid sm:grid-cols-2 gap-4 md:gap-x-10">
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

                <div className="">
                  <label htmlFor="packageName" className="para">
                    Package
                  </label>
                  <select
                    id="packageName"
                    name="packageName"
                    value={packageName}
                    onChange={handleChange}
                    required
                    className="shadow  border  rounded w-full py-4 px-3 text-gray-700  para leading-tight focus:outline-none focus:shadow-outline focus:border-yellow-400 "
                    // className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  >
                    <option value="">Select a Villa Package</option>
                    <option value="4999-3-standard-villa">
                      Standard Villa
                    </option>
                    <option value="6999-5-superior-villa">
                      Superior Villa
                    </option>
                    <option value="8999-7-ultra-villa">Ultra Villa</option>
                    <option value="10999-9-galactic-villa">
                      Galactic Villa
                    </option>
                    <option value="12999-11-infinity-villa">
                      Infinity Villa
                    </option>
                    <option value="13999-20-cosmic-villa">Cosmic Villa</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="rooms" className="para">
                    Rooms (max 3 persons per room)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    name="rooms"
                    id="rooms"
                    placeholder="Enter Number of Rooms"
                    onChange={handleChange}
                    value={rooms}
                    required
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="price" className="para">
                    Price
                  </label>
                  <input
                    type="number"
                    min="4999"
                    name="price"
                    id="price"
                    placeholder="Price"
                    onChange={handleChange}
                    value={price}
                    required
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="checkInDate" className="para">
                    Check-In Date
                  </label>
                  <input
                    type="date"
                    id="checkInDate"
                    // min={`${new Date().toISOString().slice(0, 10)}`}
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
                    // min={`${new Date().toISOString().slice(0, 10)}`}
                    name="checkOutDate"
                    value={checkOutDate}
                    onChange={handleChange}
                    required
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="days" className="para">
                    Days
                  </label>
                  <input
                    type="number"
                    min="3"
                    name="days"
                    id="days"
                    placeholder="Days"
                    onChange={handleChange}
                    value={days}
                    required
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
                <div>
                  <label htmlFor="pStatus" className="para">
                    Payment Status
                  </label>
                  <input
                    type="text"
                    name="pStatus"
                    id="pStatus"
                    placeholder="Enter Payment Status"
                    value={pStatus}
                    required
                    onChange={(e) => setPStatus(e.target.value)}
                    className="shadow appearance-none border para  rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border focus:border-yellow-400 "
                  />
                </div>
              </div>
              <div className="flex items-center sm:justify-end justify-center my-10">
                <button
                  type="submit"
                  className="active:scale-105 ease-in-out cg-safron h-cg-safron w-[300px]  text-white py-4 text-center poppins text-2xl uppercase backdrop-blur-lg rounded-md flex items-center justify-center"
                >
                  Update
                  <div className="flex flex-col justify-end  items-center">
                    {" "}
                    {btnLoading ? <ButtonLoader /> : null}
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default UpdateReservation;

export async function getServerSideProps(context) {
  const { bookingId } = context.params;
  //in ssr or ssg we need to manually add the cookie in the headers ,cookie state is alreadey stored in browser can be accessed using 'context.req.cookies' method
  const { jwt } = context.req.cookies;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-package-bookings/${bookingId}`,
    {
      headers: { Cookie: `jwt=${jwt};` }, //'withCredentials:true' doesnt work inside getServerSideProps
    }
  );
  const data = res.data;

  // Pass data to the page via props
  return { props: { initialData: data } };
}
