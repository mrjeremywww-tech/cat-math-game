/* ===== Cat Math Adventure - Games Module =====
 * Cambridge Primary Mathematics Workbook 1
 * Updated with detailed content from Workbook 1 Markdown
 */

// Game State
let currentGame = null;
let currentQuestion = 0;
let totalQuestions = 5;
let score = 0;
let stars = 0;
let totalStars = 0;
let totalTreats = 0;

// Game Data - Cambridge Maths Workbook 1 Units
const gamesData = {
    1: {
        title: "Unit 1: Numbers to 10",
        instruction: "Count animals and identify odd/even numbers!",
        generator: generateUnit1_Counting
    },
    2: {
        title: "Unit 2: Geometry - 2D & 3D Shapes",
        instruction: "Learn about cubes, spheres, triangles and more!",
        generator: generateUnit2_Shapes
    },
    3: {
        title: "Unit 3: Fractions - Half",
        instruction: "Find one half of shapes and numbers!",
        generator: generateUnit3_Fractions
    },
    4: {
        title: "Unit 4: Length & Measures",
        instruction: "Compare lengths - longer or shorter?",
        generator: generateUnit4_Length
    },
    5: {
        title: "Unit 5: Add & Subtract to 10",
        instruction: "Addition, subtraction, and number patterns!",
        generator: generateUnit5_AddSubtract
    },
    6: {
        title: "Unit 6: Position",
        instruction: "Above, below, between, left, right!",
        generator: generateUnit6_Position
    },
    7: {
        title: "Unit 7: Statistics",
        instruction: "Sort, count and compare!",
        generator: generateUnit7_Sorting
    },
    8: {
        title: "Unit 8: Time",
        instruction: "Morning, afternoon, and telling time!",
        generator: generateUnit8_Time
    },
    9: {
        title: "Unit 9: Numbers to 20",
        instruction: "Count and work with numbers 10-20!",
        generator: generateUnit9_Numbers20
    },
    10: {
        title: "Unit 10: More Geometry",
        instruction: "More shapes and their properties!",
        generator: generateUnit10_Geometry2
    },
    11: {
        title: "Unit 11: More Fractions",
        instruction: " halves and equal parts!",
        generator: generateUnit11_Halves
    },
    12: {
        title: "Unit 12: Mass & Capacity",
        instruction: "Compare weight and volume!",
        generator: generateUnit12_MassCapacity
    },
    13: {
        title: "Unit 13: Working with Numbers to 20",
        instruction: "Advanced addition and doubles!",
        generator: generateUnit13_Numbers20Advanced
    },
    14: {
        title: "Unit 14: Graphs",
        instruction: "Read pictograms and charts!",
        generator: generateUnit14_Graphs
    },
    15: {
        title: "Unit 15: More Time",
        instruction: "Half past and time patterns!",
        generator: generateUnit15_TimeHalf
    },
    16: {
        title: "Unit 16: Patterns & Direction",
        instruction: "Continue patterns and follow directions!",
        generator: generateUnit16_Patterns
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
    const buttons = document.querySelectorAll('.answer-btn, .shape-item, .length-item, .coin, .sort-item, .graph-item');
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

// ===== UNIT 1: NUMBERS TO 10 =====
// 1.1 Counting sets of objects, 1.5 Odd and even numbers
function generateUnit1_Counting(container) {
    const type = getRandomInt(1, 4);
    
    if (type === 1) {
        // Count animals (1-10) - Workbook 1.1: Elephants, birds, fish, chickens
        const count = getRandomInt(1, 10);
        const animals = [
            { emoji: '🐘', name: 'elephants' },
            { emoji: '🐦', name: 'birds' },
            { emoji: '🐟', name: 'fish' },
            { emoji: '🐔', name: 'chickens' }
        ];
        const animal = animals[getRandomInt(0, animals.length - 1)];
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">Count the ${animal.name}!</p>`;
        html += `<div class="counting-container">`;
        for (let i = 0; i < count; i++) {
            html += `<span class="count-item" style="animation: bounce 0.5s ${i * 0.1}s; font-size: 35px;">${animal.emoji}</span>`;
        }
        html += `</div>`;
        
        const answers = shuffleArray([count, count + 1, count - 1, count + 2].filter(n => n >= 1 && n <= 10)).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${count}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Number sequence - fill in missing number
        const missing = getRandomInt(2, 9);
        const seq = [missing - 1, missing, missing + 1];
        const display = seq.map(n => n === missing ? '?' : n);
        
        let html = `<p style="text-align: center; margin: 20px 0;">What number is missing?</p>`;
        html += `<div class="sequence-display">`;
        display.forEach(num => {
            html += `<div class="sequence-number">${num}</div>`;
        });
        html += `</div>`;
        
        const answers = shuffleArray([missing, missing + 1, missing - 1, missing + 2]).filter(n => n >= 1 && n <= 10).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${missing}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 3) {
        // 1.5 Odd and even numbers - Count gloves
        const count = getRandomInt(2, 10);
        const isOdd = count % 2 === 1;
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">Count the gloves!</p>`;
        html += `<div class="counting-container">`;
        for (let i = 0; i < count; i++) {
            html += `<span class="count-item" style="font-size: 35px;">🧤</span>`;
        }
        html += `</div>`;
        html += `<p style="text-align: center;">Is ${count} ODD or EVEN?</p>`;
        
        html += `<div class="answer-grid">`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'odd' : 'even'}', '${isOdd ? 'odd' : 'even'}', this)">${isOdd ? 'ODD' : 'EVEN'}</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'even' : 'odd'}', '${isOdd ? 'odd' : 'even'}', this)">${isOdd ? 'EVEN' : 'ODD'}</button>`;
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Odd/Even number identification
        const num = getRandomInt(1, 10);
        const isOdd = num % 2 === 1;
        
        let html = `<div style="font-size: 60px; text-align: center; margin: 20px;">${num}</div>`;
        html += `<p style="text-align: center;">Is this number ODD or EVEN?</p>`;
        
        html += `<div class="answer-grid">`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'odd' : 'even'}', '${isOdd ? 'odd' : 'even'}', this)">ODD</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'even' : 'odd'}', '${isOdd ? 'odd' : 'even'}', this)">EVEN</button>`;
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 2: GEOMETRY - SHAPES =====
// 2.1 3D shapes: cube, cylinder, sphere, edge, face
// 2.2 2D shapes: circle, square, triangle, rectangle
function generateUnit2_Shapes(container) {
    const type = getRandomInt(1, 4);
    
    const shapes2D = [
        { name: 'circle', emoji: '⚪', color: '#FF8C42', sides: 0, desc: '1 curved side' },
        { name: 'square', emoji: '🔲', color: '#42A5F5', sides: 4, desc: '4 equal sides' },
        { name: 'triangle', emoji: '🔺', color: '#66BB6A', sides: 3, desc: '3 sides' },
        { name: 'rectangle', emoji: '▬', color: '#AB47BC', sides: 4, desc: '4 sides' }
    ];
    
    const shapes3D = [
        { name: 'cube', emoji: '🎲', desc: '6 flat faces, 12 edges' },
        { name: 'sphere', emoji: '⚽', desc: 'curved surface, no edges' },
        { name: 'cylinder', emoji: '🥫', desc: '2 flat faces, curved side' }
    ];
    
    if (type === 1) {
        // Find the 2D shape by description
        const target = shapes2D[getRandomInt(0, shapes2D.length - 1)];
        const shuffled = shuffleArray([...shapes2D]).slice(0, 4);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Find the shape with <strong>${target.desc}</strong>!</p>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 50px; background: ${shape.color}20; border: 3px solid ${shape.color}; border-radius: 10px; padding: 15px;" onclick="checkAnswer('${shape.name}', '${target.name}', this)">${shape.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // 2.1 3D Shapes - Match to real objects
        const objects = [
            { name: 'ball', shape: 'sphere', emoji: '⚽' },
            { name: 'dice', shape: 'cube', emoji: '🎲' },
            { name: 'can', shape: 'cylinder', emoji: '🥫' },
            { name: 'box', shape: 'cube', emoji: '📦' }
        ];
        const obj = objects[getRandomInt(0, objects.length - 1)];
        const shuffled = shuffleArray([...shapes3D]).slice(0, 3);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">What shape is a ${obj.name}?</p>`;
        html += `<div style="font-size: 70px; text-align: center; margin: 15px;">${obj.emoji}</div>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 45px;" onclick="checkAnswer('${shape.name}', '${obj.shape}', this)">${shape.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 3) {
        // How many sides?
        const shape = shapes2D[getRandomInt(0, shapes2D.length - 1)];
        
        let html = `<div style="font-size: 80px; text-align: center; margin: 20px;">${shape.emoji}</div>`;
        html += `<p style="text-align: center;">How many sides does a ${shape.name} have?</p>`;
        
        const answers = shuffleArray([shape.sides, shape.sides + 1, shape.sides - 1, shape.sides + 2]).filter(n => n >= 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${shape.sides}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Shape riddle
        const riddles = [
            { text: 'I have 4 straight sides. All my sides are equal.', answer: 'square', emoji: '🔲' },
            { text: 'I have 3 straight sides.', answer: 'triangle', emoji: '🔺' },
            { text: 'I have 1 curved side.', answer: 'circle', emoji: '⚪' }
        ];
        const riddle = riddles[getRandomInt(0, riddles.length - 1)];
        const shuffled = shuffleArray([...shapes2D]).slice(0, 3);
        
        let html = `<p style="text-align: center; margin-bottom: 15px; font-style: italic;">"${riddle.text}"</p>`;
        html += `<p style="text-align: center;">What shape am I?</p>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 45px;" onclick="checkAnswer('${shape.name}', '${riddle.answer}', this)">${shape.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 3: FRACTIONS - HALF =====
// 3.1 Fractions - Half of shapes
function generateUnit3_Fractions(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Which shape shows half?
        const shapes = [
            { name: 'circle_half', display: '◐', halves: true },
            { name: 'circle_full', display: '⚪', halves: false },
            { name: 'square_half', display: '◧', halves: true },
            { name: 'square_full', display: '◻', halves: false }
        ];
        const shuffled = shuffleArray([...shapes]);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which shows <strong>ONE HALF</strong>?</p>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer(${shape.halves}, true, this)">${shape.display}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Half of a number (2, 4, 6, 8, 10)
        const num = getRandomInt(1, 5) * 2;
        const half = num / 2;
        
        let html = `<div style="font-size: 48px; text-align: center; margin: 20px;">${num}</div>`;
        html += `<p style="text-align: center;">What is ONE HALF of ${num}?</p>`;
        
        const answers = shuffleArray([half, half + 1, half - 1, num]).filter(n => n >= 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${half}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // How many ways to halve?
        const shapes = [
            { name: 'triangle', ways: 3 },
            { name: 'square', ways: 4 }
        ];
        const shape = shapes[getRandomInt(0, shapes.length - 1)];
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">An equilateral ${shape.name} can be halved in how many ways?</p>`;
        html += `<div style="font-size: 60px; text-align: center;">${shape.name === 'triangle' ? '🔺' : '🔲'}</div>`;
        
        const answers = shuffleArray([shape.ways, shape.ways + 1, shape.ways - 1, shape.ways + 2]).filter(n => n > 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${shape.ways}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 4: LENGTH =====
function generateUnit4_Length(container) {
    const items = [
        { name: 'pencil', emoji: '✏️', length: 2 },
        { name: 'book', emoji: '📕', length: 3 },
        { name: 'ruler', emoji: '📏', length: 4 },
        { name: 'snake', emoji: '🐍', length: 5 }
    ];
    
    const idx1 = getRandomInt(0, items.length - 1);
    let idx2 = getRandomInt(0, items.length - 1);
    while (idx2 === idx1) idx2 = getRandomInt(0, items.length - 1);
    
    const item1 = items[idx1];
    const item2 = items[idx2];
    const longer = item1.length > item2.length ? item1 : item2;
    
    let html = `<p style="text-align: center; margin-bottom: 20px;">Which is LONGER?</p>`;
    html += `<div class="length-compare">`;
    
    [item1, item2].forEach(item => {
        let blocks = '';
        for (let i = 0; i < item.length; i++) blocks += '█';
        html += `<div class="length-item" onclick="checkAnswer('${item.name}', '${longer.name}', this)">`;
        html += `<div style="font-size: 40px;">${item.emoji}</div>`;
        html += `<div style="font-size: 14px; letter-spacing: 2px;">${blocks}</div>`;
        html += `<div style="font-size: 10px;">${item.length} blocks</div>`;
        html += `</div>`;
    });
    
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 5: ADDITION AND SUBTRACTION =====
// 5.1 Addition as combining, 5.2 Subtraction as take away
// Pattern: odd + 1 = even, even + 1 = odd
function generateUnit5_AddSubtract(container) {
    const type = getRandomInt(1, 4);
    
    if (type === 1) {
        // Simple addition with pictures
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const answer = a + b;
        const emoji = ['🐱', '🐭', '🐟'][getRandomInt(0, 2)];
        
        let html = `<div class="picture-math">`;
        html += `<div class="picture-group">${emoji.repeat(a)}</div>`;
        html += `<div style="font-size: 30px;">+</div>`;
        html += `<div class="picture-group">${emoji.repeat(b)}</div>`;
        html += `</div>`;
        
        const answers = shuffleArray([answer, answer + 1, answer - 1, answer + 2]).filter(n => n >= 1).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Simple subtraction
        const total = getRandomInt(3, 8);
        const remove = getRandomInt(1, total - 1);
        const answer = total - remove;
        const emoji = ['🧶', '🍪', '🍓'][getRandomInt(0, 2)];
        
        let html = `<p style="text-align: center;">Start with ${total}, take away ${remove}</p>`;
        html += `<div class="picture-math">`;
        for (let i = 0; i < total; i++) {
            const faded = i >= (total - remove) ? 'opacity: 0.3;' : '';
            html += `<span style="font-size: 30px; ${faded}">${emoji}</span>`;
        }
        html += `</div>`;
        
        const answers = shuffleArray([answer, answer + 1, answer - 1, total]).filter(n => n >= 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 3) {
        // Word problem
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const answer = a + b;
        
        let html = `<div class="word-problem">`;
        html += `🐱 Alaina has ${a} fish. `;
        html += `She catches ${b} more. `;
        html += `How many fish does she have now?`;
        html += `</div>`;
        
        const answers = shuffleArray([answer, answer + 1, answer - 1, answer + 2]).filter(n => n >= 1).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Pattern: odd + 1 = even, even + 1 = odd
        const num = getRandomInt(1, 9);
        const isOdd = num % 2 === 1;
        const result = num + 1;
        const resultType = isOdd ? 'even' : 'odd';
        
        let html = `<p style="text-align: center; font-size: 24px; margin: 20px;">${num} + 1 = ?</p>`;
        html += `<p style="text-align: center;">${num} is ${isOdd ? 'odd' : 'even'}. What is the result?</p>`;
        
        html += `<div class="answer-grid">`;
        html += `<button class="answer-btn" onclick="checkAnswer(${result}, ${result}, this)">${result} (${resultType})</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer(${result - 2}, ${result}, this)">${result - 2} (${isOdd ? 'odd' : 'even'})</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer(${result + 2}, ${result}, this)">${result + 2} (${isOdd ? 'odd' : 'even'})</button>`;
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 6: POSITION =====
// above, behind, below, beside, between, next to
// Ordinal numbers: 1st, 2nd, 3rd, 4th
function generateUnit6_Position(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Positional words
        const positions = [
            { word: 'ABOVE', answer: 'above', emoji: '☁️', rel: 'The cloud is ___ the cat' },
            { word: 'BELOW', answer: 'below', emoji: '🌱', rel: 'The plant is ___ the cat' },
            { word: 'LEFT', answer: 'left', emoji: '🍓', rel: 'The strawberry is ___ of the cat' },
            { word: 'RIGHT', answer: 'right', emoji: '🍎', rel: 'The apple is ___ of the cat' },
            { word: 'BEHIND', answer: 'behind', emoji: '🌳', rel: 'The tree is ___ the cat' },
            { word: 'BESIDE', answer: 'beside', emoji: '🎾', rel: 'The ball is ___ the cat' }
        ];
        
        const target = positions[getRandomInt(0, positions.length - 1)];
        const shuffled = shuffleArray([...positions]).slice(0, 4);
        
        let html = `<div style="text-align: center; margin: 20px;">`;
        html += `<div style="font-size: 60px; margin-bottom: 10px;">🐱</div>`;
        html += `<div style="font-size: 40px; margin: 10px;">${target.emoji}</div>`;
        html += `</div>`;
        html += `<p style="text-align: center; font-size: 14px;">${target.rel}?</p>`;
        
        html += `<div class="answer-grid">`;
        shuffled.forEach(pos => {
            html += `<button class="answer-btn" onclick="checkAnswer('${pos.answer}', '${target.answer}', this)">${pos.word}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Ordinal numbers
        const animals = ['🐱', '🐶', '🐭', '🐰'];
        const position = getRandomInt(1, 4);
        const ordinals = ['1st', '2nd', '3rd', '4th'];
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">Which animal is ${ordinals[position - 1]}?</p>`;
        html += `<div style="display: flex; justify-content: center; gap: 15px; margin: 20px;">`;
        animals.forEach((animal, idx) => {
            const num = idx + 1;
            html += `<div style="text-align: center;">`;
            html += `<div style="font-size: 40px;">${animal}</div>`;
            html += `<div style="font-size: 14px; color: #666;">${num}</div>`;
            html += `</div>`;
        });
        html += `</div>`;
        
        html += `<div class="answer-grid">`;
        animals.forEach((animal, idx) => {
            html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer('${idx + 1}', '${position}', this)">${animal}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Movement/path following (Bertie the turtle)
        const steps = [
            { dir: 'UP', arrow: '⬆️', moves: 1 },
            { dir: 'RIGHT', arrow: '➡️', moves: 3 },
            { dir: 'UP', arrow: '⬆️', moves: 2 }
        ];
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">Help Bertie the 🐢!</p>`;
        html += `<div style="background: #f0f0f0; padding: 15px; border-radius: 10px; margin: 15px;">`;
        steps.forEach((step, idx) => {
            html += `<div style="margin: 5px 0;">${step.arrow} Go ${step.dir} ${step.moves} step${step.moves > 1 ? 's' : ''}</div>`;
        });
        html += `</div>`;
        html += `<p style="text-align: center;">How many steps total?</p>`;
        
        const total = steps.reduce((sum, s) => sum + s.moves, 0);
        const answers = shuffleArray([total, total + 1, total - 1, total + 2]).filter(n => n > 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${total}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 7: SORTING (STATISTICS) =====
function generateUnit7_Sorting(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Find the odd one out
        const groups = [
            { items: ['🔴', '🔴', '🔴', '🟢'], odd: '🟢' },
            { items: ['■', '■', '■', '▲'], odd: '▲' },
            { items: ['⭐', '⭐', '⭐', '🌙'], odd: '🌙' },
            { items: ['🐱', '🐱', '🐱', '🐭'], odd: '🐭' }
        ];
        const group = groups[getRandomInt(0, groups.length - 1)];
        const shuffled = shuffleArray([...group.items]);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Find the ODD ONE OUT!</p>`;
        html += `<div class="sorting-display">`;
        shuffled.forEach(item => {
            const isOdd = item === group.odd;
            html += `<div class="sort-item" style="font-size: 50px; cursor: pointer; padding: 10px;" onclick="checkAnswer(${isOdd}, true, this)">${item}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Sort by size
        const items = [
            { emoji: '🐱', size: 'small' },
            { emoji: '🐱', size: 'big' },
            { emoji: '🐭', size: 'small' },
            { emoji: '🐭', size: 'big' }
        ];
        const targetSize = Math.random() > 0.5 ? 'big' : 'small';
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Click all ${targetSize.toUpperCase()} animals!</p>`;
        html += `<div class="sorting-display">`;
        items.forEach((item) => {
            const size = item.size === 'big' ? '80px' : '40px';
            const isCorrect = item.size === targetSize;
            html += `<div class="sort-item" style="font-size: ${size}; cursor: pointer;" onclick="checkAnswer(${isCorrect}, true, this)">${item.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 8: TIME =====
// Morning, afternoon, evening; O'Clock
function generateUnit8_Time(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Morning, afternoon, evening
        const times = [
            { time: '7:00', period: 'morning', emoji: '🌅' },
            { time: '12:00', period: 'afternoon', emoji: '☀️' },
            { time: '6:00', period: 'evening', emoji: '🌙' }
        ];
        const target = times[getRandomInt(0, times.length - 1)];
        const shuffled = shuffleArray([...times]);
        
        let html = `<p style="text-align: center; margin-bottom: 15px;">${target.time} - Is it morning, afternoon, or evening?</p>`;
        html += `<div style="font-size: 60px; text-align: center; margin: 15px;">${target.emoji}</div>`;
        
        html += `<div class="answer-grid">`;
        shuffled.forEach(t => {
            html += `<button class="answer-btn" onclick="checkAnswer('${t.period}', '${target.period}', this)">${t.period.toUpperCase()}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // O'Clock time
        const hour = getRandomInt(1, 12);
        const hourAngle = hour * 30;
        
        let html = `<div class="clock-container">`;
        html += `<div class="clock-face">`;
        [12, 3, 6, 9].forEach(num => {
            const pos = num === 12 ? { top: '10%', left: '50%' } : 
                        num === 3 ? { top: '50%', right: '10%' } :
                        num === 6 ? { bottom: '10%', left: '50%' } :
                        { top: '50%', left: '10%' };
            html += `<div class="clock-number" style="top:${pos.top};left:${pos.left || 'auto'};right:${pos.right || 'auto'};bottom:${pos.bottom || 'auto'};transform: translate(-50%, -50%);">${num}</div>`;
        });
        html += `<div class="clock-hand hour" style="transform: rotate(${hourAngle}deg);"></div>`;
        html += `<div class="clock-hand minute" style="transform: rotate(0deg);"></div>`;
        html += `<div class="clock-center"></div>`;
        html += `</div></div>`;
        
        html += `<p style="text-align: center; margin: 20px 0;">What time is it?</p>`;
        
        const answers = shuffleArray([
            `${hour}:00`,
            `${(hour % 12) + 1}:00`,
            `${hour === 1 ? 12 : hour - 1}:00`,
            `${(hour % 12) + 2}:00`
        ]).slice(0, 4);
        
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer('${ans}', '${hour}:00', this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Half past
        const hour = getRandomInt(1, 12);
        const hourAngle = (hour % 12) * 30 + 15;
        const timeStr = `${hour}:30`;
        
        let html = `<div class="clock-container">`;
        html += `<div class="clock-face">`;
        [12, 3, 6, 9].forEach(num => {
            const pos = num === 12 ? { top: '10%', left: '50%' } : 
                        num === 3 ? { top: '50%', right: '10%' } :
                        num === 6 ? { bottom: '10%', left: '50%' } :
                        { top: '50%', left: '10%' };
            html += `<div class="clock-number" style="top:${pos.top};left:${pos.left || 'auto'};right:${pos.right || 'auto'};bottom:${pos.bottom || 'auto'};transform: translate(-50%, -50%);">${num}</div>`;
        });
        html += `<div class="clock-hand hour" style="transform: rotate(${hourAngle}deg); height: 25%;"></div>`;
        html += `<div class="clock-hand minute" style="transform: rotate(180deg);"></div>`;
        html += `<div class="clock-center"></div>`;
        html += `</div></div>`;
        
        html += `<p style="text-align: center; margin: 20px 0;">What time is it?</p>`;
        
        const answers = shuffleArray([
            `${hour}:30`,
            `${hour}:00`,
            `${hour === 1 ? 12 : hour - 1}:30`,
            `${(hour % 12) + 1}:00`
        ]).slice(0, 4);
        
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer('${ans}', '${timeStr}', this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 9: NUMBERS TO 20 =====
function generateUnit9_Numbers20(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Compare two numbers
        const num1 = getRandomInt(10, 20);
        let num2 = getRandomInt(10, 20);
        while (num2 === num1) num2 = getRandomInt(10, 20);
        
        const bigger = num1 > num2 ? num1 : num2;
        
        let html = `<div class="number-compare">`;
        html += `<div class="big-number">${num1}</div>`;
        html += `<div style="font-size: 24px;">VS</div>`;
        html += `<div class="big-number">${num2}</div>`;
        html += `</div>`;
        html += `<p style="text-align: center;">Which number is BIGGER?</p>`;
        
        html += `<div class="answer-grid">`;
        html += `<button class="answer-btn" onclick="checkAnswer(${num1}, ${bigger}, this)">${num1}</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer(${num2}, ${bigger}, this)">${num2}</button>`;
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Missing number in sequence (10-20)
        const start = getRandomInt(10, 17);
        const seq = [start, start + 1, start + 2];
        const missingIdx = getRandomInt(0, 2);
        const missing = seq[missingIdx];
        const display = seq.map((n, i) => i === missingIdx ? '?' : n);
        
        let html = `<p style="text-align: center; margin: 20px 0;">What number is missing?</p>`;
        html += `<div class="sequence-display">`;
        display.forEach(num => {
            html += `<div class="sequence-number">${num}</div>`;
        });
        html += `</div>`;
        
        const answers = shuffleArray([missing, missing + 1, missing - 1, missing + 2]).filter(n => n >= 10 && n <= 20).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${missing}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 10: GEOMETRY 2 =====
function generateUnit10_Geometry2(container) {
    const shapes3D = [
        { name: 'cube', emoji: '🎲', real: 'box', desc: '6 flat faces' },
        { name: 'sphere', emoji: '⚽', real: 'ball', desc: 'curved surface' },
        { name: 'cylinder', emoji: '🥫', real: 'can', desc: '2 flat faces' }
    ];
    
    const target = shapes3D[getRandomInt(0, shapes3D.length - 1)];
    const shuffled = shuffleArray([...shapes3D]);
    
    let html = `<p style="text-align: center; margin-bottom: 20px;">Which shape is like a ${target.real}?</p>`;
    html += `<div class="shape-display">`;
    shuffled.forEach(shape => {
        html += `<div class="shape-item" style="font-size: 50px; padding: 10px; cursor: pointer;" onclick="checkAnswer('${shape.name}', '${target.name}', this)">${shape.emoji}<br><small style="font-size: 12px;">${shape.desc}</small></div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 11: HALVES =====
function generateUnit11_Halves(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Shade half of a shape
        const shapes = [
            { emoji: '◻', half: '◧' },
            { emoji: '⚪', half: '◐' }
        ];
        const shape = shapes[getRandomInt(0, shapes.length - 1)];
        
        let html = `<p style="text-align: center;">Which shows HALF shaded?</p>`;
        html += `<div class="shape-display">`;
        html += `<div class="shape-item" style="font-size: 60px; cursor: pointer;" onclick="checkAnswer(true, true, this)">${shape.half}</div>`;
        html += `<div class="shape-item" style="font-size: 60px; cursor: pointer;" onclick="checkAnswer(false, true, this)">${shape.emoji}</div>`;
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Half of even numbers up to 20
        const num = getRandomInt(2, 10) * 2;
        const half = num / 2;
        
        let html = `<div style="font-size: 48px; text-align: center; margin: 20px;">${num}</div>`;
        html += `<p style="text-align: center;">What is HALF of ${num}?</p>`;
        
        const answers = shuffleArray([half, half + 2, half - 2, num / 4]).filter(n => n >= 1).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${half}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 12: MASS AND CAPACITY =====
function generateUnit12_MassCapacity(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Mass comparison
        const pairs = [
            { heavy: '🐘', light: '🐭', heavyName: 'elephant', lightName: 'mouse' },
            { heavy: '📕', light: '🪶', heavyName: 'book', lightName: 'feather' },
            { heavy: '🥇', light: '🧶', heavyName: 'medal', lightName: 'yarn' }
        ];
        const pair = pairs[getRandomInt(0, pairs.length - 1)];
        const askHeavy = Math.random() > 0.5;
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which is ${askHeavy ? 'HEAVIER' : 'LIGHTER'}?</p>`;
        html += `<div class="shape-display">`;
        html += `<div class="shape-item" style="font-size: 60px; cursor: pointer;" onclick="checkAnswer('${askHeavy ? pair.heavyName : pair.lightName}', '${askHeavy ? pair.heavyName : pair.lightName}', this)">${pair.heavy}</div>`;
        html += `<div class="shape-item" style="font-size: 60px; cursor: pointer;" onclick="checkAnswer('${askHeavy ? pair.lightName : pair.heavyName}', '${askHeavy ? pair.heavyName : pair.lightName}', this)">${pair.light}</div>`;
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Capacity
        const containers = [
            { name: 'bucket', emoji: '🪣', capacity: 'more' },
            { name: 'cup', emoji: '☕', capacity: 'less' }
        ];
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which holds MORE water?</p>`;
        html += `<div class="shape-display">`;
        containers.forEach(c => {
            html += `<div class="shape-item" style="font-size: 60px; cursor: pointer;" onclick="checkAnswer('${c.capacity}', 'more', this)">${c.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 13: WORKING WITH NUMBERS TO 20 =====
// Advanced addition, doubles, make 10 strategy
function generateUnit13_Numbers20Advanced(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Addition with make 10 strategy (e.g., 8 + 5 = 13, via 8 + 2 + 3)
        const a = getRandomInt(5, 9);
        const b = getRandomInt(2, 9);
        const answer = a + b;
        
        let html = `<p style="text-align: center; font-size: 20px; margin: 15px;">${a} + ${b} = ?</p>`;
        html += `<p style="text-align: center; font-size: 12px; color: #666;">Hint: Make 10 first!</p>`;
        html += `<div style="text-align: center; margin: 10px; font-size: 14px;">`;
        html += `${a} + ${10 - a} = 10, then 10 + ${b - (10 - a)} = ?`;
        html += `</div>`;
        
        const answers = shuffleArray([answer, answer + 1, answer - 1, answer + 2]).filter(n => n >= 10 && n <= 20).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Doubles (Double 6 = 12, etc.)
        const num = getRandomInt(1, 10);
        const double = num * 2;
        
        let html = `<p style="text-align: center; margin: 20px;">Double ${num} = ?</p>`;
        html += `<div style="text-align: center; font-size: 35px;">${num} + ${num} = ?</div>`;
        
        const answers = shuffleArray([double, double + 2, double - 2, double + 1]).filter(n => n > 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${double}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Odd/even identification with numbers to 20
        const num = getRandomInt(11, 20);
        const isOdd = num % 2 === 1;
        
        let html = `<div style="font-size: 60px; text-align: center; margin: 20px;">${num}</div>`;
        html += `<p style="text-align: center;">Is this ODD or EVEN?</p>`;
        
        html += `<div class="answer-grid">`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'odd' : 'even'}', '${isOdd ? 'odd' : 'even'}', this)">ODD</button>`;
        html += `<button class="answer-btn" onclick="checkAnswer('${isOdd ? 'even' : 'odd'}', '${isOdd ? 'odd' : 'even'}', this)">EVEN</button>`;
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 14: GRAPHS =====
function generateUnit14_Graphs(container) {
    const fruits = [
        { name: 'apple', emoji: '🍎', count: getRandomInt(2, 5) },
        { name: 'banana', emoji: '🍌', count: getRandomInt(2, 5) },
        { name: 'orange', emoji: '🍊', count: getRandomInt(2, 5) }
    ];
    
    const maxFruit = fruits.reduce((a, b) => a.count > b.count ? a : b);
    const minFruit = fruits.reduce((a, b) => a.count < b.count ? a : b);
    const askMost = Math.random() > 0.5;
    const target = askMost ? maxFruit : minFruit;
    
    let html = `<p style="text-align: center; margin-bottom: 20px;">Which fruit is ${askMost ? 'MOST' : 'LEAST'} common?</p>`;
    html += `<div class="graph-display">`;
    fruits.forEach(fruit => {
        html += `<div class="graph-bar">`;
        for (let i = 0; i < fruit.count; i++) {
            html += `<div style="font-size: 20px;">${fruit.emoji}</div>`;
        }
        html += `<div style="border-top: 2px solid #333; margin-top: 5px;">${fruit.count}</div>`;
        html += `</div>`;
    });
    html += `</div>`;
    
    html += `<div class="answer-grid">`;
    fruits.forEach(fruit => {
        html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer('${fruit.name}', '${target.name}', this)">${fruit.emoji}</button>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 15: TIME - HALF PAST =====
function generateUnit15_TimeHalf(container) {
    const hour = getRandomInt(1, 12);
    const isHalfPast = Math.random() > 0.5;
    const minuteAngle = isHalfPast ? 180 : 0;
    const hourAngle = (hour % 12) * 30 + (isHalfPast ? 15 : 0);
    const timeStr = isHalfPast ? `${hour}:30` : `${hour}:00`;
    
    let html = `<div class="clock-container">`;
    html += `<div class="clock-face">`;
    [12, 3, 6, 9].forEach(num => {
        const pos = num === 12 ? { top: '10%', left: '50%' } : 
                    num === 3 ? { top: '50%', right: '10%' } :
                    num === 6 ? { bottom: '10%', left: '50%' } :
                    { top: '50%', left: '10%' };
        html += `<div class="clock-number" style="top:${pos.top};left:${pos.left || 'auto'};right:${pos.right || 'auto'};bottom:${pos.bottom || 'auto'};transform: translate(-50%, -50%);">${num}</div>`;
    });
    html += `<div class="clock-hand hour" style="transform: rotate(${hourAngle}deg); height: 25%;"></div>`;
    html += `<div class="clock-hand minute" style="transform: rotate(${minuteAngle}deg);"></div>`;
    html += `<div class="clock-center"></div>`;
    html += `</div></div>`;
    
    html += `<p style="text-align: center; margin: 20px 0;">What time is it?</p>`;
    
    const answers = shuffleArray([
        timeStr,
        `${hour}:00`,
        `${hour === 1 ? 12 : hour - 1}:30`,
        `${(hour % 12) + 1}:00`
    ]).slice(0, 4);
    
    html += `<div class="answer-grid">`;
    answers.forEach(ans => {
        html += `<button class="answer-btn" onclick="checkAnswer('${ans}', '${timeStr}', this)">${ans}</button>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 16: PATTERNS AND DIRECTION =====
function generateUnit16_Patterns(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Continue the pattern
        const patterns = [
            { seq: ['🔴', '🔵', '🔴', '🔵'], next: '🔴' },
            { seq: ['⭐', '🌙', '⭐', '🌙'], next: '⭐' },
            { seq: ['🐱', '🐭', '🐱', '🐭'], next: '🐱' }
        ];
        const pattern = patterns[getRandomInt(0, patterns.length - 1)];
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">What comes next?</p>`;
        html += `<div class="pattern-display">`;
        pattern.seq.forEach(item => {
            html += `<div class="pattern-item">${item}</div>`;
        });
        html += `<div class="pattern-slot">?</div>`;
        html += `</div>`;
        
        const options = shuffleArray([pattern.next, pattern.seq[0], pattern.seq[1], '🟢']).slice(0, 4);
        html += `<div class="answer-grid">`;
        options.forEach(opt => {
            html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer('${opt}', '${pattern.next}', this)">${opt}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Direction instructions
        const directions = [
            { arrow: '⬆️', name: 'UP' },
            { arrow: '⬇️', name: 'DOWN' },
            { arrow: '⬅️', name: 'LEFT' },
            { arrow: '➡️', name: 'RIGHT' }
        ];
        const steps = [];
        for (let i = 0; i < 3; i++) {
            steps.push(directions[getRandomInt(0, 3)]);
        }
        const lastStep = directions[getRandomInt(0, 3)];
        steps.push(lastStep);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Follow the directions!</p>`;
        html += `<div class="direction-display">`;
        steps.slice(0, 3).forEach(step => {
            html += `<div class="direction-item">${step.arrow}</div>`;
        });
        html += `<div class="pattern-slot">?</div>`;
        html += `</div>`;
        
        html += `<div class="answer-grid">`;
        shuffleArray(directions).forEach(dir => {
            html += `<button class="answer-btn" onclick="checkAnswer('${dir.name}', '${lastStep.name}', this)">${dir.arrow} ${dir.name}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
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
