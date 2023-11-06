import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Review({ handleCloseReview }) {

  return (
    <div className="overlay">
    <div className="container my-5 py-5 text-dark">
      <div className="row d-flex justify-content-center">
        <div className="col-md-10 col-lg-8 col-xl-6">
        <div className="card position-relative" style={{ backgroundColor: 'rgba(0, 0 , 0, 0.5)' }}>
            <div className="card-body p-2">
              <div className="d-flex flex-start w-100">
                <img className="rounded-circle shadow-1-strong me-3"
                  src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(21).webp" alt="avatar" width="35"
                  height="35" />
                <div className="position-absolute top-0 end-0" onClick={handleCloseReview}>
                  <FontAwesomeIcon icon={faTimes} size="lg" style={{color: "#d72d0f"}}/>
                </div>
                <div className="w-100">
                  <h5 className="text-danger">Your Review</h5>
                  <div className="form-outline">
                    <textarea className="form-control" id="textAreaExample" rows="4" placeholder="Write your review here"></textarea>
                  </div>
                  <div className="d-flex justify-content-center mt-3">
                    <button type="button" className="btn btn-danger">
                      Submit <i className="fas fa-long-arrow-alt-right ms-1"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Review;