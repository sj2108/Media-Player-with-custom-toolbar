import React from "react";
import PropTypes from 'prop-types';

import Button from "../../atoms/Button";
import ProgressBar from "../../atoms/ProgressBar";
import SettingMenu from "../../molecules/SettingMenu";
import VolumeControler from "../../molecules/VolumeControler";
import { formatTime } from "../../../app.helper";
import { EMPTY_OBJECT,EMPTY_STRING,_noop} from "../../../app.constants";

const Toolbar = props => {

    const {
        playPauseHandler,
        isPlaying,
        volume,
        volumeChangeHandler,
        currentTime,
        totalDuration,
        speed,
        quality,
        setSpeed,
        setQuality,
        qualityChangeHandler,
        speedChangeHandler,
        videoElement,
        fullScreenHandler,
        setIsLoaderVisible,
        isLoaderVisible,
        appContainer,
        setSelectedQuality,
        selectedQuality
    } = props

    return (
        <div className="toolbar">
            <ProgressBar currentTime={currentTime} videoElement={videoElement} totalDuration={totalDuration} setIsLoaderVisible={setIsLoaderVisible} isLoaderVisible={isLoaderVisible} appContainer={appContainer} />
            <div className="inner-toolbar">
                <div className="inner-toolbar-left">
                    <Button className="icons" path={isPlaying ? "./icons/pause.svg" : "./icons/play.svg"} onClick={playPauseHandler} />
                    <Button className="icons" path='./icons/next.svg' />
                    <VolumeControler volume={volume} volumeChangeHandler={volumeChangeHandler} />
                    <p >{formatTime(currentTime.toFixed(0))}/{formatTime(totalDuration.toFixed(0))}</p>
                </div>
                <div className="inner-toolbar-right">
                    <SettingMenu speed={speed} quality={quality} setSpeed={setSpeed} setQuality={setQuality} qualityChangeHandler={qualityChangeHandler} speedChangeHandler={speedChangeHandler} appContainer={appContainer} setSelectedQuality={setSelectedQuality}selectedQuality={selectedQuality} videoElement={videoElement}/>
                    <Button className="icons" path='./icons/fullScreen.svg' onClick={fullScreenHandler} />
                </div>
            </div>
        </div>
    )

}

Toolbar.propTypes = {
    playPauseHandler: PropTypes.func,
    isPlaying: PropTypes.bool,
    volume: PropTypes.number,
    volumeChangeHandler: PropTypes.func,
    currentTime: PropTypes.number,
    totalDuration: PropTypes.number,
    speed: PropTypes.number,
    quality: PropTypes.string,
    setSpeed: PropTypes.func,
    setQuality: PropTypes.func,
    qualityChangeHandler: PropTypes.func,
    speedChangeHandler: PropTypes.func,
    videoElement: PropTypes.object,
    fullScreenHandler: PropTypes.func,
    setIsLoaderVisible: PropTypes.func,
    isLoaderVisible: PropTypes.bool,
    appContainer: PropTypes.object,
    setSelectedQuality: PropTypes.func,
    selectedQuality: PropTypes.string,
};

Toolbar.defaultProps = {
    playPauseHandler: _noop,
    isPlaying: false,
    volume: 0,
    volumeChangeHandler: _noop,
    currentTime: 0,
    totalDuration: 0,
    speed: 0,
    quality: EMPTY_STRING,
    setSpeed: _noop,
    setQuality: _noop,
    qualityChangeHandler: _noop,
    speedChangeHandler: _noop,
    videoElement: EMPTY_OBJECT,
    fullScreenHandler: _noop,
    setIsLoaderVisible: _noop,
    isLoaderVisible: false,
    appContainer: EMPTY_OBJECT,
    setSelectedQuality: _noop,
    selectedQuality: EMPTY_STRING,
};

export default Toolbar;