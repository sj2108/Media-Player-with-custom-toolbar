import React from 'react'
import PropTypes from 'prop-types'

import { EMPTY_OBJECT, EMPTY_STRING, _noop } from '../../../app.constants';
import { NONE, QUALITY } from './settingsQuality.constants';

function SettingsQuality(props) {
    const {
        settingSectionData,
        sectionChangeHandler,
        qualityChangeClickHandler,
        selectedSection,
        quality
    } = props;
    
    return (
        <>
            <p onClick={() => { sectionChangeHandler(NONE) }}>{selectedSection}</p>
            <hr />
            {
                settingSectionData[QUALITY].map(option => {
                    return (<p onClick={() => { qualityChangeClickHandler(option) }} >{option} {option === quality && <img alt='tick' src='./icons/tick.svg' />} </p>)
                }
                )
            }
        </>
    )
}

SettingsQuality.propTypes = {
    settingSectionData:PropTypes.object,
    sectionChangeHandler:PropTypes.func,
    qualityChangeClickHandler:PropTypes.func,
    selectedSection:PropTypes.string,
    quality:PropTypes.string,
};
  
SettingsQuality.defaultProps = {
    settingSectionData:EMPTY_OBJECT,
    sectionChangeHandler:_noop,
    qualityChangeClickHandler:_noop,
    selectedSection:EMPTY_STRING,
    quality:EMPTY_STRING,
};

export default SettingsQuality;
