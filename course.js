// ===== CONFIGURAÇÕES GLOBAIS =====
const COURSE_CONFIG = {
    XP_PER_LESSON: 50,
    XP_PER_LEVEL: 100,
    ACCESSORIES_PER_LEVEL: 3
};

// ===== DADOS DO CURSO =====
let currentUser = null;
let currentCourse = null;
let currentLesson = 0;
let lessons = [];

// ===== BANCO DE DADOS DE LIÇÕES =====
const lessonDatabase = {
    html: [
        {
            id: 1,
            title: "Bem-vindo ao HTML!",
            duration: "5 min",
            content: `
                <h3>O que é HTML?</h3>
                <p>HTML (HyperText Markup Language) é a linguagem fundamental para criar páginas web. É como o esqueleto de uma página - define a estrutura e o conteúdo.</p>
                
                <h4>Por que aprender HTML?</h4>
                <ul>
                    <li>É a base de toda a web</li>
                    <li>Fácil de aprender e entender</li>
                    <li>Essencial para desenvolvimento web</li>
                    <li>Permite criar conteúdo estruturado</li>
                </ul>
                
                <h4>Como funciona?</h4>
                <p>HTML usa "tags" (etiquetas) para marcar diferentes partes do conteúdo. Cada tag tem um propósito específico.</p>
                
                <div class="example-box">
                    <h5>Exemplo básico:</h5>
                    <pre><code>&lt;h1&gt;Meu primeiro título&lt;/h1&gt;
&lt;p&gt;Este é um parágrafo.&lt;/p&gt;</code></pre>
                </div>
                
                <p>Neste exemplo, <code>&lt;h1&gt;</code> cria um título principal e <code>&lt;p&gt;</code> cria um parágrafo.</p>
            `,
            code: `<!-- Digite seu primeiro código HTML aqui -->
<h1>Olá, Mundo!</h1>
<p>Esta é minha primeira página HTML.</p>`,
            expectedOutput: "Olá, Mundo! Esta é minha primeira página HTML.",
            reward: { xp: 50, accessory: "hat-basic" }
        },
        {
            id: 2,
            title: "Estrutura Básica do HTML",
            duration: "8 min",
            content: `
                <h3>Estrutura de um documento HTML</h3>
                <p>Toda página HTML tem uma estrutura básica que inclui elementos essenciais.</p>
                
                <h4>Elementos obrigatórios:</h4>
                <ul>
                    <li><code>&lt;!DOCTYPE html&gt;</code> - Declara o tipo de documento</li>
                    <li><code>&lt;html&gt;</code> - Elemento raiz da página</li>
                    <li><code>&lt;head&gt;</code> - Contém metadados da página</li>
                    <li><code>&lt;body&gt;</code> - Contém o conteúdo visível</li>
                </ul>
                
                <div class="example-box">
                    <h5>Estrutura completa:</h5>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Minha Página&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Título Principal&lt;/h1&gt;
    &lt;p&gt;Conteúdo da página.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                </div>
                
                <h4>Explicação:</h4>
                <ul>
                    <li><strong>&lt;head&gt;</strong>: Contém informações sobre a página (título, meta tags, etc.)</li>
                    <li><strong>&lt;body&gt;</strong>: Contém todo o conteúdo que aparece na página</li>
                    <li><strong>&lt;title&gt;</strong>: Define o título que aparece na aba do navegador</li>
                </ul>
            `,
            code: `<!DOCTYPE html>
<html>
<head>
    <title>Minha Primeira Página</title>
</head>
<body>
    <h1>Bem-vindo ao meu site!</h1>
    <p>Esta é minha primeira página HTML completa.</p>
</body>
</html>`,
            expectedOutput: "Bem-vindo ao meu site! Esta é minha primeira página HTML completa.",
            reward: { xp: 50, accessory: "glasses-basic" }
        },
        {
            id: 3,
            title: "Tags de Cabeçalho",
            duration: "6 min",
            content: `
                <h3>Tags de Cabeçalho (Headings)</h3>
                <p>As tags de cabeçalho são usadas para criar títulos e subtítulos em sua página. Existem 6 níveis de cabeçalho.</p>
                
                <h4>Hierarquia dos cabeçalhos:</h4>
                <ul>
                    <li><code>&lt;h1&gt;</code> - Título principal (mais importante)</li>
                    <li><code>&lt;h2&gt;</code> - Subtítulo</li>
                    <li><code>&lt;h3&gt;</code> - Subtítulo menor</li>
                    <li><code>&lt;h4&gt;</code> - Subtítulo ainda menor</li>
                    <li><code>&lt;h5&gt;</code> - Subtítulo pequeno</li>
                    <li><code>&lt;h6&gt;</code> - Menor subtítulo</li>
                </ul>
                
                <div class="example-box">
                    <h5>Exemplo de uso:</h5>
                    <pre><code>&lt;h1&gt;Título Principal&lt;/h1&gt;
&lt;h2&gt;Seção 1&lt;/h2&gt;
&lt;h3&gt;Subseção 1.1&lt;/h3&gt;
&lt;p&gt;Conteúdo da subseção.&lt;/p&gt;
&lt;h2&gt;Seção 2&lt;/h2&gt;
&lt;p&gt;Conteúdo da seção 2.&lt;/p&gt;</code></pre>
                </div>
                
                <h4>Dicas importantes:</h4>
                <ul>
                    <li>Use apenas um <code>&lt;h1&gt;</code> por página</li>
                    <li>Mantenha uma hierarquia lógica</li>
                    <li>Não pule níveis (ex: h1 → h3)</li>
                    <li>Use para estrutura, não para estilo</li>
                </ul>
            `,
            code: `<h1>Meu Blog Pessoal</h1>
<h2>Sobre Mim</h2>
<p>Olá! Sou um desenvolvedor web.</p>
<h2>Meus Projetos</h2>
<h3>Projeto 1</h3>
<p>Descrição do projeto 1.</p>
<h3>Projeto 2</h3>
<p>Descrição do projeto 2.</p>`,
            expectedOutput: "Meu Blog Pessoal Sobre Mim Olá! Sou um desenvolvedor web. Meus Projetos Projeto 1 Descrição do projeto 1. Projeto 2 Descrição do projeto 2.",
            reward: { xp: 50, accessory: "scarf-basic" }
        }
    ],
    javascript: [
        {
            id: 1,
            title: "Introdução ao JavaScript",
            duration: "7 min",
            content: `
                <h3>O que é JavaScript?</h3>
                <p>JavaScript é uma linguagem de programação que torna as páginas web interativas. É a linguagem da web moderna.</p>
                
                <h4>O que JavaScript pode fazer?</h4>
                <ul>
                    <li>Criar animações e efeitos visuais</li>
                    <li>Validar formulários</li>
                    <li>Manipular conteúdo da página</li>
                    <li>Criar aplicações web complexas</li>
                    <li>Processar dados do usuário</li>
                </ul>
                
                <h4>Primeiro código JavaScript:</h4>
                <div class="example-box">
                    <h5>Exemplo básico:</h5>
                    <pre><code>console.log("Olá, Mundo!");
alert("Bem-vindo ao JavaScript!");</code></pre>
                </div>
                
                <p><code>console.log()</code> exibe mensagens no console do navegador, enquanto <code>alert()</code> mostra uma caixa de diálogo.</p>
            `,
            code: `// Digite seu primeiro código JavaScript aqui
console.log("Olá, JavaScript!");
alert("Estou aprendendo JavaScript!");`,
            expectedOutput: "Olá, JavaScript! Estou aprendendo JavaScript!",
            reward: { xp: 50, accessory: "hat-js" }
        }
    ]
};

