// Facial Emotion Recognition - JavaScript Functionality

// Smooth scrolling for navigation links
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Camera functionality
let video = null;
let canvas = null;
let isDetecting = false;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    
    // Button event listeners
    const startCameraBtn = document.getElementById('start-camera');
    const stopCameraBtn = document.getElementById('stop-camera');
    
    if (startCameraBtn) {
        startCameraBtn.addEventListener('click', startCamera);
    }
    
    if (stopCameraBtn) {
        stopCameraBtn.addEventListener('click', stopCamera);
    }
    
    // Navigation smooth scrolling
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Demo button functionality
    const demoBtn = document.querySelector('.btn-primary');
    if (demoBtn) {
        demoBtn.addEventListener('click', function() {
            scrollToSection('demo');
            setTimeout(startCamera, 500);
        });
    }
    
    // Initialize demo emotion data (for display purposes)
    initializeDemoData();
});

// Start camera function
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { 
                width: 640, 
                height: 480,
                facingMode: 'user'
            } 
        });
        
        if (video) {
            video.srcObject = stream;
            video.play();
            isDetecting = true;
            
            // Update button states
            updateButtonStates(true);
            
            // Start emotion detection simulation
            startEmotionDetection();
        }
    } catch (error) {
        console.error('Error accessing camera:', error);
        alert('Unable to access camera. Please ensure camera permissions are granted.');
    }
}

// Stop camera function
function stopCamera() {
    if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach(track => track.stop());
        video.srcObject = null;
        isDetecting = false;
        
        // Update button states
        updateButtonStates(false);
        
        // Reset emotion display
        resetEmotionDisplay();
    }
}

// Update button states
function updateButtonStates(isActive) {
    const startBtn = document.getElementById('start-camera');
    const stopBtn = document.getElementById('stop-camera');
    
    if (startBtn && stopBtn) {
        if (isActive) {
            startBtn.disabled = true;
            startBtn.classList.add('loading');
            stopBtn.disabled = false;
            stopBtn.classList.remove('loading');
        } else {
            startBtn.disabled = false;
            startBtn.classList.remove('loading');
            stopBtn.disabled = true;
            stopBtn.classList.add('loading');
        }
    }
}

// Simulate emotion detection (replace with actual ML integration)
function startEmotionDetection() {
    if (!isDetecting) return;
    
    // Simulate emotion detection results
    const emotions = ['Happy', 'Sad', 'Angry', 'Fear', 'Surprise', 'Disgust', 'Neutral'];
    const emojis = ['😊', '😢', '😠', '😨', '😮', '🤢', '😐'];
    
    const randomEmotion = Math.floor(Math.random() * emotions.length);
    const confidence = Math.floor(Math.random() * 40) + 60; // 60-100%
    
    // Update emotion display
    updateEmotionDisplay(emotions[randomEmotion], emojis[randomEmotion], confidence);
    
    // Update emotion bars with random probabilities
    updateEmotionBars();
    
    // Continue detection
    setTimeout(startEmotionDetection, 2000);
}

// Update main emotion display
function updateEmotionDisplay(emotion, emoji, confidence) {
    const emojiElement = document.getElementById('emotion-emoji');
    const labelElement = document.getElementById('emotion-label');
    const confidenceElement = document.getElementById('confidence-value');
    
    if (emojiElement) emojiElement.textContent = emoji;
    if (labelElement) labelElement.textContent = emotion;
    if (confidenceElement) confidenceElement.textContent = confidence + '%';
}

// Update emotion probability bars
function updateEmotionBars() {
    const emotions = ['happy', 'sad', 'angry', 'fear', 'surprise', 'disgust', 'neutral'];
    let total = 0;
    const probabilities = {};
    
    // Generate random probabilities that sum to 100
    emotions.forEach(emotion => {
        probabilities[emotion] = Math.random() * 30;
        total += probabilities[emotion];
    });
    
    // Normalize to 100%
    emotions.forEach(emotion => {
        const normalizedValue = (probabilities[emotion] / total) * 100;
        const barElement = document.querySelector(`.${emotion}-bar`);
        const percentageElement = barElement?.parentElement.querySelector('.percentage');
        
        if (barElement) {
            barElement.style.width = normalizedValue + '%';
        }
        if (percentageElement) {
            percentageElement.textContent = Math.round(normalizedValue) + '%';
        }
    });
}

// Reset emotion display
function resetEmotionDisplay() {
    updateEmotionDisplay('Neutral', '😐', 0);
    
    // Reset all bars to 0%
    const bars = document.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    const percentages = document.querySelectorAll('.percentage');
    percentages.forEach(percentage => {
        percentage.textContent = '0%';
    });
}

// Initialize demo data
function initializeDemoData() {
    // Set initial neutral state
    resetEmotionDisplay();
    
    // Disable stop button initially
    const stopBtn = document.getElementById('stop-camera');
    if (stopBtn) {
        stopBtn.disabled = true;
    }
}

// Handle window resize for responsive video
window.addEventListener('resize', function() {
    if (video && video.srcObject) {
        // Adjust video display if needed
        console.log('Window resized, adjusting video display');
    }
});

// Clean up on page unload
window.addEventListener('beforeunload', function() {
    stopCamera();
});
