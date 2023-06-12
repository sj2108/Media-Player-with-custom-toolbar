import React from 'react';
import PropTypes from 'prop-types';

import { EMPTY_OBJECT, EMPTY_STRING, _noop } from '../../../app.constants';
import { PLAYBACK_SPEED, QUALITY } from './settingNone.constants';

const SettingsNone = props => {
    const {
        settingSectionData,
        sectionChangeHandler,
        quality,
        speed,
        selectedQuality
    } = props;
  
  const values={
    [QUALITY]: quality,
    [PLAYBACK_SPEED]: speed
  }

  if(selectedQuality==='Auto'){
    values[QUALITY] = `Auto (${quality})`
  }

  return (
    <>
        {
          Object.keys(settingSectionData).map(section => <p className='setting-options' onClick={() => { sectionChangeHandler(section) }}> <span  >{section}</span><span>{values[section]}</span> </p>)
        }
    </>
  )
}

SettingsNone.propTypes = {
  settingSectionData:PropTypes.object,
  sectionChangeHandler:PropTypes.func,
  quality:PropTypes.string,
  speed:PropTypes.number,
  selectedQuality:PropTypes.string,
};

SettingsNone.defaultProps = {
  settingSectionData:EMPTY_OBJECT,
  sectionChangeHandler:_noop,
  quality:EMPTY_STRING,
  speed:0,
  selectedQuality:EMPTY_STRING,
};

export default SettingsNone
