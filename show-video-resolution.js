browser.runtime.onMessage.addListener(notify);

let updateInterval

function getStats(video, videoWidth, videoHeight) {
    return video ? `Resolution: <b>${videoWidth} x ${videoHeight}</b>` : 'Could not get video element';
}

function notify()  {
    let result = document.getElementById('video-res-div')
    if (result) {
        result.remove()
        clearInterval(updateInterval)
        return
    }

    const video= document.querySelector('video')

    let videoWidth
    let videoHeight

    const div = document.createElement('div')
    div.id = 'video-res-div'
    div.style.position = 'absolute'
    div.style.display = 'flex'
    div.style.justifyContent = 'center'
    div.style.alignItems = 'center'
    div.style.top = '1rem'
    div.style.left = '1rem'
    div.style.zIndex = video.style.zIndex + 1
    div.style.background = 'rgba(0 0 0 / 0.5)'
    div.style.color = 'white'
    div.style.padding = '1.2rem'
    div.style.borderRadius = '0.5rem'
    div.style.fontSize = '0.8rem'

    const closeCross = document.createElement('div')
    closeCross.innerText = 'x'
    closeCross.style.position = 'absolute'
    closeCross.style.top = '0.1rem'
    closeCross.style.right = '0.3rem'
    closeCross.onclick = notify
    closeCross.style.cursor = 'pointer'

    const p = document.createElement('p')
    p.innerHTML = getStats(video, video.videoWidth, video.videoHeight)

    const videoParent = video.parentElement
    videoParent.appendChild(div)
    div.appendChild(closeCross)
    div.appendChild(p)

    updateInterval = setInterval(() => {
        videoWidth = video?.videoWidth
        videoHeight = video?.videoHeight
        p.innerHTML = getStats(video, videoWidth, videoHeight)
    }, 1000)
}
