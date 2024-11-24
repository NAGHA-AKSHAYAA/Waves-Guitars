import React, {useState, useEffect, useReducer} from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { productsByPaginate } from 'store/actions/products.actions';
import { getAllBrands } from 'store/actions/brands.action';

import GridOnIcon from '@mui/icons-material/GridOn';
import GridOffIcon from '@mui/icons-material/GridOff';

import CardBlock from 'utils/products/cardBlocks';
import PaginationComponent from 'utils/paginateNav';
import SearchBar from './searchBar';
import CollapseCheckbox from './collapseCheckbox';
import RangeSelect from './rangeSelect';


const defaultValue = {keywords:'', brand:[], min: 0, max:1001, frets: [], page:1 }


const Shop = () => {

    const [grid, setGrid] = useState(false)
    const [searchValues, setSearchValues] = useReducer(
        (state, newState) => ({...state, ...newState}),
        defaultValue
    )

    const brands = useSelector(state=> state.brands)
    const {byPaginate} = useSelector(state=>state.products)
    const dispatch = useDispatch()

    const handleGrid = () => {
       setGrid(!grid) 
    }

    const gotToPage = (page) => {
        setSearchValues({page: page})
    }

    const handleResetSearch = () => {
        setSearchValues({keywords: '',page:1})
    }

    const handleKeywords = (values) => {
        setSearchValues({keywords: values, page:1})
    }

    const handleFilters = (filters, category) => {
        if(category === 'brands'){
            setSearchValues({brand:filters, page:1})
        }

        if(category === 'frets'){
            setSearchValues({frets: filters, page:1})
        }
    }

    const handleRange = (values) => {
        console.log(values);        
        setSearchValues({min:values[0], max:values[1], page:1})
    }

    useEffect(()=>{
        dispatch(getAllBrands())
    },[dispatch])

    useEffect(()=>{
        dispatch(productsByPaginate(searchValues))
    },[searchValues,dispatch])

    return (
        <div className='page_container'>
            <div className='page_top'>
                <div className='container'>
                    <SearchBar
                        handleKeyword= {(values)=> handleKeywords(values)}
                    />
                </div>
            </div>
            <div className='container'>
                <div className='shop_wrapper'>
                    <div className='left'>
                        <CollapseCheckbox 
                            initState = {true}
                            title="Brands"
                            list={brands.all}
                            handleFilters = {(filters)=> handleFilters(filters, 'brands')}
                        />
                        <CollapseCheckbox 
                            initState = {false}
                            title="Frets"
                            list={[
                                {_id: 20, name:20},
                                {_id: 21, name:21},
                                {_id: 22, name:22},
                                {_id: 24, name:24},
                            ]}
                            handleFilters = {(filters)=> handleFilters(filters, 'frets')}
                        />
                        <RangeSelect
                            title="Price Range"
                            handleRange={(values)=>handleRange(values)}
                        />
                    </div>
                    <div className='right'>
                        <div className='shop_options'>
                            <div className='shop_grids clear'>
                                <div className={`grid_btn ${grid ? '':'active'}`}
                                    onClick={()=>handleGrid()}
                                >
                                <GridOnIcon/>
                                </div>
                                <div className={`grid_btn ${!grid ? '':'active'}`}
                                    onClick={()=>handleGrid()}
                                >
                                <GridOffIcon/>
                                </div>
                            </div>
                        {byPaginate && byPaginate.docs ?
                        <>
                        <CardBlock
                            items={byPaginate.docs}
                            shop={true}
                            grid={grid}
                        />
                        <PaginationComponent
                            prods= {byPaginate}
                            prev={(page)=>gotToPage(page)}
                            next={(page)=>gotToPage(page)}
                            resetSearch={()=> handleResetSearch()}
                        />
                        </>
                        :null                        
                        } 
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Shop
