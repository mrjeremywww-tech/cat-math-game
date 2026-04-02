/* ===== Sound Effects - Placeholders ===== */

// Sound effect URLs (using placeholder online sounds)
// In a real implementation, you'd use local sound files
const soundUrls = {
    correct: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0NZKrk7rNsGgxJkNTsvXwkDk+L0O+0dSQPUIjN7LRyJQ1MiMzrsnMiDUqGzOuzcyQNSoXM6rJzIw1JhsvqsHEiDUmGy+qvcCINSoXL6q1vIQ1JhcvprG4gDUmEy+irbB8NSYPM5qhkHg1IgMzlp2McDUeAy+SmYRwNSH/L4qVeGwxGfMripV0cDEZ9y+GlXB', // Short beep
    wrong: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0NZKrk7rNsGgxJkNTsvXwkDk+L0O+0dSQPUIjN7LRyJQ1MiMzrsnMiDUqGzOuzcyQNSoXM6rJzIw1JhsvqsHEiDUmGy+qvcCINSoXL6q1vIQ1JhcvprG4gDUmEy+irbB8NSYPM5qhkHg1IgMzlp2McDUeAy+SmYRwNSH/L4qVeGwxGfMripV0cDEZ9y+GlXB', // Lower beep
    win: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0NZKrk7rNsGwxJkNTsvXwkDk+L0O+0dSQPUIjN7LRyJQ1MiMzrsnMiDUqGzOuzcyQNSoXM6rJzIw1JhsvqsHEiDUmGy+qvcCINSoXL6q1vIQ1JhcvprG4gDUmEy+irbB8NSYPM5qhkHg1IgMzlp2McDUeAy+SmYRwNSH/L4qVeGwxGfMripV0cDEZ9y+GlXB', // Victory sound
    click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2teleR0NZKrk7rNsGwxJkNTsvXwkDk+L0O+0dSQPUIjN7LRyJQ1MiMzrsnMiDUqGzOuzcyQNSoXM6rJzIw1JhsvqsHEiDUmGy+qvcCINSoXL6q1vIQ1JhcvprG4gDUmEy+irbB8NSYPM5qhkHg1IgMzlp2McDUeAy+SmYRwNSH/L4qVeGwxGfMripV0cDEZ9y+GlXB' // Click sound
};

// Sound state
let soundsEnabled = true;
let audioContext = null;

// Initialize audio context on first user interaction
function initAudio() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Audio not supported');
        }
    }
}

// Play sound using Web Audio API for synthesized sounds
function playSound(type) {
    if (!soundsEnabled) return;
    
    initAudio();
    if (!audioContext) return;
    
    // Create oscillator for simple synthesized sounds
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    switch(type) {
        case 'correct':
            // Happy ascending beep
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
            oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.1); // C6
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'wrong':
            // Sad descending beep
            oscillator.frequency.setValueAtTime(311.13, audioContext.currentTime); // D#4
            oscillator.frequency.exponentialRampToValueAtTime(155.56, audioContext.currentTime + 0.2); // D#3
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
            break;
            
        case 'win':
            // Victory arpeggio
            playNote(523.25, 0);    // C5
            playNote(659.25, 0.1);  // E5
            playNote(783.99, 0.2);  // G5
            playNote(1046.5, 0.3);  // C6
            break;
            
        case 'click':
            // Short click sound
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.05);
            break;
    }
}

// Helper to play individual notes
function playNote(frequency, delay) {
    if (!audioContext) return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = frequency;
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + delay);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + delay + 0.3);
    
    oscillator.start(audioContext.currentTime + delay);
    oscillator.stop(audioContext.currentTime + delay + 0.3);
}

// Toggle sounds on/off
function toggleSounds() {
    soundsEnabled = !soundsEnabled;
    return soundsEnabled;
}

// Check if sounds are enabled
function areSoundsEnabled() {
    return soundsEnabled;
}

// Initialize on first user interaction
document.addEventListener('click', initAudio, { once: true });
document.addEventListener('touchstart', initAudio, { once: true });
