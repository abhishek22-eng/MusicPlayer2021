
// console.log("hii")

let allMusic = [
    {
        name: " Dreams-pt-II",
        artist: " Sara Skinner ",
        img: "m1",
        src: "m1"
    },

    {
        name: " Meri Mannat Tu ",
        artist: " Shreya Ghoshal,Sonu Nigam ",
        img: "m2",
        src: "m2"
    },

    {
        name: " Feel Good  ",
        artist: " Syn Cole ",
        img: "m3",
        src: "m3"
    },

    {
        name: "  Pehla Pyar ",
        artist: "  Arman Malik ",
        img: "m4",
        src: "m4"
    },

    {
        name: " One Minute ",
        artist: " Krewella ",
        img: "m5",
        src: "m5"
    },

    {
        name: " Arc North - Meant to be ",
        artist: " Krista Marina ",
        img: "m6",
        src: "m6"
    }
]

// console.log("hi");


const wrapper = document.querySelector('.wrapper'),
musicImg = wrapper.querySelector('.img_area img'),
musicName = wrapper.querySelector('.song_details .name'),
musicArtist = wrapper.querySelector('.song_details .artist'),
mainAudio = wrapper.querySelector("#main_audio"),
playPauseBtn = wrapper.querySelector('.play_pause'),
nextBtn = wrapper.querySelector('.next'),
prevBtn = wrapper.querySelector('.prev'),
progressArea = wrapper.querySelector('.progress_area'),
progressBar = wrapper.querySelector('.progress_bar'),
musicList = wrapper.querySelector('.music_list'),
showMoreBtn = wrapper.querySelector('#more_music'),
hideMusicBtn = wrapper.querySelector('#close');




let musicIndex = 2;

window.addEventListener('load',()=>{
    loadMusic(musicIndex)
})

function nextMusic()
{
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

function next()
{
    nextMusic();
}


function loadMusic(indexNumb)
{
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`;

}

function playMusic()
{
    wrapper.classList.add('paused');
    playPauseBtn.querySelector('i').innerText = "pause"
    mainAudio.play();
}

function pauseMusic()
{
    wrapper.classList.remove('paused');
    playPauseBtn.querySelector('i').innerText = "play_arrow"

    mainAudio.pause();
}

function nextMusic()
{
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex)
    playMusic();
}

playPauseBtn.addEventListener('click',() =>{
    const isMusicPaused = wrapper.classList.contains('paused');
    isMusicPaused ? pauseMusic() : playMusic()
});

function prevMusic()
{
    musicIndex--;
    musicIndex < 1 ? musicIndex= allMusic.length : musicIndex = musicIndex
    loadMusic(musicIndex);
    playMusic();
}

function prev()
{
    prevMusic();
}


mainAudio.addEventListener('timeupdate',(e) =>{
    // console.log(e);
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progresswidth = (currentTime / duration) * 100;
    progressBar.style.width = `${progresswidth}%`;

    let musicCurrentTime = wrapper.querySelector('.current'),
    musicDuration = wrapper.querySelector('.duration');

    mainAudio.addEventListener('loadeddata',()=>{
    
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        let totalSec = Math.floor(audioDuration % 60);

        if(totalSec < 10)
        {
            totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;

        
        // let audioDuration = mainAudio.currentTime;
        let currentMin = Math.floor(currentTime / 60);
        let currentSec = Math.floor(currentTime % 60);

        if(currentSec < 10)
        {
            currentSec = `0${currentSec}`;
        }
        musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

    // let audioDuration = mainAudio.currentTime;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);

    if(currentSec < 10)
    {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;


})

progressArea.addEventListener('click',(e)=>{
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
})

// const repeatBtn = wrapper.querySelector('#repeatp-list');

function repeat()
{
    const repeatBtn = wrapper.querySelector('#repeatp-list');
    let getText = repeatBtn.innerText;
    switch(getText){
        case "repeat":
            repeatBtn.innerText ="repeat_one";
            repeatBtn.setAttribute('title',"SOng Looped");
            break;
        case "repeat_one":
            repeatBtn.innerText ="shuffle";
            repeatBtn.setAttribute("title","Playback Shuffle")
            break;

            case "shuffle":
                repeatBtn.innerText ="repeat";
               repeatBtn.setAttribute("title","Playlist looped")
                break;

    }
}

showMoreBtn.addEventListener('click',()=>{
    musicList.classList.add("show")
})

hideMusicBtn.addEventListener('click',()=>{
    showMoreBtn.click()
})
const ulTag = wrapper.querySelector('ul')

for(let i = 0; i < allMusic.length;i++){
    let liTag=`   <li>
                    <div class="row">
                        <span>Ikson Anywehre - Ikson</span>
                        <p>Audio Library</p>
                    </div>
                    <span class="audio_duration">3.40</span>
                </li>`
    ulTag.insertAdjacentHTML('beforeend',liTag);
}