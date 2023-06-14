import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviesDetail from "../MoviesDetail/MoviesDetail";
import ExploreMovies from "../ExploreMovies";
import { getExploreMovieInPage } from "../store/action";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import "../../utils/pagination.css"
function Explore(props)
{
    const {MovieDetail, ExploreMovie} = useSelector(state =>state.infoMovies);
    const [movies, setMovies] = useState(null);
    const [next, setNext] = useState(null);
    const [previous, setPerious] = useState(null);
    const [count, setCount] = useState(null);
    const [current, setCurrent] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        props.onShowNavbar(true);
        props.onShowFooter(true);

      }, []);
    useEffect(()=> {
        if (ExploreMovie != null) {
            setMovies(ExploreMovie.results);
            setNext(ExploreMovie.next);
            setPerious(ExploreMovie.previous);
            setCount(ExploreMovie.count);
            setCurrent(ExploreMovie.current);
        } else {
            dispatch(getExploreMovieInPage(1));
        }
    },[ExploreMovie])


    useEffect(() => {
        if (ExploreMovie == null) {
          dispatch(getExploreMovieInPage(1));
        }
      }, []);
      const handlePageClick = (data) => {
        dispatch(getExploreMovieInPage(data.selected+1))
      };


return(

    <div>
        <ExploreMovies movies = {movies} next={next} previous = {previous} current = {current} count={count}/>
        <MoviesDetail movie={MovieDetail} showModal={MovieDetail ? true : false}/>
        <ReactPaginate
            className="react-paginate pagination"
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={Math.ceil(count/10)}
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
    </div>
)
}

export default Explore;