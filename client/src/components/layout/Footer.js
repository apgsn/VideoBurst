import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer p-2 bg-dark text-white text-center">
      <div className="container">
        <div className="row">
          <div className="copyright col-sm">
            &copy; {new Date().getFullYear()} VideoBurst
          </div>
          <div className="col-sm" />
          <div className="github-link text-info col-sm">
            <a
              href="https://github.com/apgsn"
              target="_blank"
              rel="noopener noreferrer"
              alt="See on Github"
            >
              See on <i class="fab fa-github-alt" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
