browser.runtime.onMessage.addListener(showOrCloseInfoWindow);

let updateInterval
let numVideoFrames = 0
const NO_VIDEO_MESSAGE = 'Could not find a video element'

function getStats(video) {
    if (!video) {
        return NO_VIDEO_MESSAGE
    }

    const videoWidth = video?.videoWidth
    const videoHeight = video?.videoHeight
    const quality = video.getVideoPlaybackQuality()
    const deltaFrames = numVideoFrames > 0 ? quality.totalVideoFrames - numVideoFrames : 'N/A'
    numVideoFrames = quality.totalVideoFrames
    return `<b>Resolution:</b> ${videoWidth} x ${videoHeight}<br>
            <b>Framerate: </b>${deltaFrames} FPS<br>
            <b>Dropped frames: </b>${quality.droppedVideoFrames} out of ${quality.totalVideoFrames}`
}

function showOrCloseInfoWindow()  {
    let result = document.getElementById('video-stats-div')
    if (result) {
        result.remove()
        numVideoFrames = 0
        clearInterval(updateInterval)
        return
    }
    const video= document.querySelector('video')
    const stats = getStats(video)
    if (stats === NO_VIDEO_MESSAGE) {
        alert(NO_VIDEO_MESSAGE)
        return
    }

    const div = document.createElement('div')
    div.id = 'video-stats-div'

    const closeCross = document.createElement('div')
    closeCross.id = 'close-cross'
    closeCross.onclick = showOrCloseInfoWindow

    const p = document.createElement('p')
    p.innerHTML = stats

    const videoParent = video.parentElement
    videoParent.appendChild(div)
    div.appendChild(closeCross)
    div.appendChild(p)

    updateInterval = setInterval(() => {
        p.innerHTML = getStats(video)
    }, 1000)
}
