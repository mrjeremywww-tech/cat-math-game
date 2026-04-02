/* ===== Cat Math Adventure - Games Module ===== */

// Game State
let currentGame = null;
let currentQuestion = 0;
let totalQuestions = 5;
let score = 0;
let stars = 0;
let totalStars = 0;
let totalTreats = 0;

// Game Data - Cambridge Maths Grade 1 Units
const gamesData = {
    1: {
        title: "Numbers to 10!",
        instruction: "Count the objects and choose the right number!",
        generator: generateCountingGame
    },
    2: {
        title: "Geometry 1 - Shapes!",
        instruction: "Click on the correct 2D or 3D shape!",
        generator: generateShapesGame
    },
    3: {
        title: "Fractions 1!",
        instruction: "Which shape shows one half?",
        generator: generateFractionsGame
    },
    4: {
        title: "Length!",
        instruction: "Compare the lengths! Which is longer/shorter?",
        generator: generateLengthGame
    },
    5: {
        title: "Add & Subtract to 10!",
        instruction: "Add or subtract the numbers!",
        generator: generateAdditionGame
    },
    6: {
        title: "Position!",
        instruction: "Where is the object? Above, below, left or right?",
        generator: generatePositionGame
    },
    7: {
        title: "Sorting!",
        instruction: "Sort the items into the correct groups!",
        generator: generateSortingGame
    },
    8: {
        title: "Time 1 - O'Clock!",
        instruction: "What time is shown on the clock?",
        generator: generateTimeGame
    },
    9: {
        title: "Numbers to 20!",
        instruction: "Count and compare numbers to 20!",
        generator: generateNumbersTo20Game
    },
    10: {
        title: "Geometry 2 - More Shapes!",
        instruction: "Find shapes with specific properties!",
        generator: generateAdvancedShapesGame
    },
    11: {
        title: "Fractions 2 - Halves!",
        instruction: "Find one half of the shape or number!",
        generator: generateHalvesGame
    },
    12: {
        title: "Mass & Capacity!",
        instruction: "Compare weight and capacity!",
        generator: generateMassCapacityGame
    },
    13: {
        title: "Money & Calculation!",
        instruction: "Count coins and solve money problems!",
        generator: generateMoneyGame
    },
    14: {
        title: "Graphs & Charts!",
        instruction: "Read the graph and answer questions!",
        generator: generateGraphsGame
    },
    15: {
        title: "Time 2 - Half Past!",
        instruction: "Tell time to the half hour!",
        generator: generateTimeAdvancedGame
    },
    16: {
        title: "Patterns & Direction!",
        instruction: "Continue patterns and follow directions!",
        generator: generatePatternsDirectionGame
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

// Unit 3: Fractions 1
function generateFractionsGame(container) {
    const shapes = [
        { name: 'circle', halves: true, svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#FF8C42" stroke="#2D2D2D" stroke-width="3"/><line x1="50" y1="5" x2="50" y2="95" stroke="#2D2D2D" stroke-width="3"/></svg>' },
        { name: 'circle', halves: false, svg: '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="45" fill="#FF8C42" stroke="#2D2D2D" stroke-width="3"/></svg>' },
        { name: 'square', halves: true, svg: '<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="#42A5F5" stroke="#2D2D2D" stroke-width="3"/><line x1="50" y1="10" x2="50" y2="90" stroke="#2D2D2D" stroke-width="3"/></svg>' },
        { name: 'square', halves: false, svg: '<svg viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="#42A5F5" stroke="#2D2D2D" stroke-width="3"/></svg>' }
    ];
    
    const shuffled = shuffleArray([...shapes]);
    let html = '<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">Which shape shows <strong>one half</strong>?</p>';
    html += '<div class="shape-display">';
    shuffled.forEach((shape, index) => {
        html += `<div class="shape-item" onclick="checkAnswer(${shape.halves}, true, this)">${shape.svg}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 4: Length
function generateLengthGame(container) {
    const items = [
        { name: 'pencil', emoji: '✏️', length: 3 },
        { name: 'ruler', emoji: '📏', length: 5 },
        { name: 'book', emoji: '📕', length: 4 },
        { name: 'snake', emoji: '🐍', length: 6 }
    ];
    const target = items[getRandomInt(0, items.length - 1)];
    const isLonger = Math.random() > 0.5;
    
    let html = `<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">The ${target.name} is ${target.length} blocks long. Which is ${isLonger ? 'LONGER' : 'SHORTER'}?</p>`;
    html += '<div class="shape-display">';
    items.forEach(item => {
        let blocks = '';
        for (let i = 0; i < item.length; i++) blocks += '█';
        const isCorrect = isLonger ? item.length > target.length : item.length < target.length;
        html += `<div class="length-item" onclick="checkAnswer(${isCorrect}, true, this)"><div style="font-size: 24px;">${item.emoji}</div><div style="font-size: 12px; color: #666;">${blocks}</div></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 6: Position
function generatePositionGame(container) {
    const positions = [
        { word: 'ABOVE', emoji: '☁️', answer: 'above' },
        { word: 'BELOW', emoji: '🌱', answer: 'below' },
        { word: 'LEFT', emoji: '👈', answer: 'left' },
        { word: 'RIGHT', emoji: '👉', answer: 'right' }
    ];
    const target = positions[getRandomInt(0, positions.length - 1)];
    const shuffled = shuffleArray([...positions]);
    
    let html = '<div style="text-align: center; margin: 20px 0;">';
    html += '<div style="font-size: 40px;">🐱</div>';
    html += `<div style="font-size: 30px; margin: 10px;">${target.emoji}</div>`;
    html += '</div>';
    html += `<p style="text-align: center; font-size: 14px;">Where is the ${target.emoji}?</p>`;
    html += '<div class="answer-grid">';
    shuffled.forEach(pos => {
        html += `<button class="answer-btn" onclick="checkAnswer('${pos.answer}', '${target.answer}', this)">${pos.word}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 7: Sorting
function generateSortingGame(container) {
    const categories = [
        { name: 'Animals', items: ['🐱', '🐶', '🐭', '🐰'] },
        { name: 'Fruits', items: ['🍎', '🍌', '🍊', '🍇'] },
        { name: 'Shapes', items: ['🔴', '🔷', '🔺', '⭐'] }
    ];
    const targetCat = categories[getRandomInt(0, categories.length - 1)];
    const wrongItem = categories[(categories.indexOf(targetCat) + 1) % categories.length].items[0];
    const items = shuffleArray([...targetCat.items, wrongItem]);
    
    let html = `<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">Find the item that does NOT belong with <strong>${targetCat.name}</strong>!</p>`;
    html += '<div class="shape-display">';
    items.forEach(item => {
        const isWrong = item === wrongItem;
        html += `<div class="shape-item" style="font-size: 40px;" onclick="checkAnswer(${isWrong}, true, this)">${item}</div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 9: Numbers to 20
function generateNumbersTo20Game(container) {
    const num1 = getRandomInt(10, 20);
    const num2 = getRandomInt(10, 20);
    const answer = Math.max(num1, num2);
    
    let html = '<div class="number-display">';
    html += `<div class="big-number">${num1}</div>`;
    html += `<div style="font-size: 24px;">vs</div>`;
    html += `<div class="big-number">${num2}</div>`;
    html += '</div>';
    html += '<p style="text-align: center; font-size: 14px;">Which number is BIGGER?</p>';
    html += '<div class="answer-grid">';
    [num1, num2].forEach(num => {
        html += `<button class="answer-btn" onclick="checkAnswer(${num}, ${answer}, this)">${num}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 10: Geometry 2 - Advanced Shapes
function generateAdvancedShapesGame(container) {
    const shapes = [
        { name: 'circle', color: '#FF8C42', round: true, corners: 0 },
        { name: 'square', color: '#42A5F5', round: false, corners: 4 },
        { name: 'triangle', color: '#66BB6A', round: false, corners: 3 },
        { name: 'rectangle', color: '#AB47BC', round: false, corners: 4 }
    ];
    const properties = ['round', 'corners'];
    const property = properties[getRandomInt(0, 1)];
    const targetShape = shapes[getRandomInt(0, shapes.length - 1)];
    
    let question = '';
    let answer = '';
    if (property === 'round') {
        question = targetShape.round ? 'Which shape is ROUND?' : 'Which shape has CORNERS?';
        answer = targetShape.round ? 'round' : 'corners';
    } else {
        question = `Which shape has ${targetShape.corners} corners?`;
    }
    
    let html = `<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">${question}</p>`;
    html += '<div class="shape-display">';
    shapes.forEach(shape => {
        let isCorrect = property === 'round' ? shape.round === targetShape.round : shape.corners === targetShape.corners;
        let svg = '';
        if (shape.name === 'circle') svg = `<circle cx="40" cy="40" r="35" fill="${shape.color}" stroke="#2D2D2D" stroke-width="3"/>`;
        else if (shape.name === 'square') svg = `<rect x="10" y="10" width="60" height="60" fill="${shape.color}" stroke="#2D2D2D" stroke-width="3"/>`;
        else if (shape.name === 'triangle') svg = `<polygon points="40,10 70,70 10,70" fill="${shape.color}" stroke="#2D2D2D" stroke-width="3"/>`;
        else svg = `<rect x="5" y="15" width="70" height="50" fill="${shape.color}" stroke="#2D2D2D" stroke-width="3"/>`;
        html += `<div class="shape-item" onclick="checkAnswer(${isCorrect}, true, this)"><svg viewBox="0 0 80 80">${svg}</svg></div>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 11: Fractions 2 - Halves
function generateHalvesGame(container) {
    const num = getRandomInt(2, 10) * 2;
    const half = num / 2;
    
    let html = `<div style="text-align: center; font-size: 36px; margin: 20px;">${num}</div>`;
    html += '<p style="text-align: center; font-size: 14px;">What is ONE HALF of this number?</p>';
    html += '<div class="answer-grid">';
    const answers = shuffleArray([half, half + 1, half - 1, num]).slice(0, 4);
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${half}, this)">${ans}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 12: Mass & Capacity
function generateMassCapacityGame(container) {
    const items = [
        { heavy: '🐘', light: '🐭', question: 'Which is HEAVIER?' },
        { heavy: '📚', light: '🪶', question: 'Which is HEAVIER?' },
        { heavy: '🪣', light: '🥛', question: 'Which holds MORE?' }
    ];
    const item = items[getRandomInt(0, items.length - 1)];
    const correct = Math.random() > 0.5;
    
    let html = `<p style="text-align: center; margin-bottom: 20px; font-size: 14px;">${item.question}</p>`;
    html += '<div class="shape-display">';
    html += `<div class="shape-item" style="font-size: 50px;" onclick="checkAnswer(${correct}, true, this)">${item.heavy}</div>`;
    html += `<div class="shape-item" style="font-size: 50px;" onclick="checkAnswer(${!correct}, true, this)">${item.light}</div>`;
    html += '</div>';
    container.innerHTML = html;
}

// Unit 14: Graphs
function generateGraphsGame(container) {
    const items = ['🍎', '🍌', '🍊'];
    const counts = [getRandomInt(1, 5), getRandomInt(1, 5), getRandomInt(1, 5)];
    const maxItem = items[counts.indexOf(Math.max(...counts))];
    const minItem = items[counts.indexOf(Math.min(...counts))];
    const isMax = Math.random() > 0.5;
    
    let html = '<div style="display: flex; justify-content: center; gap: 20px; margin: 20px 0;">';
    items.forEach((item, i) => {
        html += '<div style="text-align: center;">';
        for (let j = 0; j < counts[i]; j++) {
            html += `<div style="font-size: 24px;">${item}</div>`;
        }
        html += `<div style="border-top: 3px solid #333; margin-top: 5px; font-size: 14px;">${counts[i]}</div>`;
        html += '</div>';
    });
    html += '</div>';
    html += `<p style="text-align: center; font-size: 14px;">Which fruit is ${isMax ? 'MOST' : 'LEAST'} common?</p>`;
    html += '<div class="answer-grid">';
    items.forEach((item, i) => {
        const isCorrect = isMax ? item === maxItem : item === minItem;
        html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer(${isCorrect}, true, this)">${item}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 15: Time 2 - Half Past
function generateTimeAdvancedGame(container) {
    const hour = getRandomInt(1, 12);
    const isHalfPast = Math.random() > 0.5;
    const hourRotation = (hour % 12) * 30 + (isHalfPast ? 15 : 0);
    const minuteRotation = isHalfPast ? 180 : 0;
    const timeStr = isHalfPast ? `${hour}:30` : `${hour}:00`;
    
    let html = '<div class="clock-display">';
    html += `<div class="clock-hand hour" style="transform: rotate(${hourRotation}deg); height: 25%;"></div>`;
    html += `<div class="clock-hand minute" style="transform: rotate(${minuteRotation}deg);"></div>`;
    html += '<div class="clock-center"></div>';
    [12, 3, 6, 9].forEach(num => {
        const pos = num === 12 ? { top: '5%', left: '50%' } : num === 3 ? { top: '50%', right: '5%' } : num === 6 ? { top: '85%', left: '50%' } : { top: '50%', left: '5%' };
        html += `<div class="clock-number" style="top:${pos.top};left:${pos.left || 'auto'};right:${pos.right || 'auto'};transform: translate(-50%, -50%); position: absolute;">${num}</div>`;
    });
    html += '</div>';
    html += '<p style="text-align: center; font-size: 14px;">What time is it?</p>';
    html += '<div class="answer-grid">';
    const answers = shuffleArray([timeStr, `${hour}:00`, `${hour === 1 ? 12 : hour - 1}:30`, `${(hour % 12) + 1}:00`]).slice(0, 4);
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer('${ans}', '${timeStr}', this)">${ans}</button>`;
    });
    html += '</div>';
    container.innerHTML = html;
}

// Unit 16: Patterns & Direction
function generatePatternsDirectionGame(container) {
    const directions = ['👆 UP', '👇 DOWN', '👈 LEFT', '👉 RIGHT'];
    const pattern = [];
    for (let i = 0; i < 3; i++) pattern.push(directions[getRandomInt(0, 3)]);
    const next = directions[getRandomInt(0, 3)];
    pattern.push(next);
    
    let html = '<p style="text-align: center; font-size: 14px; margin-bottom: 10px;">Follow the pattern!</p>';
    html += '<div class="pattern-display">';
    pattern.slice(0, 3).forEach(dir => {
        html += `<div class="sequence-number" style="font-size: 28px;">${dir.split(' ')[0]}</div>`;
    });
    html += `<div class="pattern-slot">?</div>`;
    html += '</div>';
    html += '<div class="answer-grid">';
    shuffleArray(directions).forEach(dir => {
        html += `<button class="answer-btn" onclick="checkAnswer('${dir}', '${next}', this)">${dir}</button>`;
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