// ===== SISTEMA DE ACESSÓRIOS =====
const accessoriesDatabase = {
    "hat-basic": {
        name: "Chapéu Básico",
        icon: "fas fa-hat-cowboy",
        color: "#8b5cf6",
        description: "Um chapéu simples para iniciantes"
    },
    "glasses-basic": {
        name: "Óculos Básicos",
        icon: "fas fa-glasses",
        color: "#3b82f6",
        description: "Óculos para ver melhor o código"
    },
    "scarf-basic": {
        name: "Cachecol Básico",
        icon: "fas fa-scarf",
        color: "#ef4444",
        description: "Cachecol para se manter aquecido"
    },
    "hat-js": {
        name: "Chapéu JavaScript",
        icon: "fas fa-hat-wizard",
        color: "#fbbf24",
        description: "Chapéu mágico para programadores JavaScript"
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeCourse();
    loadUserData();
    setupEventListeners();
    hideLoadingScreen();
});

function initializeCourse() {
    // Obter curso da URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    
    if (courseParam && lessonDatabase[courseParam]) {
        currentCourse = courseParam;
        lessons = lessonDatabase[courseParam];
        loadCourse();
    } else {
        // Redirecionar para página principal se não houver curso válido
        window.location.href = 'index.html';
    }
}

function loadCourse() {
    // Atualizar título do curso
    const courseTitles = {
        html: "HTML & CSS Básico",
        javascript: "JavaScript Fundamentos"
    };
    
    document.getElementById('courseTitle').textContent = courseTitles[currentCourse];
    
    // Carregar lições
    loadLessons();
    
    // Carregar primeira lição
    loadLesson(0);
    
    // Atualizar progresso
    updateCourseProgress();
}

function loadLessons() {
    const lessonList = document.getElementById('lessonList');
    lessonList.innerHTML = '';
    
    lessons.forEach((lesson, index) => {
        const lessonItem = document.createElement('div');
        lessonItem.className = 'lesson-item';
        lessonItem.onclick = () => loadLesson(index);
        
        const isCompleted = currentUser && currentUser.courses[currentCourse] && 
                          currentUser.courses[currentCourse].completedLessons.includes(lesson.id);
        
        if (isCompleted) {
            lessonItem.classList.add('completed');
        }
        
        if (index === currentLesson) {
            lessonItem.classList.add('active');
        }
        
        lessonItem.innerHTML = `
            <div class="lesson-icon">
                <i class="fas ${isCompleted ? 'fa-check' : 'fa-play'}"></i>
            </div>
            <div class="lesson-info">
                <div class="lesson-title">${lesson.title}</div>
                <div class="lesson-duration">${lesson.duration}</div>
            </div>
        `;
        
        lessonList.appendChild(lessonItem);
    });
    
    // Atualizar contador de lições
    document.getElementById('lessonProgress').textContent = `${currentLesson + 1} de ${lessons.length}`;
}

