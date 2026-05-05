document.addEventListener('DOMContentLoaded', () => {

    const vpnFreeChannels =[
        { name: "Rupavahini", logo: "https://api3.viu.lk/api/client/v1/global/images/25661?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11611" },
        { name: "ITN", logo: "https://api3.viu.lk/api/client/v1/global/images/25663?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11597" },
        { name: "Hiru TV", logo: "https://api3.viu.lk/api/client/v1/global/images/25670?accessKey=WkVjNWNscFhORDBLCg==", url: "https://tv.hiruhost.com:1936/8012/8012/chunklist_w78295073.m3u8" },
        { name: "Derana", logo: "https://api3.viu.lk/api/client/v1/global/images/25665?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11607" },
        { name: "Sirasa", logo: "https://api3.viu.lk/api/client/v1/global/images/25667?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11614" },
        { name: "Swarnawahini", logo: "https://api3.viu.lk/api/client/v1/global/images/25666?accessKey=WkVjNWNscFhORDBLCg==", url: "https://jk3lz8xklw79-hls-live.5centscdn.com/live/6226f7cbe59e99a90b5cef6f94f966fd.sdp/playlist.m3u8" },
        { name: "Siyatha", logo: "https://api3.viu.lk/api/client/v1/global/images/25674?accessKey=WkVjNWNscFhORDBLCg==", url: "https://rtmp01.voaplus.com/hls/6x6ik312qk4grfxocfcv.m3u8" },
        { name: "TV One", logo: "https://api3.viu.lk/api/client/v1/global/images/25669?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11606" },
        { name: "Art Television", logo: "https://api3.viu.lk/api/client/v1/global/images/25672?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11585" },
        { name: "Channel One", logo: "https://api3.viu.lk/api/client/v1/global/images/25660?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=115898" },
        { name: "Channel C", logo: "https://api3.viu.lk/api/client/v1/global/images/25702?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11588" },
        { name: "Citi hitz", logo: "https://api3.viu.lk/api/client/v1/global/images/25678?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11590" },
        { name: "Damsathara", logo: "https://i.imgur.com/GxEQAu8.png", url: "https://mini.allinonereborn.fun/tata.php?id=11591" },
        { name: "Hi TV", logo: "https://api3.viu.lk/api/client/v1/global/images/25681?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11596" },
        { name: "Ridee", logo: "https://api3.viu.lk/api/client/v1/global/images/25677?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11602" },
        { name: "TV Didula", logo: "https://api3.viu.lk/api/client/v1/global/images/25676?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11608" },
        { name: "Vasantham", logo: "https://api3.viu.lk/api/client/v1/global/images/25664?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11610" },
        { name: "Shakthi", logo: "https://api3.viu.lk/api/client/v1/global/images/25668?accessKey=WkVjNWNscFhORDBLCg==", url: "https://mini.allinonereborn.fun/tata.php?id=11612#.m3u8" }
    ];

    function injectChannels() {
        let container = document.getElementById('channelsContainer') || document.getElementById('category-root');
        
        if (!container) {
            setTimeout(injectChannels, 500);
            return;
        }

        let htmlContent = `
            <div class="cat-section">
                <div class="cat-title">VPN FREE</div>
                <div class="app-grid">
        `;

        vpnFreeChannels.forEach(channel => {
            htmlContent += `
                <a href="#" class="channel-card vpn-free-btn" data-url="${channel.url}">
                    <div class="icon-box">
                        <img src="${channel.logo}" alt="${channel.name}">
                    </div>
                    <span>${channel.name}</span>
                </a>
            `;
        });

        htmlContent += `</div></div>`;
        container.insertAdjacentHTML('beforeend', htmlContent);

        attachClickEvents();
    }

    function attachClickEvents() {
        const spinner = document.getElementById('loadingSpinner');

        // Video.js Player එක Initialize කිරීම
        if (!window.vjsPlayer) {
            window.vjsPlayer = videojs('vjs-video', {
                fluid: false,
                autoplay: false,
                controls: true,
                preload: 'auto'
            });
        }

        document.querySelectorAll('.vpn-free-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();

                // UI Active තත්ත්වය වෙනස් කිරීම
                document.querySelectorAll('.channel-card').forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                const streamUrl = btn.getAttribute('data-url');
                
                // Shaka Player Hide කර Video.js Show කිරීම
                if(typeof window.switchToVideoJs === 'function'){
                    window.switchToVideoJs();
                }

                if (spinner) spinner.style.display = 'block';

                // Video.js හි කලින් තිබූ Errors මකා දැමීම
                window.vjsPlayer.error(null);

                // Video.js ඇතුලත ඇති HTML5 <video> element එක ලබා ගැනීම
                const videoElement = window.vjsPlayer.tech().el();

                // Hls.js භාවිතයෙන් Playback කිරීම (Video.js Errors මගහැරීම සඳහා)
                if (typeof Hls !== 'undefined' && Hls.isSupported()) {
                    if (window.hls) {
                        window.hls.destroy();
                    }
                    
                    window.hls = new Hls({
                        maxBufferLength: 30,
                        maxMaxBufferLength: 60,
                    });
                    
                    window.hls.loadSource(streamUrl);
                    window.hls.attachMedia(videoElement);
                    
                    window.hls.on(Hls.Events.MANIFEST_PARSED, function() {
                        window.vjsPlayer.play().then(() => {
                            if (spinner) spinner.style.display = 'none';
                        }).catch(err => {
                            console.warn("Autoplay blocked:", err);
                            if (spinner) spinner.style.display = 'none';
                        });
                    });
                    
                    window.hls.on(Hls.Events.ERROR, function(event, data) {
                        if (data.fatal) {
                            switch(data.type) {
                                case Hls.ErrorTypes.NETWORK_ERROR:
                                    console.warn("HLS Network Error, Retrying...");
                                    window.hls.startLoad();
                                    break;
                                case Hls.ErrorTypes.MEDIA_ERROR:
                                    console.warn("HLS Media Error, Recovering...");
                                    window.hls.recoverMediaError(); 
                                    break;
                                default:
                                    window.hls.destroy();
                                    if (spinner) spinner.style.display = 'none';
                                    alert("නාලිකාව වාදනය කිරීමට නොහැක. (Stream Offline හෝ අවහිර කර ඇත)");
                                    break;
                            }
                        }
                    });

                } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
                    // Apple/iOS Devices සඳහා (Native Support)
                    window.vjsPlayer.src({
                        src: streamUrl,
                        type: 'application/x-mpegURL'
                    });
                    
                    window.vjsPlayer.ready(function() {
                        window.vjsPlayer.play().then(() => {
                            if (spinner) spinner.style.display = 'none';
                        }).catch(e => {
                            if (spinner) spinner.style.display = 'none';
                        });
                    });
                    
                } else {
                    if (spinner) spinner.style.display = 'none';
                    alert("ඔබගේ Browser එක සහය නොදක්වයි.");
                }
            });
        });
    }

    injectChannels();
});
