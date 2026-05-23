const patrones = [
  {
    img: "fotos/2.jpg",
    pregunta: "¿Qué patron es el 1 ?",
    correcto: "Empanada superior",
    opciones: ["Empanada superior", "Pendiente descendente", "Triángulo"]
  },
  {
    img: "fotos/3.jpg",
    pregunta: "¿Qué patrón es el 1 ?",
    correcto: "Empanada superior",
    opciones: ["Cielo negro cubierto", "Empanada superior", "Envolvente alcista"]
  },
  {
    img: "fotos/5.jpg",
    pregunta: "¿Qué patrónes es el 1 ?",
    correcto: "Fondo del sarten",
    opciones: ["Cielo negro cubierto", "Doble Techo", "Fondo del sarten"]
  },
  {
    img: "fotos/6.jpg",
    pregunta: "¿Qué patrónes es el 1 ?",
    correcto: "Fondo del sarten",
    opciones: ["Fondo del sarten", "Encima del soporte", "Encima de la resistencia"]
  },
  {
    img: "fotos/7.jpg",
    pregunta: "¿Qué patrón es el 3 ?",
    correcto: "Fondo redondeado",
    opciones: ["Cielo negro cubierto", "Doble Techo", "Fondo redondeado"]
  },
  {
    img: "fotos/8.jpg",
    pregunta: "¿Qué patrón es el 3?",
    correcto: "Empanada superior",
    opciones: ["Empanada superior", "Cielo negro cubierto", "Bandera"]
  },
  {
    img: "fotos/9.jpg",
    pregunta: "¿Qué patrónes es el 1?",
    correcto: "Torre superior",
    opciones: ["Breakout", "Torre superior", "Pullback"]
  },
  {
    img: "fotos/10.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Torre inferior",
    opciones: ["Patrón salido", "Patrón cubierto", "Torre inferior"]
  },
  {
    img: "fotos/11.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Torre inferior",
    opciones: ["Torre inferior", "Patrón cubierto", "Patrón penetrante"]
  },
  {
    img: "fotos/12.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Torre inferior",
    opciones: ["Patrónes de empuje", "Torre inferior", "Patrón penetrante"]
  },
  {
    img: "fotos/13.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "ventana creciente",
    opciones: ["Patrónes de empuje", "Estrella de la mañana", "ventana creciente"]
  },
  {
    img: "fotos/14.jpg",
    pregunta: "¿en este grafico que es bottom window",
    correcto: "Soporte",
    opciones: ["Soporte", "Patrón cubierto", "Estrella de la mañana"]
  },
  {
    img: "fotos/15.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Ventana decreciente",
    opciones: ["Patrónes de empuje", "Ventana decreciente", "Estrella de la mañana"]
  },
  {
    img: "fotos/16.jpg",
    pregunta: "¿Qué patrónes es el 3",
    correcto: "Ventanas decrecientes",
    opciones: ["Patrónes de empuje", "Patrón cubierto", "Ventanas decrecientes"]
  },
  {
    img: "fotos/17.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Ventana decreciente",
    opciones: ["Ventana decreciente", "Patrón cubierto", "Estrella de la noche"]
  },
  {
    img: "fotos/18.jpg",
    pregunta: "¿Qué sonlos patrónes del 1-6",
    correcto: "Ventanas ascendentes",
    opciones: ["Patrónes de empuje", "Ventanas ascendentes", "Estrella de la mañana doji"]
  },
  {
    img: "fotos/19.jpg",
    pregunta: "¿Como actuan cada una de las ventanas ascendesntes del 1-4",
    correcto: "Como soporte",
    opciones: ["Como patrónes de empuje", "Como patrón cubierto", "Como soporte"]
  },
  {
    img: "fotos/20.jpg",
    pregunta: "¿Qué patrónes es el 1",
    correcto: "Tasuki con gap ascendente",
    opciones: ["Tasuki con gap ascendente", "Bebe abandonado en techo", "Estrella de la mañana"]
  }
];

let indice = 0;
let score = 0;
let preguntasHechas = 0;
let tiempoRestante = 0;
let timerInterval = null;
let patronActual = null;
let audioCtx = null;

function obtenerAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function reproducirSonidoCorrecto() {
  const ctx = obtenerAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.22);
}

function reproducirSonidoIncorrecto() {
  const ctx = obtenerAudioCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.22);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.26);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.26);
}

