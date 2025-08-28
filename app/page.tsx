// File: pages/index.js
'use client'
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
// import styles from '../styles/Home.module.css';

export default function Home() {
    const [isLightOn, setIsLightOn] = useState(false);
    const [isBoxOpened, setIsBoxOpened] = useState(false);

    return (
        <div></div>
        // <div className={isLightOn ? styles.light : styles.dark}>
        //     <Head>
        //         <title>Birthday Surprise</title>
        //     </Head>

        //     <button onClick={() => setIsLightOn(!isLightOn)}>
        //         {isLightOn ? 'Turn Off' : 'Turn On'} Lights
        //         <Image src="/lamp.svg" alt="Lamp" width={24} height={24} />
        //     </button>

        //     {isLightOn && (
        //         <div>
        //             <button onClick={() => setIsBoxOpened(true)}>
        //                 Open Surprise Box
        //                 <Image src="/box.svg" alt="Box" width={48} height={48} />
        //             </button>
        //         </div>
        //     )}

        //     {isBoxOpened && (
        //         <div>
        //             <p>Happy Birthday! 🎉</p>
        //             {/* Insert more interactions and animations here */}
        //         </div>
        //     )}
        // </div>
    );
}
