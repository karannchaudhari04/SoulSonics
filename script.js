const mainCard = document.querySelector("#ContentWarpper");
const songimg = document.querySelector("#Songimg");
const controlButtons = document.querySelector(".control");
const currentYear = new Date().getFullYear();

const playPauseButton = document.querySelector("#PausePlay");
const audio = document.querySelector("audio");
const artist = document.querySelector("#Artist");
const songName = document.querySelector("#SongName");
const previousButton = document.querySelector("#Previous");
const nextButton = document.querySelector("#Next");
const songimgAtTheTop = document.querySelector("img");

let startDuration = document.querySelector("#Start");
const endDuration = document.querySelector("#End");
const meter = document.querySelector("#ProgrssMeterChild");
const progressBar = document.querySelector("#ProgressMeterContainer");

let isPlaying = false;
let index = 0;

const songDataBase = [
  {
    songSrc: "m1.mp3",
    title: "Faasale",
    artist: "Aditya Rikhari",
    imgSrc: "Cover1.JPG",
  },
  {
    songSrc: "m2.mp3",
    title: "Dil Jhum",
    artist: "Arjit Singh",
    imgSrc: "cover2.jpeg",
  },
  {
    songSrc: "m3.mp3",
    title: "Re Kabira",
    artist: "Tochi Raina, Rekha Bhardwaj",
    imgSrc: "cover3.jpg",
  },
  {
    songSrc: "m4.mp3",
    title: "Chaleya",
    artist: "Arjit Singh",
    imgSrc: "cover4.jpeg",
  },
  {
    songSrc: "m5.mp3",
    title: "Jai Shree Ram",
    artist: "Ajay Atul",
    imgSrc: "cover5.jpeg",
  },
  {
    songSrc: "m6.mp3",
    title: "Dekh Lena",
    artist: "Arjit Singh",
    imgSrc: "cover6.jpeg",
  },
  {
    songSrc: "m7.mp3",
    title: "Haal - E - Dil",
    artist: "Neeti Mohan",
    imgSrc: "cover7.jpeg",
  },
  {
    songSrc: "m8.mp3",
    title: "Tum Se Hi",
    artist: "Mohit Chauhan",
    imgSrc: "cover8.jpeg",
  },
  {
    songSrc: "m9.mp3",
    title: "Tum Hi Ho Bandhu",
    artist: " Kavita Seth and Neeraj Shridharn",
    imgSrc: "cover9.jpg",
  },
  {
    songSrc: "m10.mp3",
    title: "Heeriye",
    artist: "Arjit Singh and Jasleen Royal",
    imgSrc: "cover10.jpg",
  },
  {
    songSrc: "m11.mp3",
    title: "Ram Siya Ram",
    artist: "Ajay-Atul, Parampara Thakur, and Sachet Tandon",
    imgSrc: "cover11.jpg",
  },
  {
    songSrc: "m12.mp3",
    title: "Matargashti",
    artist: "Mohit Chauhan",
    imgSrc: "cover12.jpg",
  },
  {
    songSrc: "m13.mp3",
    title: "Har Funn Maula",
    artist: "Vishal Dadlani & Zara Khan",
    imgSrc: "cover13.jpg",
  },
  {
    songSrc: "m14.mp3",
    title: "Tere Hawale",
    artist: "Arijit Singh and Shilpa Rao",
    imgSrc: "cover14.jpg",
  },
  {
    songSrc: "m15.mp3",
    title: "Ilahi Mera Jee Aaye",
    artist: "Arijit Singh",
    imgSrc: "cover15.jpg",
  },
  {
    songSrc: "m16.mp3",
    title: "Senorita",
    artist: "Shankar-Ehsaan-Loy, Farhan Akhtar, Hrithik Roshan, Abhay Deol, Maria Del Mar Fernandez",
    imgSrc: "cover16.jpg",
  },
  {
    songSrc: "m17.mp3",
    title: "Phir Se Ud Chala",
    artist: "Mohit Chauhan",
    imgSrc: "cover17.jpg",
  },
  {
    songSrc: "m18.mp3",
    title: "Safarnama",
    artist: "Lucky Ali, A.R. Rahman",
    imgSrc: "cover18.jpg",
  },
  {
    songSrc: "m19.mp3",
    title: "Heer Toh Badi Sad Hai",
    artist: "Mika Singh",
    imgSrc: "cover19.jpg",
  },
  {
    songSrc: "m20.mp3",
    title: "Sooraj Dooba Hain",
    artist: "Amaal Mallik, Arijit Singh, Aditi Singh Sharma",
    imgSrc: "cover20.jpg",
  },
];

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
searchButton.addEventListener('click', searchSong);

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const matchingSongs = songDataBase.filter(
    (song) =>
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query)
  );
  displaySearchResults(matchingSongs);
});

