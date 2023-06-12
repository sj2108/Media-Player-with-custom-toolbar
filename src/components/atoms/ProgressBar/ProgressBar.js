import React, { useCallback } from 'react'
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { EMPTY_OBJECT, _noop } from '../../../app.constants';

const ProgressBar = props => {
  const {
      currentTime,
      totalDuration,
      videoElement,
      setIsLoaderVisible,
      isLoaderVisible,
      appContainer,
  } = props;
  
  const progressbarRef = useRef(null);
  const bufferbarRef = useRef(null);
  const progressbarContainer = useRef(null);


  useEffect(()=>
  {
    const percentage = (currentTime*100)/totalDuration;
    progressbarRef.current.style.width = percentage+'%';
    if(videoElement.current.buffered.length){
      const bufferEnd = videoElement.current.buffered.end(videoElement.current.buffered.length-1);
      bufferbarRef.current.style.width = Math.floor((bufferEnd * 100) / totalDuration) + '%';
      if(!isLoaderVisible){
        videoElement.current.onwaiting = (event)=>{
          setIsLoaderVisible(true);
        }
      }
      else{
        videoElement.current.onplaying = (event) => {
          setIsLoaderVisible(false);
        }
      }
    }
  },[currentTime,totalDuration,isLoaderVisible,videoElement,setIsLoaderVisible])

  const progressbarMouseDownHandler = (e) => {
    appContainer.current.addEventListener('mousemove',mouseMoveHandler);
    progressbarChangeHandler(e);
  }

  const progressbarChangeHandler = useCallback((e) => {
    const clickX = e.clientX;
    const divWidth = progressbarContainer.current.offsetWidth;
    const clickPercent = (clickX / divWidth) * 100;
    const time = (totalDuration * clickPercent) / 100;
    videoElement.current.currentTime = time;
  },[videoElement,progressbarContainer,totalDuration])

  const mouseMoveHandler = useCallback((e) => {
    progressbarChangeHandler(e);
  },[progressbarChangeHandler])
  
  useEffect(()=>{ 
    const mouseUpHandler = () => {
      if(appContainer.current)
      appContainer.current.removeEventListener('mousemove', mouseMoveHandler);
    }

    window.addEventListener('mouseup',mouseUpHandler);
  },[appContainer,mouseMoveHandler])

  return (
    <div ref={progressbarContainer} className='progressbar-container' onMouseDown={progressbarMouseDownHandler}>
      <div ref={bufferbarRef} className='bufferbar'></div>
      <div ref={progressbarRef} className='progressbar'></div>
    </div>
  )
}


ProgressBar.propTypes = {
  currentTime: PropTypes.number,
  totalDuration: PropTypes.number,
  videoElement: PropTypes.object,
  setIsLoaderVisible: PropTypes.func,
  isLoaderVisible: PropTypes.bool,
  appContainer: PropTypes.object,
};

ProgressBar.defaultProps = {
  currentTime: 0,
  totalDuration: 0,
  videoElement: EMPTY_OBJECT,
  setIsLoaderVisible: _noop,
  isLoaderVisible: false,
  appContainer: EMPTY_OBJECT,
};


export default ProgressBar;
