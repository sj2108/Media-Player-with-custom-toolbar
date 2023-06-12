import React, { useEffect } from 'react';
import Hls from 'hls.js';
import PropTypes from 'prop-types';

import { getHlsConfig } from './videoPlayer.helpers';
import { EMPTY_OBJECT,EMPTY_STRING,_noop} from "../../../app.constants";

function VideoPlayer (props) {
    const {
        videoElement,
        src,
        onClick,
    } = props;

    useEffect(() => {
      const hls = new Hls(getHlsConfig(src));
      hls.attachMedia(videoElement.current);
      hls.loadSource(src);
      videoElement.current.play();
      return () => {
        hls.detachMedia();
        hls.stopLoad();
        hls.destroy();
      };
    }, [src]);

    return (
      <video ref={videoElement} onClick={onClick} preload="metadata" >
          <track kind="captions" srcLang="en" label="english_captions" />
      </video>
    )
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  videoElement: PropTypes.object,
  onClick: PropTypes.func,
};

VideoPlayer.defaultProps = {
  src: EMPTY_STRING,
  videoElement: EMPTY_OBJECT,
  onClick: _noop,
};

export default VideoPlayer;