document.getElementById('player-root').innerHTML = `
    <div class="video-wrapper">
        <!-- Shaka Player Container (Main Channels) -->
        <div id="shaka-container" data-shaka-player-container style="display: block; width: 100%; height: 100%;">
            <video data-shaka-player id="video" autoplay playsinline style="width: 100%; height: 100%;"></video>
        </div>

        <!-- Video.js Container (VPN Free Channels) -->
        <div id="vjs-container" style="display: none; width: 100%; height: 100%;">
            <video id="vjs-video" class="video-js vjs-default-skin vjs-big-play-centered" controls autoplay playsinline style="width: 100%; height: 100%;"></video>
        </div>

        <div id="loadingSpinner" class="loading-spinner"></div>
        <div class="ultraflix-watermark" id="ultraflixWatermark">
            <div class="uf-powered">Powered by</div>
            <div class="uf-brand">B-2 TECH</div>
        </div>
    </div>
`;

// Functions to switch players
window.switchToVideoJs = function() {
    document.getElementById('shaka-container').style.display = 'none';
    document.getElementById('vjs-container').style.display = 'block';
    
    // Stop Shaka Player
    const shakaVid = document.getElementById('video');
    if (shakaVid) {
        shakaVid.pause();
        if (shakaVid.ui && shakaVid.ui.getControls) {
            shakaVid.ui.getControls().getPlayer().unload().catch(() => {});
        }
    }
};

window.switchToShaka = function() {
    document.getElementById('vjs-container').style.display = 'none';
    document.getElementById('shaka-container').style.display = 'block';
    
    // Stop Video.js
    if (window.vjsPlayer) {
        window.vjsPlayer.pause();
    }
};

// Global Listener: When a normal channel (not vpn-free) is clicked, switch back to Shaka Player
document.addEventListener('click', function(e) {
    const channelCard = e.target.closest('.channel-card');
    // If a channel card is clicked and it's NOT a vpn-free button
    if (channelCard && !channelCard.classList.contains('vpn-free-btn')) {
        window.switchToShaka();
    }
});

// Watermark Display Logic for Player
setInterval(() => { 
    const controls = document.querySelector('.shaka-controls-container'); 
    const watermark = document.getElementById('ultraflixWatermark'); 
    if (controls && watermark) { 
        const opacity = window.getComputedStyle(controls).opacity; 
        const isHidden = controls.classList.contains('shaka-hidden') || opacity === '0'; 
        if (!isHidden) watermark.classList.add('show-watermark'); 
        else watermark.classList.remove('show-watermark'); 
    } 
}, 250);