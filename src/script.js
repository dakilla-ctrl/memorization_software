const storedData = [];
let selectedDifficulty = '';
const sampleTexts = {
    word: ["apple", "banana", "cherry", "date", "elderberry"],
    line: ["The quick brown fox jumps over the lazy dog.", "A journey of a thousand miles begins with a single step."],
    section: ["In the beginning, God created the heavens and the earth.", "To be, or not to be, that is the question."]
};
let textToType = '';
let userInput = '';
let blanks = [];
let wordCount = 0; // For word count
let totalWords = 0; // Total words to type
let startTime = null; // To track the start time for the timer
let timerInterval = null; // To store the timer interval ID
let performanceHistory = []; // Array to store performance data
let errorAnalytics = {}; // Object to track common mistakes

function checkInput() {
    const userInputField = document.getElementById('userInput').value;
    const selectedPrayer = document.getElementById('prayerSelect').value;
    const proceedButton = document.getElementById('proceedButton');

    proceedButton.disabled = !(userInputField && selectedPrayer && selectedDifficulty);
}

function updateUserInput() {
    const selectedPrayer = document.getElementById('prayerSelect').value;
    if (selectedPrayer) {
        document.getElementById('userInput').value = selectedPrayer;
    }
    checkInput(); // Check if all inputs are valid
}

function storeDifficulty() {
    selectedDifficulty = document.getElementById('difficultySelect').value;
    checkInput(); // Check if all inputs are valid
}

function addPrayer() {
    const userInputField = document.getElementById('userInput');
    const newPrayer = userInputField.value.trim();

    if (newPrayer) {
        const prayerSelect = document.getElementById('prayerSelect');
        const newOption = document.createElement('option');
        newOption.value = newPrayer;
        newOption.textContent = newPrayer;
        prayerSelect.appendChild(newOption);
        userInputField.value = ''; // Clear input field after adding

        showNotification(); // Show success notification
    }
}

function showNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'block';
    setTimeout(() => {
        notification.style.display = 'none';
    }, 2000); // Hide notification after 2 seconds
}

function startTyping() {
    // Initialize word count and start time
    wordCount = 0;
    totalWords = 0; // Reset total words
    startTime = Date.now(); // Start the timer

    // Generate text with blanks based on difficulty
    if (document.getElementById('userInput').value.trim()) {
        textToType = document.getElementById('userInput').value.trim();
    } else {
        if (selectedDifficulty === 'word') {
            textToType = sampleTexts.word.join(' ');
        } else if (selectedDifficulty === 'line') {
            textToType = sampleTexts.line[Math.floor(Math.random() * sampleTexts.line.length)];
        } else if (selectedDifficulty === 'section') {
            textToType = sampleTexts.section[Math.floor(Math.random() * sampleTexts.section.length)];
        }
    }

    // Process textToType to replace some words with blanks
    const words = textToType.split(' ');
    totalWords = words.length; // Set total words to type
    const blanksContainer = document.getElementById('blanksContainer');
    blanksContainer.innerHTML = ''; // Clear any existing content

    words.forEach((word, index) => {
        if (Math.random() < 0.3) { // 30% chance to blank a word
            const blankInput = document.createElement('input');
            blankInput.type = 'text';
            blankInput.dataset.index = index; // Keep track of word position
            blankInput.className = 'blankInput';
            blanksContainer.appendChild(blankInput);
        } else {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            blanksContainer.appendChild(span);
        }
    });

    textToType = words; // Save original words for comparison
    document.getElementById('typingInterface').style.display = 'block';
    document.getElementById('feedback').style.display = 'none';

    // Start updating progress
    updateProgress(); // Call this function to start counting
    timerInterval = setInterval(updateProgress, 1000); // Start the timer
}

function updateProgress() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    const minutes = String(Math.floor(elapsedTime / 60)).padStart(2, '0');
    const seconds = String(elapsedTime % 60).padStart(2, '0');

    document.getElementById('timer').innerText = `${minutes}:${seconds}`;
    document.getElementById('total-words').innerText = totalWords; // Update total words

    const blankInputs = document.querySelectorAll('.blankInput');
    wordCount = blankInputs.length; // Total words to fill
    document.getElementById('word-count').innerText = `${totalWords - wordCount}`; // Update completed words
}

function adjustInputWidth() {
    const userInputField = document.getElementById('userInput');
    const words = userInputField.value.split(' ').filter(word => word.length > 0);
    const averageWordLength = words.length > 0 ? words.reduce((sum, word) => sum + word.length, 0) / words.length : 0;

    // Set a base width and scale it based on average word length
    const baseWidth = 200; // Base width in pixels
    const newWidth = Math.max(baseWidth, averageWordLength * 10); // Scale width (10 pixels per character)
    userInputField.style.width = `${newWidth}px`;
}

function trackInput() {
    userInput = document.getElementById('userText').value;
}

