import { getSession } from "next-auth/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';

export default function Home() {
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 6500, disableOnInteraction: false }}
        // spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-40 sm:h-80">
        <SwiperSlide className="bg-red-500 h-full bg-[url('https://via.placeholder.com/1280x720/FFC467')] bg-center"></SwiperSlide>
        <SwiperSlide className="bg-red-500 h-full bg-[url('https://macharetelucas.com.br/img/slide3.png')] bg-contain bg-center"></SwiperSlide>
        <SwiperSlide className="bg-teal-500 h-full">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-sky-500 h-full">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-indigo-500 h-full">Slide 4</SwiperSlide>
      </Swiper>


      <div id="pagamentos" className="sm:hidden">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          // spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          className="w-11/12 m-auto bg-red-500 h-24 my-10">
          <SwiperSlide className="bg-red-500 h-full bg-[url('https://via.placeholder.com/1280x720/FFC467')] bg-center"></SwiperSlide>
          <SwiperSlide className="bg-red-500 h-full bg-[url('https://macharetelucas.com.br/img/slide3.png')] bg-contain bg-center"></SwiperSlide>
          <SwiperSlide className="bg-teal-500 h-full">Slide 2</SwiperSlide>
          <SwiperSlide className="bg-sky-500 h-full">Slide 3</SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden sm:grid container m-auto bg-red-500 h-24 my-10 sm:grid-cols-4">
        <div className="bg-sky-500 m-1"></div>
        <div className="bg-sky-500 m-1"></div>
        <div className="bg-sky-500 m-1"></div>
        <div className="bg-sky-500 m-1"></div>
      </div>
      <div className="container m-auto px-4 block min-h-screen">
        {/* <div className="w-full bg-cyan-300 h-screen">

        </div> */}
        <div className="w-full flex justify-evenly my-10">

          <div className="w-24 bg-[#AF0171] h-20 animate hover:animate-none">

          </div>
          <div className="w-24 bg-[#F2C2D4] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#4C0D3B] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#F4A4C3] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#AE0166] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#01AF8E] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#AF7401] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#0171AF] h-20 ml-5">

          </div>
        </div>



        <div className="flex w-full justify-evenly">

          <div className="w-24 bg-[#FF0080] h-20">

          </div>
          <div className="w-24 bg-[#FF00FF] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#C154C1] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#FF007F] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#0171AF] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#0f73ee] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#0171AF] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#0171AF] h-20 ml-5">

          </div>


        </div>



      </div>
    </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)
//   return {
//     props: session
//   }
// }