import React from 'react'
import styles from './preloader.module.css'
import isFetchingSVG from '../assets/isFetching.svg'

const Preloader = () => { 
  return (
    <div className={styles.preloaderWrapper}>
      <img src={isFetchingSVG} alt='preloader' className={styles.preloaderImage} />
    </div>
  )
};

export default Preloader;