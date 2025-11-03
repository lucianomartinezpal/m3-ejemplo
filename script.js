// Configuración de la ruleta
const RULETTE_SIZE = 400;
const SEGMENTS = 8; // 8 opciones
const SEGMENT_ANGLE = (2 * Math.PI) / SEGMENTS;

// Opciones de la ruleta: 8 emojis (mostrados), con valores numéricos para lógica
const rouletteOptions = [
    { type: 'text', value: '3', label: '😖' },
    { type: 'text', value: '4', label: '😞' },
    { type: 'text', value: '5', label: '😕' },
    { type: 'text', value: '6', label: '😬' },
    { type: 'text', value: '7', label: '🙂' },
    { type: 'text', value: '8', label: '😄' },
    { type: 'text', value: '9', label: '🤩' },
    { type: 'text', value: '10', label: '🏆' },
];

// Estado del juego
let currentRotation = 0;
let isSpinning = false;
let targetIndex = null; // índice objetivo del giro
let canvas, ctx;
let highlightedIndex = null; // segmento resaltado tras detenerse

// Elementos del DOM
const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultPopup = document.getElementById('result-popup');
const startBtn = document.getElementById('start-btn');
const spinBtn = document.getElementById('spin-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const resultValue = document.getElementById('result-value');
const resultMessage = document.getElementById('result-message');
const resultStatus = document.getElementById('result-status');
const resultTitle = document.getElementById('result-title');
const resultIcon = document.getElementById('result-icon');
const resultContent = document.getElementById('result-content');

// Colores para los segmentos
const colors = {
    failed: ['#ff6b6b', '#ee5a6f'],      // Rojo para notas 3-6
    passed: ['#51cf66', '#40c057'],      // Verde para notas 7-9
    excellent: ['#ffd43b', '#fcc419']     // Dorado/verde para nota 10
};

// Inicialización
function init() {
    canvas = document.getElementById('roulette-canvas');
    if (!canvas) return; // por si se carga antes del DOM
    canvas.width = RULETTE_SIZE;
    canvas.height = RULETTE_SIZE;
    ctx = canvas.getContext('2d');

    drawRoulette();
    setupEventListeners();
}

// Configurar event listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startGame);
    spinBtn.addEventListener('click', spinRoulette);
    playAgainBtn.addEventListener('click', playAgain);
}

// Cambiar a pantalla de juego
function startGame() {
    welcomeScreen.classList.remove('active');
    setTimeout(() => {
        gameScreen.classList.add('active');
    }, 300);
}

// Dibujar la ruleta
function drawRoulette(rotation = 0, highlightIndex = null) {
    ctx.clearRect(0, 0, RULETTE_SIZE, RULETTE_SIZE);
    
    const centerX = RULETTE_SIZE / 2;
    const centerY = RULETTE_SIZE / 2;
    const radius = RULETTE_SIZE / 2 - 10;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // Dibujar cada segmento
    rouletteOptions.forEach((option, index) => {
        const startAngle = index * SEGMENT_ANGLE - Math.PI / 2;
        const endAngle = (index + 1) * SEGMENT_ANGLE - Math.PI / 2;

        // Determinar color según la nota
        const noteValue = parseInt(option.value);
        let color1, color2;
        
        if (noteValue >= 3 && noteValue <= 6) {
            color1 = colors.failed[0];
            color2 = colors.failed[1];
        } else if (noteValue >= 7 && noteValue <= 9) {
            color1 = colors.passed[0];
            color2 = colors.passed[1];
        } else if (noteValue === 10) {
            color1 = colors.excellent[0];
            color2 = colors.excellent[1];
        }

        // Crear gradiente
        const gradient = ctx.createLinearGradient(
            Math.cos(startAngle) * radius,
            Math.sin(startAngle) * radius,
            Math.cos(endAngle) * radius,
            Math.sin(endAngle) * radius
        );
        gradient.addColorStop(0, color1);
        gradient.addColorStop(1, color2);

        // Dibujar segmento
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Dibujar texto
        const midAngle = (startAngle + endAngle) / 2;
        const textRadius = radius * 0.7;
        const textX = Math.cos(midAngle) * textRadius;
        const textY = Math.sin(midAngle) * textRadius;

        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(midAngle + Math.PI / 2);
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.font = 'bold 32px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        ctx.strokeText(option.label, 0, 0);
        ctx.fillText(option.label, 0, 0);

        ctx.restore();
    });

    // Resaltar el segmento seleccionado (si corresponde)
    if (highlightIndex !== null && highlightIndex >= 0 && highlightIndex < SEGMENTS) {
        const startAngle = highlightIndex * SEGMENT_ANGLE - Math.PI / 2;
        const endAngle = (highlightIndex + 1) * SEGMENT_ANGLE - Math.PI / 2;

        ctx.beginPath();
        // Aro exterior brillante
        ctx.arc(0, 0, radius + 2, startAngle + 0.01, endAngle - 0.01);
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.lineWidth = 8;
        ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = 20;
        ctx.stroke();

        // Borde interior sutil
        ctx.beginPath();
        ctx.arc(0, 0, radius - 6, startAngle + 0.02, endAngle - 0.02);
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 0;
        ctx.stroke();
    }

    // Dibujar círculo central
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
}

