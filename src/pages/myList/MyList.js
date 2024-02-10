import React,{useEffect} from 'react'
import { useAuth0 } from '@auth0/auth0-react';

import Cards from '../../components/card/card';

import { useDispatch, useSelector } from 'react-redux';
import { fetchList } from '../../store/listSlice';

export const MyList = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.list.data);
  
  const { user, isAuthenticated } = useAuth0();

  let mail = '';
  if(isAuthenticated){
    mail=user.email
  }

  useEffect(() => {
    dispatch(fetchList({ email: mail }));
  }, [dispatch]); 

  return (
    <>
    {
      data.length > 0 ? (
        <div className="movie__list">
        <h2 className="list__title">My List</h2>
        <div className="list__cards">
                {
                    data.map(movie => (
                        <Cards movie={movie} type={movie.hasOwnProperty('seasons') ? "tv" : "movie"}/>
                    ))
                }
        </div>
    </div>
      ):(
        <div className="movie__list">
        <h2 className="list__title">Your List is empty</h2>
        </div>
      )
    }
       
    </>
  );
}
