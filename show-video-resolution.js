browser.runtime.onMessage.addListener(notify);

function notify() {
    const video= document.querySelector('video')
    alert(video ? `${video.videoWidth} x ${video.videoHeight}` : 'Could not get video element')
}

/*document.addEventListener('auxclick', () => {
    video = document.querySelector('video')
    browser.runtime.sendMessage({message: video ? 'video found' : 'video not found'})
})*/
