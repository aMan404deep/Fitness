import React, { useEffect } from 'react';
import '../styles/Banner.css';
import { gsap } from 'gsap';

const Banner = () => {
    useEffect(() => {
        // GSAP animation for the marquee
        gsap.to(".marque", {
            xPercent: -100,
            duration: 10,
            repeat: -1,
            ease: "linear"
        });

        // GSAP animation for the image rotation
        gsap.to(".marque img", {
            rotate: 360,
            duration: 10,
            repeat: -1,
            ease: "linear"
        });
    }, []);

    return (
        <div id="page2">
            <div id="move">
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                <div className="marque">
                    <h1>ACHIEVE YOUR FITNESS GOALS</h1>
                    <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" />
                </div>
                
            </div>
        </div>
    );
}

export default Banner;
