// import addQueryParams from '@tekion/tekion-base/utils/addQueryParams';

import { START_POSITION, MAX_BUFFER_LENGTH, MAX_MAX_BUFFER_LENGTH, BACK_BUFFER_LENGTH } from './videoPlayer.constants';

// const getXhrSetup = query => (xhr, url) => xhr.open('GET', addQueryParams(url, query), true);

export const getHlsConfig = query => ({
  debug: false,
  autoStartLoad: true,
  startPosition: START_POSITION,
  maxBufferLength: MAX_BUFFER_LENGTH,
  maxMaxBufferLength: MAX_MAX_BUFFER_LENGTH,
  backBufferLength: BACK_BUFFER_LENGTH,
//   xhrSetup: getXhrSetup(query),
});
