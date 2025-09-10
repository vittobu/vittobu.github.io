// Recupera elementi
const form = document.getElementById('entryForm');
const lista = document.getElementById('lista');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const importFile = document.getElementById('importFile');

let entries = [];

// Carica dati salvati in localStorage
if(localStorage.getItem('entries')) {
  entries = JSON.parse(localStorage.getItem('entries'));
  renderList();
}

// Funzione per aggiornare la lista
function renderList() {
  lista.innerHTML = '';
  entries.forEach((e, index) => {
    const li = document.createElement('li');
    li.textContent = `${e.tipo.toUpperCase()}: ${e.descrizione} - €${e.importo}`;
    lista.appendChild(li);
  });
}

// Aggiungi nuovo elemento
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const descrizione = document.getElementById('descrizione').value;
  const importo = parseFloat(document.getElementById('importo').value);
  const tipo = document.getElementById('tipo').value;

  entries.push({ descrizione, importo, tipo });
  localStorage.setItem('entries', JSON.stringify(entries));
  renderList();

  form.reset();
});

// Esporta dati in file JSON
exportBtn.addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(entries)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'spese.json';
  a.click();
});

// Importa dati da file JSON
importBtn.addEventListener('click', () => importFile.click());
importFile.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = function(event) {
    entries = JSON.parse(event.target.result);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderList();
  };
  reader.readAsText(file);
});
