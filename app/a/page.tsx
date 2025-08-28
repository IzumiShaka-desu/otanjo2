'use client'
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/box.module.scss';
interface Snowflake {
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    angle: number;
    angleVel: number;
    size: number;
    sizeOsc: number;
    spawn: (anyY?: boolean) => void;
    update: (elapsed: number, width: number, height: number) => void;
    render: (ctx: CanvasRenderingContext2D) => void;
}

export default function Home() {
    const [isLightOn, setIsLightOn] = useState(false);
    console.log(isLightOn)
    // if isLightOn is true, then remove the overlay dark class and show Home2 component
    if (isLightOn) {
        return <Home2 />;
    }
    return (
        <div className={isLightOn ? styles.light : styles.darkOverlay}>
            <div className={isLightOn ? styles.lightbtnc : `${styles.lightbtnc}`}>
                {/* button make a wish */}
                <div className={styles["make-wish"]}>
                    <button className={styles.lightbtn} onClick={() => {
                        setIsLightOn(true)
                    }}>Turn On Lamp</button>
                </div>
            </div>
        </div>
    );

}

function Home2() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isPresentOpen, setPresentOpen] = useState(false);
    const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
    const [maxSnowflakes, setMaxSnowflakes] = useState(100);
    const requestRef = useRef<number>();

    const [wished, setWished] = useState(false);

    const [messageDialogOpened, setMessageDialogOpened] = useState(false);

    // Utility function for random number generation
    const rand = (min: number, max: number): number => min + Math.random() * (max - min);

    // Snowflake class inside the component
    class SnowflakeImpl implements Snowflake {
        x!: number;
        y!: number;
        xVel!: number;
        yVel!: number;
        angle!: number;
        angleVel!: number;
        size!: number;
        sizeOsc!: number;

        constructor() {
            this.spawn();
        }

        spawn(anyY: boolean = false): void {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const { width, height } = canvas;
            this.x = rand(0, width);
            this.y = anyY ? rand(-50, height + 50) : rand(-50, -10);
            this.xVel = rand(-0.05, 0.05);
            this.yVel = rand(0.02, 0.1);
            this.angle = rand(0, Math.PI * 2);
            this.angleVel = rand(-0.001, 0.001);
            this.size = rand(7, 12);
            this.sizeOsc = rand(0.01, 0.5);
        }

        update(elapsed: number, width: number, height: number): void {
            const xForce = rand(-0.001, 0.001);

            if (Math.abs(this.xVel + xForce) < 0.075) {
                this.xVel += xForce;
            }

            this.x += this.xVel * elapsed;
            this.y += this.yVel * elapsed;
            this.angle += this.angleVel * elapsed;

            if (this.y - this.size > height || this.x + this.size < 0 || this.x - this.size > width) {
                this.spawn();
            }
        }

        render(ctx: CanvasRenderingContext2D): void {
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 0.2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
        }
    }

    // Handle canvas setup and resize
    useEffect(() => {
        function resize() {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            setMaxSnowflakes(Math.max(canvas.width / 10, 100));
        }

        window.addEventListener('resize', resize);
        resize();
        return () => window.removeEventListener('resize', resize);
    }, []);
    const [audio] = useState(new Audio('https://github.com/IzumiShaka-desu/otanjo/raw/main/public/hbd.mp3'));
    // when present is opened play music and snowflakes
    useEffect(() => {
        if (isPresentOpen) {
            audio.play();
        } else {
            audio.pause();
        }
    }, [isPresentOpen]);
    // Animation logic
    useEffect(() => {
        let lastNow = performance.now();

        const render = (now: number) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const elapsed = now - lastNow;
            lastNow = now;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (snowflakes.length < maxSnowflakes) {
                setSnowflakes(prev => [...prev, new SnowflakeImpl()]);
            }

            // ctx.fillStyle = ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            // ctx.fillStyle = ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.fillStyle = 'rgba(255, 10, 10, 0.5)';
            snowflakes.forEach(flake => {
                flake.update(elapsed, canvas.width, canvas.height);
                flake.render(ctx);
            });
            requestRef.current = requestAnimationFrame(render);
        };
        requestRef.current = requestAnimationFrame(render);
        return () => cancelAnimationFrame(requestRef.current ?? 0);
    }, [snowflakes, maxSnowflakes]);
    console.log(styles)
    return (
        <div>
            <div>


                <div className={`present ${isPresentOpen ? 'open' : ''}`} onClick={() => setPresentOpen(open => !open)}></div>
                <div className={`${styles.present} ${isPresentOpen ? styles.open : ''}`} onClick={() => setPresentOpen(open => !open)}>
                    {/* <div className={styles.name}> */}
                    <div className={styles.cake}>
                        <div className={styles.chocolate}></div>
                        <div className={styles["holder"]}></div>
                        <div className={styles["number-two"]}>
                            {/* <div className={styles["horizontal top"]}></div> */}
                            <div className={styles["curve-top"]}></div>
                            <div className={styles["curve"]}></div>
                            <div className={styles["curve-center"]}></div>
                            <div className={styles["curve-bottom"]}></div>
                            <div className={styles["line-bottom"]}></div>
                            <div className={styles["stick-bottom"]}></div>
                            <div className={`${styles.horizontal} ${styles.bottom}`}></div>
                            <div className={wished ? styles.flametwod : styles.flametwo}></div>
                            <div className={styles.ntstick}></div>

                        </div>
                        <div className={styles.candle}>
                            <div className={wished ? styles.flamed : styles.flame}></div>
                            <div className={styles["top-line"]}></div>

                            <div className={styles["bottom-line"]}></div>
                        </div>
                        {/* </div> */}
                        {/* <b>Gift:</b> Personalized Bathrobes <br />
                    <b>To:</b> Sora Miriam <br />
                    <b>From:</b> Chani and Shani */}
                    </div>

                    <div className={isPresentOpen ? styles["rotate-container-ds"] : styles["rotate-container"]}>
                        <div className={styles.bottom}></div>
                        <div className={styles.front}></div>
                        <div className={styles.left}></div>
                        <div className={styles.back}></div>
                        <div className={styles.right}></div>

                        <div className={styles.lid}>
                            <div className={styles["lid-top"]}></div>
                            <div className={styles["lid-front"]}></div>
                            <div className={styles["lid-left"]}></div>
                            <div className={styles["lid-back"]}></div>
                            <div className={styles["lid-right"]}></div>
                        </div>
                    </div>

                </div>
                <div className={isPresentOpen ? styles.banner : `${styles.banner} ${styles.out}`}>
                    <Image width={300} height={100} src={'https://raw.githubusercontent.com/IzumiShaka-desu/otanjo/main/public/happy.png'} alt={'banner'} />
                </div>
                <div className={isPresentOpen ? styles["baloon-container"] : `${styles["baloon-container"]} ${styles["ballt"]}`}>
                    <div className={styles.balloon}>
                    </div>
                    <div className={styles.balloon}>
                        <div className={styles.textball}>A</div>
                    </div>
                    <div className={styles.balloon}>
                        <div className={styles.textball}>M</div>
                    </div>
                    <div className={styles.balloon}>
                        <div className={styles.textball}>E</div>
                    </div>
                    <div className={styles.balloon}>
                        <div className={styles.textball}>L</div>
                    </div>
                    <div className={styles.balloon}>
                    </div>
                </div>
                <div className={isPresentOpen ? styles.mbtnc : `${styles.mbtnc} ${styles.dismb}`}>
                    {/* button make a wish */}
                    <div className={styles["make-wish"]}>
                        <button className={styles.mbtn} onClick={() => {
                            if (!wished) {
                                setWished(true)
                            } else {
                                if (!messageDialogOpened) {
                                    setMessageDialogOpened(true)
                                }
                            }
                        }}>{wished ? "read message" : "Make a wish"}</button>
                    </div>

                </div>
                <div className={messageDialogOpened ? styles.message : styles.messaged}>

                    <div className={styles.letter}>
                        <p>Today is as beautiful as other days</p>
                        <p>but you realize another year has gone</p>
                        <p>in a blink of the eyes</p>
                        <p>Do you know? today is just special,so special to you </p>
                        <p>May this lovely day bring happiness and all your wishes,hopes be granted soon, also all the trauma you have disappear.</p>
                        <p>I'm here to support you with whatever you need. So just tell me when you need something</p>
                        <p>I'm also happy and grateful to have known and been able to be close to you.</p>
                        <p>Happy birthday Yulia Amelia, wish you all the best</p>
                        <h3 className={styles.fromtag}>from</h3>
                        <h3 className={styles.fromtag}>[Saka]</h3>

                    </div>
                    {/* close button */}
                    <div style={
                        {
                            transform: "translateX(43%) translateY(50px)",
                            cursor: "pointer",
                        }
                    } onClick={() => setMessageDialogOpened(false)}>
                        [Tap to close]
                    </div>
                </div>
                <canvas ref={canvasRef}></canvas>


            </div>
        </div>
    );
}