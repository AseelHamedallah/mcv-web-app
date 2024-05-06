import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1> Logo</h1>
      <nav>
        <ul className={styles.nav}>
          <li className={styles.navItem}>Home</li>
          <li className={styles.navItem}>About</li>
          <li className={styles.navItem}>Contact</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
