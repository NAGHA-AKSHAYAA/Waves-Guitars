import React from 'react'
import Carrousal from 'utils/carrousal'

const Featured = () => {

    const carrouselItem = [
        {
            img:'/images/featured/featured_home.jpg',
            lineOne:'Fender',
            lineTwo:'Custom Shop',
            linkTitle:'Shop Now',
            linkTo:'/shop'
        },
        {
            img:'/images/featured/featured_home_2.jpg',
            lineOne:'B-Stock',
            lineTwo:'Awesome discounts',
            linkTitle:'View offers',
            linkTo:'/shop'
        }
    ]
    return (
        <div className='featured_container'>
            <Carrousal items={carrouselItem}/>
        </div>
    )
}

export default Featured;