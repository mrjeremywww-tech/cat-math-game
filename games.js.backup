/* ===== Cat Math Adventure - Games Module =====
 * Cambridge Primary Mathematics Workbook 1
 * Aligned with 16 Units
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
        instruction: "Count and write the number!",
        generator: generateUnit1_Counting
    },
    2: {
        title: "Unit 2: Geometry - Shapes",
        instruction: "Identify 2D and 3D shapes!",
        generator: generateUnit2_Shapes
    },
    3: {
        title: "Unit 3: Fractions - Half",
        instruction: "Find one half of shapes and numbers!",
        generator: generateUnit3_Fractions
    },
    4: {
        title: "Unit 4: Length",
        instruction: "Compare lengths - longer or shorter?",
        generator: generateUnit4_Length
    },
    5: {
        title: "Unit 5: Add \u0026 Subtract",
        instruction: "Solve addition and subtraction to 10!",
        generator: generateUnit5_AddSubtract
    },
    6: {
        title: "Unit 6: Position",
        instruction: "Find positions - above, below, left, right!",
        generator: generateUnit6_Position
    },
    7: {
        title: "Unit 7: Sorting",
        instruction: "Sort by color, size, and shape!",
        generator: generateUnit7_Sorting
    },
    8: {
        title: "Unit 8: Time - O'Clock",
        instruction: "Read the clock - what time is it?",
        generator: generateUnit8_Time
    },
    9: {
        title: "Unit 9: Numbers to 20",
        instruction: "Count and compare numbers 10-20!",
        generator: generateUnit9_Numbers20
    },
    10: {
        title: "Unit 10: Geometry 2",
        instruction: "More shapes and their properties!",
        generator: generateUnit10_Geometry2
    },
    11: {
        title: "Unit 11: Halves",
        instruction: "Find half of numbers and shapes!",
        generator: generateUnit11_Halves
    },
    12: {
        title: "Unit 12: Mass \u0026 Capacity",
        instruction: "Compare weight and how much things hold!",
        generator: generateUnit12_MassCapacity
    },
    13: {
        title: "Unit 13: Money",
        instruction: "Count coins and solve money problems!",
        generator: generateUnit13_Money
    },
    14: {
        title: "Unit 14: Graphs",
        instruction: "Read pictograms and charts!",
        generator: generateUnit14_Graphs
    },
    15: {
        title: "Unit 15: Time - Half Past",
        instruction: "Tell time to the half hour!",
        generator: generateUnit15_TimeHalf
    },
    16: {
        title: "Unit 16: Patterns \u0026 Direction",
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
    const buttons = document.querySelectorAll('.answer-btn, .shape-item, .length-item, .coin');
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        buttonElement.classList.add('correct');
        score++;
        stars++;
        document.getElementById('gameStars').textContent = stars;
        playSound('correct');
        showFloatingTreat();
        catSay('Purr-fect! \ud83d\udc31');
        
        setTimeout(() => showResults(true), 800);
    } else {
        buttonElement.classList.add('wrong');
        playSound('wrong');
        catSay('Try again! You got this! \ud83d\udcaa');
        
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
        const starsDisplay = '\u2b50'.repeat(Math.min(stars, 3));
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
    cat.textContent = '\ud83d\ude38';
    setTimeout(() => cat.textContent = '\ud83d\udc31', 500);
    setTimeout(() => cat.textContent = '\ud83d\ude3a', 1000);
    setTimeout(() => cat.textContent = '\ud83d\udc31', 1500);
}

// ===== UNIT 1: NUMBERS TO 10 =====
// Cambridge: Counting objects, writing numbers, number sequences 1-10
function generateUnit1_Counting(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Count objects (1-10)
        const count = getRandomInt(1, 10);
        const items = ['\ud83d\udc1f', '\ud83d\udc2d', '\ud83e\uddf6', '\ud83d\udc3e', '\ud83d\udc31'];
        const item = items[getRandomInt(0, items.length - 1)];
        
        let html = `<div class="counting-container">`;
        for (let i = 0; i < count; i++) {
            html += `<span class="count-item" style="animation: bounce 0.5s ${i * 0.1}s">${item}</span>`;
        }
        html += `</div>`;
        html += `<p style="text-align: center; margin: 20px 0;">How many ${item}?</p>`;
        
        const answers = shuffleArray([count, count + 1, count - 1, count + 2].filter(n => n >= 1 && n <= 10)).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${count}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // Number sequence - fill in missing number (1-10)
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
        
    } else {
        // Number word to digit
        const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
        const num = getRandomInt(1, 10);
        
        let html = `<p style="text-align: center; margin: 20px 0; font-size: 24px;">${numbers[num]}</p>`;
        html += `<p style="text-align: center;">What number is this?</p>`;
        
        const answers = shuffleArray([num, num + 1, num - 1, num + 2]).filter(n => n >= 0 && n <= 10).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${num}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 2: GEOMETRY - SHAPES =====
// Cambridge: 2D shapes (circle, square, triangle, rectangle), 3D shapes introduction
function generateUnit2_Shapes(container) {
    const type = getRandomInt(1, 3);
    
    const shapes2D = [
        { name: 'circle', emoji: '\u26aa', color: '#FF8C42' },
        { name: 'square', emoji: '\ud83d\udd33', color: '#42A5F5' },
        { name: 'triangle', emoji: '\ud83d\udd3a', color: '#66BB6A' },
        { name: 'rectangle', emoji: '\u25fc', color: '#AB47BC' }
    ];
    
    if (type === 1) {
        // Find the shape by name
        const target = shapes2D[getRandomInt(0, shapes2D.length - 1)];
        const shuffled = shuffleArray([...shapes2D]).slice(0, 4);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Find the <strong>${target.name}</strong>!</p>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 60px; background: ${shape.color}; border-radius: 10px;" onclick="checkAnswer('${shape.name}', '${target.name}', this)">${shape.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else if (type === 2) {
        // How many sides? (simplified for Grade 1)
        const shape = shapes2D[getRandomInt(0, shapes2D.length - 1)];
        const sides = { circle: 0, square: 4, triangle: 3, rectangle: 4 };
        const answer = sides[shape.name];
        
        let html = `<div style="font-size: 80px; text-align: center; margin: 20px;">${shape.emoji}</div>`;
        html += `<p style="text-align: center;">How many sides does a ${shape.name} have?</p>`;
        
        const answers = shuffleArray([answer, answer + 1, answer - 1, answer + 2]).filter(n => n >= 0).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${answer}, this)">${ans}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Match shape to real object
        const objects = [
            { name: 'ball', shape: 'circle', emoji: '\u26bd' },
            { name: 'book', shape: 'rectangle', emoji: '\ud83d\udcd5' },
            { name: 'slice of pizza', shape: 'triangle', emoji: '\ud83c\udf55' },
            { name: 'window', shape: 'square', emoji: '\ud83e\ude9f' }
        ];
        const obj = objects[getRandomInt(0, objects.length - 1)];
        const shuffled = shuffleArray([...shapes2D]).slice(0, 4);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">What shape is a ${obj.name}?</p>`;
        html += `<div style="font-size: 80px; text-align: center; margin: 10px;">${obj.emoji}</div>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 40px;" onclick="checkAnswer('${shape.name}', '${obj.shape}', this)">${shape.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 3: FRACTIONS - HALF =====
// Cambridge: Introduction to half, dividing shapes into 2 equal parts
function generateUnit3_Fractions(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Which shape shows half? (with and without dividing lines)
        const shapes = [
            { name: 'circle_half', display: '\u25d0', halves: true },
            { name: 'circle_full', display: '\u26aa', halves: false },
            { name: 'square_half', display: '\u25e8', halves: true },
            { name: 'square_full', display: '\u25fc', halves: false }
        ];
        const shuffled = shuffleArray([...shapes]);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which shows <strong>ONE HALF</strong>?</p>`;
        html += `<div class="shape-display">`;
        shuffled.forEach(shape => {
            html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer(${shape.halves}, true, this)">${shape.display}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
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
    }
}

// ===== UNIT 4: LENGTH =====
// Cambridge: Comparing lengths, longer/shorter, measuring with non-standard units
function generateUnit4_Length(container) {
    const items = [
        { name: 'pencil', emoji: '\u270f\ufe0f', length: 2 },
        { name: 'book', emoji: '\ud83d\udcd5', length: 3 },
        { name: 'ruler', emoji: '\ud83d\udccf', length: 4 },
        { name: 'snake', emoji: '\ud83d\udc0d', length: 5 }
    ];
    
    // Select two different items to compare
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
        for (let i = 0; i < item.length; i++) blocks += '\u2588';
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
// Cambridge: Add and subtract within 10, number stories
function generateUnit5_AddSubtract(container) {
    const type = getRandomInt(1, 3);
    
    if (type === 1) {
        // Simple addition with pictures
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const answer = a + b;
        const emoji = ['\ud83d\udc31', '\ud83d\udc2d', '\ud83d\udc1f'][getRandomInt(0, 2)];
        
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
        // Simple subtraction with pictures
        const total = getRandomInt(3, 8);
        const remove = getRandomInt(1, total - 1);
        const answer = total - remove;
        const emoji = ['\ud83e\uddf6', '\ud83c\udf6a', '\ud83c\udf53'][getRandomInt(0, 2)];
        
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
        
    } else {
        // Word problem (simple)
        const a = getRandomInt(1, 5);
        const b = getRandomInt(1, 5);
        const answer = a + b;
        
        let html = `<div class="word-problem">`;
        html += `\ud83d\udc31 Alaina has ${a} fish. `;
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
    }
}

// ===== UNIT 6: POSITION =====
// Cambridge: Positional words - above, below, left, right, between
function generateUnit6_Position(container) {
    const positions = [
        { word: 'ABOVE', answer: 'above', emoji: '\u2601\ufe0f', rel: 'The cloud is ___ the cat' },
        { word: 'BELOW', answer: 'below', emoji: '\ud83c\udf31', rel: 'The plant is ___ the cat' },
        { word: 'LEFT', answer: 'left', emoji: '\ud83c\udf53', rel: 'The strawberry is ___ of the cat' },
        { word: 'RIGHT', answer: 'right', emoji: '\ud83c\udf4e', rel: 'The apple is ___ of the cat' }
    ];
    
    const target = positions[getRandomInt(0, positions.length - 1)];
    const shuffled = shuffleArray([...positions]);
    
    let html = `<div style="text-align: center; margin: 20px;">`;
    html += `<div style="font-size: 60px; margin-bottom: 10px;">\ud83d\udc31</div>`;
    html += `<div style="font-size: 40px; margin: 10px;">${target.emoji}</div>`;
    html += `</div>`;
    html += `<p style="text-align: center; font-size: 14px;">${target.rel}?</p>`;
    
    html += `<div class="answer-grid">`;
    shuffled.forEach(pos => {
        html += `<button class="answer-btn" onclick="checkAnswer('${pos.answer}', '${target.answer}', this)">${pos.word}</button>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 7: SORTING =====
// Cambridge: Sort by color, size, shape; find the odd one out
function generateUnit7_Sorting(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Find the odd one out (by shape)
        const groups = [
            { items: ['\ud83d\udd34', '\ud83d\udd34', '\ud83d\udd34', '\ud83d\udfe2'], odd: '\ud83d\udfe2' },
            { items: ['\u25a0', '\u25a0', '\u25a0', '\u25b2'], odd: '\u25b2' },
            { items: ['\u2b50', '\u2b50', '\u2b50', '\ud83c\udf19'], odd: '\ud83c\udf19' },
            { items: ['\ud83d\udc31', '\ud83d\udc31', '\ud83d\udc31', '\ud83d\udc2d'], odd: '\ud83d\udc2d' }
        ];
        const group = groups[getRandomInt(0, groups.length - 1)];
        const shuffled = shuffleArray([...group.items]);
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Find the ODD ONE OUT!</p>`;
        html += `<div class="sorting-display">`;
        shuffled.forEach(item => {
            const isOdd = item === group.odd;
            html += `<div class="sort-item" style="font-size: 50px;" onclick="checkAnswer(${isOdd}, true, this)">${item}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Sort by size (big vs small)
        const items = [
            { emoji: '\ud83d\udc31', size: 'small' },
            { emoji: '\ud83d\udc31', size: 'big' },
            { emoji: '\ud83d\udc2d', size: 'small' },
            { emoji: '\ud83d\udc2d', size: 'big' }
        ];
        const targetSize = Math.random() > 0.5 ? 'big' : 'small';
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Click all ${targetSize.toUpperCase()} animals!</p>`;
        html += `<div class="sorting-display">`;
        items.forEach((item, idx) => {
            const size = item.size === 'big' ? '80px' : '40px';
            const isCorrect = item.size === targetSize;
            html += `<div class="sort-item" style="font-size: ${size};" onclick="checkAnswer(${isCorrect}, true, this)">${item.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 8: TIME - O'CLOCK =====
// Cambridge: Tell time to the hour, o'clock
function generateUnit8_Time(container) {
    const hour = getRandomInt(1, 12);
    const hourAngle = hour * 30;
    
    let html = `<div class="clock-container">`;
    html += `<div class="clock-face">`;
    // Clock numbers
    [12, 3, 6, 9].forEach(num => {
        const pos = num === 12 ? { top: '10%', left: '50%' } : 
                    num === 3 ? { top: '50%', right: '10%' } :
                    num === 6 ? { bottom: '10%', left: '50%' } :
                    { top: '50%', left: '10%' };
        html += `<div class="clock-number" style="top:${pos.top};left:${pos.left || 'auto'};right:${pos.right || 'auto'};bottom:${pos.bottom || 'auto'};transform: translate(-50%, -50%);">${num}</div>`;
    });
    // Hands
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
}

// ===== UNIT 9: NUMBERS TO 20 =====
// Cambridge: Counting 10-20, number order, comparing numbers 10-20
function generateUnit9_Numbers20(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Compare two numbers (which is bigger/smaller)
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
// Cambridge: More 2D shapes, 3D shapes (cube, sphere, cylinder)
function generateUnit10_Geometry2(container) {
    const shapes3D = [
        { name: 'cube', emoji: '\ud83d\udd32', real: 'box' },
        { name: 'sphere', emoji: '\u26bd', real: 'ball' },
        { name: 'cylinder', emoji: '\ud83e\uded3', real: 'can' }
    ];
    
    const target = shapes3D[getRandomInt(0, shapes3D.length - 1)];
    const shuffled = shuffleArray([...shapes3D]);
    
    let html = `<p style="text-align: center; margin-bottom: 20px;">Which shape is like a ${target.real}?</p>`;
    html += `<div class="shape-display">`;
    shuffled.forEach(shape => {
        html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer('${shape.name}', '${target.name}', this)">${shape.emoji}</div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}

// ===== UNIT 11: HALVES =====
// Cambridge: Finding half of shapes and numbers
function generateUnit11_Halves(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Shade half of a shape (visual)
        const shapes = [
            { emoji: '\u25a0', half: '\u25e8' },
            { emoji: '\u25ef', half: '\u25d0' }
        ];
        const shape = shapes[getRandomInt(0, shapes.length - 1)];
        
        let html = `<p style="text-align: center;">Which shows HALF shaded?</p>`;
        html += `<div class="shape-display">`;
        html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer(true, true, this)">${shape.half}</div>`;
        html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer(false, true, this)">${shape.emoji}</div>`;
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
// Cambridge: Heavy vs light, holds more vs less
function generateUnit12_MassCapacity(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Mass (weight) comparison
        const pairs = [
            { heavy: '\ud83d\udc18', light: '\ud83d\udc2d', heavyName: 'elephant', lightName: 'mouse' },
            { heavy: '\ud83d\udcd5', light: '\ud83e\udeb6', heavyName: 'book', lightName: 'feather' },
            { heavy: '\ud83e\udd47', light: '\ud83e\uddf6', heavyName: 'medal', lightName: 'yarn' }
        ];
        const pair = pairs[getRandomInt(0, pairs.length - 1)];
        const askHeavy = Math.random() > 0.5;
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which is ${askHeavy ? 'HEAVIER' : 'LIGHTER'}?</p>`;
        html += `<div class="shape-display">`;
        html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer('${askHeavy ? pair.heavyName : pair.lightName}', '${askHeavy ? pair.heavyName : pair.lightName}', this)">${pair.heavy}</div>`;
        html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer('${askHeavy ? pair.lightName : pair.heavyName}', '${askHeavy ? pair.heavyName : pair.lightName}', this)">${pair.light}</div>`;
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Capacity (holds more/less)
        const containers = [
            { name: 'bucket', emoji: '\ud83e\udeb3', capacity: 'more' },
            { name: 'cup', emoji: '\u2615', capacity: 'less' }
        ];
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Which holds MORE water?</p>`;
        html += `<div class="shape-display">`;
        containers.forEach(c => {
            html += `<div class="shape-item" style="font-size: 60px;" onclick="checkAnswer('${c.capacity}', 'more', this)">${c.emoji}</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 13: MONEY =====
// Cambridge: Recognize coins, count small amounts, simple shopping
function generateUnit13_Money(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Count coins (simplified for Grade 1)
        const coins = [1, 2, 5];
        const selectedCoins = [];
        let total = 0;
        const numCoins = getRandomInt(2, 4);
        
        for (let i = 0; i < numCoins; i++) {
            const coin = coins[getRandomInt(0, coins.length - 1)];
            selectedCoins.push(coin);
            total += coin;
        }
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">Count the coins!</p>`;
        html += `<div class="coins-display">`;
        selectedCoins.forEach(coin => {
            html += `<div class="coin">${coin}\u00a2</div>`;
        });
        html += `</div>`;
        
        const answers = shuffleArray([total, total + 2, total - 2, total + 5]).filter(n => n >= 2).slice(0, 4);
        html += `<div class="answer-grid">`;
        answers.forEach(ans => {
            html += `<button class="answer-btn" onclick="checkAnswer(${ans}, ${total}, this)">${ans}\u00a2</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Simple shopping - which item can you buy?
        const wallet = 5;
        const items = [
            { name: 'apple', price: 2, emoji: '\ud83c\udf4e' },
            { name: 'banana', price: 3, emoji: '\ud83c\udf4c' },
            { name: 'toy', price: 8, emoji: '\ud83e\uddf8' }
        ];
        const affordable = items.filter(i => i.price <= wallet);
        const target = affordable[getRandomInt(0, affordable.length - 1)];
        
        let html = `<p style="text-align: center;">You have ${wallet}\u00a2. What can you buy?</p>`;
        html += `<div class="shopping-display">`;
        items.forEach(item => {
            const canBuy = item.price <= wallet;
            html += `<div class="shop-item" onclick="checkAnswer(${canBuy}, true, this)">`;
            html += `<div style="font-size: 40px;">${item.emoji}</div>`;
            html += `<div>${item.price}\u00a2</div>`;
            html += `</div>`;
        });
        html += `</div>`;
        container.innerHTML = html;
    }
}

// ===== UNIT 14: GRAPHS =====
// Cambridge: Simple pictograms, reading data from pictures
function generateUnit14_Graphs(container) {
    const fruits = [
        { name: 'apple', emoji: '\ud83c\udf4e', count: getRandomInt(2, 5) },
        { name: 'banana', emoji: '\ud83c\udf4c', count: getRandomInt(2, 5) },
        { name: 'orange', emoji: '\ud83c\udf4a', count: getRandomInt(2, 5) }
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
// Cambridge: Tell time to half hour
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
// Cambridge: Continue patterns, follow directions
function generateUnit16_Patterns(container) {
    const type = getRandomInt(1, 2);
    
    if (type === 1) {
        // Continue the pattern (ABAB or ABCABC)
        const patterns = [
            { seq: ['\ud83d\udd34', '\ud83d\udd35', '\ud83d\udd34', '\ud83d\udd35'], next: '\ud83d\udd34' },
            { seq: ['\u2b50', '\ud83c\udf19', '\u2b50', '\ud83c\udf19'], next: '\u2b50' },
            { seq: ['\ud83d\udc31', '\ud83d\udc2d', '\ud83d\udc31', '\ud83d\udc2d'], next: '\ud83d\udc31' }
        ];
        const pattern = patterns[getRandomInt(0, patterns.length - 1)];
        
        let html = `<p style="text-align: center; margin-bottom: 20px;">What comes next?</p>`;
        html += `<div class="pattern-display">`;
        pattern.seq.forEach(item => {
            html += `<div class="pattern-item">${item}</div>`;
        });
        html += `<div class="pattern-slot">?</div>`;
        html += `</div>`;
        
        const options = shuffleArray([pattern.next, pattern.seq[0], pattern.seq[1], '\ud83d\udfe2']).slice(0, 4);
        html += `<div class="answer-grid">`;
        options.forEach(opt => {
            html += `<button class="answer-btn" style="font-size: 30px;" onclick="checkAnswer('${opt}', '${pattern.next}', this)">${opt}</button>`;
        });
        html += `</div>`;
        container.innerHTML = html;
        
    } else {
        // Direction instructions
        const directions = [
            { arrow: '\u2b06\ufe0f', name: 'UP' },
            { arrow: '\u2b07\ufe0f', name: 'DOWN' },
            { arrow: '\u2b05\ufe0f', name: 'LEFT' },
            { arrow: '\u27a1\ufe0f', name: 'RIGHT' }
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
