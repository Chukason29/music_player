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
    },
    {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3",
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3",
    }
]

// Creating an Audio object in javascript
const audio = new Audio()

// the userData object holds the current song playing at a time
//the songs property will hold the duplicate of allSongs for mutation purposes
let userData = {
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0,
}
const renderSongs = (array) => {
    const songsHTML = array.map(song => {
        return `
            <li id="song-${song.id}" class="playlist-song">
                <button class="playlist-song-info">
                    <span class="playlist-song-title">${song.title}</span>
                    <span class="playlist-song-artist">${song.artist}</span>
                    <span class="playlist-song-duration">${song.duration}</span>
                </button>
                <button class="playlist-song-delete" aria-label="Delete ${song.title}">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
                </button>
            </li>
        `
    }).join("")
    playlistSongs.innerHTML = songsHTML
}

const playSong = (id) =>{
    // this code went into the songs property of UserData which is a array of objects
    //It iterated the array using find() and returned the object that satifies the 
    //condition within 
    const song = userData?.songs.find(song => song?.id === id)
    
    audio.src = song.src
    audio.title = song.title
    /*
        Before playing the song, you need to make sure it starts from the beginning. 
        This can be achieved by the use of the currentTime property of the audio object.
    */
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    }else{
        audio.currentTime = userData.songCurrentTime
    }
    userData.currentSong = song;
    playButton.classList.add("playing")
    highlightCurrentSong()
    setPlayerDisplay()
    audio.play()
}
// Pausing the song
const pauseSong = () => {
    userData.songCurrentTime = audio.currentTime
    playButton.classList.remove("playing")
    audio.pause()
}

//implicit return function
const getCurrentSongIndex = ()=> userData?.songs.indexOf(userData.currentSong)

// on clicking next Button triggers this function
const playNextSong = () => {

    if (userData?.currentSong === null) {
      playSong(userData?.songs[0].id);
    } else {
      const currentSongIndex = getCurrentSongIndex();
      const nextSong = userData?.songs[currentSongIndex + 1];
      playSong(nextSong.id);
    }
  };
  const playPreviousSong = () => {
    if (userData?.currentSong === null) {
        return
    }else {
      const currentSongIndex = getCurrentSongIndex();
      const previousSong = userData?.songs[currentSongIndex - 1]
      playSong(previousSong.id)
    }
  }

  const highlightCurrentSong = () => {
    const playlistSongElements = document.querySelectorAll(".playlist-song");
    const songToHighlight = document.getElementById(
      `song-${userData?.currentSong?.id}`
    );
    playlistSongElements.forEach((songEl) => {
        songEl.removeAttribute("aria-current");
    });
    if(songToHighlight){
        songToHighlight.setAttribute("aria-current", "true")
    }
  }
  const setPlayerDisplay = () =>{
    const artistElement = document.getElementById("player-song-artist");
    const titleElement = document.getElementById("player-song-title");
    artistElement.innerText = userData?.songs[getCurrentSongIndex()].artist
    titleElement.innerText = userData?.songs[getCurrentSongIndex()].title
  }
renderSongs(userData?.songs)// the ? helps to prevent errors when there you reference a non-existing property

//on click play checks if the current song is null then play the first song
playButton.addEventListener("click", () => {
    if(userData.currentSong === null){
        playSong(userData?.songs[0].id)
    }else{
        playSong(userData?.currentSong.id)
    }
})
pauseButton.addEventListener("click", pauseSong)
nextButton.addEventListener("click", playNextSong)
previousButton.addEventListener("click", playPreviousSong)

