const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');
const outputFrame = document.getElementById('output');
const previewBtn = document.querySelector('.preview-btn');
const saveStatus = document.getElementById('save-status');
const toggleModeBtn = document.querySelector('.toggle-mode');

// Compile function to combine HTML, CSS, and JS, and render in the iframe
function compile() {
  const htmlCode = htmlEditor.value;
  const cssCode = `<style>${cssEditor.value}</style>`;
  const jsCode = `<script>${jsEditor.value}<\/script>`;

  const combinedCode = htmlCode + cssCode + jsCode;

  outputFrame.srcdoc = combinedCode;
  autoSave();
}

// Auto-save content to local storage
function autoSave() {
  localStorage.setItem('html', htmlEditor.value);
  localStorage.setItem('css', cssEditor.value);
  localStorage.setItem('js', jsEditor.value);
  saveStatus.textContent = 'Auto-saved';
  setTimeout(() => (saveStatus.textContent = ''), 2000);
}

// Load saved data from localStorage
function loadSavedData() {
  htmlEditor.value = localStorage.getItem('html') || '';
  cssEditor.value = localStorage.getItem('css') || '';
  jsEditor.value = localStorage.getItem('js') || '';
  compile();
}

// Clear editor content
document.getElementById('clear-html').addEventListener('click', () => {
  htmlEditor.value = '';
  compile();
});
document.getElementById('clear-css').addEventListener('click', () => {
  cssEditor.value = '';
  compile();
});
document.getElementById('clear-js').addEventListener('click', () => {
  jsEditor.value = '';
  compile();
});

// Event listeners for real-time compiling
htmlEditor.addEventListener('input', compile);
cssEditor.addEventListener('input', compile);
jsEditor.addEventListener('input', compile);

// Dark/Light Mode Toggle
toggleModeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleModeBtn.textContent = document.body.classList.contains('dark-mode')
    ? 'Light Mode'
    : 'Dark Mode';
});

// Load saved data on page load
window.addEventListener('load', loadSavedData);

// Preview button click to compile the code
previewBtn.addEventListener('click', compile);
