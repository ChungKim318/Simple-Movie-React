import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher, tmdbAPI } from '~/config'
import CustomButton from '../CustomButton/CustomButton'
import { useNavigate } from 'react-router'

const Banner = () => {
  // const [banner, setBanner] = useState([])

  const { data } = useSWR(tmdbAPI.getBanner(), fetcher)

  const bannerData = data?.results || []

  // useEffect(() => {
  //   if (data && data.results) {
  //     setBanner(data.results)
  //   }
  // }, [data])

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper grabCursor={true} slidesPerView={'auto'}>
        {bannerData.length > 0 &&
          bannerData.map(item => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  )
}

function BannerItem({ item }) {
  const { title, backdrop_path, id } = item
  const navigate = useNavigate()
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="object-contain w-full h-full rounded-lg"
      />
      <div className="absolute w-full text-white left-5 bottom-5">
        <h2 className="mb-5 text-3xl font-bold">{title}</h2>
        <div className="flex items-center mb-8 gap-x-3">
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
          <span className="px-4 py-2 border border-white rounded-md">
            Adventure
          </span>
        </div>
        <CustomButton onClick={() => navigate(`/movies/${id}`)}>
          Watch now
        </CustomButton>
      </div>
    </div>
  )
}

export default Banner
