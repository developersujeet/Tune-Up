let player;

// Function to search YouTube videos
async function searchVideos() {
  const query = document.getElementById("search-input").value;
  if (!query) return;

  const response = await fetch(`/search?q=${query}`);
  const data = await response.json();
  displayResults(data);
}

// Function to display search results
function displayResults(videos) {
  const resultsDiv = document.getElementById("search-results");
  resultsDiv.innerHTML = ""; // Clear previous results

  videos.forEach((video) => {
    const videoItem = document.createElement("div");
    videoItem.className = "video-item";
    videoItem.innerHTML = `
      <span>${video.snippet.title}</span>
      <button onclick="playVideo('${video.id.videoId}')">Play</button>
    `;
    resultsDiv.appendChild(videoItem);
  });
}

// Function to play a selected video (audio only)
function playVideo(videoId) {
  if (!player) {
    // Initialize the player if it doesn't exist
    player = new YT.Player("youtube-player", {
      height: "0",
      width: "0",
      videoId: videoId,
      events: {
        onReady: (event) => {
          event.target.playVideo(); // Autoplay the video
        },
      },
    });
  } else {
    // Load and play the new video
    player.loadVideoById(videoId);
    player.playVideo();
  }
}

// Load YouTube IFrame API
function loadYouTubeAPI() {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Initialize the app
loadYouTubeAPI();
