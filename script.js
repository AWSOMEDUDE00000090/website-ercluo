function createDotMatrix() {
    const matrixContainer = document.getElementById('dot-matrix');
    const dotSize = 12; // dot size + gap
    const rows = Math.floor(window.innerHeight / dotSize);
    const cols = Math.floor(window.innerWidth / dotSize);

    matrixContainer.style.gridTemplateColumns = `repeat(${cols}, 10px)`;

    for (let i = 0; i < rows * cols; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        matrixContainer.appendChild(dot);
    }

    return { rows, cols };
}

function drawText(text, rows, cols) {
    const matrixContainer = document.getElementById('dot-matrix');
    const dots = matrixContainer.getElementsByClassName('dot');
    const dotMatrix = {
        'A': [
            "01110",
            "10001",
            "10001",
            "11111",
            "10001",
            "10001",
            "10001"
        ],
        'B': [
            "11110",
            "10001",
            "10001",
            "11110",
            "10001",
            "10001",
            "11110"
        ],
        'C': [
            "01110",
            "10001",
            "10000",
            "10000",
            "10000",
            "10001",
            "01110"
        ]
        // Add more characters as needed
    };

    let charIndex = 0;
    const charWidth = 5;
    const charHeight = 7;
    let offsetX = 0;

    for (const char of text) {
        if (dotMatrix[char]) {
            const matrix = dotMatrix[char];
            for (let r = 0; r < charHeight; r++) {
                for (let c = 0; c < charWidth; c++) {
                    const dotIndex = (r * cols) + c + offsetX;
                    if (dotIndex < dots.length) {
                        if (matrix[r][c] === '1') {
                            dots[dotIndex].classList.add('on');
                        } else {
                            dots[dotIndex].classList.remove('on');
                        }
                    }
                }
            }
            offsetX += charWidth + 1; // +1 for space between characters
        }
        charIndex++;
    }
}

function adjustDotMatrix() {
    const matrixContainer = document.getElementById('dot-matrix');
    matrixContainer.innerHTML = ''; // Clear existing dots
    const { rows, cols } = createDotMatrix();
    drawText('ABC', rows, cols);
}

window.addEventListener('resize', adjustDotMatrix);
window.addEventListener('load', adjustDotMatrix);
