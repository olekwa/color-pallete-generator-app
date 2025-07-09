const generateBtn = document.getElementById('generate-btn');
const paletteContainer = document.querySelector('.palette-container');
const fadeRange = document.getElementById('fade-range');
const fadeValue = document.getElementById('fade-value');

fadeRange.addEventListener('input', () => {
  fadeValue.textContent = fadeRange.value;
  generatePalette();
});

generateBtn.addEventListener('click', generatePalette);

paletteContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('copy-btn')){
    const hexValue = e.target.previousElementSibling.textContent;

    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target))
      .catch(alert(err));
  } else if (e.target.classList.contains('color')) {
    const hexValue = e.target.nextElementSibling.querySelector('.hex-value').textContent;
    navigator.clipboard
      .writeText(hexValue)
      .then(() => showCopySuccess(e.target .nextElementSibling.querySelector('.copy-btn')))
      .catch(alert(err));
  }
});

function showCopySuccess(element) {
  element.classList.remove('far', 'fa-copy');
  element.classList.add('fas', 'fa-check');
  element.style.color = '#48bb78';


  setTimeout(() => {
    element.classList.remove('fas', 'fa-check');
    element.classList.add('far', 'fa-copy');
    element.style.color = '';
  }, 1500);
}

function generatePalette() {
  const fadeLevel = parseInt(fadeRange.value); // 0 to 100
  const baseHue = Math.floor(Math.random() * 360);
  const colors = [];

  // Fade affects the range of variation
  const hueVariation = Math.floor((fadeLevel / 100) * 60);       // up to ±30°
  const satVariation = Math.floor((fadeLevel / 100) * 60);        // range size
  const lightVariation = Math.floor((fadeLevel / 100) * 60);      // range size

  const baseSaturation = 50; // midpoint (can adjust)
  const baseLightness = 50;

  for (let i = 0; i < 6; i++) {
    const hue = baseHue + Math.floor(Math.random() * hueVariation * 2 - hueVariation);
    const saturation = clamp(baseSaturation + Math.floor(Math.random() * satVariation * 2 - satVariation), 10, 100);
    const lightness = clamp(baseLightness + Math.floor(Math.random() * lightVariation * 2 - lightVariation), 10, 90);

    const hex = hslToHex(hue, saturation, lightness);
    colors.push(hex);
  }
  updatePaletteDisplay(colors);
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n =>
    Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))));

  return `#${f(0).toString(16).padStart(2, '0')}${f(8).toString(16).padStart(2, '0')}${f(4).toString(16).padStart(2, '0')}`;
}


function clamp(num, min, max) {
  return Math.min(Math.max(num, min), max);
}

// function generateRandomColor() {
//   const letters = "0123456789ABCDEF";
//   let color = "#";

//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

function updatePaletteDisplay (colors){
  const colorBoxes = document.querySelectorAll(".color-box");

  colorBoxes.forEach((box, index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".color");
    const hexValue = box.querySelector(".hex-value");

    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;

  });

}

generatePalette();