import { Player, Controls } from '@lottiefiles/react-lottie-player';

import { useState, useEffect } from 'react';

const LoadingPage = () => {
  const [points, setPoints] = useState('');

  const [done, setDone] = useState(false);

  //   useEffect(() => {
  //     if (!done) {
  //       setDone(true);
  //       setInterval(() => {
  //         setPoints(old => {
  //           let text = '';

  //           if (old.length < 4) {
  //             text = `${old + '.'}`;
  //           } else {
  //             text = '';
  //           }

  //           return text;
  //         });
  //       }, 1000);
  //     }
  //   }, [done]);

  return (
    <div className="flex !w-[100vw]  flex-col items-center justify-center theme-a !max-w-[500px] !px-[50px] !-mt-[80px]">
      <div>
        <Player
          className="!-mt-[100px] "
          autoplay
          loop
          src="/loading-anim.json"
          style={{ width: '100%' }}
        >
          <Controls
            visible={false}
            buttons={['play', 'repeat', 'frame', 'debug']}
          />
        </Player>
        <h1 className="!text-5xl lg:!text-[60px] relative text-center  !-mt-[50px] lg:!-mt-[100px] !font-bold">
          Construindo seu site...
        </h1>
        <p className="text-center !font-normal text-zinc-400 mt-3 !text-lg lg:!text-[25px]">
          Em breve seu site novinho estará disponível para você
        </p>
      </div>

      <p className="text-center !font-normal text-zinc-500 mt-[50px] !text-lg lg:!text-[25px]">
        Por ByDuo - Sites Inteligentes
      </p>
    </div>
  );
};

export default LoadingPage;
