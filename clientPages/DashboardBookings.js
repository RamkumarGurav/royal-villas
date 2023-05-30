import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { BsFillPersonFill, BsCreditCardFill } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
import { FaRupeeSign, FaGift, FaClock } from "react-icons/fa";
import ButtonLoader from "@/components/ButtonLoader";
import Pagination from "react-js-pagination";
import useSWRMutation from "swr/mutation";
import Cookies from "js-cookie";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import Layout from "@/components/Layout";
import Head from "next/head";

var bId;
const limit = 10;

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userInfo, setUserInfo] = useState(user);
  const [btnLoading, setBtnLoading] = useState(false);
  const [btnLoading2, setBtnLoading2] = useState(false);
  const [pageIndex2, setPageIndex2] = useState(1);

  //----------------Bookingss---------------------------------------

  const fetcherBookings = async (pageIndex) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-package-bookings?page=${pageIndex}&limit=${limit}`
    );

    return res.data;
  };
  const {
    data: bData,
    isLoading: bIsLoading,
    isError: bIsError,
    error: bError,
    refetch: refetchB,
  } = useQuery(
    ["manage-bookings", pageIndex2],
    () => fetcherBookings(pageIndex2),
    {
      keepPreviousData: true,
      onSuccess: (data) => {},
      onError: (err) => {
        console.log(err.response.data.message);
      },
    }
  );

  const setPageIndexHandler2 = (e) => {
    setPageIndex2(e);
  };

  const deleteFetcherB = async ([endpoint, xData], { arg: id }) => {
    //
    //passed arguemnt of trigger is available as "arg" inside an object which is the last element of array of arguements of deleteFetcher//we can get it as id usign alias name
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.delete(
      `${process.env.NEXT_PUBLIC_SERVER_URL}${endpoint}/${id}`
    );

    return res.data;
  };
  const {
    data: BDdataUpdate,
    error: BDErrorUpdate,
    isLoading: BDIsLoading,
    trigger: triggerBD,
  } = useSWRMutation(
    ["/villa-package-bookings", "abc"],
    // ([endpoint, xData]) => deleteFetcher(endpoint, xData)
    deleteFetcherB,
    {
      onSuccess: (data) => {
        setBtnLoading(false);
        refetchB();
        toast.success("Successfully Deleted the Villa Package Booking");
      },
      onError: (err) => {
        setBtnLoading(false);
        toast.error("Something Went Wrong!");
      },
    }
  );

  const handleDeleteB = (id) => {
    bId = id;
    setBtnLoading(true);
    setPageIndex2((prev) => prev);
    return triggerBD(id);
  };

  if (bError) return <Error />;

  if (!bData) return <Spinner />;

  const {
    resultsPerPage: resultsPerPage2,
    villaPackageBookingsCount,
    filteredVillaPackageBookingsCount,
  } = bData && bData?.data;

  return (
    <Layout>
      <section className="min-h-[77vh]">
        <Head>
          <title>Manage Villa Package Bookings | RoyalVillas.com</title>
        </Head>
        <section>
          <div className="flex flex-col  items-center py-5">
            <h1 className="text-center text-4xl  w-fit cg-safron text-white  px-6 rounded-lg py-2 my-5 ">
              Manage Pacakge Bookings
            </h1>
            <section
              id="qs-block"
              className="container mx-auto  py-10 px-2 lg:px-8"
            >
              {bData?.data.villaPackageBookings.length === 0 ? (
                <div className="flex justify-center items-center p-10 ">
                  <h1 className="text-xl text-gray-700">
                    No Reservations Found
                  </h1>
                </div>
              ) : (
                bData?.data.villaPackageBookings?.map((b, i) => {
                  return (
                    <section
                      key={i}
                      className="border-[1px] border-gray-900 shadow-md my-4"
                    >
                      <div className="cg-safron flex flex-col sm:flex-row sm:justify-between gap-4 sm:items-center px-6 py-4 ">
                        <div className="para flex justify-between items-center uppercase">
                          <FaGift size={20} className="mr-4" />
                          {b.packageName.split("-")[2]} Villa
                        </div>{" "}
                        <div className="para flex justify-between items-center uppercase">
                          <FaClock size={20} className="mr-4" />
                          {b.days} Days
                        </div>{" "}
                        <div className="para flex justify-between items-center">
                          <FaRupeeSign size={20} />
                          {b.price}
                        </div>
                        <div className="para flex justify-between items-center">
                          <BsCreditCardFill size={20} className="mr-2" />
                          {b.paymentInfo.status}
                        </div>
                      </div>
                      <div className="reservation-card para flex flex-col sm:flex-row  sm:items-center sm:justify-between gap-4 my-1 w-full  py-1 px-4">
                        <div>
                          <div className="flex items-center ">
                            <BsFillPersonFill color="gray" size={25} />{" "}
                            <span className="ml-4 text-gray-700">
                              {" "}
                              {b?.name}
                            </span>
                          </div>

                          <div className="flex items-center ">
                            <MdEmail color="gray" size={25} />
                            <span className="ml-4 text-gray-700">
                              {b?.email}
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <MdPhone color="gray" size={25} />
                            <span className="ml-4 text-gray-700">
                              {b?.phone}
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center ">
                            <RiHotelBedFill color="gray" size={25} />
                            <span className="ml-4 text-gray-700">{`${
                              b?.rooms
                            } ${b.rooms > 1 ? "rooms" : "room"}`}</span>
                          </div>
                          <div className="flex items-center ">
                            <span className="text-gray-700 text-2xl font-semibold">
                              Check-In:
                            </span>
                            <span className="ml-4 text-gray-700">
                              {b?.checkInDate.slice(0, 10)}
                            </span>
                          </div>
                          <div className="flex items-center ">
                            <span className="text-gray-700 text-2xl font-semibold">
                              Check-Out:
                            </span>
                            <span className="ml-4 text-gray-700">
                              {b?.checkOutDate.slice(0, 10)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-around sm:flex-col md:flex-row sm:gap-6 md:gap:20 gap-20 ">
                          <button
                            className="bg-[tomato]  text-2xl flex justify-center items-center hover:bg-[#ff6347d0] text-white uppercase  py-4 px-4 sm:px-4 rounded-full focus:outline-none focus:shadow-outline "
                            onClick={() => handleDeleteB(b?._id)}
                          >
                            Delete{" "}
                            {bId === b._id && btnLoading ? (
                              <ButtonLoader />
                            ) : null}
                          </button>

                          <Link
                            href={`/admin/package-update/${b?._id}`}
                            className="no-underline bg-[#22ce22] text-2xl  flex justify-center items-center hover:bg-[#30cc30d3] text-white uppercase  py-4 px-4 sm:px-4 rounded-full focus:outline-none focus:shadow-outline  "
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </section>
                  );
                })
              )}

              {resultsPerPage2 < filteredVillaPackageBookingsCount && (
                <div className="paginationBox mt-10">
                  {
                    <Pagination
                      activePage={setPageIndexHandler2}
                      itemsCountPerPage={Number(resultsPerPage2)}
                      totalItemsCount={Number(
                        filteredVillaPackageBookingsCount
                      )}
                      onChange={setPageIndexHandler2}
                      nextPageText="Next"
                      prevPageText="Prev"
                      firstPageText="1st"
                      lastPageText="Last"
                      itemClass="page-item"
                      linkClass="page-link"
                      activeClass="pageItemActive"
                      activeLinkClass="pageLinkActive"
                    />
                  }
                </div>
              )}
            </section>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Dashboard;
