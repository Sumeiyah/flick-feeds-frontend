import React, { useState } from 'react'
import Review from './Review'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';

function PostComment() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    const increaseLikes = () => {
        if (!liked) {
            setLikes(likes + 1);
            setLiked(true);
        }
    }

    const [showReview, setShowReview] = useState(false);

    const handleReviewClick = () => {
      setShowReview(true);
    }

    const handleCloseReview = () => {
        setShowReview(false);
      };

    return (
        <div className="postcomment" style={{ backgroundColor: "black" }}>
            <div className="ms-5">
                <div className="text-light">
                    <img src='https://m.media-amazon.com/images/S/pv-target-images/473fd8bc878799c1a035cb13c688edd9eb6d240d426abf34e0bf3c1dde95724b.jpg' className='img-fluid mb-3 mt-5' alt="movie poster" style={{ height: "500px", width: "700px" }} />
                    <div className="mb-4">
                        <button type="button" class="btn btn-danger btn-sm me-3" disabled>Action</button>
                        <button type="button" class="btn btn-danger btn-sm me-3" disabled>Crime</button>
                        <button type="button" class="btn btn-danger btn-sm" disabled>Comedy</button>
                    </div>
                    <div style={{ position: "absolute", top: "13%", left: "60%" }}>
                        <h2 className="mb-3" style={{ fontFamily: "Consolas, Monospace", fontSize: "36px" }}>The Boys</h2>
                        <p className="mt-4 mb-4">Release Date: 2019</p>
                        <p className="mb-5" style={{ fontFamily: "Courier, Monospace" }}>A group of vigilantes set out to take down corrupt superheroes who abuse their superpowers.</p>
                        <h5 className="mt-4">RATINGS</h5>
                        <div class="d-flex align-items-center">
                            <span className="me-3"><span style={{ fontSize: "28px" }}>9.0</span>/10</span>
                            <FontAwesomeIcon icon={faStar} size="xl" style={{ color: "#fac505" }} />
                            <span className="ms-1">2.7k</span>
                        </div>
                        <h5 className="mt-4">YOUR RATINGS</h5>
                        <div className="star-rating mt-3">
                            {[...Array(5)].map((star, index) => {
                                index += 1;
                                return (
                                    <button
                                        type="button"
                                        style={{ fontSize: "30px" }}
                                        key={index}
                                        className={index <= (hover || rating) ? "on" : "off"}
                                        onClick={() => setRating(index)}
                                        onDoubleClick={() => {
                                            setRating(0);
                                            setHover(0);
                                        }}
                                        onMouseEnter={() => setHover(index)}
                                        onMouseLeave={() => setHover(rating)}
                                    >
                                        <span className="star">&#9733;</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div>
                <FontAwesomeIcon icon={faComment} size="lg" className="ms-2 text-light" />
                <span className="ms-3 text-danger" style={{ fontSize: "20px" }}>Comments and Reviews</span>
                
      <span
        className="text-danger"
        style={{
          fontSize: "18px",
          marginLeft: "23%",
          cursor: "pointer",
          transition: "background-color 0.3s"
        }}
        onClick={handleReviewClick}
        onMouseOver={(e) => e.target.style.backgroundColor = "hsla(349, 94%, 58%, 0.34)"}
        onMouseOut={(e) => e.target.style.backgroundColor = ""}
      >
        + Review
      </span>
      {showReview && <Review handleCloseReview={handleCloseReview} />}
      </div>

                <div class="d-flex justify-content-start mt-3 mb-5">
                    <div class="col-md-11 col-lg-9 col-xl-6">
                        <div class="card text-light" style={{ boxShadow: "5px 5px 10px grey", backgroundColor: "black" }}>
                            <div class="card-body">
                                <div class="d-flex flex-start align-items-center">
                                    <img class="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="35"
                                        height="35" />
                                    <div class="d-flex align-items-center">
                                        <h6 class="fw-bold text-secondary mb-0">Lily Coleman</h6>
                                        <p class="text-muted small mb-0 ms-4">
                                            November 01, 2023
                                        </p>
                                        <div style={{ marginLeft: "230px" }}>
                                            <FontAwesomeIcon
                                                icon={faHeart}
                                                size="lg"
                                                className={liked ? "text-danger ms-3" : "text-light ms-3"}
                                                onClick={increaseLikes}
                                            />
                                            <span className="like-count ms-2">{likes}</span>
                                        </div>

                                    </div>
                                </div>

                                <p class="mb-1 pb-1 ms-5">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                    quis nostrud exercitation ullamco laboris nisi ut aliquip consequat.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostComment;