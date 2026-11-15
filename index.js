const CATS = {
    concepto: { name: "Conceptos básicos", em: "📘", color: "#5b2be0" },
    reclu: { name: "Reclutamiento", em: "🔎", color: "#2b7cf0" },
    entre: { name: "Entrevistas", em: "🎤", color: "#e0457b" },
    ingreso: { name: "Ingreso a la empresa", em: "🚪", color: "#f08c00" },
    capa: { name: "Capacitación", em: "🎓", color: "#12a594" },
    clima: { name: "Clima laboral", em: "☀️", color: "#e8590c" },
    desem: { name: "Desempeño", em: "📈", color: "#7048e8" },
    sueldos: { name: "Sueldos y beneficios", em: "💰", color: "#2f9e44" },
    segu: { name: "Seguridad e higiene", em: "🦺", color: "#c92a2a" },
    conflic: { name: "Conflictos y comunicación", em: "🤝", color: "#1971c2" }
};

// La primera opción de cada pregunta es la correcta; se mezclan al jugar.
const QUESTIONS = [
    {
        cat: "concepto",
        q: "¿Qué hace principalmente el área de Recursos Humanos de una empresa?",
        o: ["Se ocupa de las personas que trabajan en la empresa: sumarlas, cuidarlas y desarrollarlas",
            "Se ocupa solamente de limpiar y mantener la oficina",
            "Vende los productos o servicios al público",
            "Arregla las computadoras y los sistemas"],
        e: "RRHH gestiona a las personas: desde que se las busca y contrata hasta que se capacitan, se les paga y se cuida su bienestar. Las personas son el recurso más valioso de una organización."
    },

    {
        cat: "reclu",
        q: "¿Qué es el \"reclutamiento\"?",
        o: ["Atraer a personas interesadas en trabajar en la empresa, por ejemplo con avisos laborales",
            "Despedir a los empleados que no rinden",
            "Pagar el sueldo a fin de mes",
            "Hacer un festejo de fin de año"],
        e: "El reclutamiento es el primer paso: se publican búsquedas (redes, portales de empleo, recomendaciones) para que lleguen muchos candidatos. Después viene la selección, donde se elige a la persona más adecuada."
    },

    {
        cat: "entre",
        q: "¿Para qué sirve una entrevista de trabajo?",
        o: ["Para conocer al candidato y ver si sus capacidades y su perfil se ajustan al puesto",
            "Para decidir quién cae mejor sin mirar su experiencia",
            "Solo para completar un trámite",
            "Para explicar cómo se usa la fotocopiadora"],
        e: "En la entrevista la empresa evalúa conocimientos, experiencia y actitudes, y el candidato también conoce la empresa. Es una conversación en ambos sentidos, y la decisión debe basarse en el perfil buscado."
    },

    {
        cat: "ingreso",
        q: "Una persona recién entra a trabajar y le explican la cultura de la empresa, sus tareas y la presentan al equipo. ¿Cómo se llama este proceso?",
        o: ["Inducción u onboarding",
            "Despido",
            "Auditoría contable",
            "Liquidación de sueldos"],
        e: "La inducción (u onboarding) ayuda a que el nuevo empleado se adapte rápido, se sienta bienvenido y sepa qué se espera de él. Una buena inducción reduce errores y la rotación de personal."
    },

    {
        cat: "capa",
        q: "¿Qué busca la capacitación del personal?",
        o: ["Que los empleados aprendan y mejoren sus habilidades para hacer mejor su trabajo",
            "Que los empleados trabajen más horas sin cobrar",
            "Que los empleados se vayan de la empresa",
            "Que los empleados no hagan preguntas"],
        e: "Capacitar es invertir en las personas: cursos, talleres o práctica guiada que mejoran el desempeño, aumentan la motivación y preparan a la gente para crecer dentro de la empresa."
    },

    {
        cat: "clima",
        q: "¿Qué es el \"clima laboral\"?",
        o: ["Cómo se sienten las personas en su ambiente de trabajo: las relaciones, el trato y el ánimo general",
            "La temperatura del aire acondicionado de la oficina",
            "El pronóstico del tiempo para ir a trabajar",
            "La cantidad de computadoras que hay"],
        e: "Un buen clima laboral (respeto, comunicación, compañerismo) hace que la gente trabaje con más ganas y se quede más tiempo. RRHH suele medirlo con encuestas y trabajar para mejorarlo."
    },

    {
        cat: "desem",
        q: "¿Para qué se hace una evaluación de desempeño?",
        o: ["Para analizar cómo trabaja cada persona, reconocer sus logros y ayudarla a mejorar",
            "Para castigar a los empleados",
            "Para decidir el color del uniforme",
            "Para elegir el menú del comedor"],
        e: "La evaluación de desempeño compara lo que se esperaba con lo que se logró. Bien hecha, sirve para felicitar, dar feedback, detectar necesidades de capacitación y planificar ascensos."
    },

    {
        cat: "sueldos",
        q: "En Argentina, el aguinaldo (SAC) es un pago extra que los trabajadores en relación de dependencia cobran...",
        o: ["En dos cuotas por año: junio y diciembre",
            "Todos los meses",
            "Solo cuando el jefe quiere",
            "Una vez cada cinco años"],
        e: "El Sueldo Anual Complementario (aguinaldo) se paga en dos cuotas al año, en junio y diciembre. Calcular y pagar sueldos y aguinaldos correctamente es otra tarea clave de RRHH (la liquidación de sueldos)."
    },

    {
        cat: "segu",
        q: "¿Qué es la seguridad e higiene laboral?",
        o: ["Las medidas para prevenir accidentes y enfermedades en el trabajo y cuidar la salud de todos",
            "Una regla para que nadie pueda tomarse vacaciones",
            "Un curso de cocina para el personal",
            "Un permiso para llegar tarde"],
        e: "Incluye cosas como usar casco o guantes cuando corresponde, tener salidas de emergencia señalizadas, matafuegos y buenas posturas de trabajo. Cuidar a las personas es una obligación de la empresa."
    },

    {
        cat: "conflic",
        q: "Dos compañeros discuten seguido y el equipo se ve afectado. ¿Qué haría un buen profesional de RRHH?",
        o: ["Escuchar a ambos, dialogar y buscar una solución en la que los dos estén de acuerdo",
            "Ignorar el problema para que se arregle solo",
            "Contar el conflicto a todos los demás empleados",
            "Despedir a uno sin hablar con nadie"],
        e: "RRHH actúa como mediador: escucha con respeto, es imparcial y busca acuerdos. Resolver los conflictos a tiempo mejora el clima laboral y evita problemas más grandes."
    }
];

