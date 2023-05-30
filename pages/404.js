import Link from "next/link";
import Head from "next/head";
import { Ramabhadra } from "next/font/google";

const pageNotFound = () => {
  return (
    <div id="notfound">
      <Head>
        <title>Page Not Found | 404</title>
      </Head>
      <section className="flex justify-center items-center min-h-[90vh]">
        <div className="notfound w-full flex flex-col justify-center items-center">
          <div className="notfound_404">
            <h1 className="title">404</h1>
          </div>
          <h2 className="sub_title" style={{ textTransform: "upperCase" }}>
            We are sorry, Page Not Found!
          </h2>
          <p className="para_small" style={{ textTransform: "upperCase" }}>
            The page you are looking for might have been removed or had its name
            changed or is temporarily unavailable
          </p>
          <Link
            href="/"
            className=" no-underline bg-gray-900 px-10 py-4 my-6 border border-black-2 text-2xl text-white hover:bg-gray-900/80 rounded-md uppercase "
          >
            Back To Homepage
          </Link>
        </div>
      </section>
    </div>
  );
};

export default pageNotFound;
