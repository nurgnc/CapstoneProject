/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
// query
import { useQuery } from 'react-query';
import { fetchReviews, img300 } from '../api';
// css
import { CardReview, ImgReview, CardReviewBody } from '../styles/Card.styled';

function MovieReviews({ movieId }) {
  const {
    data: movieReviews,
  } = useQuery(['movieReviews', movieId], () => fetchReviews(movieId), {
    select: (data) => data.data.results,
  });
  const reviews = movieReviews?.slice(0, 1);
  // const avatar = console.log(avatar);

  if (Array.isArray(movieReviews) && !movieReviews.length) {
    return (
      <>
        <h2>Reviews</h2>
        <span>No comments yet...</span>
      </>
    );
  }
  return (
    <>
      <h2>Reviews</h2>
      {reviews.filter((item) => item.author_details.avatar_path.includes('http')).map((img) => (
        <ImgReview src={img.author_details.avatar_path.split('/')[0]} alt={img.author} />
      ))}
      {reviews?.map((item) => (
        <CardReview>
          <div>
            <ImgReview src={`${img300}${item.author_details.avatar_path}`} alt={item.author} />
          </div>
          <CardReviewBody>
            <h3>{item.author}</h3>
            <p>{item.content}</p>
          </CardReviewBody>
        </CardReview>
      ))}
    </>
  );
}

MovieReviews.propTypes = {
  movieId: PropTypes.number,

};
MovieReviews.defaultProps = {
  movieId: '',
};
export default MovieReviews;
