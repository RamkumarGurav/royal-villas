import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Bookings from "../components/Bookings";
import Rates from "../components/Rates";
import Moto from "../components/Moto";
import Events from "../components/Events";
import GallarySlider from "../components/GallarySlider";
import Testimonials from "../components/Testimonials";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Head from "next/head";


export default function Home() {
  return (
    <div>
       <Head>
        <title>Home | RoyalVillas.com</title>
      </Head>
      <Header />
      <Bookings />
      <Rates />
      <Moto />
      <Events />
      <GallarySlider />
      <Features />
      <Testimonials />
      <Footer />
    </div>
  );
}