// Assuming you have a function to handle search and display of songs
function searchSong() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const searchResults = document.getElementById('searchResults');

  // Your search logic here
  // This is just an example filtering by song name
  const filteredSongs = songDataBase.filter(song => song.title.toLowerCase().includes(searchInput));

  // Clear previous search results
  searchResults.innerHTML = '';

  // Display search results in AllInBody container
  filteredSongs.forEach(song => {
    const songContainer = document.createElement('div');
    songContainer.classList.add('searched-song');

    const songName = document.createElement('h3');
    songName.textContent = song.title;

    const artist = document.createElement('p');
    artist.textContent = song.artist;

    // Append song details to the songContainer
    songContainer.appendChild(songName);
    songContainer.appendChild(artist);

    // Append the songContainer to the AllInBody section
    searchResults.appendChild(songContainer);
  });

  // Display the AllInBody section
  document.getElementById('ContentWarpper').style.display = 'block';
}

function logout() {
  localStorage.removeItem('isLoggedIn'); // Clear authentication status
  // Redirect to the login page after logout
  window.location.href = 'index.html';
}

// Check if the user is logged in by retrieving from localStorage
const isLoggedIn = localStorage.getItem('isLoggedIn');
const loginLi = document.getElementById('loginLi');
const signupLi = document.getElementById('signupLi');
const searchContainer = document.getElementById('searchContainer');
const logoutLi = document.getElementById('logoutLi');

if (isLoggedIn === 'true') {
  // If logged in, hide login/signup buttons and show logout button
  searchContainer.style.display = 'block';
  loginLi.style.display = 'none';
  signupLi.style.display = 'none';
  logoutLi.style.display = 'block';
} else {
  // If not logged in, keep login/signup buttons visible and hide logout button
  searchContainer.style.display = 'none';
  loginLi.style.display = 'block';
  signupLi.style.display = 'block';
  logoutLi.style.display = 'none';
}

// Attach logout functionality to the logout button
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}

const loadm = () => {
  audio.src = songDataBase[index].songSrc;
  artist.textContent = songDataBase[index].artist;
  songName.textContent = songDataBase[index].title;
  songimgAtTheTop.src = songDataBase[index].imgSrc;
};
audio.addEventListener("ended", () => {
  loadm(index++);
  play();
});

loadm();

nextButton.addEventListener("click", () => {
  if (index < songDataBase.length - 1) {
    loadm(index++);
    play();
  } else {
    pause();
  }
});
previousButton.addEventListener("click", () => {
  if (index > 0) {
    loadm(index--);
    play();
  } else {
    pause();
  }
});

const play = () => {
  isPlaying = true;
  audio.play();
  playPauseButton.classList.replace("fa-play", "fa-pause");
  songimg.classList.add("anime");
  if ('Notification' in window && Notification.permission === 'granted') {
    const notificationOptions = {
      body: `Now playing: ${songDataBase[index].title} - ${songDataBase[index].artist}`,
      icon: songDataBase[index].imgSrc
    };
    
    new Notification('Music Player', notificationOptions);
  }
};

const pause = () => {
  isPlaying = false;
  audio.pause();
  playPauseButton.classList.replace("fa-pause", "fa-play");
  songimg.classList.remove("anime");
};

playPauseButton.addEventListener("click", () => {
  if (isPlaying) {
    pause();
  } else {
    play();
  }
});
let minute, second;
const timeStamp = (event) => {
  let { duration, currentTime } = event.srcElement;
  const full_second = Math.floor(duration % 60);
  const full_minute = Math.floor(duration / 60);
  const start_second = Math.floor(currentTime % 60);
  const start_minute = Math.floor(currentTime / 60);
  const totalDuration = `${full_minute} : ${full_second}`;
  const currenDuration = `${start_minute} : ${start_second}`;
  if (duration) {
    endDuration.textContent = totalDuration;
  }
  startDuration.textContent = currenDuration;
  const percentage = (currentTime / duration) * 100;
  meter.style.width = `${percentage}%`;
};
audio.addEventListener("timeupdate", timeStamp);
progressBar.addEventListener("click", (event) => {
  const { duration } = audio;
  const moreProgress =
    (event.offsetX / event.srcElement.clientWidth) * duration;
  audio.currentTime = moreProgress;
});

document.querySelector("#Year").innerHTML = currentYear;

mainCard.addEventListener("mouseover", (event) => {
  const xAxis = (window.innerWidth / 2 - event.pageX) / 15;
  const yAxis = (window.innerHeight / 2 - event.pageY) / 15;
  mainCard.style.transform = `rotateX(${yAxis}deg) rotateY(${xAxis}deg)`;
  songimg.style.transform = `rotate(${xAxis}deg)`;
  controlButtons.style.transform = `rotate(${xAxis}deg)`;
});
mainCard.addEventListener("mouseleave", () => {
  mainCard.style.transform = "rotateX(0deg) rotateY(0deg)";
  songimg.style.transform = "rotate(0deg)";
  controlButtons.style.transform = "rotate(0deg)";
});