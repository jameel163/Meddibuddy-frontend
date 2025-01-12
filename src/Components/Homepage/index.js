import React, { useState, useEffect } from 'react';
import { CiSearch } from "react-icons/ci";

import TopSection from "../TopSection"
import IconsContainer from "../IconsContainer"
import FeaturedSection from"../FeaturedSection"
import BannerSection from '../BannerSection';
import BookPopular from "../BookPopular"
import TrustedSection from "../TrustedSection"
import LifeStyleSection from "../LifeStyleSection"
import SafeSection from '../SafeSection';
import FaqSection from '../FaqSection'
import ReviewSection from '../ReviewSection'
import "./index.css"

const Homepage=()=>{
    const [apiCollection,setApiCollection]=useState([])
    

    useEffect(()=>{
        const fetchData=async()=>{
            const url="https://677f757b0476123f76a68a42.mockapi.io/api/labs/v1/page_config"
            const option= {
                method:"GET"
            }
            const response= await fetch(url,option)
            const result = await response.json()
            setApiCollection(result[0].page_config)
            console.log(result[0].page_config)
        }
        fetchData()
    },[])

    

    
    return(
    <div className='total-page'>
        <TopSection />
        <div className='search-bar-container'>
            <input className='search-bar'  type="search" placeholder='Find Lab tests, diagnostics centres' />
            <CiSearch className='search-icon' />
        </div>
        <IconsContainer props={apiCollection[0]}/>
        <BannerSection props={apiCollection[1]}/>
        <FeaturedSection props={apiCollection[2]} />
        <BookPopular props={apiCollection[2]} />
        <TrustedSection props={apiCollection[7]}/>
        <ReviewSection props={apiCollection[5]} />
        <LifeStyleSection prop={apiCollection[3]} />
        <SafeSection props={apiCollection[7]}/>
        <FaqSection props={apiCollection[6]}/>
    </div>
    )
}
export default Homepage