function obtenerPatronAleatorio() {
  return patrones[Math.floor(Math.random() * patrones.length)];
}

function iniciarTemporizador() {
  tiempoRestante = 15;
  actualizarTemporizador();

  timerInterval = setInterval(() => {
    tiempoRestante--;
    actualizarTemporizador();

    if (tiempoRestante <= 0) {
      clearInterval(timerInterval);
      document.getElementById("resultado").textContent = "⏰ Tiempo agotado. Era: " + patronActual.correcto;
      reproducirSonidoIncorrecto();
      deshabilitarBotones();
      preguntasHechas++;

      if (preguntasHechas < 100) {
        setTimeout(cargarPatron, 2000);
      } else {
        mostrarFinal();
      }
    }
  }, 1500);
}

function actualizarTemporizador() {
  document.getElementById("timer").textContent = `Tiempo: ${tiempoRestante}s`;
  if (tiempoRestante <= 3) {
    document.getElementById("timer").style.color = "#ef4444";
  } else {
    document.getElementById("timer").style.color = "#fbbf24";
  }
}

function deshabilitarBotones() {
  const botones = document.querySelectorAll(".opciones-container button");
  botones.forEach(btn => btn.disabled = true);
}

function cargarPatron() {
  clearInterval(timerInterval);

  const p = obtenerPatronAleatorio();
  patronActual = p;
  document.getElementById("imagen").src = p.img;
  document.getElementById("pregunta").textContent = p.pregunta;
  document.getElementById("preguntaActual").textContent = preguntasHechas + 1;
  const opcionesDiv = document.getElementById("opciones");
  opcionesDiv.innerHTML = "";
  document.getElementById("resultado").textContent = "";

  p.opciones.forEach(op => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => verificar(op, btn);
    btn.disabled = false;
    opcionesDiv.appendChild(btn);
  });

  iniciarTemporizador();
}

function verificar(respuesta, botonSeleccionado) {
  clearInterval(timerInterval);
  deshabilitarBotones();

  const resultado = document.getElementById("resultado");
  const botones = document.querySelectorAll(".opciones-container button");

  if (respuesta === patronActual.correcto) {
    botonSeleccionado.classList.add("correcta");
    resultado.textContent = "✅ Correcto!";
    reproducirSonidoCorrecto();
    score++;
    document.getElementById("score").textContent = score;

    if (score === 50) {
      mostrarVictoria();
      return;
    }
  } else {
    botonSeleccionado.classList.add("incorrecta");
    reproducirSonidoIncorrecto();
    botones.forEach(btn => {
      if (btn.textContent === patronActual.correcto) {
        btn.classList.add("correcta");
      }
    });
    resultado.textContent = "❌ Incorrecto. Era: " + patronActual.correcto;
  }

  preguntasHechas++;

  if (preguntasHechas < 100) {
    setTimeout(cargarPatron, 2000);
  } else {
    mostrarFinal();
  }
}

function mostrarVictoria() {
  const anim = document.getElementById("animacionVictoria");
  anim.style.display = "block";

  setTimeout(() => {
    anim.style.display = "none";
    reiniciarJuego();
  }, 6000);
}

function mostrarFinal() {
  setTimeout(() => {
    document.getElementById("resultado").textContent = `🎉 ¡Juego terminado! Puntaje final: ${score}/100`;
    document.getElementById("reinicioContainer").style.display = "block";
    document.getElementById("imagen").style.display = "none";
    document.getElementById("pregunta").style.display = "none";
    document.getElementById("opciones").style.display = "none";
    document.getElementById("timer").style.display = "none";
  }, 500);
}

function reiniciarJuego() {
  indice = 0;
  score = 0;
  preguntasHechas = 0;
  tiempoRestante = 0;
  clearInterval(timerInterval);

  document.getElementById("score").textContent = "0";
  document.getElementById("preguntaActual").textContent = "1";
  document.getElementById("resultado").textContent = "";
  document.getElementById("imagen").style.display = "block";
  document.getElementById("pregunta").style.display = "block";
  document.getElementById("opciones").style.display = "grid";
  document.getElementById("timer").style.display = "block";
  document.getElementById("reinicioContainer").style.display = "none";

  cargarPatron();
}

document.addEventListener("DOMContentLoaded", () => {
  const reiniciarBtn = document.getElementById("reiniciarBtn");
  if (reiniciarBtn) {
    reiniciarBtn.addEventListener("click", reiniciarJuego);
  }

  cargarPatron();
});
