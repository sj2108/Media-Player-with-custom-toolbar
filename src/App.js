import { useCallback, useEffect, useRef, useState } from 'react';

import VideoPlayer from './components/organisms/VideoPlayer/VideoPlayer';
import Toolbar from './components/organisms/Toolbar';
import Button from './components/atoms/Button';
import { SPEED_VS_QUALITY, videoSrc, keyBoardKeys, seekTime, volumeChange } from './app.constants';

function App() {
  // Refs
  const videoElement = useRef(null);
  const appContainer = useRef(null);

  // Quality
  const [intervalId, setIntervalId] = useState(null);
  const [isOnAutoQuality, setIsOnAutoQuality] = useState(false);
  const [quality, setQuality] = useState('720p');
  const [selectedQuality, setSelectedQuality] = useState('Auto');

  // Video states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  
  //  Handles Play and Pause 
  const playPauseHandler = useCallback(() => {
    setIsPlaying(prevState => {
      if (prevState) {
        setIsVisible(true);
        videoElement.current.pause();
      } else {
        setIsVisible(true);
        videoElement.current.play();
      }
      return !prevState;
    })
  }, [isPlaying])

  // Full Screen feature
  const enterFullScreen = () => {
    appContainer.current.classList.add('full-screen');
    setIsFullScreen(true);
  }
  
  const exitFullscreen = () => {
    appContainer.current.classList.remove('full-screen');
    setIsFullScreen(false);
  }

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen(prevState => {
      if (prevState) {
        exitFullscreen();
      } else {
        enterFullScreen();
      }
      return !prevState;
    })
  },[isFullScreen]);

  // Video seeking
  const forwardHandler = useCallback(() => {
    videoElement.current.currentTime += seekTime;
  }, [])
  const backwardHandler = useCallback(() => {
    videoElement.current.currentTime -= seekTime;
  }, [])

// Increase Volume from Keyboard
  const increaseVolumeHandler = () => {
    setVolume(prevState => {
      const newVolume = Math.min(prevState + volumeChange, 100);
      videoElement.current.volume = newVolume/100;
      return newVolume;
    })
  }

// Decrease Volume from Keyboard
  const decreaseVolumeHandler = () => {
    setVolume(prevState => {
      const newVolume = Math.max(prevState - volumeChange, 0);
      videoElement.current.volume = newVolume/100;
      return newVolume;
    })
  }

  const KEY_CODE_VS_FUNCTIONS = {
    [keyBoardKeys.backwardArrowKey]: backwardHandler,
    [keyBoardKeys.forwardArrowKey]: forwardHandler,
    [keyBoardKeys.spaceBarKey]: playPauseHandler,
    [keyBoardKeys.upwardArrowKey]: increaseVolumeHandler,
    [keyBoardKeys.downwardArrowKey]: decreaseVolumeHandler,
    [keyBoardKeys.endFullScreen]: exitFullscreen,
    [keyBoardKeys.fullScreenKey]: enterFullScreen,
  }

  // Function for keyboard keys pressed
  const handleKeyDown = useCallback((e) => {
    e.preventDefault();
    KEY_CODE_VS_FUNCTIONS[e.keyCode]();
  }, [backwardHandler, forwardHandler, playPauseHandler, isPlaying]);

  // Handles change in time and also landscape mode in mobile
  const handleTimeUpdate = (e) => {
    setCurrentTime(videoElement.current.currentTime);
  }

  const qualityChangeHandler = (newQuality) => {
    setQuality(prevstate => newQuality);
  }

  //  Function for changing speed of video
  const speedChangeHandler = (newSpeed) => {
    videoElement.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  }

  // Setting volume of the video
  const volumeChangeHandler = (e) => {
    videoElement.current.volume = e.target.value / 100;
    console.log(e.target.value);
    setVolume(e.target.value);
  }

  // Setting the time and speed after quality change
  useEffect(() => {
    videoElement.current.currentTime = currentTime;
    videoElement.current.playbackRate = speed;
  }, [quality])

  //  Set timeout for showing play and pause icons on the video screen
  useEffect(() => {
    let timer;
    if (isVisible) {
    timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isVisible]);

// Added time and keyboard clicks Event Listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    videoElement.current.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.current.volume = volume/100;
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [handleKeyDown]);

  useEffect(() => {
    if (isPlaying)
      videoElement.current.play();
    else
      videoElement.current.pause();
  }, [isPlaying])

  useEffect(()=>{
    if(selectedQuality==='Auto'){
      setIsOnAutoQuality(true);
    }else{
      setIsOnAutoQuality(false);
      setQuality(selectedQuality);
    }
  },[selectedQuality])

  

  const adjustVideoQuality = effectiveConnectionType => {
    qualityChangeHandler(SPEED_VS_QUALITY[effectiveConnectionType]);
  };

  const getEffectiveConnectionType = () => {
    var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    adjustVideoQuality(connection.effectiveType);
  };

  useEffect(() => {
    if (isOnAutoQuality) {
      const intervalID = setInterval(() => {
        getEffectiveConnectionType();
      }, 4999);
      setIntervalId(intervalID);
    } else {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isOnAutoQuality])

// Loading a new video 
  useEffect(() => {
    videoElement.current.onloadedmetadata = () => {
      setTotalDuration(videoElement.current.duration);
      if (isPlaying)
        videoElement.current.play();
      else
        videoElement.current.pause();
    }

  }, [isPlaying])

  return (
      <div className='app' ref={appContainer}>
        <VideoPlayer videoElement={videoElement} src={videoSrc[quality]} onClick={playPauseHandler} isFullScreen={isFullScreen} />
        <Toolbar 
          playPauseHandler={playPauseHandler}
          isPlaying={isPlaying}
          volume={volume}
          volumeChangeHandler={volumeChangeHandler}
          currentTime={currentTime}
          totalDuration={totalDuration}
          speed={speed}
          quality={quality}
          setSpeed={setSpeed}
          setQuality={setQuality}
          setIsPlaying={setIsPlaying}
          qualityChangeHandler={qualityChangeHandler}
          speedChangeHandler={speedChangeHandler}
          fullScreenHandler={toggleFullScreen}
          setIsLoaderVisible={setIsLoaderVisible}
          isLoaderVisible={isLoaderVisible}
          videoElement={videoElement} 
          appContainer={appContainer}
          setSelectedQuality={setSelectedQuality}
          selectedQuality={selectedQuality}
        />

        {(isVisible && !isLoaderVisible) && <Button path={!isPlaying ? "./icons/pause.svg" : "./icons/play.svg"} className="play-pause" />}
        {isLoaderVisible && <Button path="./icons/loader.svg" className="loader" />}
      </div>

  );
}

export default App;
