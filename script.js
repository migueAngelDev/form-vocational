// 1. Colores más suaves
// Colores originales por carrera
const backgrounds = {
  a: '#2196f3', // Pedagogía
  b: '#4caf50', // Turismo
  c: '#ff9800', // Comunicación
  d: '#9c27b0', // Diseño gráfico
  e: '#3f51b5', // Mercadotecnia
  f: '#ff5722', // Gastronomía
  g: '#009688', // Nutrición
  h: '#607d8b', // Ingeniería
  i: '#795548'  // Derecho
};

const stepBackgroundMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

// Datos del quiz
const questions = [
  {
    question: "¿Qué te gusta hacer en las vacaciones?",
    step: 1,
    answers: [
      "Jugar con niños pequeños/sobrinos",
      "Organizar las vacaciones",
      "Crear contenido para redes sociales",
      "Aprovechar el tiempo para dibujar",
      "Buscar una fuente de ingresos",
      "Preparar postres",
      "Ponerme a dieta / hacer ejercicio",
      "Jugar en el celular / consola",
      "Ver documentales / leer libros"
    ]
  },
  {
    question: "Si te dieran la oportunidad de entrar a un trabajo con plaza, ¿cuál escogerías?",
    step: 2,
    answers: [
      "Dar clases en una escuela primaria / kínder",
      "Trabajar en una agencia de viajes",
      "Conductor en un programa de TV para Telemundo/Telesisa",
      "Diseñador gráfico en una agencia de marketing internacional",
      "Ser CEO de una empresa de marketing digital",
      "Chef de cruceros",
      "Organización enfocada en educación de comida saludable",
      "Empresa que desarrolle inteligencia artificial y robótica",
      "Trabajar en una firma de abogados / despacho jurídico"
    ]
  },
  {
    question: "Si tuvieras la oportunidad de poner tu propio negocio, ¿de qué sería?",
    step: 3,
    answers: [
      "Centro educativo para regularización primaria/secundaria/bachillerato",
      "Empresa que ofrezca tours a sitios turísticos locales",
      "Agencia de contenido audiovisual",
      "Estudio de diseño creativo que trabaje con Pixar/Dreamworks",
      "Agencia de publicidad",
      "Empresa de catering de alimentos y bebidas",
      "Franquicia de ensaladas / comida vegana",
      "Empresa de energías renovables / IA / videojuegos",
      "Despacho de asesoría jurídica"
    ]
  },
  {
    question: "¿Qué prefieres hacer en tu tiempo libre?",
    step: 4,
    answers: [
      "Hacer manualidades",
      "Visitar lugares turísticos locales",
      "Grabar TikToks",
      "Ver videos para aprender dibujo/pintura",
      "Crear tendencias en redes sociales",
      "Tomar clases / cursos de cocina",
      "Ir al gimnasio",
      "Jugar videojuegos / experimentar con ChatGPT",
      "Ver Caso Cerrado"
    ]
  },
  {
    question: "¿En qué te consideras mejor?",
    step: 5,
    answers: [
      "Enseñar",
      "Socializar",
      "Comunicarme con las personas",
      "Dibujar / Pintar",
      "Saber negociar",
      "Preparando postres",
      "Seguir una dieta",
      "Programar",
      "Resolver problemas o conflictos"
    ]
  },
  {
    question: "¿Qué actividades se te facilitan más?",
    step: 6,
    answers: [
      "Compartir / transmitir conocimiento",
      "Organizar eventos",
      "Grabar y editar videos",
      "Utilizar Photoshop / Illustrator",
      "Ventas",
      "Realizar las compras en el súper",
      "Hacer ejercicio",
      "Diseñar / crear ideas nuevas de videojuegos",
      "Participar en debates"
    ]
  },
  {
    question: "¿Qué consideras que tiene más relevancia para tu futuro?",
    step: 7,
    answers: [
      "Ser director de mi propia institución",
      "Dominar varios idiomas (políglota)",
      "Ganar un Pulitzer / Oscar",
      "Ser un diseñador gráfico famoso",
      "Ser publicista de la marca Dior",
      "Ser un chef reconocido de comida internacional",
      "Tener una franquicia de consultorios nutricionales",
      "Trabajar para Google / Facebook",
      "Llegar a ser un juez"
    ]
  }
];

const carreers = [
  { carreer: "Pedagogía", index: "a" },
  { carreer: "Turismo", index: "b" },
  { carreer: "Comunicación", index: "c" },
  { carreer: "Diseño gráfico", index: "d" },
  { carreer: "Mercadotecnia", index: "e" },
  { carreer: "Gastronomía", index: "f" },
  { carreer: "Nutrición", index: "g" },
  { carreer: "Ingeniería", index: "h" },
  { carreer: "Derecho", index: "i" }
];

// DOM
const previewScreen = document.getElementById('previewScreen');
const startBtn = document.getElementById('startBtn');
const quizForm = document.getElementById('quizForm');
const loadingMessage = document.getElementById('loadingMessage');
const countdownEl = document.getElementById('countdown');
const resultsSection = document.getElementById('results');
const finalMessageEl = document.getElementById('finalMessage');
const progressBar = document.getElementById('progressBar');
const shareBtn = document.getElementById('shareBtn');

let currentStep = 0;
let answers = Array(questions.length).fill([]);
let chartInstance = null;
let lastSorted = [];

