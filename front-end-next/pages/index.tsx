import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../components/mainContext/globalData'
import styles from '../styles/Home.module.css'
import PageTransition from '../components/animation/pageTransition'
import { mainStartSVG, mainEndSVG } from '../components/svgs/mainSVG';
export default function Home() {


  return (
    <div className={styles.container}>
      <PageTransition startSVG={mainStartSVG} endSVG={mainEndSVG}>
        <div className='main-container flex-start'>
          <div className='home-container glass-background'>

          </div>
        </div>
      </PageTransition>
    </div>)
}
