document.getElementById('player-root').innerHTML = `
    <div class="video-wrapper" style="position: relative; width: 100%; height: 100%; background: #000;">
        <!-- Shaka Player Container (Main Channels) -->
        <div id="shaka-container" data-shaka-player-container style="display: block; width: 100%; height: 100%; position: absolute; top:0; left:0; z-index: 1;">
            <video data-shaka-player id="video" autoplay playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
        </div>

        <!-- Pure HTML5 HLS Container (VPN Free Channels සඳහා) -->
        <div id="hls-container" style="display: none; width: 100%; height: 100%; position: absolute; top:0; left:0; background: #000; z-index: 2;">
            <video id="hls-video" controls playsinline style="width: 100%; height: 100%; object-fit: contain;"></video>
        </div>

        <!-- Loading Spinner -->
        <div id="loadingSpinner" class="loading-spinner" style="z-index: 3;"></div>
        
        <!-- Watermark -->
        <div class="ultraflix-watermark" id="ultraflixWatermark" style="z-index: 4;">
            <div class="uf-powered">Powered by</div>
            <div class="uf-brand">B-2 TECH</div>
        </div>
    </div>
`;

// Switch to Pure HLS Player (VPN Free Channels)
window.switchToHlsPlayer = function() {
    document.getElementById('shaka-container').style.display = 'none';
    document.getElementById('hls-container').style.display = 'block';
    
    // Stop Shaka Player
    const shakaVid = document.getElementById('video');
    if (shakaVid) {
        shakaVid.pause();
        if (shakaVid.ui && shakaVid.ui.getControls) {
            shakaVid.ui.getControls().getPlayer().unload().catch(() => {});
        }
    }
};

// Switch back to Shaka Player (Normal Channels)
window.switchToShaka = function() {
    document.getElementById('hls-container').style.display = 'none';
    document.getElementById('shaka-container').style.display = 'block';
    
    // Stop Native HLS Video
    const hlsVid = document.getElementById('hls-video');
    if (hlsVid) {
        hlsVid.pause();
        hlsVid.removeAttribute('src'); // Clean Source
        hlsVid.load();
    }
    // Destroy existing HLS instance
    if (window.hls) {
        window.hls.destroy();
        window.hls = null;
    }
};

// Global Listener: වෙනත් (සාමාන්‍ය) නාලිකාවක් click කළ විට නැවත Shaka Player එක පෙන්වීමට
document.addEventListener('click', function(e) {
    const channelCard = e.target.closest('.channel-card');
    if (channelCard && !channelCard.classList.contains('vpn-free-btn')) {
        window.switchToShaka();
    }
});

// Watermark Display Logic
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
