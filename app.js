const rollBtn = document.getElementById('rollBtn');
const resetBtn = document.getElementById('resetBtn');
const diceContainer = document.getElementById('diceContainer');
const numDiceInput = document.getElementById('numDice');
const numSidesInput = document.getElementById('numSides');

const diceColors = [];

rollBtn.addEventListener('click', rollDice);
resetBtn.addEventListener('click', resetDice);

function rollDice() {
  const numDice = numDiceInput.value;
  const numSides = numSidesInput.value;
  diceContainer.innerHTML = '';
  for (let i = 0; i < numDice; i++) {
    const dieValue = Math.floor(Math.random() * numSides) + 1;
    const die = document.createElement('div');
    die.className = 'die';
    const storedColor = diceColors[i];
    if (storedColor) {
      die.style.backgroundColor = storedColor;
      die.style.color = isBrightColor(storedColor) ? 'black' : 'white';
      die.dataset.color = storedColor;
    } else {
      die.dataset.color = 'white';
    }
    die.textContent = dieValue;
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.className = 'color-picker';
    colorPicker.addEventListener('change', function(event) {
      const background = event.target.value;
      const isBright = isBrightColor(background);
      die.dataset.color = background;
      die.style.backgroundColor = background;
      die.style.color = isBright ? 'black' : 'white';
      diceColors[i] = background;
    });
    die.appendChild(colorPicker);
    diceContainer.appendChild(die);
  }

  // Add animation class to dice
  const dice = document.querySelectorAll('.die');
  dice.forEach((die) => {
    die.classList.add('rolling');
    setTimeout(() => {
      die.classList.remove('rolling');
    }, 1000);
  });
}

function resetDice() {
  diceContainer.innerHTML = '';
  diceColors.length = 0;
}

function isBrightColor(color) {
  const rgb = hexToRgb(color);
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 125;
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return { r, g, b };
}

// Add event listener to update the color of the dice
diceContainer.addEventListener('click', function(event) {
  if (event.target.classList.contains('die')) {
    const colors = ['red', 'green', 'blue'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    event.target.dataset.color = randomColor;
    event.target.style.backgroundColor = randomColor;
    event.target.style.color = isBrightColor(randomColor) ? 'black' : 'white';
    const i = [...diceContainer.children].indexOf(event.target);
    diceColors[i] = randomColor;
  }
});
