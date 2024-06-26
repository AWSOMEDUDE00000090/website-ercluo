function generateAsciiBox(width, height, label) {
    const horizontalLine = '+' + '-'.repeat(width - 2) + '+';
    const emptyLine = '|' + ' '.repeat(width - 2) + '|';
    const labelLine = '|' + label.padStart((width - label.length) / 2 + label.length).padEnd(width - 2) + '|';
  
    let box = horizontalLine + '\n';
    for (let i = 0; i < Math.floor((height - 3) / 2); i++) {
      box += emptyLine + '\n';
    }
    box += labelLine + '\n';
    for (let i = 0; i < Math.ceil((height - 3) / 2); i++) {
      box += emptyLine + '\n';
    }
    box += horizontalLine;
    return box;
  }
  
  function adjustBoxes() {
    const margin = 20;
    const boxes = document.querySelectorAll('.box');
    const containerHeight = document.querySelector('.container').clientHeight;
    const boxHeight = (containerHeight - (2 * margin + 2 * (boxes.length - 1) * margin)) / boxes.length;
  
    boxes.forEach(box => {
      const charWidth = 10;  // Approximate character width in pixels
      const charHeight = 20; // Approximate character height in pixels
      const width = Math.floor((window.innerWidth - 2 * margin) / charWidth);
      const height = Math.floor(boxHeight / charHeight);
      const label = box.querySelector('.content').parentElement.id.replace('-box', '');
      box.querySelector('.content').textContent = generateAsciiBox(width, height, label);
    });
  }
  
  window.addEventListener('resize', adjustBoxes);
  window.addEventListener('load', adjustBoxes);
  