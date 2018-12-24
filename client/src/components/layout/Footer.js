import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer p-2 text-white text-center">
      <div className="container">
        <div className="row">
          <div className="copyright col-sm">
            &copy; {new Date().getFullYear()} VideoBurst
          </div>
          <div className="col-sm" />
          <div className="github-link text-info col-sm">
            <a
              href="https://github.com/apgsn/VideoBurst"
              target="_blank"
              rel="noopener noreferrer"
              alt="See code on Github"
            >
              See code on &nbsp;
              <i className="fab fa-github-alt" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
