import React, { useEffect } from 'react';
// router
import { useParams } from 'react-router-dom';
// aos
import Aos from 'aos';
import 'aos/dist/aos.css';
// query
import { useQuery } from 'react-query';
import { fetchMovie, img500 } from '../api';
// css
import { Container, MarginVertical, Grid } from '../styles/baseStyles';
// components
import {
  MovieCast, MovieRecommendations, MovieReviews, MovieCrew,
} from '../components';

function MovieDetail() {
  const { movieId } = useParams();
  const {
    data: movieData,
  } = useQuery(['movie', movieId], () => fetchMovie(movieId), {
    select: (data) => data.data,
  });

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Container>
      <MarginVertical>
        <Grid col={2}>
          <img src={`${img500}${movieData?.poster_path}`} alt="" />
          <div>
            <h1>{movieData?.title}</h1>
            <div>
              Türler:
              {movieData?.genres.map((genre) => (
                <span key={genre.id}>
                  {genre.name}
                  ,
                  {' '}
                </span>
              ))}
              <span>
                ----
                {movieData?.release_date}
              </span>
              <span>
                -----
                {movieData?.runtime}
              </span>
            </div>
            <div>
              <p>{movieData?.tagline}</p>
              <p>{movieData?.overview}</p>
            </div>
            <div>
              <MovieCrew movieId={movieId} />
            </div>
            <div />
          </div>
        </Grid>
      </MarginVertical>
      <MarginVertical data-aos="fade-right">
        <MovieCast movieId={movieId} />
      </MarginVertical>
      <MarginVertical data-aos="fade-left">
        <MovieReviews movieId={movieId} />
      </MarginVertical>
      <MarginVertical data-aos="fade-up">
        <MovieRecommendations movieId={movieId} />
      </MarginVertical>
    </Container>
  );
}

export default MovieDetail;
