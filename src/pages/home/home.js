import React from "react"
import './home.css'
import { HomeBanner } from "../../components/HomeBanner/HomeBanner";
import { HomeSection } from "../../components/HomeSection/HomeSection";

const Home = () => {
    return (
        <>
            <div className="poster">
                <HomeBanner />
                <HomeSection title="Whats Popular" type="popular" section="popular"/>
                <HomeSection title="Top Rated" type="top_rated" section="topRated"/>
                <HomeSection title="Trending" type="trending" section="trending"/>
            </div>
        </>
    )
}

export default Home