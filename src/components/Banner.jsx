import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  Navigation } from "swiper/modules";
import { getBanners } from "../services/BannerService";
import "../styles/Banners.css";
import "swiper/css";

import "swiper/css/navigation";



function Banner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners()
      .then((res) => {
        setBanners(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="banner-loading"></div>;
  }

  return (
    <div className="banner-container">
      {banners && banners.length > 0 ? (
      <Swiper
  modules={[Autoplay, Navigation]}
  autoplay={{ delay: 3000 }} 
  navigation={true}
  loop={true}
>
  {banners.map((banner) => (
    <SwiperSlide key={banner.id}>
      <div className="banner-card">
        <div className="banner-image-wrapper">
          <img
            src={banner.imageUrl}
            className="banner-image"
          />
        </div>
        
        {/* Description moved UNDER the image */}
        <div className="banner-content">
          <h2 className="banner-title">
            {}
          </h2>
          {/* You can add a p tag here if you have a description field */}
          {banner.description && <p className="banner-description">{banner.description}</p>}
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
      ) : (
        <div className="banner-empty">
          No banners available
        </div>
      )}
    </div>
  );
}

export default Banner;