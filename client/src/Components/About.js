import React from "react";
import '../App.css';
import LandingNavigation2 from './LandingNavigation2'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faPhoneFlip } from "@fortawesome/free-solid-svg-icons";



const Style1 = {
  backgroundColor: "rgba(0, 0, 0, 0.2)",
};
const Style2 = {
  backgroundColor: "#23242a",
};

function About() {
  return (

    <>
    <LandingNavigation2 />
    <div class="container" >
      <footer class="text-white text-center text-lg-start ms-5" style={Style2}>
        <div class="container p-3">
          <div class="row mt-4">
            <div class="col-lg-4 col-md-12 mb-2 mb-md-0">
              <h5 class="text-uppercase mb-4">About Us</h5>
              <h4>
                Our Vision
              </h4>

              <p style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
                We envision a world where movie lovers, from casual to die-hard cinephiles
                can come together to explore, share and celebrate the wonderful world of cinema.
              </p>
              <p style={{ fontFamily: "Copperplate, Papyrus, fantasy", fontSize: "23px" }}>
                Join us to start your cinematic experience.
              </p>

              <div class="mt-4" style={{position: "relative", top: "-30%", left: "105%"}}>
                <a
                  className="btn btn-outline-light btn-floating m-4"
                  href="#!"
                  role="button"
                >
                  <FontAwesomeIcon icon={faYoutube} beat />
                </a>
                <a
                  className="btn btn-outline-light btn-floating m-4"
                  href="#!"
                  role="button"
                >
                  <FontAwesomeIcon icon={faTwitter} beat />
                </a>
                <a
                  className="btn btn-outline-light btn-floating m-4"
                  href="#!"
                  role="button"
                >
                  <FontAwesomeIcon icon={faInstagram} beat />
                </a>
              </div>
            </div>
            <div class="col-lg-4 col-md-8 mb-2 mb-md-0 ms-3">
              <h5 class="text-uppercase mb-4 pb-1">Contact Us</h5>
              <ul class="fa-ul">
                <li class="mb-3">
                  <span class="fa-li">
                    <FontAwesomeIcon icon={faBuilding} />
                  </span>
                  <span class="ms-2">City Square, 22170-00400, Nairobi</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>
                  <span class="ms-2">info@flickfeeds.com</span>
                </li>
                <li class="mb-3">
                  <span class="fa-li">
                    <FontAwesomeIcon icon={faPhoneFlip} />
                  </span>
                  <span class="ms-2">+25444621050</span>
                </li>
              </ul>
            </div>
            <div class="col-lg-3 col-md-5 mb-2 mb-md-0 ms-5">
              <ul class="list-unstyled mb-4 mt-5">
                <li class="mb-4">
                  <a class="text-white text-underline-hover" href="#">
                    Privacy Policy
                  </a>
                </li>
                <li class="mb-4">
                  <a class="text-white text-underline-hover" href="#">
                    Terms of Use
                  </a>
                </li>
                <li class="mb-4">
                  <a class="text-white text-underline-hover" href="#">
                    Help center
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center p-1 mt-n4" style={{Style1, marginTop : "-4.5rem" }}>
          All rights reserved.<br />
          © 2023 by FlickFeeds.com,Inc.
        </div>
      </footer>
    </div>
    </>
  );
}

export default About;
