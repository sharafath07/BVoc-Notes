import React, { useContext } from "react";
import styled from "styled-components";

import { Context } from "../Context/Context";

const Loading = () => {
    const { isDark } = useContext(Context);

    return (
        <StyledWrapper $isDark={isDark}>
            <div className="backdrop" />

            <div className="loader">
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
                <div className="loader-square" />
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    position: fixed;
    inset: 0;
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden;

    .backdrop {
        position: absolute;
        inset: 0;

        background: ${({ $isDark }) =>
        $isDark
            ? "rgba(3, 7, 18, 0.72)"
            : "rgba(255, 255, 255, 0.65)"};

        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
    }

    .loader {
        position: relative;
        z-index: 1;

        width: 96px;
        height: 96px;

        transform: rotate(45deg);
    }

    @keyframes square-animation {
        0% {
            left: 0;
            top: 0;
        }

        10.5% {
            left: 0;
            top: 0;
        }

        12.5% {
            left: 32px;
            top: 0;
        }

        23% {
            left: 32px;
            top: 0;
        }

        25% {
            left: 64px;
            top: 0;
        }

        35.5% {
            left: 64px;
            top: 0;
        }

        37.5% {
            left: 64px;
            top: 32px;
        }

        48% {
            left: 64px;
            top: 32px;
        }

        50% {
            left: 32px;
            top: 32px;
        }

        60.5% {
            left: 32px;
            top: 32px;
        }

        62.5% {
            left: 32px;
            top: 64px;
        }

        73% {
            left: 32px;
            top: 64px;
        }

        75% {
            left: 0;
            top: 64px;
        }

        85.5% {
            left: 0;
            top: 64px;
        }

        87.5% {
            left: 0;
            top: 32px;
        }

        98% {
            left: 0;
            top: 32px;
        }

        100% {
            left: 0;
            top: 0;
        }
    }

    .loader-square {
        position: absolute;

        top: 0;
        left: 0;

        width: 28px;
        height: 28px;

        margin: 2px;

        border-radius: 5px;

        background: ${({ $isDark }) =>
        $isDark ? "#ffffff" : "#111111"};

        box-shadow: ${({ $isDark }) =>
        $isDark
            ? "0 4px 18px rgba(255, 255, 255, 0.12)"
            : "0 4px 18px rgba(0, 0, 0, 0.12)"};

        animation: square-animation 3.5s ease-in-out infinite both;
    }

    .loader-square:nth-of-type(1) {
        animation-delay: 0s;
    }

    .loader-square:nth-of-type(2) {
        animation-delay: -0.5s;
    }

    .loader-square:nth-of-type(3) {
        animation-delay: -1s;
    }

    .loader-square:nth-of-type(4) {
        animation-delay: -1.5s;
    }

    .loader-square:nth-of-type(5) {
        animation-delay: -2s;
    }

    .loader-square:nth-of-type(6) {
        animation-delay: -2.5s;
    }

    .loader-square:nth-of-type(7) {
        animation-delay: -3s;
    }
`;

export default Loading;