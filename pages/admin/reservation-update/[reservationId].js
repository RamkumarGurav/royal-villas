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
import Head from "next/head";

const UpdateReservation = ({ initialData }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();
  const { reservationId } = router.query;

  // const fetcherReservations = async () => {
  //   const jwt = Cookies.get("jwt");
  //   const instance = axios.create({
  //     withCredentials: true, //adding cookies
  //   });

  //   instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

  //   const res = await instance.get(
  //     `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-reservations/${reservationId}`
  //   );

  //   return res.data;
  // };
  // const {
  //   data: rData,
  //   isLoading: rIsLoading,
  //   isError: rIsError,
  //   error: rError,
  //   refetch: refetchR,
  // } = useQuery("reservaion", fetcherReservations, {
  //   keepPreviousData: true,
  //   onSuccess: (data) => {},
  //   onError: (err) => {
  //     console.log(err.response.data.message);
  //   },
  // });

  const initialValues = {
    name: initialData?.data.villaReservation.name,
    email: initialData?.data.villaReservation.email,
    phone: initialData?.data.villaReservation.phone,
    rooms: initialData?.data.villaReservation.rooms,
    checkInDate: initialData?.data.villaReservation.checkInDate.slice(0, 10),
    checkOutDate: initialData?.data.villaReservation.checkOutDate.slice(0, 10),
  };

  const [formValue, setFormValue] = useState(initialValues);
  const { name, email, phone, rooms, checkInDate, checkOutDate } = formValue;

  useEffect(() => {
    setFormValue({
      name: initialData?.data.villaReservation.name,
      email: initialData?.data.villaReservation.email,
      phone: initialData?.data.villaReservation.phone,
      rooms: initialData?.data.villaReservation.rooms,
      checkInDate: initialData?.data.villaReservation.checkInDate.slice(0, 10),
      checkOutDate: initialData?.data.villaReservation.checkOutDate.slice(
        0,
        10
      ),
    });
  }, [initialData, setFormValue]);

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const fetcherRegister = async (formValue) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.patch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-reservations/${reservationId}`,
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
    mutateRegister(formValue);
  };

  return (
    <Layout>
       <Head>
        <title>Update Reservation | RoyalVillas.com</title>
      </Head>
      <section id="bookings" className="py-10 min-h-[77vh]">
        <div>
          <h1 className="text-center text-green-700/80 font-bold text-[25px] sm:text-[40px]">
            Update Reservation
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
              <div className="flex items-center justify-end my-2">
                <button
                  type="submit"
                  className="active:scale-105 ease-in-out cg-safron h-cg-safron w-full text-white py-4 text-center poppins text-2xl uppercase flex items-center justify-center backdrop-blur-lg rounded-md"
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
  const { reservationId } = context.params;
  //in ssr or ssg we need to manually add the cookie in the headers ,cookie state is alreadey stored in browser can be accessed using 'context.req.cookies' method
  const { jwt } = context.req.cookies;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-reservations/${reservationId}`,
    {
      headers: { Cookie: `jwt=${jwt};` }, //'withCredentials:true' doesnt work inside getServerSideProps
    }
  );
  const data = res.data;

  // Pass data to the page via props
  return { props: { initialData: data } };
}