function loadLesson(lessonIndex) {
    if (lessonIndex < 0 || lessonIndex >= lessons.length) return;
    
    currentLesson = lessonIndex;
    const lesson = lessons[lessonIndex];
    
    // Atualizar interface
    document.getElementById('lessonTitle').textContent = lesson.title;
    document.getElementById('lessonNumber').textContent = `Lição ${lesson.id}`;
    document.getElementById('lessonDuration').textContent = lesson.duration;
    document.getElementById('lessonBody').innerHTML = lesson.content;
    document.getElementById('codeEditor').value = lesson.code;
    
    // Atualizar navegação
    document.getElementById('prevBtn').disabled = lessonIndex === 0;
    document.getElementById('nextBtn').textContent = lessonIndex === lessons.length - 1 ? 'Finalizar' : 'Próximo';
    
    // Atualizar lista de lições
    loadLessons();
    
    // Limpar output
    clearOutput();
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function goBack() {
    if (confirm('Tem certeza que deseja sair? Seu progresso será salvo.')) {
        saveUserData();
        window.location.href = 'index.html';
    }
}

function previousLesson() {
    if (currentLesson > 0) {
        loadLesson(currentLesson - 1);
    }
}

function nextLesson() {
    // Verificar se a lição atual foi completada
    if (!isLessonCompleted(currentLesson)) {
        alert('Complete a lição atual antes de continuar!');
        return;
    }
    
    if (currentLesson < lessons.length - 1) {
        loadLesson(currentLesson + 1);
    } else {
        // Curso finalizado
        showCourseCompletion();
    }
}

function isLessonCompleted(lessonIndex) {
    const lesson = lessons[lessonIndex];
    const userCode = document.getElementById('codeEditor').value;
    
    // Verificação simples - pode ser expandida
    return userCode.trim().length > 0;
}

// ===== EDITOR DE CÓDIGO =====
function runCode() {
    const code = document.getElementById('codeEditor').value;
    const output = document.getElementById('outputContent');
    
    if (!code.trim()) {
        output.innerHTML = '<p class="output-placeholder">Digite algum código primeiro!</p>';
        return;
    }
    
    try {
        // Simular execução do código
        let result = '';
        
        if (currentCourse === 'html') {
            // Para HTML, mostrar o resultado renderizado
            result = code.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
        } else if (currentCourse === 'javascript') {
            // Para JavaScript, simular console.log e alert
            const consoleLogs = [];
            const alerts = [];
            
            // Extrair console.log
            const consoleMatches = code.match(/console\.log\([^)]*\)/g);
            if (consoleMatches) {
                consoleMatches.forEach(match => {
                    const content = match.match(/console\.log\(['"`]([^'"`]*)['"`]\)/);
                    if (content) {
                        consoleLogs.push(content[1]);
                    }
                });
            }
            
            // Extrair alert
            const alertMatches = code.match(/alert\([^)]*\)/g);
            if (alertMatches) {
                alertMatches.forEach(match => {
                    const content = match.match(/alert\(['"`]([^'"`]*)['"`]\)/);
                    if (content) {
                        alerts.push(content[1]);
                    }
                });
            }
            
            result = [...consoleLogs, ...alerts].join(' ');
        }
        
        output.innerHTML = `
            <div class="output-success">
                <h4>✅ Código executado com sucesso!</h4>
                <p><strong>Resultado:</strong> ${result}</p>
            </div>
        `;
        
        // Marcar lição como completada
        completeLesson();
        
    } catch (error) {
        output.innerHTML = `
            <div class="output-error">
                <h4>❌ Erro no código</h4>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function resetCode() {
    const lesson = lessons[currentLesson];
    document.getElementById('codeEditor').value = lesson.code;
    clearOutput();
}

function clearOutput() {
    document.getElementById('outputContent').innerHTML = '<p class="output-placeholder">O resultado do seu código aparecerá aqui...</p>';
}

// ===== SISTEMA DE PROGRESSO =====
function completeLesson() {
    if (!currentUser) return;
    
    const lesson = lessons[currentLesson];
    
    // Verificar se já foi completada
    if (currentUser.courses[currentCourse].completedLessons.includes(lesson.id)) {
        return;
    }
    
    // Adicionar à lista de lições completadas
    currentUser.courses[currentCourse].completedLessons.push(lesson.id);
    
    // Adicionar XP
    currentUser.courses[currentCourse].xp += lesson.reward.xp;
    
    // Verificar level up
    checkLevelUp();
    
    // Verificar se desbloqueou acessório
    if (lesson.reward.accessory) {
        unlockAccessory(lesson.reward.accessory);
    }
    
    // Salvar dados
    saveUserData();
    
    // Mostrar animação de evolução
    showEvolutionAnimation(lesson);
}

function checkLevelUp() {
    const courseData = currentUser.courses[currentCourse];
    const newLevel = Math.floor(courseData.xp / COURSE_CONFIG.XP_PER_LEVEL) + 1;
    
    if (newLevel > courseData.level) {
        courseData.level = newLevel;
        showLevelUpAnimation(newLevel);
    }
}

function unlockAccessory(accessoryId) {
    if (!currentUser.accessories.includes(accessoryId)) {
        currentUser.accessories.push(accessoryId);
        showAccessoryUnlock(accessoryId);
    }
}

// ===== ANIMAÇÕES E MODAIS =====
function showEvolutionAnimation(lesson) {
    const modal = document.getElementById('evolutionModal');
    const accessory = accessoriesDatabase[lesson.reward.accessory];
    
    // Configurar personagem antes
    document.getElementById('characterBefore').innerHTML = `
        <div class="avatar-base">
            <i class="fas fa-user-circle"></i>
        </div>
    `;
    
    // Configurar personagem depois
    document.getElementById('characterAfter').innerHTML = `
        <div class="avatar-base">
            <i class="fas fa-user-circle"></i>
        </div>
        <div class="avatar-accessories">
            <i class="${accessory.icon}" style="color: ${accessory.color}; position: absolute; top: 0; left: 50%; transform: translateX(-50%);"></i>
        </div>
    `;
    
    // Configurar novo acessório
    document.getElementById('newAccessory').innerHTML = `
        <i class="${accessory.icon}" style="color: ${accessory.color}; font-size: 2rem;"></i>
    `;
    document.getElementById('accessoryDescription').textContent = accessory.description;
    
    modal.classList.add('active');
}

function showAccessoryUnlock(accessoryId) {
    const accessory = accessoriesDatabase[accessoryId];
    
    document.getElementById('achievementTitle').textContent = `Novo Acessório: ${accessory.name}`;
    document.getElementById('achievementDescription').textContent = accessory.description;
    document.getElementById('achievementIcon').innerHTML = `<i class="${accessory.icon}" style="color: ${accessory.color};"></i>`;
    
    document.getElementById('achievementModal').classList.add('active');
}

function showLevelUpAnimation(newLevel) {
    document.getElementById('oldLevel').textContent = newLevel - 1;
    document.getElementById('newLevel').textContent = newLevel;
    
    // Gerar recompensas
    const rewards = generateLevelRewards(newLevel);
    const rewardsList = document.getElementById('rewardsList');
    rewardsList.innerHTML = rewards.map(reward => `
        <div class="reward-item">
            <i class="${reward.icon}" style="color: ${reward.color};"></i>
            <span>${reward.name}</span>
        </div>
    `).join('');
    
    document.getElementById('levelUpModal').classList.add('active');
}

function generateLevelRewards(level) {
    const rewards = [];
    
    // A cada 5 níveis, dar acessórios especiais
    if (level % 5 === 0) {
        rewards.push({
            name: `Acessório Nível ${level}`,
            icon: 'fas fa-star',
            color: '#fbbf24'
        });
    }
    
    // Sempre dar XP extra
    rewards.push({
        name: '+100 XP Bônus',
        icon: 'fas fa-gem',
        color: '#10b981'
    });
    
    return rewards;
}

function showCourseCompletion() {
    alert('Parabéns! Você completou o curso! 🎉');
    // Aqui você pode adicionar uma animação especial de conclusão
}

// ===== FUNÇÕES DE FECHAMENTO DE MODAIS =====
function closeEvolutionModal() {
    document.getElementById('evolutionModal').classList.remove('active');
}

function closeAchievementModal() {
    document.getElementById('achievementModal').classList.remove('active');
}

function closeLevelUpModal() {
    document.getElementById('levelUpModal').classList.remove('active');
}

// ===== SISTEMA DE DADOS =====
function loadUserData() {
    const savedUser = localStorage.getItem('skillQuestUser');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        
        // Inicializar curso se não existir
        if (!currentUser.courses) {
            currentUser.courses = {};
        }
        
        if (!currentUser.courses[currentCourse]) {
            currentUser.courses[currentCourse] = {
                level: 1,
                xp: 0,
                completedLessons: []
            };
        }
        
        if (!currentUser.accessories) {
            currentUser.accessories = [];
        }
        
        updateUserInterface();
    } else {
        // Usuário não logado, redirecionar
        window.location.href = 'index.html';
    }
}

function saveUserData() {
    if (currentUser) {
        localStorage.setItem('skillQuestUser', JSON.stringify(currentUser));
    }
}

function updateUserInterface() {
    if (!currentUser) return;
    
    const courseData = currentUser.courses[currentCourse];
    
    // Atualizar informações do usuário
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userLevel').textContent = courseData.level;
    
    // Atualizar avatar com acessórios
    updateUserAvatar();
    
    // Atualizar progresso do curso
    updateCourseProgress();
}

function updateUserAvatar() {
    const avatarContainer = document.getElementById('userAccessories');
    avatarContainer.innerHTML = '';
    
    currentUser.accessories.forEach(accessoryId => {
        const accessory = accessoriesDatabase[accessoryId];
        if (accessory) {
            const accessoryElement = document.createElement('i');
            accessoryElement.className = accessory.icon;
            accessoryElement.style.cssText = `
                position: absolute;
                color: ${accessory.color};
                font-size: 1rem;
            `;
            avatarContainer.appendChild(accessoryElement);
        }
    });
}

function updateCourseProgress() {
    if (!currentUser) return;
    
    const courseData = currentUser.courses[currentCourse];
    const progress = (courseData.completedLessons.length / lessons.length) * 100;
    
    document.getElementById('courseProgress').style.width = progress + '%';
    document.getElementById('courseProgressText').textContent = Math.round(progress) + '% Completo';
}

// ===== CONFIGURAÇÃO DE EVENTOS =====
function setupEventListeners() {
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Executar código com Ctrl+Enter
    document.getElementById('codeEditor').addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            runCode();
        }
    });
}

// ===== FUNÇÕES AUXILIARES =====
function hideLoadingScreen() {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.classList.add('hide');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }, 1000);
}

// ===== ESTILOS CSS DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
    .example-box {
        background: #f8fafc;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 1.5rem;
        margin: 1rem 0;
    }
    
    .example-box h5 {
        color: #374151;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    
    .output-success {
        background: #f0fdf4;
        border: 1px solid #bbf7d0;
        border-radius: 8px;
        padding: 1rem;
        color: #166534;
    }
    
    .output-error {
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 8px;
        padding: 1rem;
        color: #dc2626;
    }
    
    .output-success h4, .output-error h4 {
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
`;
document.head.appendChild(style); 