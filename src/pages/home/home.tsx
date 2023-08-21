import React from 'react';
import HomePage from '../../app/components/Homepage';
import styles from '../styles/home.module.css';


const Home = () => {
  return (
    <div className={styles.gridContainer}>
      <HomePage />
    </div>
  );
}


export default Home;