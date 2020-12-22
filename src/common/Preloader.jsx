import React from 'react'
import styles from './preloader.module.css'
import fetchingSVG from '../assets/fetching.svg'

const Preloader = () => { 
  return (
    <div className={styles.preloaderWrapper}>
      <img src={fetchingSVG} alt='preloader' className={styles.preloaderImage} />
    </div>
  )
};

export default Preloader;