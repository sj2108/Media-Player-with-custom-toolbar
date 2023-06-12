import React from 'react'
import PropTypes from 'prop-types'

import { EMPTY_OBJECT, EMPTY_STRING, _noop } from '../../../app.constants';
import { NONE, PLAYBACK_SPEED } from './settingsPlaybackSpeed.constants';

function SettingsPlaybackSpeed(props) {
    const {
        settingSectionData,
        sectionChangeHandler,
        speedChangeClickHandler,
        selectedSection,
        speed
    } = props;

  return (
    <>
        <p onClick={() => { sectionChangeHandler(NONE) }}>{selectedSection}</p>
        <hr />
        {
            settingSectionData[PLAYBACK_SPEED].map(option => {
                return (<p onClick={() => { speedChangeClickHandler(option) }} >{option} {option === speed + 'x' && <img alt='tick' src='./icons/tick.svg' />} </p>)
            }
            )
        }
    </>
  )
}

SettingsPlaybackSpeed.propTypes = {
    settingSectionData:PropTypes.object,
    sectionChangeHandler:PropTypes.func,
    speedChangeClickHandler:PropTypes.func,
    speed:PropTypes.number,
    selectedSection:PropTypes.string,
};
  
SettingsPlaybackSpeed.defaultProps = {
    settingSectionData:EMPTY_OBJECT,
    sectionChangeHandler:_noop,
    speedChangeClickHandler:_noop,
    speed:0,
    selectedSection:EMPTY_STRING,
};

export default SettingsPlaybackSpeed;
