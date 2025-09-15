import React from "react";

const SplashScreen = () => {
  return (
    <>
      <style>
        {`
          @keyframes logo3DSpin {
            0% {
              opacity: 0;
              transform: rotateY(-180deg) scale(0.5);
            }
            50% {
              opacity: 1;
              transform: rotateY(20deg) scale(1.1);
            }
            100% {
              opacity: 1;
              transform: rotateY(0deg) scale(1);
            }
          }

          @keyframes titleSlideUp {
            0% {
              opacity: 0;
              transform: translateY(40px) scale(0.9);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          .splash-container {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: radial-gradient(circle at center, #FBA518, #F97300);
            flex-direction: column;
            perspective: 1000px; /* Needed for 3D effect */
          }

          .logo {
            width: 150px;
            height: 150px;
            animation: logo3DSpin 1.8s ease-in-out forwards;
            transform-style: preserve-3d;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
            border-radius: 50%;
            background: white url('https://i.imgur.com/kBxK8jj.png') center/cover no-repeat;
          }

          .title {
            color: white;
            margin-top: 20px;
            font-family: 'Arial Black', sans-serif;
            font-size: 30px;
            font-weight: bold;
            letter-spacing: 2px;
            text-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
            animation: titleSlideUp 1s ease-out forwards;
            animation-delay: 1.2s;
            opacity: 0;
          }
        `}
      </style>

      <div className="splash-container">
        <div className="logo"></div>
        <div className="title">SINDHULI BAZAR</div>
      </div>
    </>
  );
};

export default SplashScreen;
