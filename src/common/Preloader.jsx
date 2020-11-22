import React from "react";
import classes from "./preloader.module.css";
import isFetchingSVG from "../assets/isFetching.svg";

const Preloader = () => { 
  return <div className={classes.preloaderWrapper}>
    <img src={isFetchingSVG} alt={isFetchingSVG} />
  </div>
};

export default Preloader;