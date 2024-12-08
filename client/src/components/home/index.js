import React, { useEffect } from 'react'
import Featured from './featured'
import SlimPromotion from 'utils/promotions'
import Loader from 'utils/loader'

import { useDispatch, useSelector } from 'react-redux'
import { productsBySort } from 'store/actions/products.actions'

import CardBlock from 'utils/products/cardBlocks'

const slimPromotions = {
    img:'/images/featured/featured_home_3.jpg',
    lineOne:'Upto 40%',
    lineTwo:'For second hand',
    linkTitle:'Shop Now',
    linkTo:'/shop'
}

const Home = () => {

    const dispatch = useDispatch()
    const {bySold, byDate} = useSelector(state=>state.products)

    useEffect(()=>{

        dispatch(productsBySort({sortBy:'itemSold',limit:4,order:'desc',where:'bySold'}))
        dispatch(productsBySort({sortBy:'date',limit:4,order:'desc', where:'byDate'}))

    },[dispatch])
    
    return (
        <div>
        <Featured/>
        {bySold? <CardBlock  items={bySold} title="Best selling guitar"/>:<Loader/>}
        <SlimPromotion items={slimPromotions}/>
        {byDate? <CardBlock  items={byDate} title="Lastet guitars in the market"/>:<Loader/>}
        </div>
    )
}

export default Home;