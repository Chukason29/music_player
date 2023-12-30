// collecting elements
const playlistSongs = document.getElementById("playlist-songs")
const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")
const nextButton = document.getElementById("next")
const previousButton = document.getElementById("previous")
const shuffleButton = document.getElementById("shuffle")

// This array will hold all songs
//each song will be an object
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3",
    }
]