import React, {useEffect} from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"
import { useDispatch, useSelector } from 'react-redux';
import { fetchInfiniteMovies } from "../../store/infiniteSlice";


import InfiniteScroll from 'react-infinite-scroll-component';


const MovieList = () => {
    const {type} = useParams()

    const dispatch = useDispatch();
  const movieList = useSelector(state => state.infinite[type].data);
  console.log(movieList);
  const page = useSelector(state => state.infinite[type].page);
  const status = useSelector(state => state.infinite[type].status);
    
    

    useEffect(() => {
        dispatch(fetchInfiniteMovies({ page: 1, type: type }));
        window.scrollTo(0,0)
      }, [dispatch,type]);

      const fetchMoreMovies = () => {
        dispatch(fetchInfiniteMovies({ page, type: type }));
      };

      console.log(movieList);

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                <InfiniteScroll
                    dataLength={movieList.length}
                    next={fetchMoreMovies}
                    hasMore={status !== 'loading'}
                    loader={<h4>Loading...</h4>}
                >
                    {
                        movieList.map(movie => (
                            <Cards movie={movie} type={type}/>
                        ))
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default MovieList