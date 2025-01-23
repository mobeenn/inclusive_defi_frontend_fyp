"use client";

import Slider from "react-slick";
import { useRef, useState } from "react";
import { useGetAllPublicProjects } from "@/data/projects";
import PublicCard from "@/components/Projects/public-card";
import SkeletonCardsGrid from "./sleketon-cards-grid";

export default function PublicProjectSlider() {
   const { data: projects, isPending } = useGetAllPublicProjects({
      page: 1,
      perPage: 12,
      status: "all",
   });

   const sliderRef = useRef(null);
   const [currentSlide, setCurrentSlide] = useState(0);

   if (isPending)
      return <SkeletonCardsGrid className="w-full max-w-[1300px] px-4" />;

   return (
      <div className="relative mx-auto my-0 w-full max-w-[1300px]">
         <Slider
            ref={sliderRef}
            dots={false}
            infinite={true}
            speed={500}
            slidesToShow={3}
            slidesToScroll={1}
            arrows={false}
            autoplay={true}
            className="gap-[20px] px-[5px]"
            beforeChange={(oldIndex, newIndex) => setCurrentSlide(newIndex)}
            responsive={[
               {
                  breakpoint: 1200,
                  settings: {
                     slidesToShow: 2,
                  },
               },
               {
                  breakpoint: 700,
                  settings: {
                     slidesToShow: 1,
                  },
               },
            ]}
         >
            {projects?.projectsWithStats?.map((item) => (
               <div className="px-3" key={item._id}>
                  <PublicCard project={item} showControls={false} />
               </div>
            ))}
         </Slider>
         <ul className="absolute -bottom-[80px] left-0 right-0 flex list-none items-center justify-center">
            {projects?.projectsWithStats?.map((item, index) => (
               <li key={item._id} className="mx-1">
                  <button
                     className={`h-4 w-4 rounded-full ${
                        index === currentSlide ? "bg-white" : "bg-gray-500"
                     }`}
                     onClick={() => {
                        sliderRef.current.slickGoTo(index);
                     }}
                  ></button>
               </li>
            ))}
         </ul>
      </div>
   );
}
