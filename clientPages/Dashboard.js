import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail, MdPhone } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
import ButtonLoader from "@/components/ButtonLoader";
import Pagination from "react-js-pagination";
import useSWRMutation from "swr/mutation";
import Cookies from "js-cookie";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import Layout from "@/components/Layout";
import Head from "next/head";

var rId;
const limit = 10;

const Dashboard = () => {
  const [btnLoading, setBtnLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);

  //----------------reservations----------------------------------------
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");

  const fetcherReservations = async (pageIndex) => {
    const jwt = Cookies.get("jwt");
    const instance = axios.create({
      withCredentials: true, //adding cookies
    });

    instance.defaults.headers.common["Authorization"] = `Bearer ${jwt}`;

    const res = await instance.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/villa-reservations?page=${pageIndex}&limit=${limit}`
    );

    return res.data;
  };
  const {
    data: rData,
    isLoading: rIsLoading,
    isError: rIsError,
    error: rError,
    refetch: refetchR,
  } = useQuery(
    ["manage-reservaions", pageIndex],
    () => fetcherReservations(pageIndex),
    {
      keepPreviousData: true,
      onSuccess: (data) => {},
      onError: (err) => {
        console.log(err.message);
      },
    }
  );

  const setPageIndexHandler = (e) => {
    setPageIndex(e);
  };

  //------------searching and filtering--------------------------------------------

  // const searchFetcher = async (pageIndex) => {
  //   const res = await fetch(
  //     `${
  //       process.env.NEXT_PUBLIC_SERVER_URL
  //     }/villa?page=${pageIndex}&limit=20&keyword=${search.trim()}${
  //       subject && `&subject=${subject}`
  //     }`
  //   );
  //   const data = await res.json();

  //   return data;
  // };
  // const {
  //   data: sData,
  //   isLoading: sLoading,
  //   isError: sIsError,
  //   error: sError,
  //   refetch: srefetch,
  // } = useQuery(["search-mcqs", pageIndex], () => searchFetcher(pageIndex), {
  //   keepPreviousData: true,
  //   enabled: false,
  //   onSuccess: (data) => {
  //     setQsData(data);
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   return srefetch();
  // };

  // useEffect(() => {
  //   if (subject) {
  //     console.log(subject);

  //     srefetch();
  //   }
  // }, [subject, srefetch]);

  //--------------------------------------------------------
  // --------delete using useSWRMutation----------------------------

  const deleteFetcherR = async ([endpoint, xData], { arg: id }) => {
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
    data: sdataUpdate,
    error: serrorUpdate,
    isLoading: sisLoading,
    trigger: triggerR,
  } = useSWRMutation(
    ["/villa-reservations", "abc"],
    // ([endpoint, xData]) => deleteFetcher(endpoint, xData)
    deleteFetcherR,
    {
      onSuccess: (data) => {
        setBtnLoading(false);
        refetchR();
        toast.success("Successfully Deleted the Reservation");
      },
      onError: (err) => {
        setBtnLoading(false);
        toast.error("Something Went Wrong");
      },
    }
  );

  const handleDeleteR = (id) => {
    rId = id;
    setBtnLoading(true);
    setPageIndex((prev) => prev);
    return triggerR(id);
  };

  if (rError) return <Error />;

  if (!rData) return <Spinner />;

  const {
    resultsPerPage,
    villaReservationsCount,
    filteredVillaReservationsCount,
  } = rData && rData?.data;
  // console.log(filteredVillaReservationsCount, villaReservationsCount);

  return (
    <Layout>
      <section className="min-h-[77vh]">
        <Head>
          <title>Manage Reservations | RoyalVillas.com</title>
        </Head>
        {/* <div className="bg-blue-600 cg-safron py-4 px-10  text-white flex justify-between items-center">
          <Image
            src={userInfo?.data.user.avatar || "/Profile6.jpg"}
            width={80}
            height={80}
            alt="avatar"
            className="rounded-full"
          ></Image>

          <h2 className="text-2xl sm:text-[25px] text-white uppercase ml-2">
            Admin : {userInfo?.data.user.name}
          </h2>
          <button
            onClick={refetchLogout}
            className=" para text-white  font-semibold  duration-300 border-2 border-white px-2 py-1 rounded-md hover:bg-white hover:text-yellow-600"
          >
            Logout
          </button>
        </div> */}
        <section>
          <div className="flex flex-col  items-center py-5">
            <h1 className="text-center text-4xl  w-[300px]  cg-safron text-white  px-6 rounded-lg py-2 my-5 ">
              Manage Reservations
            </h1>
            <section
              id="qs-block"
              className="container mx-auto  py-10 px-2 lg:px-8"
            >
              {rData?.data.villaReservations.length === 0 ? (
                <div className="flex justify-center items-center p-10 ">
                  <h1 className="text-xl text-gray-700">
                    No Reservations Found
                  </h1>
                </div>
              ) : (
                rData?.data.villaReservations?.map((r, i) => {
                  return (
                    <div
                      key={i}
                      className="reservation-card para flex flex-col sm:flex-row  sm:items-center sm:justify-between gap-4 my-4 w-full border-[1px] border-gray-900 shadow-md py-4 px-4"
                    >
                      <div>
                        <div className="flex items-center ">
                          <BsFillPersonFill color="gray" size={25} />{" "}
                          <span className="ml-4 text-gray-700"> {r?.name}</span>
                        </div>

                        <div className="flex items-center ">
                          <MdEmail color="gray" size={25} />
                          <span className="ml-4 text-gray-700">{r?.email}</span>
                        </div>
                        <div className="flex items-center ">
                          <MdPhone color="gray" size={25} />
                          <span className="ml-4 text-gray-700">{r?.phone}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center ">
                          <RiHotelBedFill color="gray" size={25} />
                          <span className="ml-4 text-gray-700">{`${r?.rooms} ${
                            r.rooms > 1 ? "rooms" : "room"
                          }`}</span>
                        </div>
                        <div className="flex items-center ">
                          <span className="text-gray-700 text-2xl font-semibold">
                            Check-In:
                          </span>
                          <span className="ml-4 text-gray-700">
                            {r?.checkInDate.slice(0, 10)}
                          </span>
                        </div>
                        <div className="flex items-center ">
                          <span className="text-gray-700 text-2xl font-semibold">
                            Check-Out:
                          </span>
                          <span className="ml-4 text-gray-700">
                            {r?.checkOutDate.slice(0, 10)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center sm:flex-col md:flex-row sm:gap-6 md:gap:20 gap-20 self-end">
                        <button
                          className="bg-[tomato]  text-2xl flex justify-center items-center hover:bg-[#ff6347d3] text-white uppercase  py-4 px-4 sm:px-4 rounded-full focus:outline-none focus:shadow-outline my-4"
                          onClick={() => handleDeleteR(r?._id)}
                        >
                          Delete{" "}
                          {rId === r._id && btnLoading ? (
                            <ButtonLoader />
                          ) : null}
                        </button>

                        <Link
                          href={`/admin/reservation-update/${r?._id}`}
                          className="no-underline bg-[#22ce22] text-2xl  flex justify-center items-center hover:bg-[#30cc30d3] text-white uppercase  py-4 px-4 sm:px-4 rounded-full focus:outline-none focus:shadow-outline my-4 "
                        >
                          Edit
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}

              {resultsPerPage < filteredVillaReservationsCount && (
                <div className="paginationBox mt-10">
                  {
                    <Pagination
                      activePage={pageIndex}
                      itemsCountPerPage={Number(resultsPerPage)}
                      totalItemsCount={Number(filteredVillaReservationsCount)}
                      onChange={setPageIndexHandler}
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
