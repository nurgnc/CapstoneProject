/* eslint-disable react/prop-types */
import React from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';
// query
import { useQuery } from 'react-query';
// icons
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { BsBookmarkCheckFill, BsBookmarkCheck } from 'react-icons/bs';

import { addLike, removeLike } from '../store/likes';
import { addBookmark, removeBookmark } from '../store/bookmarks';

// css
import { Grid } from '../styles/baseStyles';
import {
  StyledCard,
  MovieLink,
  CardImg,
  CardBody,
} from '../styles/Card.styled';
import { fetchGenres, img300 } from '../api';
// default img
import defaultImg from '../assets/img/no-img.jpg';

function MovieCard({ movieData }) {
  const { likes, bookmarks, isLogin } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { data: movieGenres } = useQuery(
    'movieGenres',
    fetchGenres,
    {
      select: (data) => data.data.genres,
    },
  );

  const genres = movieGenres?.filter((genre) => movieData?.genre_ids?.includes(genre.id));

  const isLike = likes?.some((item) => item.id === movieData.id);
  const isBookmark = bookmarks?.some((item) => item.id === movieData.id);

  const noPicture = movieData.poster_path === null ? `${defaultImg}` : `${img300}${movieData?.poster_path}`;

  return (
    <StyledCard key={movieData?.id}>
      <CardImg>
        <img src={noPicture} alt={movieData?.title} />
      </CardImg>
      <CardBody>
        <Grid col={2}>
          {isLogin
            && (
              <>
                <div>
                  {
                    isLike
                      ? (
                        <IoIosHeart
                          size={25}
                          color="red"
                          onClick={() => dispatch(removeLike(movieData.id))}
                        />
                      )
                      : (
                        <IoIosHeartEmpty
                          size={25}
                          color="red"
                          onClick={() => dispatch(addLike(
                            movieData.id,
                            movieData.title,
                            noPicture,
                            movieData?.release_date,
                            genres,
                          ))}
                        />
                      )
                  }
                </div>
                <div>
                  {
                    isBookmark
                      ? (
                        <BsBookmarkCheckFill
                          size={25}
                          onClick={() => dispatch(removeBookmark(movieData.id))}
                        />
                      )
                      : (
                        <BsBookmarkCheck
                          size={25}
                          onClick={() => dispatch(addBookmark(
                            movieData.id,
                            movieData.title,
                            noPicture,
                            movieData?.release_date,
                            genres,
                          ))}
                        />
                      )
                  }
                </div>
              </>
            )}
        </Grid>
        <MovieLink to={`/movies/${movieData?.id}`}>{movieData?.title}</MovieLink>
        <p>{movieData?.release_date}</p>
        {genres?.map((item) => (
          <span>
            {item.name}
            {' '}
            ,
          </span>
        ))}
        <br />
        <b>
          Popularity:
          {' '}
          {movieData.popularity}
        </b>

      </CardBody>
    </StyledCard>
  );
}

export default MovieCard;
