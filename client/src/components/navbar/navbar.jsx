import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/solar/bootstrap.min.css';
import styles from "./navbar.module.css";
import { getImageUrl } from "../../utils";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-transparente" data-bs-theme="dark" style={{ background: 'rgba(0, 0, 0, 0)' }}>
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        <img src={getImageUrl("navbar/logo.png")}/>
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto" style={{ fontSize: '1.5rem' }}>
          <li className="nav-item">
            <a className="nav-link active" href="/">
              Home
              <span className="visually-hidden">(current)</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/facilities">
              Facilities
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/rooms">
              Room
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/contacts">
              Contact-us
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};