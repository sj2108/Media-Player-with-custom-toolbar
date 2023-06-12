export const SPEED_VS_QUALITY = {
    'slow-2g': '144p',
    '2g': '360p',
    '3g': '480p',
    '4g': '720p',
};

export const videoSrc = {
    '720p': 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
    '480p': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8',
    '360p': 'https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_fmp4/master.m3u8',
    '144p': 'https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.mp4/.m3u8',
}

export const keyBoardKeys = {
    backwardArrowKey: 37,
    forwardArrowKey: 39,
    spaceBarKey: 32,
    upwardArrowKey: 38,
    downwardArrowKey: 40,
    endFullScreen: 27,
    fullScreenKey: 70
}

export const seekTime = 10;
export const volumeChange = 1;

export const EMPTY_STRING = "";
export const EMPTY_OBJECT = {};
export const _noop = () => {};
