// Web Audio API Context
let audioCtx;
let oscillator;
let gainNode;

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function playTone(freq, noteName) {
    initAudio(); // Initialize on user gesture

    // Stop currently playing tone
    if (oscillator) {
        stopAll();
    }

    // Create Oscillator (Sound Generator)
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    // Set properties
    oscillator.type = 'triangle'; // 'triangle' is closest to a guitar string sound
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Envelope (Fade in and out to prevent clicking)
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05); // Fade in

    // Connect nodes: Oscillator -> Gain -> Speakers
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // Start
    oscillator.start();

    // Update UI
    updateUI(noteName, freq);
}

function stopAll() {
    if (oscillator) {
        // Fade out
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
        oscillator = null;
    }

    // Clear UI
    const displayNote = document.getElementById('currentNote');
    displayNote.innerText = '--';
    displayNote.style.color = 'rgba(255,255,255,0.1)';
    displayNote.style.textShadow = 'none';

    document.getElementById('currentHz').innerText = '000.00 Hz';

    // Remove active class from all buttons
    document.querySelectorAll('.string-btn').forEach(btn => btn.classList.remove('active'));
}

function updateUI(note, freq) {
    const displayNote = document.getElementById('currentNote');
    const displayHz = document.getElementById('currentHz');

    displayNote.innerText = note;
    displayHz.innerText = freq.toFixed(2) + " Hz";

    // Highlight button
    document.querySelectorAll('.string-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.includes(note)) {
            btn.classList.add('active');
        }
    });

    // Animate glow color for precision effect
    displayNote.style.textShadow = `0 0 20px rgba(212, 175, 55, 0.6)`;
    displayNote.style.color = '#d4af37';
}