// Girar la ruleta
function spinRoulette() {
    if (isSpinning) return;

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = '🔄 Girando...';

    // Elegir un segmento objetivo y calcular rotación para que su CENTRO quede bajo la flecha (arriba)
    targetIndex = Math.floor(Math.random() * SEGMENTS);
    const spins = Math.floor(5 + Math.random() * 4); // 5-8 vueltas enteras
    // Centro del segmento j está en: -PI/2 + (j + 0.5) * SEGMENT_ANGLE
    // Queremos que tras rotar quede exactamente en -PI/2 => R = 2π*spins - (j + 0.5)*angle
    const totalRotation = currentRotation + (spins * 2 * Math.PI) - ((targetIndex + 0.5) * SEGMENT_ANGLE);

    // Animación
    const startRotation = currentRotation;
    const rotationDiff = totalRotation - startRotation;
    const duration = 4000; // 4 segundos
    const startTime = Date.now();

    function animate() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        currentRotation = startRotation + (rotationDiff * easeProgress);
        drawRoulette(currentRotation);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // Animación completa
            currentRotation = totalRotation;
            highlightedIndex = targetIndex;
            const selectedOption = rouletteOptions[targetIndex];
            setTimeout(() => {
                // Redibujar con resaltado del segmento
                drawRoulette(currentRotation, highlightedIndex);
                showResult(selectedOption);
            }, 500);
        }
    }

    animate();
}

// Mostrar resultado
function showResult(option) {
    const noteValue = parseInt(option.value);
    
    // Actualizar contenido del popup
    resultValue.textContent = noteValue;
    resultMessage.textContent = `Tu nota es: ${noteValue}`;

    // Determinar estado y color
    if (noteValue >= 3 && noteValue <= 6) {
        // Desaprobado - Rojo
        resultContent.className = 'result-content fade-in failed';
        resultStatus.textContent = '❌ DESAPROBADO';
        resultIcon.textContent = '😞';
        resultTitle.textContent = '¡Sigue Intentando!';
    } else if (noteValue >= 7 && noteValue <= 9) {
        // Aprobado - Verde
        resultContent.className = 'result-content fade-in passed';
        resultStatus.textContent = '✅ APROBADO';
        resultIcon.textContent = '🎉';
        resultTitle.textContent = '¡Felicitaciones!';
    } else if (noteValue === 10) {
        // Aprobado Sobresaliente - Verde espectacular
        resultContent.className = 'result-content fade-in excellent';
        resultStatus.textContent = '⭐ ¡APROBADO SOBRESALIENTE! ⭐';
        resultIcon.textContent = '🏆';
        resultTitle.textContent = '¡EXCELENTE TRABAJO!';
    }

    // Cambiar fondo de la pantalla de juego
    const body = document.body;
    if (noteValue >= 3 && noteValue <= 6) {
        body.style.background = 'linear-gradient(135deg, #ff4444 0%, #cc0000 100%)';
        body.style.transition = 'background 0.8s ease';
    } else if (noteValue >= 7 && noteValue <= 9) {
        body.style.background = 'linear-gradient(135deg, #44ff44 0%, #00cc00 100%)';
        body.style.transition = 'background 0.8s ease';
    } else if (noteValue === 10) {
        body.style.background = 'linear-gradient(135deg, #44ff44 0%, #22cc22 50%, #00ff88 100%)';
        body.style.transition = 'background 0.8s ease';
        body.style.animation = 'pulse 2s infinite';
    }

    // Mostrar popup
    resultPopup.classList.add('show');

    isSpinning = false;
}

// Jugar otra vez
function playAgain() {
    // Resetear popup
    resultPopup.classList.remove('show');
    resultContent.className = 'result-content fade-in';
    
    // Resetear fondo
    document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    document.body.style.animation = 'none';
    
    // Resetear botón
    spinBtn.disabled = false;
    spinBtn.textContent = '🎯 GIRAR';
    
    // Redibujar ruleta en posición inicial
    currentRotation = 0;
    highlightedIndex = null;
    drawRoulette();
}

// Inicializar cuando se carga la página
window.addEventListener('load', init);

