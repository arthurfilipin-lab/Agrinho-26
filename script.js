// ==========================================================================
// LOADER & MODO CLARO/ESCURO
// ==========================================================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => loader.style.visibility = 'hidden', 500);
});

const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
    document.body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    let theme = 'dark';
    if (document.body.getAttribute('data-theme') !== 'light') {
        document.body.setAttribute('data-theme', 'light');
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        theme = 'light';
    } else {
        document.body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
});

// ==========================================================================
// CURSOR SUAVE PERSONALIZADO
// ==========================================================================
const customCursor = document.getElementById('customCursor');
document.addEventListener('mousemove', (e) => {
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
});

document.querySelectorAll('a, button, .card, .gallery-item').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        customCursor.style.width = '40px';
        customCursor.style.height = '40px';
        customCursor.style.backgroundColor = 'rgba(76, 175, 80, 0.1)';
    });
    elem.addEventListener('mouseleave', () => {
        customCursor.style.width = '20px';
        customCursor.style.height = '20px';
        customCursor.style.backgroundColor = 'transparent';
    });
});

// ==========================================================================
// TEXTO DE DIGITAÇÃO AUTOMÁTICA (HERO)
// ==========================================================================
const typewriterElement = document.getElementById('typewriter');
const words = ["Futuro Sustentável.", "Agronegócio Inteligente.", "Equilíbrio Ecológico."];
let wordIdx = 0, charIdx = 0, isDeleting = false;

function type() {
    const currentWord = words[wordIdx];
    if (isDeleting) {
        typewriterElement.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterElement.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000; // Tempo parado no final da frase
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}
document.addEventListener("DOMContentLoaded", () => setTimeout(type, 1000));

// ==========================================================================
// NAVBAR DINÂMICA & MENU MOBILE
// ==========================================================================
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
});

// Fecha menu mobile ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ==========================================================================
// SCROLL REVEAL & CONTADORES ANIMADOS
// ==========================================================================
const revealSections = document.querySelectorAll('.scroll-reveal');
const counters = document.querySelectorAll('.counter-num');
let countersAnimated = false;

const animateCounters = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const speed = target / 50;
        const updateCount = () => {
            const count = +counter.innerText;
            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(updateCount, 25);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-active');
            if (entry.target.id === 'dashboard' && !countersAnimated) {
                animateCounters();
                countersAnimated = true;
            }
        }
    });
}, { threshold: 0.15 });

revealSections.forEach(section => {
    section.classList.add('scroll-reveal-init');
    revealObserver.observe(section);
});

// ==========================================================================
// ASSISTENTE DE IA CHATBOT
// ==========================================================================
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatWindow = document.getElementById('chatWindow');
const minimizeChat = document.getElementById('minimizeChat');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');
const chatTyping = document.getElementById('chatTyping');

chatToggleBtn.addEventListener('click', () => chatWindow.classList.add('active'));
minimizeChat.addEventListener('click', () => chatWindow.classList.remove('active'));

const responses = {
    irrigacao: "Você pode utilizar sensores inteligentes e irrigação automatizada para reduzir desperdícios e aumentar a eficiência hídrica em até 40%.",
    ia: "A Inteligência Artificial pode prever o clima, otimizar períodos de colheitas, detectar pragas por visão computacional e melhorar a produtividade geral.",
    solo: "Através da agricultura regenerativa e sensores IoT, mapeamos os nutrientes do solo para aplicação cirúrgica de adubação sustentável.",
    consultoria: "Oferecemos diagnósticos completos por IA e planejamento verde. Clique nas seções acima para falar direto com nossa engenharia.",
    default: "Interessante! Essa tecnologia faz parte do portfólio AgroForte. Como posso refinar essa consultoria para sua propriedade?"
};

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim().toLowerCase();
    if (!query) return;

    // Mensagem do usuário
    appendMessage(chatInput.value, 'user');
    chatInput.value = '';

    // Efeito digitando...
    chatTyping.style.display = 'flex';
    chatBody.scrollTop = chatBody.scrollHeight;

    setTimeout(() => {
        chatTyping.style.display = 'none';
        let responseText = responses.default;

        if (query.includes('irriga')) responseText = responses.irrigacao;
        else if (query.includes('ia') || query.includes('inteligencia')) responseText = responses.ia;
        else if (query.includes('solo') || query.includes('terra')) responseText = responses.solo;
        else if (query.includes('consultoria') || query.includes('ajuda')) responseText = responses.consultoria;

        appendMessage(responseText, 'bot');
    }, 1500);
});

function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', `message-${sender}`);
    msg.innerText = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Fundo de Partículas / Microefeito Ecológico Simples
const bgParticles = document.getElementById('bgParticles');
for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = `${Math.random() * 4 + 2}px`;
    particle.style.height = particle.style.width;
    particle.style.background = 'var(--accent)';
    particle.style.borderRadius = '50%';
    particle.style.top = `${Math.random() * 100}%`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.opacity = Math.random() * 0.5;
    bgParticles.appendChild(particle);
}

// Feedback básico no Form de Contato
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Obrigado pelo contato! A equipe AgroForte responderá em até 24 horas.');
    e.target.reset();
});
