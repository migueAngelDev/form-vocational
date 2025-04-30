const backgrounds = {
  a: '#2196f3', b: '#4caf50', c: '#ff9800',
  d: '#9c27b0', e: '#3f51b5', f: '#ff5722',
  g: '#009688', h: '#607d8b', i: '#795548'
};
const stepBackgroundMap = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

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

const quizForm = document.getElementById('quizForm');
const resultsSection = document.getElementById('results');
const loadingMessage = document.getElementById('loadingMessage');
const countdownEl = document.getElementById('countdown');
const progressBar = document.getElementById('progressBar');
let currentStep = 0;
let answers = Array(questions.length).fill([]);
let chartInstance = null;

function setBackground(step) {
  const letter = stepBackgroundMap[step] || 'h';
  document.body.style.background = backgrounds[letter];
  const pct = (step + 1) / questions.length * 100;
  progressBar.style.width = pct + '%';
}

function renderQuestion(step) {
  setBackground(step);
  const q = questions[step];
  quizForm.innerHTML = `
    <div class="question active">
      <div class="step-indicator">Paso ${step + 1} de ${questions.length}</div>
      <h3>${q.question}</h3>
      ${q.answers.map((a, i) => `
        <label>
          <input type="checkbox" name="step${step}" value="${String.fromCharCode(97 + i)}"/>
          <span>${a}</span>
        </label>`).join('')}
      <div class="controls">
        <button type="button" onclick="prevStep()" ${step === 0 ? 'disabled' : ''}>Atrás</button>
        <button type="button" onclick="nextStep()">${step + 1 === questions.length ? 'Ver Resultados' : 'Siguiente'}</button>
      </div>
    </div>`;
}

function nextStep() {
  const sel = quizForm.querySelectorAll('input:checked');
  if (!sel.length) return alert('Selecciona al menos una opción.');
  answers[currentStep] = Array.from(sel).map(i => i.value);
  currentStep++;
  if (currentStep < questions.length) renderQuestion(currentStep);
  else showLoadingThenResults();
}

function prevStep() {
  if (currentStep === 0) return;
  currentStep--;
  renderQuestion(currentStep);
  quizForm.querySelectorAll('input').forEach(i => {
    if (answers[currentStep].includes(i.value)) i.checked = true;
  });
}

function showLoadingThenResults() {
  quizForm.innerHTML = '';
  loadingMessage.style.display = 'block';
  countdownEl.style.display = 'block';
  let count = 3;
  countdownEl.textContent = count;
  const iv = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(iv);
      loadingMessage.style.display = 'none';
      countdownEl.style.display = 'none';
      confetti({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
      setTimeout(calculateResults, 1000);
    } else {
      countdownEl.textContent = count;
    }
  }, 1000);
}

function calculateResults() {
  const res = {};
  carreers.forEach(c => res[c.carreer] = 0);
  answers.flat().forEach(l => {
    const m = carreers.find(c => c.index === l);
    if (m) res[m.carreer]++;
  });
  const sorted = Object.entries(res).sort((a, b) => b[1] - a[1]);
  const topEl = document.getElementById('topCareers');
  topEl.innerHTML = '';
  sorted.slice(0, 3).forEach(([car, sc], i) => {
    topEl.innerHTML += `<li>#${i + 1} ${car} – ${sc} coincidencias</li>`;
  });
  renderChart(sorted);
  resultsSection.style.display = 'block';
}

function renderChart(sortedData) {
  const ctx = document.getElementById('careerChart').getContext('2d');
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: sortedData.map(e => e[0]),
      datasets: [{
        label: 'Vocación',
        data: sortedData.map(e => e[1]),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        pointBackgroundColor: 'rgba(255, 99, 132, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'bottom', labels: { color: '#fff' } }
      },
      scales: {
        r: {
          angleLines: { color: '#ccc' },
          grid: { color: '#555' },
          pointLabels: { color: '#fff' },
          ticks: { color: '#fff', backdropColor: 'rgba(0,0,0,0.4)' }
        }
      }
    }
  });
}

function restartQuiz() {
  if (chartInstance) chartInstance.destroy();
  currentStep = 0;
  answers = Array(questions.length).fill([]);
  resultsSection.style.display = 'none';
  renderQuestion(0);
}

renderQuestion(0);