// 1. Inicio desde preview
startBtn.addEventListener('click', () => {
  previewScreen.classList.remove('active');
  renderQuestion(0);
});

// Cambia fondo y avanza barra
function setBackground(step) {
  const letter = stepBackgroundMap[step] || 'h';
  document.body.style.background = backgrounds[letter];
  progressBar.style.width = `${(step + 1) / questions.length * 100}%`;
}

// Renderiza pregunta
function renderQuestion(step) {
  setBackground(step);
  quizForm.innerHTML = `
    <div class="question active">
      <div class="step-indicator">Paso ${step + 1} de ${questions.length}</div>
      <h3>${questions[step].question}</h3>
      ${questions[step].answers.map((a, i) => `
        <label>
          <input type="checkbox" value="${String.fromCharCode(97 + i)}"/>
          <span>${a}</span>
        </label>`).join('')}
      <div class="controls">
        <button type="button" onclick="prevStep()" ${step === 0 ? 'disabled' : ''}>Atrás</button>
        <button type="button" onclick="nextStep()">${step + 1 === questions.length ? 'Ver Resultados' : 'Siguiente'}</button>
      </div>
    </div>`;
}

// Avanzar
function nextStep() {
  const sel = quizForm.querySelectorAll('input:checked');
  if (!sel.length) return alert('Selecciona al menos una opción.');
  answers[currentStep] = Array.from(sel).map(i => i.value);
  currentStep++;
  currentStep < questions.length ? renderQuestion(currentStep) : showLoadingThenResults();
}

// Retroceder
function prevStep() {
  if (currentStep === 0) return;
  currentStep--;
  renderQuestion(currentStep);
  quizForm.querySelectorAll('input').forEach(i => {
    i.checked = answers[currentStep].includes(i.value);
  });
}

// Cuenta regresiva + confeti
function showLoadingThenResults() {
  quizForm.innerHTML = '';
  loadingMessage.style.display = 'block';
  countdownEl.style.display = 'block';
  let count = 3; countdownEl.textContent = count;
  const iv = setInterval(() => {
    count--;
    countdownEl.textContent = count;
    if (count === 0) {
      clearInterval(iv);
      loadingMessage.style.display = countdownEl.style.display = 'none';
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      setTimeout(calculateResults, 1000);
    }
  }, 1000);
}

// Cálculo de resultados
function calculateResults() {
  const res = {};
  carreers.forEach(c => res[c.carreer] = 0);
  answers.flat().forEach(l => {
    const m = carreers.find(c => c.index === l);
    if (m) res[m.carreer]++;
  });
  let sorted = Object.entries(res)
    .filter(([, cnt]) => cnt > 0)
    .sort((a, b) => b[1] - a[1]);

  lastSorted = sorted;
  const numResults = sorted.length === 1 ? 1 : Math.min(3, sorted.length);

  // Mensaje principal siempre para la primera
  const firstCareer = sorted[0][0];
  finalMessageEl.innerHTML = `
    <h3>🎉 ¡Tu vocación principal es <strong>${firstCareer}</strong>!</h3>
    <p>Explora a fondo la carrera de ${firstCareer} y descubre tu futuro.</p>
    <p>📸 No olvides tomar captura para guardarlo y 🔗 compartirlo con tus amigos.</p>
  `;

  // Lista de coincidencias
  const topEl = document.getElementById('topCareers');
  topEl.innerHTML = '';
  for (let i = 0; i < numResults; i++) {
    const [car, sc] = sorted[i];
    topEl.innerHTML += `<li>#${i + 1} ${car} – ${sc} coincidencia${sc > 1 ? 's' : ''}</li>`;
  }

  renderChart(sorted.slice(0, numResults));
  resultsSection.style.display = 'block';
}

// Gráfica simplificada
function renderChart(data) {
  const ctx = document.getElementById('careerChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.map(e => e[0]),
      datasets: [{
        label: 'Coincidencias',
        data: data.map(e => e[1]),
        backgroundColor: data.map((_, i) => `rgba(108,92,231,${0.3 - i * 0.05})`),
        borderColor: data.map((_, i) => `rgba(108,92,231,${0.7 - i * 0.1})`),
        borderWidth: 1
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { beginAtZero: true, ticks: { color: '#fff' } },
        y: { ticks: { color: '#fff' } }
      }
    }
  });
}

// Compartir resultados
shareBtn.addEventListener('click', () => {
  const first = lastSorted[0];
  let text = `Mi vocación principal es ${first[0]} (${first[1]} coincidencias).`;
  if (lastSorted.length > 1) {
    text += '\nMis otras coincidencias:\n' +
      lastSorted.slice(1, 3).map((e, i) => `${i + 2}. ${e[0]} (${e[1]})`).join('\n');
  }
  text += '\n\n¡Haz tu test y descubre el tuyo!';
  const shareData = { title: 'Mi test vocacional', text, url: location.href };
  if (navigator.share) {
    navigator.share(shareData);
  } else {
    navigator.clipboard.writeText(`${shareData.title}\n\n${shareData.text}\n${shareData.url}`);
    alert('Resultados copiados al portapapeles. ¡Compártelos con tus amigos!');
  }
});

// Reiniciar test
function restartQuiz() {
  if (chartInstance) chartInstance.destroy();
  currentStep = 0;
  answers = Array(questions.length).fill([]);
  resultsSection.style.display = '';
  previewScreen.classList.add('active');
}

