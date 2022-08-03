import styles from './index.module.css';
import Logo from '../../public/p8Wordmark_sm.svg';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import React, { FunctionComponent } from 'react'

const Navbar: FunctionComponent = () => {
  return (
    <div className={styles.navbar}>
      <div className="container">
        <div className={styles.nav}>
          <Image src={Logo} alt="Logo"/>
          <FontAwesomeIcon icon={faBars} fontSize="20px"/>
        </div>
      </div>
    </div>
  )
}

export default Navbar
