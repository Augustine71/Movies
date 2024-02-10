import React, { useEffect } from 'react'
import "./HomeSection.css"
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../../store/movieSlice';
import { Link } from "react-router-dom";

import dayjs from "dayjs";

export const HomeSection = ({title,type,section}) => {
    const dispatch = useDispatch();

    const data = useSelector((state) => state.movies[section].data);

    useEffect(() => {
        dispatch(fetchMovies({ type: type, section: section }));
      }, [dispatch]);

    const settings = {
        variableWidth: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
        <div className='homesection__heading'>{title}</div>
        <div className="homesection__sub-container">
            <div className="homesection__box">
        <Slider {...settings}>
        {data.map((movie) =>{
            const posterUrl = "https://image.tmdb.org/t/p/original/"+movie.poster_path;
             return (
                <Link style={{textDecoration:"none",color:"white"}} to={`/discover/movie/${movie.id}`} >
                    <div class="carouselItem">
                    <div class="posterBlock">
                        <span class=" lazy-load-image-background blur lazy-load-image-loaded" >
                            <img class="" alt="" src={posterUrl} />
                        </span>
                    </div>
                    <div class="textBlock">
                        <span class="title">{movie.original_title}</span>
                        <span class="date"> {dayjs(movie.release_date).format("MMM D, YYYY")}</span>
                    </div>
                    </div>
                </Link>
            )}
         )}
        </Slider>
        </div>
        </div>
    </>
  )
}
