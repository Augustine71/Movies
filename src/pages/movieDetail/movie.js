import React, {useEffect, useState} from "react"
import "./movie.css"

import { fs } from "../../firebase/firebase";

import { useAuth0 } from '@auth0/auth0-react';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from "../../store/detailSlice";

import Popup from "../../components/Popup/Popup";

const Movie = () => {
    const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

    const { isAuthenticated, loginWithPopup, user } = useAuth0();
  const [isAddingToList, setIsAddingToList] = useState(false);

  const { id, type } = useParams()

    const dispatch = useDispatch();

    const currentMovieDetail = useSelector(state => state.detail.movie);
    useEffect(() => {
        dispatch(getMovieDetails({ id: id, type: type }));
        window.scrollTo(0,0)
      }, [dispatch,type]);

  useEffect(() => {
    if (isAuthenticated && isAddingToList) {
      // If user is authenticated and adding to list is in progress
      console.log("asdas");
      addMovieToList();
    }
  }, [isAuthenticated, isAddingToList]);

  const addToList = () => {
    setIsAddingToList(true); 
    if (!isAuthenticated) {
      // If user is not authenticated, redirect to Auth0 login page
      loginWithPopup();
    } 
  };

  const addMovieToList = async () => {
    
    try {
        const userEmail = user.email;
        console.log(currentMovieDetail);
        await fs.collection(`myList-${userEmail}`).doc(`${currentMovieDetail.id}`).set(currentMovieDetail);
        handleButtonClick()
          console.log('Movie added to Firebase');
      } catch (error) {
        console.error('Error adding movie to Firebase:', error);
      } 
      setIsAddingToList(false);
  };

    return (
        <>
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} alt=""/>
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} alt=""/>
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                     
                    <button class="btn-donate" onClick={addToList}>
                        Add to List
                    </button>
                </div>
            </div>
            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
        </div>

        {showPopup && <Popup />} {/* Render the Popup component if showPopup is true */}
        </>
    )
}

export default Movie