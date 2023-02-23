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
      <div className="container m-auto px-4">
        <div className="w-full bg-cyan-300 h-screen">

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