import { getSession } from "next-auth/react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";
import 'swiper/css';
import { Quicksand } from "@next/font/google";
import { HandThumbUpIcon, TruckIcon, CreditCardIcon, HomeIcon } from '@heroicons/react/24/solid'


const quick = Quicksand({
  subsets: ['latin'],
  weight: 'variable'
})

const callouts = [
  {
    name: 'Sabão',
    description: 'Lava Roupas',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#',
  },
  {
    name: 'Desinfetante',
    description: 'Journals and note-taking',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#',
  },
  {
    name: 'Cloro',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
  {
    name: 'Detergente',
    description: 'Daily commute essentials',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#',
  },
]

export default function Home() {
  
  return (
    <>
      <Swiper
        modules={[Autoplay]}
        loop={true}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        // spaceBetween={50}
        slidesPerView={1}
        // onSlideChange={() => console.log('slide change')}
        // onSwiper={(swiper) => console.log(swiper)}
        className="h-40 sm:h-72 -z-[1]">
        <SwiperSlide className="bg-red-500 h-full bg-[url('https://via.placeholder.com/1280x720/FFC467')] bg-center"></SwiperSlide>
        <SwiperSlide className="bg-red-500 h-full bg-[url('https://macharetelucas.com.br/img/slide3.png')] bg-contain bg-center"></SwiperSlide>
        <SwiperSlide className="bg-teal-500 h-full">Slide 2</SwiperSlide>
        <SwiperSlide className="bg-sky-500 h-full">Slide 3</SwiperSlide>
        <SwiperSlide className="bg-indigo-500 h-full">Slide 4</SwiperSlide>
      </Swiper>

      <div id="_payments" className={`${quick.className} py-2 h-fit md:grid md:grid-cols-2 container m-auto bg-white mt-10 lg:grid-cols-4`}>
        <div className="mb-2 p-2 m-1 before:bg-indigo-500 before:w-[3px] before:rounded-full before:h-[95%] before:bottom-0 before:absolute relative items-center flex">
          <HandThumbUpIcon className="ml-3 h-12 w-auto text-white bg-indigo-500 inline rounded-full p-2" /><span className="ml-3"> Limpeza e praticidade</span>
        </div>
        <div className="mb-2 p-2 m-1 before:bg-indigo-500 before:w-[3px] before:rounded-full before:h-[95%] before:bottom-0 before:absolute relative items-center flex">
          <TruckIcon className="ml-3 h-12 w-auto text-white bg-indigo-500 inline rounded-full p-2" /><span className="ml-3"> Compre sem sair de casa</span>
        </div>
        <div className="mb-2 p-2 m-1 before:bg-indigo-500 before:w-[3px] before:rounded-full before:h-[95%] before:bottom-0 before:absolute relative items-center flex">
          <CreditCardIcon className="ml-3 h-12 w-auto text-white bg-indigo-500 inline rounded-full p-2 " /><span className="ml-3"> Pague com Cartao/Pix</span>
        </div>
        <div className="mb-2 p-2 m-1 before:bg-indigo-500 before:w-[3px] before:rounded-full before:h-[95%] before:bottom-0 before:absolute relative items-center flex">
          <span className="ml-3 w-full flex">
            <HomeIcon className="h-12 w-auto text-white bg-indigo-500 inline rounded-full p-2 " />
            <div className="flex flex-col ml-3 items-center justify-center">
              <span> Pague na Entrega</span>
              <span className="text-xs text-gray-500"> * Pedidos abaixo de R$100</span>
            </div>
          </span>
        </div>
      </div>

      <div id="_div" className="my-10 w-11/12 m-auto h-px bg-gray-300"></div>

      <div className="w-full">
        <div id="category" className="container mx-auto">
          {/* sabao, desinferante, Detergente, Limpa +, Cloro */}

          <div className="bg-gray-100 w-full">
            <div className="max-w-7xl px-4">
              <div className="mx-auto max-w-2xl py-8   lg:max-w-none">
                <span className={`${quick.className} font-medium tracking-tight text-gray-500 text-2xl`}>Nossos produtos disponíveis</span>

                {/* <h2 className="text-2xl font-bold text-gray-900">Collections</h2> */}

                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-5 lg:gap-x-6 lg:space-y-0">
                  {callouts.map((callout) => (
                    <div key={callout.name} className="group relative">
                      <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                        <img
                          src={callout.imageSrc}
                          alt={callout.imageAlt}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <h3 className="mt-6 text-sm text-gray-500">
                        <a href={callout.href}>
                          <span className="absolute inset-0" />
                          {callout.name}
                        </a>
                      </h3>
                      <p className="text-base font-semibold text-gray-900">{callout.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* div*5.border.border-gray-300.hover:shadow-xl.h-40.w-20.cursor-pointer.transition.ease-out.duration-500 */}
        </div>


      </div>

      <div className="container m-auto px-4 block min-h-screen">

        <div className="w-full flex justify-evenly my-10">

          <div className="w-24 bg-[#AF0171] h-20 animate hover:animate-none">

          </div>
          <div className="w-24 bg-[#F2C2D4] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#4C0D3B] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#F4A4C3] h-20 ml-5">

          </div>
          <div className="w-24 bg-[#D1FFF3] h-20 ml-5 outline-dotted">

          </div>
          <div className="w-24 bg-[#BEF0CB] h-20 ml-5 outline-dotted">

          </div>
          <div className="w-24 bg-[#F6F7C1] h-20 ml-5 outline-dotted">

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
          {/* that nice  */}
          <div className="w-24 bg-[#0f73ee] h-20 ml-5 outline-dashed">

          </div>
          <div className="w-24 bg-[#00B9C5] h-20 ml-5 outline-dotted">

          </div>
          <div className="w-24 bg-[#14B1F0] h-20 ml-5 outline-double">

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