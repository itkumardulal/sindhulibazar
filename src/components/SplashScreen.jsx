import React from "react";

const SplashScreen = () => {
  return (
    <>
      <style>
        {`
          @keyframes fadeInPulse {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .splash-container {
            height: 100vh;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(135deg, #FBA518, #F9CB45);
            flex-direction: column;
          }

          .logo {
            width: 120px;
            height: 120px;
            animation: fadeInPulse 2s ease-in-out forwards;
          }

          .title {
            color: #fff;
            margin-top: 16px;
            font-family: Arial, sans-serif;
            font-size: 28px;
            font-weight: 700;
            animation: fadeInPulse 2s ease-in-out forwards;
            animation-delay: 0.3s;
          }
        `}
      </style>

      <div className="splash-container">
        <img
          src="https://raw.githubusercontent.com/itkumardulal/sindhulibazar/e57d5d19dab393b717e70a9801fb57fb988c28c5/public/mainlogo3.png"
          alt="logo"
          className="logo"
        />
        <h2 className="title">SINDHULIBAZAR.COM</h2>
      </div>
    </>
  );
};

export default SplashScreen;
