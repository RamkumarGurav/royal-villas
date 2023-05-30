import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import { useQuery } from "react-query";

const Section1 = ({ initialData }) => {
 

  SwiperCore.use([Autoplay]);




  return (
    <section className="slider">
      <div className="container mx-auto md:px-20">
       

        <Swiper loop={true} slidesPerView={1} autoplay={{ delay: 3000 }}>
       
              <SwiperSlide key={i}>
                <div>
                <Image
                href={'/images/Gallery/galler1.jpg'}
                height={600}
                width={600}
                alt="gallery"

                />
                </div>
                <div>
                <Image
                href={'/images/Gallery/galler1.jpg'}
                height={600}
                width={600}
                alt="gallery"

                />
                </div>
                <div>
                <Image
                href={'/images/Gallery/galler1.jpg'}
                height={600}
                width={600}
                alt="gallery"

                />
                </div>
              </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};
export default Section1;

// function Slide({ data }) {
//   const {
//     _id,
//     title,
//     subtitle,
//     description,
//     authorName,
//     authorAvatar,
//     image,
//     publishedAt,
//     type,
//     category,
//   } = data;
//   return (
//     <div className="grid lg:grid-cols-2 gap-2 mx-5">
//       <div className="image z-[5] ">
//       <Link href={`/blogs/${_id}`} className="w-full">
//         <div className="relative w-full h-[210px] md:h-[350px]">
//           <Image
//             src={image || "/defualtPost.jpg"}
//             alt="profile"
//             fill
//             sizes="(max-width: 640px) 100vw 
//               (max-width: 1024px) 50vw,
//               33vw" //thie is used when we use grid with cards images (this downloads small size imagees at bigger devices width and bigger images at smaller devices width to improve userexperience)
//             // sizes="100vw"//befualt width size that generates defualt srcsets(srcsets defines dowinloading of diff sized images for diff divice widths )//use this property when u cant ur image responsive but its not used in grid (eg-when u want to dispaly single image in full window with certain height)

//             priority //When true, the image will be considered high priority and preload. Lazy loading is automatically disabled for images using priority.
//             className="rounded-md object-cover" //always give object-cover class to make image responsive without losing its aspects ratio( The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit)
//           />
//         </div>
//       </Link>
//       </div>
//       <div className="info flex flex-col justify-center lg:p-5">
//         <div className="cat">
//           <span className="text-orange-500 hover:text-orange-900">
//             {category || "Unknown"}{" "}
//           </span>
//           <span className="text-gray-800 hover:text-gray-600">
//             -{" "}
//             {new Intl.DateTimeFormat("en-US", {
//               day: "numeric",
//               month: "long",
//               year: "numeric",
//             }).format(new Date(publishedAt.toString())) || "Unknown"}
//           </span>
//         </div>
//         <div className="head">
//           <Link href={`/blogs/${_id}`} legacyBehavior>
//             <a className="text-3xl xl:text-5xl font-bold text-gray-800 hover:text-gray-600">
//               {title || "Unknown"}
//             </a>
//           </Link>
//         </div>
//         <p className="text-gray-500 py-3">{subtitle || "Unknown"}</p>
//         {authorName ? (
//           <Author authorName={authorName} authorAvatar={authorAvatar} />
//         ) : (
//           <></>
//         )}
//       </div>
//     </div>
//   );
// }
