import React from 'react'

import styles from './navbar.module.css';

import Button from '../button';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.inner}>
        <img className={styles.logo} src="/p8Wordmark_sm.svg" />
        <Button className={styles.menu}>
          <img src="/menu.svg" />
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
