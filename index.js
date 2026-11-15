const CATS = {
    datos: { name: "Datos personales", em: "📇", color: "#5b2be0" },
    contenido: { name: "Contenido del CV", em: "📄", color: "#2b7cf0" },
    perfil: { name: "Perfil profesional", em: "👤", color: "#e0457b" },
    formato: { name: "Formato y diseño", em: "🎨", color: "#f08c00" },
    experiencia: { name: "Experiencia laboral", em: "💼", color: "#12a594" },
    diseno: { name: "Presentación", em: "✨", color: "#e8590c" },
    errores: { name: "Buenas prácticas", em: "⚠️", color: "#7048e8" },
    sin_experiencia: { name: "Primer empleo", em: "🚀", color: "#2f9e44" },
    contacto: { name: "Medios de contacto", em: "📧", color: "#c92a2a" },
    extension: { name: "Extensión del CV", em: "📏", color: "#1971c2" }
};

// La primera opción de cada pregunta es la correcta; se mezclan al jugar.
const QUESTIONS = [
    {
        cat: "datos",
        q: "¿Qué datos personales deben aparecer en un currículum vitae?",
        o: [
            "Nombre, apellido, teléfono y correo electrónico",
            "DNI, número de tarjeta y contraseñas",
            "Nombre de familiares y sus teléfonos"
        ],
        e: "Los datos de contacto y identificación básica son esenciales para que la empresa pueda comunicarse con vos de forma rápida y profesional."
    },
    {
        cat: "contenido",
        q: "¿Qué información no debería incluirse en un CV?",
        o: [
            "Contraseñas de redes sociales",
            "Formación académica",
            "Experiencia laboral"
        ],
        e: "Nunca debes incluir información privada o sensible como contraseñas. El CV debe centrarse exclusivamente en tu perfil profesional y académico."
    },
    {
        cat: "perfil",
        q: "¿Para qué sirve el perfil profesional?",
        o: [
            "Para presentar brevemente quiénes somos, nuestras habilidades y objetivos",
            "Para contar toda nuestra vida personal",
            "Para escribir frases sin relación con el trabajo"
        ],
        e: "El perfil profesional es una breve introducción al inicio del CV que le permite al reclutador entender rápidamente quién sos y qué podés aportar."
    },
    {
        cat: "formato",
        q: "¿Es necesario incluir una fotografía en el currículum?",
        o: [
            "Es opcional, salvo que la empresa la solicite",
            "Sí, siempre es obligatoria",
            "No, nunca se puede colocar"
        ],
        e: "Depende de las normas del país o de la empresa, pero por regla general la foto es opcional a menos que la oferta de empleo lo pida expresamente."
    },
    {
        cat: "experiencia",
        q: "¿Cómo debemos presentar la experiencia laboral?",
        o: [
            "Colocando primero la experiencia más reciente",
            "Sin indicar dónde trabajamos",
            "Inventando experiencias para llamar la atención"
        ],
        e: "El orden cronológico inverso (lo más reciente arriba) es el estándar porque le permite al reclutador ver de inmediato tu situación laboral actual."
    },
    {
        cat: "diseno",
        q: "¿Qué características debe tener un buen currículum?",
        o: [
            "Información clara, ordenada y actualizada",
            "Muchos colores, dibujos y diferentes tipos de letras",
            "Información desordenada y difícil de leer"
        ],
        e: "La claridad y el orden facilitan la lectura rápida de los reclutadores, quienes suelen dedicar pocos segundos a cada CV en el primer filtro."
    },
    {
        cat: "errores",
        q: "¿Qué cosas debemos evitar al elaborar un CV?",
        o: [
            "Mentir sobre nuestros estudios o experiencia",
            "Revisar la ortografía",
            "Adaptarlo al puesto al que queremos postularnos"
        ],
        e: "La honestidad es fundamental. Mentir en un currículum destruye la confianza y suele descubrirse fácilmente durante los procesos de selección o verificación de referencias."
    },
    {
        cat: "sin_experiencia",
        q: "Si nunca trabajaste, ¿qué información podés colocar en tu CV?",
        o: [
            "Estudios, cursos, habilidades, prácticas y voluntariados",
            "Nada, porque no tenés experiencia",
            "Experiencias laborales inventadas"
        ],
        e: "Todos empezamos sin experiencia formal. Resaltar tus estudios, proyectos académicos, cursos extracurriculares y voluntariados demuestra proactividad y ganas de aprender."
    },
    {
        cat: "contacto",
        q: "¿Qué importancia tiene el correo electrónico en un CV?",
        o: [
            "Debe ser profesional y estar actualizado",
            "Puede ser cualquier apodo gracioso",
            "No hace falta colocar ninguno"
        ],
        e: "Un correo profesional (por ejemplo, nombre.apellido@email.com) da una buena primera impresión, a diferencia de direcciones informales o con apodos antiguos."
    },
    {
        cat: "extension",
        q: "¿Qué extensión es recomendable para un currículum vitae?",
        o: [
            "Entre 1 y 2 páginas, procurando que sea claro y relevante",
            "10 páginas como mínimo",
            "Todas las páginas que sean necesarias, aunque haya información repetida"
        ],
        e: "Un CV conciso y directo facilita la lectura. Lo ideal es resumir la trayectoria más relevante en una o máximo dos páginas."
    }
];

const TOTAL = QUESTIONS.length;
const TIME = 40;
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