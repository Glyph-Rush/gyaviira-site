// Web Audio API Context
let audioCtx;
let oscillator;
let gainNode;
let currentFreq = null; // Track currently playing frequency

// Tuning Data
const instruments = {
    guitar: [
        { note: 'E', octave: 2, freq: 82.41 },
        { note: 'A', octave: 2, freq: 110.00 },
        { note: 'D', octave: 3, freq: 146.83 },
        { note: 'G', octave: 3, freq: 196.00 },
        { note: 'B', octave: 3, freq: 246.94 },
        { note: 'E', octave: 4, freq: 329.63 }
    ],
    bass4: [
        { note: 'E', octave: 2, freq: 82.41 },
        { note: 'A', octave: 2, freq: 110.00 },
        { note: 'D', octave: 3, freq: 146.83 },
        { note: 'G', octave: 3, freq: 196.00 }
    ],
    bass5: [
        { note: 'B', octave: 1, freq: 61.74 },
        { note: 'E', octave: 2, freq: 82.41 },
        { note: 'A', octave: 2, freq: 110.00 },
        { note: 'D', octave: 3, freq: 146.83 },
        { note: 'G', octave: 3, freq: 196.00 }
    ],
    violin: [
        { note: 'G', octave: 3, freq: 196.00 },
        { note: 'D', octave: 4, freq: 293.66 },
        { note: 'A', octave: 4, freq: 440.00 },
        { note: 'E', octave: 5, freq: 659.25 }
    ],
    cello: [
        { note: 'C', octave: 2, freq: 65.41 },
        { note: 'G', octave: 2, freq: 98.00 },
        { note: 'D', octave: 3, freq: 146.83 },
        { note: 'A', octave: 3, freq: 220.00 }
    ]
};

let currentInstrument = 'guitar';

function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

function setInstrument(name) {
    currentInstrument = name;
    stopAll();
    renderStrings();

    // Update active tab
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(name === 'bass4' ? 'bass-4' : name === 'bass5' ? 'bass-5' : name)) {
            btn.classList.add('active');
        }
    });

    // Reset Display
    document.getElementById('currentHz').innerText = 'Instrument Loaded: ' + name.toUpperCase();
}

function renderStrings() {
    const container = document.getElementById('stringsContainer');
    container.innerHTML = '';

    instruments[currentInstrument].forEach(string => {
        const btn = document.createElement('button');
        btn.className = 'string-btn';
        btn.onclick = () => playTone(string.freq, string.note + string.octave);

        btn.innerHTML = `
            <span class="note">${string.note}</span>
            <span class="octave">${string.octave}</span>
        `;

        container.appendChild(btn);
    });
}

function playTone(freq, noteName) {
    initAudio();

    // Toggle Logic: If clicking the same note, stop it.
    if (oscillator && currentFreq === freq) {
        stopAll(true);
        return;
    }

    if (oscillator) {
        stopAll(false); // Stop previous note but keep UI ready for new one
    }

    currentFreq = freq; // Set new active frequency
    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();

    // Sound Character: Triangle for guitar-like, Sine for pure tone
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start();

    updateUI(noteName, freq);
}

function stopAll(clearUI = true) {
    if (oscillator) {
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.1);
        oscillator.stop(audioCtx.currentTime + 0.1);
        oscillator = null;
    }

    if (clearUI) {
        currentFreq = null; // Reset tracker
        const displayNote = document.getElementById('currentNote');
        displayNote.innerText = '--';
        displayNote.style.color = 'rgba(255,255,255,0.1)';
        displayNote.style.textShadow = 'none';

        document.getElementById('currentHz').innerText = 'SILENCE';

        document.querySelectorAll('.string-btn').forEach(btn => btn.classList.remove('active'));
    }
}

function updateUI(note, freq) {
    const displayNote = document.getElementById('currentNote');
    const displayHz = document.getElementById('currentHz');

    displayNote.innerText = note;
    displayHz.innerText = freq.toFixed(2) + " Hz";

    document.querySelectorAll('.string-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.replace('\n', '') === note) {
            btn.classList.add('active');
        }
    });

    displayNote.style.textShadow = `0 0 20px rgba(212, 175, 55, 0.6)`;
    displayNote.style.color = '#d4af37';
}

// Initial Render
renderStrings();
