/* ===== Cat Math Adventure - Games Module ===== */

// Game State
let currentGame = null;
let currentQuestion = 0;
let totalQuestions = 5;
let score = 0;
let stars = 0;
let totalStars = 0;
let totalTreats = 0;

// Game Data
const gamesData = {
    1: {
        title: "Counting Fun!",
        instruction: "Count the objects and choose the right number!",
        generator: generateCountingGame
    },
    2: {
        title: "Addition Adventure!",
        instruction: "Add the numbers together!",
        generator: generateAdditionGame
    },
    3: {
        title: "Subtraction Safari!",
        instruction: "Subtract the smaller number from the bigger one!",
        generator: generateSubtractionGame
    },
    4: {
        title: "Number Sequences!",
        instruction: "What number comes next in the pattern?",
        generator: generateSequenceGame
    },
    5: {
        title: "Even or Odd?",
        instruction: "Is the number even (divisible by 2) or odd?",
        generator: generateEvenOddGame
    },
    6: {
        title: "Greater or Less?",
        instruction: "Compare the two numbers!",
        generator: generateComparisonGame
    },
    7: {
        title: "Addition with Pictures!",
        instruction: "Count the items and add them!",
        generator: generatePictureAdditionGame
    },
    8: {
        title: "Subtraction with Pictures!",
        instruction: "Count the items and subtract!",
        generator: generatePictureSubtractionGame
    },
    9: {
        title: "Make 10!",
        instruction: "What number plus this one equals 10?",
        generator: generateNumberBondsGame
    },
    10: {
        title: "Doubles!",
        instruction: "Add the same number to itself!",
        generator: generateDoublesGame
    },
    11: {
        title: "Shape Detective!",
        instruction: "Click on the correct shape!",
        generator: generateShapesGame
    },
    12: {
        title: "Pattern Party!",
        instruction: "What comes next in the pattern?",
        generator: generatePatternsGame
    },
    13: {
        title: "Word Problems!",
        instruction: "Read the story and solve the problem!",
        generator: generateWordProblemGame
    },
    14: {
        title: "Money Math!",
        instruction: "Count the coins and find the total!",
        generator: generateMoneyGame
    },
    15: {
        title: "Time Teller!",
        instruction: "What time is shown on the clock?",
        generator: generateTimeGame
    },
    16: {
        title: "Final Challenge!",
        instruction: "Test everything you've learned!",
        generator: generateChallengeGame
    }
};

// Utility Functions
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Game Starters
function startGame(unitNum) {
    currentGame = unitNum;
    currentQuestion = 0;
    score = 0;
    stars = 0;
    
    document.getElementById('mainMenu').classList.add('hidden');
    document.getElementById('gameContainer').classList.remove('hidden');
    
    const gameData = gamesData[unitNum];
    document.getElementById('gameTitle').textContent = gameData.title;
    document.getElementById('instructionText').textContent = gameData.instruction;
    
    updateProgressBar();
    nextQuestion();
    playSound('click');
}

function backToMenu() {
    document.getElementById('mainMenu').classList.remove('hidden');
    document.getElementById('gameContainer').classList.add('hidden');
    document.getElementById('resultsModal').classList.add('hidden');
    document.getElementById('levelCompleteModal').classList.add('hidden');
    currentGame = null;
}

function nextQuestion() {
    if (currentQuestion >= totalQuestions) {
        showLevelComplete();
        return;
    }
    
    currentQuestion++;
    updateProgressBar();
    
    const gameData = gamesData[currentGame];
    const gameArea = document.getElementById('gameArea');
    gameArea.innerHTML = '';
    
    gameData.generator(gameArea);
}

function updateProgressBar() {
    const progress = (currentQuestion / totalQuestions) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Answer Checking
function checkAnswer(selected, correct, buttonElement) {
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        buttonElement.classList.add('correct');
        score++;
        stars++;
        document.getElementById('gameStars').textContent = stars;
        playSound('correct');
        showFloatingTreat();
        catSay('Purr-fect! 🐱');
        
        setTimeout(() => showResults(true), 800);
    } else {
        buttonElement.classList.add('wrong');
        playSound('wrong');
        catSay('Try again! You got this! 💪');
        
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.classList.remove('wrong');
            });
        }, 1000);
    }
}

