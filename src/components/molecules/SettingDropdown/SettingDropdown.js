import React, { useState } from 'react'
import PropTypes from 'prop-types';

import SettingsQuality from '../../atoms/SettingsQuality';
import SettingsNone from '../../atoms/SettingsNone';
import SettingsPlaybackSpeed from '../../atoms/SettingsPlaybackSpeed';
import { EMPTY_OBJECT, EMPTY_STRING, _noop } from '../../../app.constants';

function SettingDropdown(props) {
    const {
      settingSectionData,
      quality,
      speed,
      speedChangeHandler,
      onSettingClickHandler,
      appContainer,
      setSelectedQuality,
      selectedQuality,
    } = props;

    const [selectedSection, setSelectedSection] = useState('none');

    const sectionChangeHandler = (section) => {
      setSelectedSection(section)
    }

    const qualityChangeClickHandler = (quality) => {
      setSelectedQuality(quality);
      onSettingClickHandler();
    }

    const speedChangeClickHandler = (speed) => {
      speedChangeHandler(parseFloat(speed.split('x')[0]));
      onSettingClickHandler();
    }

    const sectionRender = {
      none:  <SettingsNone 
        settingSectionData={settingSectionData}
        sectionChangeHandler={sectionChangeHandler}
        speed={speed}
        quality={quality}
        selectedQuality={selectedQuality}
      />,
               
      Quality: <SettingsQuality 
        settingSectionData={settingSectionData} 
        sectionChangeHandler={sectionChangeHandler} 
        qualityChangeClickHandler={qualityChangeClickHandler}
        selectedSection={selectedSection}
        quality={selectedQuality} 
      />,
      
      PlaybackSpeed: <SettingsPlaybackSpeed
        settingSectionData={settingSectionData}
        sectionChangeHandler={sectionChangeHandler}
        speedChangeClickHandler={speedChangeClickHandler}
        selectedSection={selectedSection}
        speed={speed}
      
      />
    }

    const getSettingDropdownStyles = maxHeight => ({
      maxHeight: maxHeight/2+'px',
      overflow: 'auto',
    });

  return (
    <div className='settingDropdown' style={getSettingDropdownStyles(appContainer.current.offsetHeight)}>
        {sectionRender[selectedSection]}
    </div>
  )
}

SettingDropdown.propTypes = {
  speed: PropTypes.number,
  quality: PropTypes.string,
  speedChangeHandler: PropTypes.func,
  appContainer: PropTypes.object,
  setSelectedQuality: PropTypes.func,
  selectedQuality: PropTypes.string,
  onSettingClickHandler: PropTypes.func,
};

SettingDropdown.defaultProps = {
  speed: 0,
  quality: EMPTY_STRING,
  speedChangeHandler: _noop,
  appContainer: EMPTY_OBJECT,
  setSelectedQuality: _noop,
  selectedQuality: EMPTY_STRING,
  onSettingClickHandler: _noop,
};

export default SettingDropdown;
