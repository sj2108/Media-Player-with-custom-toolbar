import React, { useState } from "react";
import PropType from 'prop-types';

import Button from "../../atoms/Button";
import Slider from "../../atoms/Slider";
import { _noop } from "../../../app.constants";

const VolumeControler = props => {
    const {
        volume,
        volumeChangeHandler
    } = props;

    const [displayVolumeSlider, setDisplayVolumeSlider] = useState(false);

    const mouseEnterHandler = () => {
        setDisplayVolumeSlider(true);
    }

    const mouseLeveHandler = () => {
        setDisplayVolumeSlider(false);
    }

    return (
        <div className="volume-control-container" onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeveHandler}>
            <Button className="icons" path='./icons/volume.svg'  />
            { displayVolumeSlider && <Slider value={volume} onChange={volumeChangeHandler} className='volume-slider'/> }
        </div>
    )
}

VolumeControler.propTypes = {
    volume: PropType.number,
    volumeChangeHandler: PropType.func,
};
  
VolumeControler.defaultProps = {
    volume: 0,
    volumeChangeHandler: _noop,
};
  

export default VolumeControler;