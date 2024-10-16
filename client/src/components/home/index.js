import React from 'react'
import Featured from './featured'
import SlimPromotion from 'utils/promotions'

const slimPromotions = {
    img:'/images/featured/featured_home_3.jpg',
    lineOne:'Upto 40%',
    lineTwo:'For second hand',
    linkTitle:'Shop Now',
    linkTo:'/shop'
}

const Home = () => {
    return (
        <div>
        <Featured/>
        <SlimPromotion items={slimPromotions}/>
        </div>
    )
}

export default Home;