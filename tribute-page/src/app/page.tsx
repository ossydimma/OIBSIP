"use client";
import Image from "next/image";
import data from "../data.json";
import martinImg from "./images/martin-luther.jpg";
import martinImg1 from "./images/martin2.jpg";
import martinImg2 from "./images/martin3.jpg";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay} from "swiper/modules";
import "swiper/swiper-bundle.css";
import TimeLine from "./component/TimeLine";

export default function Home() {
  const navPrevRef = useRef<HTMLDivElement | null>(null);
  const navNextRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className='   bg-[url("https://c5.staticflickr.com/8/7287/27993953556_9cf995cf72_k.jpg")] bg-cover bg-center bg-fixed py-10'>
      <main className=" h-[2000px] flex flex-col items-center opacity-95 ">
        <div className="w-[85%]">
          <Image
            src={martinImg}
            alt="martin luther"
            className=" rounded-t-xl "
          />
          <section className=" bg-[rgba(95,58,58,0.90)] text-white rounded-b-xl pb-20">
            <div className=" text-center drop-shadow-md py-3">
              <h2 className=" text-4xl">Martin Luther King, Jr.</h2>
              <p>
                Was an American Baptist minister and activist who was a leader
                in the African-American Civil Rights Movement
              </p>
            </div>


            <div className=" bg-[rgb(71,44,44)]">
              <Swiper
                className="h-[400px] w-[90%]"
                
                loop={true}
                modules={[ Navigation, Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}

                navigation={{
                  prevEl: navPrevRef.current,
                  nextEl: navNextRef.current,
                }}
              >
                <SwiperSlide>
                  <div className=" w-[70%] mx-auto">
                    <Image src={martinImg1} alt="martinImg1" className=" h-[100%]"/>  
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className=" w-[70%] mx-auto">
                    <Image src={martinImg2} alt="martinImg2" className=" h-[100%] w-[100%]" />  
                  </div>
                </SwiperSlide>

                <div className="swiper-button-prev pl-10 " ref={navPrevRef} />

                <div className="swiper-button-next pr-10 " ref={navNextRef}/>
              </Swiper>
            </div>
            <section className=" bg-[rgb(62,41,41)] w-[85%] mx-auto shadow-white shadow-md ">
              <h2 className=" text-4xl text-center pt-2">Here's a time line of Martin Luther King, Jr.:</h2>
              <TimeLine text = 'Youth' store={data.youth} />
              <TimeLine text = 'Early Activism' store={data.activism} />
              <TimeLine text = 'Legacy' store={data.legacy} />

            </section>
          </section>
        </div>
      </main>
    </div>
  );
}
