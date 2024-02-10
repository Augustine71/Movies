import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './HomeBanner.css'

import { fetchMovies } from '../../store/movieSlice';

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

export const HomeBanner = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchMovies({ type: 'popular', section: 'popular' }));
      }, [dispatch]);

    const popularMovies = useSelector((state) => state.movies.popular.data);
  return (
    <Carousel
                    showThumbs={false}
                    autoPlay={true}
                    transitionTime={3}
                    infiniteLoop={true}
                    showStatus={false}
                >
                    {
                        popularMovies.map(movie => (
                            <Link style={{textDecoration:"none",color:"white"}} to={`/discover/movie/${movie.id}`} >
                                <div className="posterImage" key={movie.id}>
                                    <img src={`https://image.tmdb.org/t/p/original${movie && movie.backdrop_path}`} />
                                </div>
                                <div className="posterImage__overlay">
                                    <div className="posterImage__title">{movie ? movie.original_title: ""}</div>
                                    <div className="posterImage__runtime">
                                        {movie ? movie.release_date : ""}
                                        <span className="posterImage__rating">
                                            {movie ? movie.vote_average :""}
                                            <i className="fas fa-star" />{" "}
                                        </span>
                                    </div>
                                    <div className="posterImage__description">{movie ? movie.overview : ""}</div>
                                </div>
                            </Link>
                        ))
                    }
                </Carousel>
  )
}
