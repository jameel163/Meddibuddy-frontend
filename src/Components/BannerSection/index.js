import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const BannerSection = (props) => {
    let data =(props.props)||""
    const settings = {
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,        
        autoplaySpeed: 3000,   
      }

  const banners=(data)=>{
    return(
        <Slider {...settings}>
            {data.map((item, index) => (
                <img className='banner-img' key={index} src={item.bannerUrl} alt="banner" />
            ))}
        </Slider>
    )
  }

  return (
    <div className="slider-container">
      {data?banners(data.props):""}
    </div>
  )
}

export default BannerSection