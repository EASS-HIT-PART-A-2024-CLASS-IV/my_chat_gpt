import styled from '@emotion/styled';
import React, {useEffect, useState} from 'react';

const animations = {
    fadeIn: 'fadeIn 1s ease-out forwards',
    fadeOut: 'fadeOut 1s ease-out forwards',
    softSlideInLeft: 'softSlideInLeft 0.8s ease-out forwards',
    softSlideInRight: 'softSlideInRight 0.8s ease-out forwards',
    softSlideInUp: 'softSlideInUp 0.8s ease-out forwards',
    softSlideInDown: 'softSlideInDown 0.8s ease-out forwards',
    gentleZoomIn: 'gentleZoomIn 0.8s ease-out forwards',
    gentleZoomOut: 'gentleZoomOut 1.2s ease-out forwards',
    softRotateIn: 'softRotateIn 1.2s ease-out forwards',
    softBounceIn: 'softBounceIn 1.2s ease-out forwards',
    fadeInLeft: 'fadeInLeft 1s ease-out forwards',
    fadeInRight: 'fadeInRight 1s ease-out forwards',
    fadeInUp: 'fadeInUp 1s ease-out forwards',
    fadeInDown: 'fadeInDown 1s ease-out forwards',
    crossFadeIn: 'crossFadeIn 1.5s ease-out forwards',
    quickFlipInX: 'quickFlipInX 0.6s ease-out forwards',
    quickFlipInY: 'quickFlipInY 0.6s ease-out forwards',
    fadeSlideDown: 'fadeSlideDown 1s ease-out forwards',
    pulse: 'pulse 1.5s ease-in-out infinite',
};

const WrapperEffects = styled.div`
    animation: ${({isVisible, effect}) => isVisible ? animations[effect] : 'none'};
    @keyframes fadeIn {
        from {
            opacity: 0.5;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }

    @keyframes softSlideInLeft {
        from {
            transform: translateX(-200px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes softSlideInRight {
        from {
            transform: translateX(100px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes softSlideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes softSlideInDown {
        from {
            transform: translateY(-100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes gentleZoomIn {
        from {
            transform: scale(0.9);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes gentleZoomOut {
        from {
            transform: scale(1.5);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }

    @keyframes softRotateIn {
        from {
            transform: rotate(-360deg);
            opacity: 0;
        }
        to {
            transform: rotate(0deg);
            opacity: 1;
        }
    }

    @keyframes softBounceIn {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-30px);
        }
        60% {
            transform: translateY(-15px);
        }
    }

    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes crossFadeIn {
        0% {
            opacity: 0;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes quickFlipInX {
        from {
            opacity: 0;
            transform: rotateX(-90deg);
        }
        to {
            opacity: 1;
            transform: rotateX(0deg);
        }
    }

    @keyframes quickFlipInY {
        from {
            opacity: 0;
            transform: rotateY(-90deg);
        }
        to {
            opacity: 1;
            transform: rotateY(0deg);
        }
    }

    @keyframes fadeSlideDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;

const WarpEffect = ({children, effect, pageProps}) => {
    const [isVisible, setIsVisible] = useState(false);

    // This effect hook runs on mount and every time pageProps change
    useEffect(() => {
        setIsVisible(false); // Reset visibility to false to ensure animation can re-trigger
        const timeout = setTimeout(() => setIsVisible(true), 50); // Short delay to ensure re-triggering of animation
        return () => clearTimeout(timeout); // Cleanup timeout on component unmount or before running the effect again
    }, [pageProps]); // Dependency array includes pageProps to listen for changes


    useEffect(() => {
        setIsVisible(true);
    }, []);

    return <WrapperEffects isVisible={isVisible}
                           effect={effect}>
        {children}
    </WrapperEffects>;
};

export default WarpEffect;