const TOTAL = QUESTIONS.length;
const TIME = 20;
const SHEET_DELAY = 900; // ms para ver si acertaste antes de que aparezca la explicación
let order, idx, score, results, timerId, sheetId, timeLeft, answered;

const $ = id => document.getElementById(id);
function show(id) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    $(id).classList.add("active");
}
function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] }
    return a;
}

function startGame() {
    order = QUESTIONS.map(q => ({ ...q, opts: shuffle(q.o.map((t, i) => ({ t, ok: i === 0 }))) }));
    idx = 0; score = 0; results = [];
    $("scoreLive").textContent = "⭐ 0";
    show("game");
    loadQuestion();
}

function loadQuestion() {
    answered = false;
    clearTimeout(sheetId);
    $("overlay").classList.remove("show");
    const q = order[idx], c = CATS[q.cat];
    $("qCount").textContent = `Pregunta ${idx + 1}/${TOTAL}`;
    $("bar").style.width = (idx / TOTAL * 100) + "%";
    $("cat").style.background = c.color;
    $("catEm").textContent = c.em;
    $("catName").textContent = c.name;
    $("question").textContent = q.q;
    $("nextBtn").textContent = idx === TOTAL - 1 ? "VER RESULTADO 🏆" : "SIGUIENTE ➜";
    const box = $("opts"); box.innerHTML = "";
    q.opts.forEach((o, i) => {
        const b = document.createElement("button");
        b.className = "opt";
        b.innerHTML = `<span class="l">${"ABCD"[i]}</span><span></span>`;
        b.lastChild.textContent = o.t;
        b.addEventListener("click", () => answer(i));
        box.appendChild(b);
    });
    startTimer();
}

