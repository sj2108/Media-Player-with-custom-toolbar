import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Button from '../../atoms/Button'
import SettingDropdown from '../SettingDropdown'
import { QUALITIES, PLAYBACK_SPEEDS } from './settingMenu.constants';
import { EMPTY_OBJECT, EMPTY_STRING, _noop } from '../../../app.constants';

const SettingMenu = props => {
  const {
    quality,
    speed,
    qualityChangeHandler,
    speedChangeHandler,
    appContainer,
    setSelectedQuality,
    selectedQuality,
  } = props;

  function onSettingClickHandler()
  {
    setIsSettingVisible(prevState => !prevState);
  }

  const [isSettingVisible,setIsSettingVisible]= useState(false);

  const settingSectionData = {
    Quality: QUALITIES,
    PlaybackSpeed: PLAYBACK_SPEEDS,
  }

  return (
    <>
      <Button className="icons setting-icons" path='./icons/setting.svg' onClick={onSettingClickHandler}/>
      {
        isSettingVisible && 
        < SettingDropdown 
        settingSectionData={settingSectionData} 
        speed={speed}
        quality={quality} 
        qualityChangeHandler={qualityChangeHandler}
        speedChangeHandler={speedChangeHandler} 
        onSettingClickHandler={onSettingClickHandler} 
        appContainer={appContainer}
        setSelectedQuality={setSelectedQuality}
        selectedQuality={selectedQuality}
        />
      }
    </>
  )
}

SettingMenu.propTypes = {
  speed: PropTypes.number,
  quality: PropTypes.string,
  speedChangeHandler: PropTypes.func,
  appContainer: PropTypes.object,
  setSelectedQuality: PropTypes.func,
  selectedQuality: PropTypes.string,
  qualityChangeHandler: PropTypes.func,
};

SettingMenu.defaultProps = {
  speed: 0,
  quality: EMPTY_STRING,
  speedChangeHandler: _noop,
  appContainer: EMPTY_OBJECT,
  setSelectedQuality: _noop,
  selectedQuality: EMPTY_STRING,
  qualityChangeHandler: _noop,
};

export default SettingMenu;