function submitTyping() {
    clearInterval(timerInterval); // Stop the timer
    const blankInputs = document.querySelectorAll('.blankInput');
    const missedWords = [];
    let correctCount = 0;

    blankInputs.forEach(input => {
        const index = parseInt(input.dataset.index, 10);
        const userAnswer = input.value.trim();
        if (userAnswer === textToType[index]) {
            correctCount++;
        } else {
            missedWords.push(textToType[index]);
            trackErrors(userAnswer, textToType[index]); // Track errors for analytics
        }
    });

    // Calculate accuracy
    const accuracy = ((correctCount / blankInputs.length) * 100).toFixed(2);
    document.getElementById('accuracy-bar').style.width = `${accuracy}%`; // Update accuracy bar
    document.getElementById('accuracy-text').innerText = `Accuracy: ${accuracy}%`; // Display accuracy

    // Update performance history
    performanceHistory.push({ accuracy, missedWords });
    updatePerformanceHistory();

    const feedback = `Accuracy: ${accuracy}%\nMissed Words: ${missedWords.join(', ') || 'None'}`;
    document.getElementById('feedback').innerText = feedback;
    document.getElementById('feedback').style.display = 'block';

    // Show accuracy container
    document.getElementById('accuracy-container').style.display = 'block';
}

function trackErrors(userAnswer, correctAnswer) {
    if (!errorAnalytics[correctAnswer]) {
        errorAnalytics[correctAnswer] = { count: 0, capitalization: 0, punctuation: 0 };
    }
    errorAnalytics[correctAnswer].count++;

    // Check for capitalization errors
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase() && userAnswer !== correctAnswer) {
        errorAnalytics[correctAnswer].capitalization++;
    }

    // Check for punctuation issues (basic example)
    if (userAnswer.replace(/[.,!?]/g, '') === correctAnswer.replace(/[.,!?]/g, '')) {
        errorAnalytics[correctAnswer].punctuation++;
    }
}

function updatePerformanceHistory() {
    const averageAccuracy = performanceHistory.reduce((sum, record) => sum + record.accuracy, 0) / performanceHistory.length || 0;
    document.getElementById('average-accuracy').innerText = `${averageAccuracy.toFixed(2)}%`;

    const missedWords = performanceHistory.flatMap(record => record.missedWords);
    const mostMissedWords = {};
    missedWords.forEach(word => {
        mostMissedWords[word] = (mostMissedWords[word] || 0) + 1;
    });

    const sortedMissedWords = Object.entries(mostMissedWords).sort((a, b) => b[1] - a[1]);
    const mostMissed = sortedMissedWords.length > 0 ? sortedMissedWords[0][0] : 'None';
    document.getElementById('most-missed-words').innerText = mostMissed;

    const recentScores = performanceHistory.slice(-5).map(record => `${record.accuracy}%`).join(', ') || 'None';
    document.getElementById('recent-scores').innerText = recentScores;

    // Update error analytics
    updateErrorAnalytics();
}

function updateErrorAnalytics() {
    const commonMistakesList = document.getElementById('common-mistakes-list');
    commonMistakesList.innerHTML = ''; // Clear previous mistakes

    for (const [word, errors] of Object.entries(errorAnalytics)) {
        const li = document.createElement('li');
        li.innerText = `${word}: ${errors.count} errors (Capitalization: ${errors.capitalization}, Punctuation: ${errors.punctuation})`;
        commonMistakesList.appendChild(li);
    }

    document.getElementById('error-analytics-container').style.display = 'block'; // Show error analytics
}

function toggleErrorAnalytics() {
    const errorAnalyticsContainer = document.getElementById('error-analytics-container');
    const toggleButton = document.getElementById('toggle-error-analytics');

    if (errorAnalyticsContainer.style.display === 'none' || errorAnalyticsContainer.style.display === '') {
        errorAnalyticsContainer.style.display = 'block';
        toggleButton.innerText = 'Hide Error Analytics';
    } else {
        errorAnalyticsContainer.style.display = 'none';
        toggleButton.innerText = 'Show Error Analytics';
    }
}

function restartSession() {
    clearInterval(timerInterval); // Stop the timer
    // Reset all relevant fields and states
    document.getElementById('userInput').value = '';
    document.getElementById('prayerSelect').selectedIndex = 0;
    document.getElementById('difficultySelect').selectedIndex = 0;
    document.getElementById('blanksContainer').innerHTML = '';
    document.getElementById('feedback').style.display = 'none';
    document.getElementById('accuracy-container').style.display = 'none';
    document.getElementById('word-count').innerText = '0';
    document.getElementById('total-words').innerText = '0'; // Reset total words
    document.getElementById('timer').innerText = '00:00';
    document.getElementById('accuracy-bar').style.width = '0%';
    document.getElementById('typingInterface').style.display = 'none'; // Hide typing interface

    // Reset performance history and error analytics
    performanceHistory = [];
    errorAnalytics = {};
    document.getElementById('history-container').style.display = 'none'; // Hide history container
    document.getElementById('error-analytics-container').style.display = 'none'; // Hide error analytics container
}