function startTimer() {
    clearInterval(timerId);
    timeLeft = TIME; $("timer").textContent = "⏱ " + timeLeft;
    timerId = setInterval(() => {
        timeLeft--; $("timer").textContent = "⏱ " + timeLeft;
        if (timeLeft <= 0) { clearInterval(timerId); answer(-1); }
    }, 1000);
}

function answer(i) {
    if (answered) return;
    answered = true; clearInterval(timerId);
    const q = order[idx];
    const btns = [...document.querySelectorAll(".opt")];
    btns.forEach((b, k) => {
        b.classList.add("locked");
        if (q.opts[k].ok) b.classList.add("correct");
    });
    const ok = i >= 0 && q.opts[i].ok;
    if (i >= 0 && !ok) btns[i].classList.add("wrong");
    if (ok) { score++; $("scoreLive").textContent = "⭐ " + score; }
    results.push(ok);

    const head = $("sheetHead");
    head.className = "head " + (ok ? "ok" : "no");
    head.textContent = ok ? "✅ ¡Correcto!" : (i < 0 ? "⏰ ¡Se acabó el tiempo!" : "❌ ¡Uy, casi!");
    $("sheetTxt").textContent = "💡 " + q.e;
    sheetId = setTimeout(() => $("overlay").classList.add("show"), SHEET_DELAY);
}

function next() {
    idx++;
    if (idx >= TOTAL) { $("overlay").classList.remove("show"); finish(); }
    else loadQuestion();
}

function finish() {
    $("bar").style.width = "100%";
    $("finalScore").textContent = score;
    const stars = score >= 9 ? 3 : score >= 6 ? 2 : score >= 3 ? 1 : 0;
    $("stars").textContent = "⭐".repeat(stars) + "☆".repeat(3 - stars);
    let m, d;
    if (score >= 9) { m = "¡Sos un crack de RRHH! 🏆"; d = "Dominás el tema. ¡Excelente trabajo!"; }
    else if (score >= 6) { m = "¡Muy bien! 👏"; d = "Sabés bastante. Con un repaso más llegás al 10."; }
    else if (score >= 3) { m = "¡Buen intento! 💪"; d = "Ya aprendiste cosas nuevas. Jugá de nuevo para mejorar."; }
    else { m = "¡No te rindas! 🌱"; d = "Leé las explicaciones y volvé a intentarlo."; }
    $("finalMsg").textContent = m; $("finalDetail").textContent = d;
    const rv = $("review"); rv.innerHTML = "";
    results.forEach((r, i) => {
        const s = document.createElement("span");
        s.className = "dot " + (r ? "ok" : "no"); s.textContent = i + 1; rv.appendChild(s);
    });
    show("end");
    if (score >= 6) confetti();
}

function confetti() {
    const cols = ["#ffb703", "#fb8500", "#4d8dff", "#22b573", "#ef476f", "#7048e8"];
    for (let i = 0; i < 60; i++) {
        const c = document.createElement("i"); c.className = "confetti";
        c.style.left = Math.random() * 100 + "vw";
        c.style.background = cols[i % cols.length];
        c.style.animationDuration = (2 + Math.random() * 2.5) + "s";
        c.style.animationDelay = (Math.random() * .8) + "s";
        document.body.appendChild(c);
        setTimeout(() => c.remove(), 5500);
    }
}


$("playBtn").addEventListener("click", startGame);
$("nextBtn").addEventListener("click", next);
$("againBtn").addEventListener("click", startGame);
$("startBtn").addEventListener("click", () => {
    clearInterval(timerId);
    clearTimeout(sheetId);
    $("overlay").classList.remove("show");
    show("start");
});