/* ===== Cat Mascot - Animations & Interactions ===== */

// Cat helper messages
const catMessages = {
    correct: [
        "Purr-fect! 🐱",
        "You're amazing! ⭐",
        "Great job! 😺",
        "You're a math star! 🌟",
        "Whiskers is proud! 😸",
        "Fantastic! 🎉",
        "Keep it up! 💪",
        "You got it! ✨"
    ],
    wrong: [
        "Try again! You got this! 💪",
        "Don't give up! 😺",
        "Almost there! 🐱",
        "Think again! 💭",
        "You can do it! ⭐",
        "Keep trying! 🧠",
        "So close! 😸",
        "Take your time! ⏰"
    ],
    idle: [
        "Let's learn math together! 🐱",
        "Pick a unit to start! ⭐",
        "I'm here to help! 😺",
        "Math is fun! 🎉",
        "You can do anything! 💪",
        "Ready for an adventure? 🌟",
        "Let's go! 🐾",
        "Whiskers loves math! 😸"
    ]
};

// Cat animations
function animateCat(type) {
    const cat = document.getElementById('catMascot');
    
    switch(type) {
        case 'jump':
            cat.classList.add('jump');
            setTimeout(() => cat.classList.remove('jump'), 500);
            break;
        case 'happy':
            cat.style.transform = 'scale(1.1) rotate(-5deg)';
            setTimeout(() => cat.style.transform = '', 300);
            break;
        case 'sad':
            cat.style.transform = 'scale(0.95) rotate(2deg)';
            setTimeout(() => cat.style.transform = '', 300);
            break;
        case 'dance':
            let danceCount = 0;
            const dance = setInterval(() => {
                cat.style.transform = danceCount % 2 === 0 ? 'rotate(-10deg)' : 'rotate(10deg)';
                danceCount++;
                if (danceCount >= 6) {
                    clearInterval(dance);
                    cat.style.transform = '';
                }
            }, 150);
            break;
    }
}

// Cat speech bubble
function catSay(message, duration = 3000) {
    const bubble = document.getElementById('catBubble');
    bubble.textContent = message;
    bubble.style.opacity = '1';
    bubble.style.transform = 'scale(1)';
    
    // Clear previous timeout if any
    if (window.catMessageTimeout) {
        clearTimeout(window.catMessageTimeout);
    }
    
    window.catMessageTimeout = setTimeout(() => {
        bubble.style.opacity = '0.8';
    }, duration);
}

// Get random cat message
function getRandomMessage(type) {
    const messages = catMessages[type] || catMessages.idle;
    return messages[Math.floor(Math.random() * messages.length)];
}

// Show floating treat animation
function showFloatingTreat() {
    const container = document.getElementById('floatingEffects');
    const treats = ['🐟', '🦴', '🧶', '🥛', '⭐'];
    const treat = treats[Math.floor(Math.random() * treats.length)];
    
    const floatEl = document.createElement('div');
    floatEl.className = 'floating-treat';
    floatEl.textContent = treat;
    floatEl.style.left = (Math.random() * 80 + 10) + '%';
    floatEl.style.top = '60%';
    
    container.appendChild(floatEl);
    
    setTimeout(() => {
        floatEl.remove();
    }, 1000);
}

// Track mouse for cat eyes
function initEyeTracking() {
    const pupils = document.querySelectorAll('.pupil');
    
    document.addEventListener('mousemove', (e) => {
        pupils.forEach(pupil => {
            const rect = pupil.parentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const distance = Math.min(3, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 20);
            
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            pupil.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Idle animations
function initIdleAnimations() {
    const cat = document.getElementById('catMascot');
    
    // Random idle messages
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every 10 seconds
            const msg = getRandomMessage('idle');
            catSay(msg, 4000);
            
            // Occasional animation
            if (Math.random() < 0.5) {
                animateCat('happy');
            }
        }
    }, 10000);
    
    // Click to interact
    cat.addEventListener('click', () => {
        animateCat('jump');
        catSay('Meow! Let\'s play! 😸', 3000);
        playSound('click');
    });
}

// Tail animation speed based on mood
function setCatMood(mood) {
    const tail = document.querySelector('.cat-tail');
    
    switch(mood) {
        case 'happy':
            tail.style.animationDuration = '1s';
            break;
        case 'excited':
            tail.style.animationDuration = '0.5s';
            break;
        case 'calm':
            tail.style.animationDuration = '3s';
            break;
        default:
            tail.style.animationDuration = '2s';
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initEyeTracking();
    initIdleAnimations();
    
    // Initial greeting
    setTimeout(() => {
        catSay('Welcome! I\'m Whiskers! 🐱', 4000);
    }, 1000);
});