function showResults(correct) {
    if (correct) {
        const modal = document.getElementById('resultsModal');
        const starsDisplay = '⭐'.repeat(Math.min(stars, 3));
        document.getElementById('resultStars').textContent = starsDisplay;
        document.getElementById('treatsEarned').textContent = '+' + score;
        modal.classList.remove('hidden');
        playSound('win');
    }
}

function continueGame() {
    document.getElementById('resultsModal').classList.add('hidden');
    nextQuestion();
}

function showLevelComplete() {
    totalStars += stars;
    totalTreats += score;
    
    document.getElementById('totalStars').textContent = totalStars;
    document.getElementById('totalTreats').textContent = totalTreats;
    document.getElementById('finalStars').textContent = stars;
    document.getElementById('finalTreats').textContent = score;
    
    document.getElementById('levelCompleteModal').classList.remove('hidden');
    playSound('win');
    celebrate();
}

function celebrate() {
    const cat = document.getElementById('celebrationCat');
    cat.textContent = '😸';
    setTimeout(() => cat.textContent = '🐱', 500);
    setTimeout(() => cat.textContent = '😺', 1000);
    setTimeout(() => cat.textContent = '🐱', 1500);
}

// ===== GAME GENERATORS =====

// Unit 1: Counting (1-20)
function generateCountingGame(container) {
    const count = getRandomInt(1, 20);
    const items = ['🐟', '🐭', '🧶', '🐾', '🐱'];
    const item = items[getRandomInt(0, items.length - 1)];
    
    let html = '<div class="picture-items">';
    for (let i = 0; i < count; i++) {
        html += `<span style="animation: bounce 0.5s ${i * 0.05}s">${item}</span>`;
    }
    html += '</div>';
    
    const answers = shuffleArray([
        count,
        count + getRandomInt(1, 3),
        Math.max(1, count - getRandomInt(1, 3)),
        count + getRandomInt(-2, 2) || count + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${count}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 2: Basic Addition (1-10)
function generateAdditionGame(container) {
    const a = getRandomInt(1, 10);
    const b = getRandomInt(1, 10);
    const answer = a + b;
    
    let html = `<div class="math-problem">${a} + ${b} = ?</div>`;
    
    const answers = shuffleArray([
        answer,
        answer + getRandomInt(1, 3),
        Math.max(1, answer - getRandomInt(1, 3)),
        a + b + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 3: Basic Subtraction (1-10)
function generateSubtractionGame(container) {
    const a = getRandomInt(5, 15);
    const b = getRandomInt(1, a);
    const answer = a - b;
    
    let html = `<div class="math-problem">${a} - ${b} = ?</div>`;
    
    const answers = shuffleArray([
        answer,
        answer + getRandomInt(1, 3),
        Math.max(0, answer - getRandomInt(1, 3)),
        a - b + 2
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 4: Number Sequences
function generateSequenceGame(container) {
    const patterns = [
        { seq: [2, 4, 6, 8], next: 10, type: 'even' },
        { seq: [1, 3, 5, 7], next: 9, type: 'odd' },
        { seq: [5, 10, 15, 20], next: 25, type: 'fives' },
        { seq: [10, 20, 30, 40], next: 50, type: 'tens' },
        { seq: [3, 6, 9, 12], next: 15, type: 'threes' },
        { seq: [1, 2, 3, 4], next: 5, type: 'count' },
        { seq: [10, 9, 8, 7], next: 6, type: 'reverse' }
    ];
    
    const pattern = patterns[getRandomInt(0, patterns.length - 1)];
    
    let html = '<div class="sequence-display">';
    pattern.seq.forEach(num => {
        html += `<div class="sequence-number">${num}</div>`;
    });
    html += `<div class="sequence-number missing">?</div>`;
    html += '</div>';
    
    const answers = shuffleArray([
        pattern.next,
        pattern.next + getRandomInt(1, 3),
        pattern.next - getRandomInt(1, 3),
        pattern.next + getRandomInt(-2, 2) || pattern.next + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${pattern.next}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 5: Even and Odd
function generateEvenOddGame(container) {
    const num = getRandomInt(1, 20);
    const isEven = num % 2 === 0;
    
    let html = `<div class="number-display">${num}</div>`;
    html += `<p style="text-align: center; margin: 20px 0; font-size: 12px;">Is this number even or odd?</p>`;
    
    html += '<div class="answer-grid">';
    html += `<button class="answer-btn" onclick="checkAnswer('even', '${isEven ? 'even' : 'odd'}', this)">Even ⚖️</button>`;
    html += `<button class="answer-btn" onclick="checkAnswer('odd', '${isEven ? 'even' : 'odd'}', this)">Odd 🎲</button>`;
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 6: Greater Than/Less Than
function generateComparisonGame(container) {
    const a = getRandomInt(1, 20);
    const b = getRandomInt(1, 20);
    
    while (a === b) {
        b = getRandomInt(1, 20);
    }
    
    let correct;
    if (a > b) correct = '>';
    else if (a < b) correct = '<';
    else correct = '=';
    
    let html = '<div class="comparison-display">';
    html += `<div class="compare-number">${a}</div>`;
    html += `<div style="font-size: 24px;">?</div>`;
    html += `<div class="compare-number">${b}</div>`;
    html += '</div>';
    
    html += '<div class="comparison-display" style="margin-top: 30px;">';
    ['<', '>'].forEach(symbol => {
        html += `<button class="compare-btn" onclick="checkAnswer('${symbol}', '${correct}', this)">${symbol}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 7: Addition with Pictures
function generatePictureAdditionGame(container) {
    const a = getRandomInt(1, 8);
    const b = getRandomInt(1, 8);
    const answer = a + b;
    const items = ['🍎', '🍌', '🍊', '🍇', '🍓'];
    const itemA = items[getRandomInt(0, items.length - 1)];
    const itemB = items[getRandomInt(0, items.length - 1)];
    
    let html = '<div style="text-align: center; margin-bottom: 20px;">';;
    html += `<div class="picture-items" style="margin: 10px 0;">`;
    for (let i = 0; i < a; i++) html += itemA;
    html += '</div>';
    html += '<div style="font-size: 30px; margin: 10px;">+</div>';
    html += `<div class="picture-items" style="margin: 10px 0;">`;
    for (let i = 0; i < b; i++) html += itemB;
    html += '</div>';
    html += '</div>';
    
    const answers = shuffleArray([
        answer,
        answer + getRandomInt(1, 3),
        Math.max(1, answer - getRandomInt(1, 3)),
        a + b + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 8: Subtraction with Pictures
function generatePictureSubtractionGame(container) {
    const total = getRandomInt(5, 12);
    const remove = getRandomInt(1, total - 1);
    const answer = total - remove;
    const item = ['🐟', '🧶', '🐭', '🐾'][getRandomInt(0, 3)];
    
    let html = '<div style="text-align: center; margin-bottom: 20px;">';;
    html += `<p style="margin-bottom: 10px; font-size: 10px;">Start with ${total}, take away ${remove}</p>`;
    html += `<div class="picture-items" style="margin: 10px 0;">`;
    for (let i = 0; i < total; i++) {
        const faded = i >= (total - remove) ? 'opacity: 0.3; text-decoration: line-through;' : '';
        html += `<span style="${faded}">${item}</span>`;
    }
    html += '</div>';
    html += '</div>';
    
    const answers = shuffleArray([
        answer,
        answer + getRandomInt(1, 3),
        Math.max(0, answer - getRandomInt(1, 3)),
        total - remove + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 9: Number Bonds (Making 10)
function generateNumberBondsGame(container) {
    const a = getRandomInt(1, 9);
    const answer = 10 - a;
    
    let html = '<div class="number-bond">';
    html += `<div class="bond-circle top">10</div>`;
    html += '</div>';
    html += '<div class="number-bond">';
    html += `<div class="bond-circle bottom">${a}</div>`;
    html += '<div class="bond-connector">+</div>';
    html += `<div class="bond-circle bottom" style="background: #FFECB3; border-style: dashed;">?</div>`;
    html += '</div>';
    
    const answers = shuffleArray([
        answer,
        answer + 1,
        answer - 1,
        getRandomInt(1, 9)
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 10: Doubles
function generateDoublesGame(container) {
    const num = getRandomInt(1, 10);
    const answer = num * 2;
    
    let html = `<div class="math-problem">${num} + ${num} = ?</div>`;
    html += `<p style="text-align: center; font-size: 12px;">Double it!</p>`;
    
    const answers = shuffleArray([
        answer,
        answer + 2,
        answer - 2,
        num + num + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 11: Shapes Recognition
function generateShapesGame(container) {
    const shapes = [
        { name: 'circle', svg: '<svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="35" fill="#FF8C42" stroke="#2D2D2D" stroke-width="4"/></svg>' },
        { name: 'square', svg: '<svg viewBox="0 0 80 80"><rect x="10" y="10" width="60" height="60" fill="#42A5F5" stroke="#2D2D2D" stroke-width="4"/></svg>' },
        { name: 'triangle', svg: '<svg viewBox="0 0 80 80"><polygon points="40,10 70,70 10,70" fill="#66BB6A" stroke="#2D2D2D" stroke-width="4"/></svg>' },
        { name: 'star', svg: '<svg viewBox="0 0 80 80"><polygon points="40,10 48,30 70,30 52,45 58,65 40,52 22,65 28,45 10,30 32,30" fill="#FFD700" stroke="#2D2D2D" stroke-width="3"/></svg>' }
    ];
    
    const target = shapes[getRandomInt(0, shapes.length - 1)];
    const shuffledShapes = shuffleArray(shapes).slice(0, 4);
    
    let html = `<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">Find the <strong>${target.name}</strong>!</p>`;
    
    html += '<div class="shape-display">';
    shuffledShapes.forEach(shape => {
        html += `<div class="shape-item" onclick="checkAnswer('${shape.name}', '${target.name}', this)">${shape.svg}</div>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 12: Patterns
function generatePatternsGame(container) {
    const patterns = [
        { seq: ['🔴', '🔵', '🔴', '🔵'], next: '🔴', options: ['🔴', '🔵', '🟢', '🟡'] },
        { seq: ['🐱', '🐭', '🐱', '🐭'], next: '🐱', options: ['🐱', '🐭', '🐶', '🐰'] },
        { seq: ['⭐', '⭐', '🌙', '⭐', '⭐'], next: '🌙', options: ['⭐', '🌙', '☀️', '☁️'] },
        { seq: ['🔺', '🔺', '🔺', '🔷', '🔺'], next: '🔺', options: ['🔺', '🔷', '🔸', '🔹'] }
    ];
    
    const pattern = patterns[getRandomInt(0, patterns.length - 1)];
    
    let html = '<div class="pattern-display">';
    pattern.seq.forEach(item => {
        html += `<div class="sequence-number" style="font-size: 24px;">${item}</div>`;
    });
    html += `<div class="pattern-slot">?</div>`;
    html += '</div>';
    
    html += '<div class="answer-grid">';
    pattern.options.forEach(option => {
        html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer('${option}', '${pattern.next}', this)">${option}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 13: Word Problems
function generateWordProblemGame(container) {
    const templates = [
        { text: 'Whiskers has {a} fish. He catches {b} more. How many fish does he have?', a: getRandomInt(1, 8), b: getRandomInt(1, 5), op: '+' },
        { text: 'Mittens has {total} yarn balls. She gives away {b}. How many does she have left?', total: getRandomInt(5, 12), b: getRandomInt(1, 5), op: '-' },
        { text: 'There are {a} cats playing. {b} more cats join. How many cats now?', a: getRandomInt(2, 6), b: getRandomInt(1, 5), op: '+' },
        { text: 'Tommy has {total} treats. He eats {b}. How many are left?', total: getRandomInt(5, 10), b: getRandomInt(1, 4), op: '-' }
    ];
    
    const problem = templates[getRandomInt(0, templates.length - 1)];
    let answer;
    let displayText = problem.text;
    
    if (problem.op === '+') {
        if (problem.a !== undefined) {
            answer = problem.a + problem.b;
            displayText = displayText.replace('{a}', problem.a).replace('{b}', problem.b);
        } else {
            answer = problem.total + problem.b;
            displayText = displayText.replace('{total}', problem.total).replace('{b}', problem.b);
        }
    } else {
        answer = problem.total - problem.b;
        displayText = displayText.replace('{total}', problem.total).replace('{b}', problem.b);
    }
    
    let html = `<div class="word-problem">${displayText}</div>`;
    
    const answers = shuffleArray([
        answer,
        answer + getRandomInt(1, 3),
        Math.max(0, answer - getRandomInt(1, 3)),
        answer + 1
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 14: Money Basics
function generateMoneyGame(container) {
    const coins = [
        { value: 1, display: '1¢', class: 'penny' },
        { value: 5, display: '5¢', class: 'nickel' },
        { value: 10, display: '10¢', class: 'dime' },
        { value: 25, display: '25¢', class: 'quarter' }
    ];
    
    const numCoins = getRandomInt(2, 4);
    const selectedCoins = [];
    let totalValue = 0;
    
    for (let i = 0; i < numCoins; i++) {
        const coin = coins[getRandomInt(0, coins.length - 1)];
        selectedCoins.push(coin);
        totalValue += coin.value;
    }
    
    let html = '<p style="text-align: center; margin-bottom: 15px; font-size: 12px;">Count the coins!</p>';
    html += '<div class="money-display">';
    selectedCoins.forEach(coin => {
        html += `<div class="coin ${coin.class}">${coin.display}</div>`;
    });
    html += '</div>';
    
    const answers = shuffleArray([
        totalValue,
        totalValue + 5,
        Math.max(5, totalValue - 5),
        totalValue + 10
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${totalValue}, this)">${ans}¢</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 15: Time (O'Clock)
function generateTimeGame(container) {
    const hour = getRandomInt(1, 12);
    const hourRotation = (hour % 12) * 30;
    
    let html = '<div class="clock-display">';
    html += `<div class="clock-hand hour" style="transform: rotate(${hourRotation}deg);"></div>`;
    html += `<div class="clock-hand minute" style="transform: rotate(0deg);"></div>`;
    html += '<div class="clock-center"></div>';
    // Clock numbers
    const positions = [
        { num: 12, top: '5%', left: '50%' },
        { num: 3, top: '50%', right: '5%' },
        { num: 6, top: '85%', left: '50%' },
        { num: 9, top: '50%', left: '5%' }
    ];
    positions.forEach(pos => {
        const style = Object.entries(pos).map(([k, v]) => `${k}:${v}`).join(';');
        html += `<div class="clock-number" style="${style}; transform: translate(-50%, -50%); position: absolute;">${pos.num}</div>`;
    });
    html += '</div>';
    
    html += '<p style="text-align: center; font-size: 14px;">What time is it?</p>';
    
    const answers = shuffleArray([
        `${hour}:00`,
        `${(hour % 12) + 1}:00`,
        `${hour === 1 ? 12 : hour - 1}:00`,
        `${(hour % 12) + 2}:00`
    ]).slice(0, 4);
    
    html += '<div class="answer-grid">';
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer('${ans}', '${hour}:00', this)">${ans}</button>`;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// Unit 16: Final Challenge (Mixed)
function generateChallengeGame(container) {
    const generators = [
        generateAdditionGame,
        generateSubtractionGame,
        generateNumberBondsGame,
        generateDoublesGame
    ];
    
    const randomGenerator = generators[getRandomInt(0, generators.length - 1)];
    randomGenerator(container);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load saved progress
    const saved = localStorage.getItem('catMathProgress');
    if (saved) {
        const progress = JSON.parse(saved);
        totalStars = progress.stars || 0;
        totalTreats = progress.treats || 0;
        document.getElementById('totalStars').textContent = totalStars;
        document.getElementById('totalTreats').textContent = totalTreats;
    }
    
    // Save progress on page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('catMathProgress', JSON.stringify({
            stars: totalStars,
            treats: totalTreats
        }));
    });
});
