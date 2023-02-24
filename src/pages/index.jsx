import { getSession } from "next-auth/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';


export default function Home(session) {
  return (
    <>
      {/* <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        // spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-80">
        <SwiperSlide className="bg-red-500 h-full">Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
      </Swiper> */}
      <div className="container m-auto px-4 block">
        {/* <div className="w-full bg-cyan-300 h-screen">

        </div> */}
        <div className="w-full flex justify-evenly my-10">

          <div className="w-24 bg-[#AF0171] h-20">

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

export async function getServerSideProps(context) {
  const session = await getSession(context)
  return {
    props: session
  }
}