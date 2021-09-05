const track = document.getElementById("track")
const thumbnail = document.getElementById("thumbnail")
const trackArtist = document.getElementById("track-artist")
const trackTitle = document.getElementById("track-title")
const progressBar = document.getElementById("progressBar")
const progressContainer = document.getElementById("play-timline")
const currentTime = document.getElementById("currentTime")
const durationTime = document.getElementById("durationTime")

let play = document.getElementById("play")
let pause = document.getElementById("pause")
let next = document.getElementById("next")
let prev = document.getElementById("prev")
trackIndex = 0
tracks = [
    "Marshmello-Anne-Marie-Friends-320.mp3",
    "G-Eazy- -Kehlani-Good-Life-320.mp3",
    "2Pac-To-Live-and-Die-In-L.A-320.mp3",
    "Selena-Gomez-People-You-Know-320.mp3",
    "King Avriel ft. A$AP Ferg- 20's 50's 100's.mp3"
]
thumbnails = [
    "cover.jpg",
    "cover2.jpg",
    "cover3.jpg",
    "cover4.jpg",
    "cover5.jpg"
]
trackArtists = ["Marshmello & Anne Marie","G-Eazy & Kehlani","2Pac","Selena Gomez","King Avriel ft. A$AP Ferg"]
trackTitles = ["Friends","Good life","To live and die in LA","People you know","20's 50's 100's"]
let playing = true
function pausePlay() {
    if (playing) {
        play.style.display = "none"
        pause.style.display = "block"
        thumbnail.style.transform = "scale(1.25)"
        track.play()
        playing = false
    } else {
        pause.style.display = "none"
        play.style.display = "block"
        thumbnail.style.transform = "scale(1)"
        track.pause()
        playing = true
    }
}
play.addEventListener("click", pausePlay)
pause.addEventListener("click", pausePlay)
track.addEventListener("click", nextTrack)

function nextTrack() {
    trackIndex++
    if (trackIndex > tracks.length - 1) {
        trackIndex = 0
    }
    track.src = tracks[trackIndex]
    thumbnail.src = thumbnails[trackIndex]
    trackArtist.textContent = trackArtists[trackIndex]
    trackTitle.textContent = trackTitles[trackIndex]
    playing = true
    pausePlay()
}
next.addEventListener("click", nextTrack)
track.addEventListener('ended', nextTrack)

function prevTrack() {
    trackIndex--
    if (trackIndex < 0) {
        trackIndex = tracks.length - 1
    }
    track.src = tracks[trackIndex]
    thumbnail.src = thumbnails[trackIndex]
    trackArtist.textContent = trackArtists[trackIndex]
    trackTitle.textContent = trackTitles[trackIndex]
    playing = true
    pausePlay()
}
prev.addEventListener("click", prevTrack)

function progressValue() {
    progressBar.max = track.duration
    progressBar.value = track.currentTime
    currentTime.textContent = formatTime(track.currentTime)
    durationTime.textContent = formatTime(track.duration)
}
setInterval(progressValue, 500)

function formatTime(sec) {
    let minutes = Math.floor(sec / 60)
    let seconds = Math.floor(sec - minutes * 60)
    if (seconds < 10) {
        seconds =  `0${seconds}`
    }
    return `${minutes}:${seconds}`
}

function changeProgressBar() {
    track.currentTime = progressValue.value
}

progressBar.addEventListener("click", changeProgressBar)

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = track.duration

    track.currentTime = (clickX / width) * duration
}

progressContainer.addEventListener('click', setProgress)
