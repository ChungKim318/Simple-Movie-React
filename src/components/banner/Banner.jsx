import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSWR from 'swr'
import { fetcher, tmdbAPI } from '~/config'
import CustomButton from '../CustomButton/CustomButton'
import { useNavigate } from 'react-router'
import { withErrorBoundary } from 'react-error-boundary'
import BannerItem, { BannerItemSkeleton } from './BannerItem'

const Banner = () => {
  // const [banner, setBanner] = useState([])

  const { data, error } = useSWR(tmdbAPI.getBanner(), fetcher)
  const isLoading = !data && !error

  const bannerData = data?.results || []

  // useEffect(() => {
  //   if (data && data.results) {
  //     setBanner(data.results)
  //   }
  // }, [data])

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      {isLoading && <BannerItemSkeleton />}
      {!isLoading && (
        <Swiper grabCursor={true} slidesPerView={'auto'}>
          {bannerData.length > 0 &&
            bannerData.map(item => (
              <SwiperSlide key={item.id}>
                <BannerItem item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
    </section>
  )
}

const FallbackComponent = () => {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this Component
    </p>
  )
}

export default withErrorBoundary(React.memo(Banner), {
  fallback: <FallbackComponent />,
})
