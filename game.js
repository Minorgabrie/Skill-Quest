// ===== CONFIGURAÇÕES GLOBAIS =====
const GAME_CONFIG = {
    TILE_SIZE: 32,
    WORLD_WIDTH: 50,
    WORLD_HEIGHT: 50,
    PLAYER_SPEED: 2,
    XP_PER_LEVEL: 100
};

// ===== CONTROLES DE TECLADO =====
const KEYBOARD_CONTROLS = {
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    W: 'w',
    A: 'a',
    S: 's',
    D: 'd',
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    SPACE: ' ',
    I: 'i',
    M: 'm',
    Q: 'q'
};

// ===== DADOS DO JOGO =====
let gameState = {
    currentCourse: null,
    playerPosition: { x: 25, y: 25 },
    playerLevel: 1,
    playerXP: 0,
    currentQuest: null,
    inventory: [],
    achievements: [],
    isPlaying: false,
    isPaused: false
};

let currentUser = null;
let gameWorld = null;
let playerCharacter = null;
let worldMap = null;

// ===== BANCO DE DADOS SIMULADO =====
let userDatabase = {
    users: [
        {
            id: 1,
            name: "Aventureiro",
            email: "teste@teste.com",
            password: "123456",
            htmlProgress: { level: 1, xp: 0, completedQuests: [], badges: [] },
            typingProgress: { level: 1, wpm: 0, completedQuests: [], badges: [] }
        }
    ],
    currentId: 2
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();
    loadUserData();
    setupEventListeners();
    hideLoadingScreen();
    
    // Verificar se há um curso específico na URL
    const urlParams = new URLSearchParams(window.location.search);
    const courseParam = urlParams.get('course');
    
    if (courseParam && (courseParam === 'html' || courseParam === 'typing')) {
        // Aguardar um pouco para a tela carregar
        setTimeout(() => {
            selectCourse(courseParam);
        }, 1500);
    }
});

function initializeGame() {
    // Carregar dados salvos
    loadGameData();
    
    // Configurar interface
    updatePlayerInfo();
    updateCourseProgress();
    
    // Mostrar tela de seleção de curso
    showCourseSelection();
}

// ===== FUNÇÕES DE NAVEGAÇÃO =====
function goBack() {
    if (confirm('Tem certeza que deseja sair do jogo? Seu progresso será salvo.')) {
        saveGameData();
        window.location.href = 'index.html';
    }
}

function showCourseSelection() {
    document.getElementById('courseSelection').style.display = 'block';
    document.getElementById('gameWorld').style.display = 'none';
    document.getElementById('questInterface').style.display = 'none';
    gameState.isPlaying = false;
}

function selectCourse(courseType) {
    gameState.currentCourse = courseType;
    gameState.isPlaying = true;
    
    // Esconder seleção de curso
    document.getElementById('courseSelection').style.display = 'none';
    
    // Mostrar mundo do jogo
    document.getElementById('gameWorld').style.display = 'block';
    
    // Inicializar mundo
    initializeGameWorld(courseType);
    
    // Carregar primeira missão
    loadNextQuest();
    
    // Atualizar interface
    updatePlayerInfo();
}

// ===== SISTEMA DE MUNDO =====
function initializeGameWorld(courseType) {
    const worldContainer = document.getElementById('worldMap');
    worldContainer.innerHTML = '';
    
    // Criar mapa baseado no curso
    if (courseType === 'html') {
        createHTMLWorld(worldContainer);
    } else if (courseType === 'typing') {
        createTypingWorld(worldContainer);
    }
    
    // Posicionar jogador
    placePlayer();
    
    // Configurar controles
    setupGameControls();
}

function createHTMLWorld(container) {
    const worldSize = GAME_CONFIG.WORLD_WIDTH * GAME_CONFIG.TILE_SIZE;
    container.style.width = worldSize + 'px';
    container.style.height = worldSize + 'px';
    
    // Criar áreas do mundo HTML
    const areas = [
        { id: 'tutorial', name: 'Tutorial HTML', x: 5, y: 5, width: 10, height: 10, color: '#10b981' },
        { id: 'basics', name: 'Tags Básicas', x: 20, y: 5, width: 15, height: 15, color: '#3b82f6' },
        { id: 'structure', name: 'Estrutura HTML', x: 5, y: 20, width: 15, height: 15, color: '#8b5cf6' },
        { id: 'advanced', name: 'HTML Avançado', x: 25, y: 25, width: 20, height: 20, color: '#f59e0b' }
    ];
    
    areas.forEach(area => {
        addMapArea(container, area.id, area.x, area.y, area.width, area.height, area.color, area.name);
    });
}

function createTypingWorld(container) {
    const worldSize = GAME_CONFIG.WORLD_WIDTH * GAME_CONFIG.TILE_SIZE;
    container.style.width = worldSize + 'px';
    container.style.height = worldSize + 'px';
    
    // Criar áreas do mundo de digitação
    const areas = [
        { id: 'speed-basics', name: 'Velocidade Básica', x: 5, y: 5, width: 12, height: 12, color: '#10b981' },
        { id: 'accuracy', name: 'Precisão', x: 20, y: 5, width: 15, height: 15, color: '#ef4444' },
        { id: 'endurance', name: 'Resistência', x: 5, y: 25, width: 15, height: 15, color: '#8b5cf6' },
        { id: 'master', name: 'Mestre da Digitação', x: 25, y: 25, width: 20, height: 20, color: '#fbbf24' }
    ];
    
    areas.forEach(area => {
        addMapArea(container, area.id, area.x, area.y, area.width, area.height, area.color, area.name);
    });
}

function addMapArea(container, id, x, y, width, height, color, name) {
    const area = document.createElement('div');
    area.className = 'map-area';
    area.id = id;
    area.style.position = 'absolute';
    area.style.left = (x * GAME_CONFIG.TILE_SIZE) + 'px';
    area.style.top = (y * GAME_CONFIG.TILE_SIZE) + 'px';
    area.style.width = (width * GAME_CONFIG.TILE_SIZE) + 'px';
    area.style.height = (height * GAME_CONFIG.TILE_SIZE) + 'px';
    area.style.backgroundColor = color;
    area.style.border = '2px solid rgba(255, 255, 255, 0.3)';
    area.style.borderRadius = '8px';
    area.style.cursor = 'pointer';
    area.style.transition = 'all 0.3s ease';
    area.title = name;
    
    // Adicionar nome da área
    const areaName = document.createElement('div');
    areaName.style.position = 'absolute';
    areaName.style.bottom = '5px';
    areaName.style.left = '5px';
    areaName.style.right = '5px';
    areaName.style.background = 'rgba(0, 0, 0, 0.7)';
    areaName.style.color = 'white';
    areaName.style.padding = '4px 8px';
    areaName.style.borderRadius = '4px';
    areaName.style.fontSize = '12px';
    areaName.style.textAlign = 'center';
    areaName.textContent = name;
    area.appendChild(areaName);
    
    // Evento de clique
    area.addEventListener('click', () => enterMapArea(id, name));
    
    // Efeito hover
    area.addEventListener('mouseenter', () => {
        area.style.transform = 'scale(1.05)';
        area.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
    });
    
    area.addEventListener('mouseleave', () => {
        area.style.transform = 'scale(1)';
        area.style.boxShadow = 'none';
    });
    
    container.appendChild(area);
}

function placePlayer() {
    const player = document.getElementById('playerCharacter');
    if (player) {
        player.style.left = (gameState.playerPosition.x * GAME_CONFIG.TILE_SIZE) + 'px';
        player.style.top = (gameState.playerPosition.y * GAME_CONFIG.TILE_SIZE) + 'px';
    }
}

// ===== SISTEMA DE CONTROLES =====
function setupGameControls() {
    document.addEventListener('keydown', handleGameControls);
}

function handleGameControls(e) {
    if (!gameState.isPlaying || gameState.isPaused) return;
    
    const key = e.key.toLowerCase();
    let moved = false;
    
    switch (key) {
        case KEYBOARD_CONTROLS.W:
        case KEYBOARD_CONTROLS.ARROW_UP:
            if (gameState.playerPosition.y > 0) {
                gameState.playerPosition.y--;
                moved = true;
            }
            break;
        case KEYBOARD_CONTROLS.S:
        case KEYBOARD_CONTROLS.ARROW_DOWN:
            if (gameState.playerPosition.y < GAME_CONFIG.WORLD_HEIGHT - 1) {
                gameState.playerPosition.y++;
                moved = true;
            }
            break;
        case KEYBOARD_CONTROLS.A:
        case KEYBOARD_CONTROLS.ARROW_LEFT:
            if (gameState.playerPosition.x > 0) {
                gameState.playerPosition.x--;
                moved = true;
            }
            break;
        case KEYBOARD_CONTROLS.D:
        case KEYBOARD_CONTROLS.ARROW_RIGHT:
            if (gameState.playerPosition.x < GAME_CONFIG.WORLD_WIDTH - 1) {
                gameState.playerPosition.x++;
                moved = true;
            }
            break;
        case KEYBOARD_CONTROLS.ENTER:
        case KEYBOARD_CONTROLS.SPACE:
            interactWithCurrentTile();
            break;
        case KEYBOARD_CONTROLS.I:
            toggleInventory();
            break;
        case KEYBOARD_CONTROLS.M:
            toggleMap();
            break;
        case KEYBOARD_CONTROLS.Q:
            toggleQuestLog();
            break;
        case KEYBOARD_CONTROLS.ESCAPE:
            pauseGame();
            break;
    }
    
    if (moved) {
        placePlayer();
        checkAreaEntry(gameState.playerPosition.x, gameState.playerPosition.y);
    }
}

// ===== SISTEMA DE MISSÕES =====
function loadNextQuest() {
    if (!gameState.currentCourse) return;
    
    const progress = gameState.currentCourse === 'html' ? 
        currentUser.htmlProgress : currentUser.typingProgress;
    
    const availableQuests = getAvailableQuests(gameState.currentCourse);
    const nextQuest = availableQuests.find(quest => 
        !progress.completedQuests.includes(quest.id)
    );
    
    if (nextQuest) {
        gameState.currentQuest = nextQuest.id;
        updateQuestDisplay(nextQuest);
    } else {
        gameState.currentQuest = null;
        updateQuestDisplay(null);
    }
}

function getAvailableQuests(courseType) {
    const questDatabase = {
        'html': [
            {
                id: 'html-001',
                title: 'Primeiros Passos no HTML',
                description: 'Aprenda sobre a estrutura básica do HTML e crie sua primeira página.',
                type: 'tutorial',
                content: `
                    <h3>Bem-vindo ao HTML!</h3>
                    <p>HTML (HyperText Markup Language) é a linguagem fundamental para criar páginas web.</p>
                    
                    <h4>Estrutura Básica:</h4>
                    <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;Minha Página&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Olá, Mundo!&lt;/h1&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                    
                    <h4>Elementos Importantes:</h4>
                    <ul>
                        <li><strong>&lt;!DOCTYPE html&gt;</strong> - Declara o tipo de documento</li>
                        <li><strong>&lt;html&gt;</strong> - Elemento raiz da página</li>
                        <li><strong>&lt;head&gt;</strong> - Contém metadados da página</li>
                        <li><strong>&lt;body&gt;</strong> - Contém o conteúdo visível</li>
                    </ul>
                `,
                reward: { xp: 50, badge: 'Iniciante HTML' }
            },
            {
                id: 'html-002',
                title: 'Tags de Cabeçalho',
                description: 'Aprenda a usar as tags de cabeçalho para estruturar seu conteúdo.',
                type: 'challenge',
                content: `
                    <h3>Tags de Cabeçalho</h3>
                    <p>As tags de cabeçalho são usadas para criar títulos e subtítulos em sua página.</p>
                    
                    <h4>Desafio:</h4>
                    <p>Crie uma página HTML com a seguinte estrutura:</p>
                    <ul>
                        <li>Um título principal (h1) com "Minha Primeira Página"</li>
                        <li>Um subtítulo (h2) com "Sobre Mim"</li>
                        <li>Um subtítulo menor (h3) com "Hobbies"</li>
                    </ul>
                    
                    <textarea id="challengeCode" placeholder="Digite seu código HTML aqui..." rows="10" style="width: 100%; font-family: monospace; padding: 1rem; border: 2px solid #e5e7eb; border-radius: 8px;"></textarea>
                `,
                reward: { xp: 75, badge: 'Mestre dos Títulos' }
            }
        ],
        'typing': [
            {
                id: 'typing-001',
                title: 'Velocidade Básica',
                description: 'Aprenda a digitar com velocidade e precisão.',
                type: 'speed-test',
                content: `
                    <h3>Teste de Velocidade de Digitação</h3>
                    <p>Digite o texto abaixo o mais rápido possível, mantendo a precisão.</p>
                    
                    <div class="typing-instructions">
                        <p><strong>Instruções:</strong></p>
                        <ul>
                            <li>Clique em "Iniciar Teste" para começar</li>
                            <li>Digite o texto exatamente como aparece</li>
                            <li>O teste dura 60 segundos</li>
                            <li>Mantenha a precisão acima de 90%</li>
                        </ul>
                    </div>
                `,
                text: "A programação é uma arte que combina lógica e criatividade. Cada linha de código é uma oportunidade de criar algo novo e útil. Desenvolvedores usam diferentes linguagens para resolver problemas e construir aplicações que melhoram nossas vidas diárias.",
                reward: { xp: 50, badge: 'Velocista Iniciante' }
            }
        ]
    };
    
    return questDatabase[courseType] || [];
}

function updateQuestDisplay(quest) {
    const questTitle = document.getElementById('questTitle');
    const questContent = document.getElementById('questContent');
    
    if (quest) {
        questTitle.textContent = quest.title;
        questContent.innerHTML = quest.content;
        
        // Adicionar botão de iniciar missão
        const startButton = document.createElement('button');
        startButton.className = 'btn btn-primary';
        startButton.textContent = 'Iniciar Missão';
        startButton.onclick = () => startQuest(quest.id);
        questContent.appendChild(startButton);
        
        document.getElementById('questInterface').style.display = 'block';
    } else {
        questTitle.textContent = 'Todas as Missões Concluídas!';
        questContent.innerHTML = '<p>Parabéns! Você completou todas as missões disponíveis.</p>';
        document.getElementById('questInterface').style.display = 'block';
    }
}

function startQuest(questId) {
    const quest = getQuestData(questId);
    if (!quest) return;
    
    document.getElementById('questInterface').style.display = 'none';
    
    switch (quest.type) {
        case 'tutorial':
            showTutorialModal(quest);
            break;
        case 'challenge':
            showChallengeModal(quest);
            break;
        case 'speed-test':
            showSpeedTestModal(quest);
            break;
    }
}

function getQuestData(questId) {
    const allQuests = getAvailableQuests(gameState.currentCourse);
    return allQuests.find(quest => quest.id === questId);
}

// ===== MODAIS DE MISSÕES =====
function showTutorialModal(quest) {
    const modal = document.getElementById('tutorialModal');
    const title = document.getElementById('tutorialTitle');
    const content = document.getElementById('tutorialContent');
    
    title.textContent = quest.title;
    content.innerHTML = quest.content;
    
    modal.classList.add('active');
}

function showChallengeModal(quest) {
    const modal = document.getElementById('challengeModal');
    const title = document.getElementById('challengeTitle');
    const content = document.getElementById('challengeContent');
    
    title.textContent = quest.title;
    content.innerHTML = quest.content;
    
    modal.classList.add('active');
}

function showSpeedTestModal(quest) {
    const modal = document.getElementById('speedTestModal');
    const textDisplay = document.getElementById('textDisplay');
    const startBtn = document.getElementById('startTestBtn');
    
    textDisplay.textContent = quest.text;
    startBtn.onclick = () => startSpeedTest(quest);
    
    modal.classList.add('active');
}

// ===== FUNÇÕES DE FECHAMENTO DE MODAIS =====
function closeTutorial() {
    document.getElementById('tutorialModal').classList.remove('active');
    completeQuest(gameState.currentQuest);
}

function closeChallenge() {
    document.getElementById('challengeModal').classList.remove('active');
}

function closeSpeedTest() {
    document.getElementById('speedTestModal').classList.remove('active');
    resetSpeedTest();
}

function startTutorial() {
    closeTutorial();
}

function submitChallenge() {
    const code = document.getElementById('challengeCode').value;
    if (validateHTMLCode(code)) {
        closeChallenge();
        completeQuest(gameState.currentQuest);
    } else {
        alert('Código incorreto! Tente novamente.');
    }
}

// ===== SISTEMA DE TESTE DE VELOCIDADE =====
let speedTestData = {
    isActive: false,
    startTime: 0,
    endTime: 0,
    targetText: '',
    userInput: '',
    timer: null,
    timeLeft: 60
};

function startSpeedTest(quest) {
    speedTestData.isActive = true;
    speedTestData.startTime = Date.now();
    speedTestData.targetText = quest.text;
    speedTestData.timeLeft = 60;
    
    const input = document.getElementById('typingInput');
    const startBtn = document.getElementById('startTestBtn');
    
    input.disabled = false;
    input.focus();
    startBtn.textContent = 'Teste em Andamento...';
    startBtn.disabled = true;
    
    // Iniciar timer
    speedTestData.timer = setInterval(() => {
        speedTestData.timeLeft--;
        document.getElementById('testTimer').textContent = speedTestData.timeLeft + 's';
        
        if (speedTestData.timeLeft <= 0) {
            finishSpeedTest();
        }
    }, 1000);
    
    // Monitorar input
    input.addEventListener('input', updateSpeedTestStats);
}

function updateSpeedTestStats() {
    const input = document.getElementById('typingInput');
    speedTestData.userInput = input.value;
    
    const wpm = calculateWPM(speedTestData.userInput, speedTestData.startTime);
    const accuracy = calculateAccuracy(speedTestData.userInput, speedTestData.targetText);
    
    document.getElementById('currentWPM').textContent = Math.round(wpm);
    document.getElementById('currentAccuracy').textContent = Math.round(accuracy) + '%';
}

function calculateWPM(input, startTime) {
    const words = input.trim().split(/\s+/).length;
    const timeElapsed = (Date.now() - startTime) / 1000 / 60; // em minutos
    return timeElapsed > 0 ? words / timeElapsed : 0;
}

function calculateAccuracy(input, target) {
    if (target.length === 0) return 100;
    
    let correct = 0;
    const minLength = Math.min(input.length, target.length);
    
    for (let i = 0; i < minLength; i++) {
        if (input[i] === target[i]) correct++;
    }
    
    return (correct / target.length) * 100;
}

function finishSpeedTest() {
    clearInterval(speedTestData.timer);
    
    const wpm = calculateWPM(speedTestData.userInput, speedTestData.startTime);
    const accuracy = calculateAccuracy(speedTestData.userInput, speedTestData.targetText);
    
    // Verificar se passou no teste
    if (wpm >= 30 && accuracy >= 90) {
        closeSpeedTest();
        completeQuest(gameState.currentQuest);
        showAchievement('Velocista Iniciante');
    } else {
        alert(`Teste falhou! WPM: ${Math.round(wpm)}, Precisão: ${Math.round(accuracy)}%\nRequisitos: WPM ≥ 30, Precisão ≥ 90%`);
        resetSpeedTest();
    }
}

function resetSpeedTest() {
    speedTestData.isActive = false;
    speedTestData.startTime = 0;
    speedTestData.userInput = '';
    speedTestData.timeLeft = 60;
    
    const input = document.getElementById('typingInput');
    const startBtn = document.getElementById('startTestBtn');
    
    input.value = '';
    input.disabled = true;
    startBtn.textContent = 'Iniciar Teste';
    startBtn.disabled = false;
    
    document.getElementById('currentWPM').textContent = '0';
    document.getElementById('currentAccuracy').textContent = '0%';
    document.getElementById('testTimer').textContent = '60s';
}

// ===== SISTEMA DE VALIDAÇÃO =====
function validateHTMLCode(code) {
    // Validação básica para o desafio de tags de cabeçalho
    const hasH1 = /<h1[^>]*>.*?<\/h1>/i.test(code);
    const hasH2 = /<h2[^>]*>.*?<\/h2>/i.test(code);
    const hasH3 = /<h3[^>]*>.*?<\/h3>/i.test(code);
    
    return hasH1 && hasH2 && hasH3;
}

// ===== SISTEMA DE CONQUISTAS =====
function completeQuest(questId) {
    if (!currentUser || !questId) return;
    
    const quest = getQuestData(questId);
    if (!quest) return;
    
    // Adicionar XP
    const progress = gameState.currentCourse === 'html' ? 
        currentUser.htmlProgress : currentUser.typingProgress;
    
    progress.xp += quest.reward.xp;
    progress.completedQuests.push(questId);
    
    // Verificar level up
    checkLevelUp(gameState.currentCourse);
    
    // Salvar progresso
    saveGameData();
    
    // Atualizar interface
    updatePlayerInfo();
    updateCourseProgress();
    
    // Carregar próxima missão
    loadNextQuest();
    
    // Mostrar notificação
    showNotification(`Missão completada! +${quest.reward.xp} XP`, 'success');
}

function checkLevelUp(courseType) {
    const progress = courseType === 'html' ? 
        currentUser.htmlProgress : currentUser.typingProgress;
    
    const newLevel = Math.floor(progress.xp / GAME_CONFIG.XP_PER_LEVEL) + 1;
    
    if (newLevel > progress.level) {
        progress.level = newLevel;
        gameState.playerLevel = newLevel;
        
        showNotification(`Parabéns! Você subiu para o nível ${newLevel}!`, 'success');
        showAchievement(`Nível ${newLevel}`);
    }
}

function showAchievement(badgeName) {
    const notification = document.getElementById('achievementNotification');
    const title = document.getElementById('achievementTitle');
    const desc = document.getElementById('achievementDesc');
    
    title.textContent = 'Conquista Desbloqueada!';
    desc.textContent = badgeName;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== SISTEMA DE INTERAÇÃO =====
function interactWithCurrentTile() {
    if (gameState.currentQuest) {
        openCurrentQuest();
    }
}

function openCurrentQuest() {
    const quest = getQuestData(gameState.currentQuest);
    if (quest) {
        updateQuestDisplay(quest);
    }
}

function enterMapArea(areaId, areaName) {
    const quests = getQuestsForArea(areaId);
    if (quests.length > 0) {
        showQuestSelection(areaName, quests);
    } else {
        showNotification(`Bem-vindo à área: ${areaName}`, 'info');
    }
}

function getQuestsForArea(areaId) {
    const allQuests = getAvailableQuests(gameState.currentCourse);
    return allQuests.filter(quest => quest.id.includes(areaId));
}

function showQuestSelection(areaName, quests) {
    const content = `
        <h3>Missões em ${areaName}</h3>
        <div class="quest-list">
            ${quests.map(quest => `
                <div class="quest-item" onclick="startQuest('${quest.id}')">
                    <h4>${quest.title}</h4>
                    <p>${quest.description}</p>
                    <div class="quest-reward">
                        <span>Recompensa: ${quest.reward.xp} XP</span>
                        <span>Insígnia: ${quest.reward.badge}</span>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    
    // Mostrar em um modal ou interface
    showNotification(`Encontrou ${quests.length} missões em ${areaName}!`, 'info');
}

function checkAreaEntry(x, y) {
    // Verificar se o jogador entrou em uma nova área
    const areas = document.querySelectorAll('.map-area');
    areas.forEach(area => {
        const rect = area.getBoundingClientRect();
        const worldRect = document.getElementById('worldMap').getBoundingClientRect();
        
        const areaX = (rect.left - worldRect.left) / GAME_CONFIG.TILE_SIZE;
        const areaY = (rect.top - worldRect.top) / GAME_CONFIG.TILE_SIZE;
        const areaWidth = rect.width / GAME_CONFIG.TILE_SIZE;
        const areaHeight = rect.height / GAME_CONFIG.TILE_SIZE;
        
        if (x >= areaX && x < areaX + areaWidth && y >= areaY && y < areaY + areaHeight) {
            const areaName = area.title;
            showAreaNotification(areaName);
        }
    });
}

function showAreaNotification(areaName) {
    showNotification(`Entrou na área: ${areaName}`, 'info');
}

// ===== SISTEMA DE PAINÉIS LATERAIS =====
function toggleInventory() {
    const panel = document.getElementById('inventoryPanel');
    panel.classList.toggle('active');
    updateInventory();
}

function toggleMap() {
    const panel = document.getElementById('mapPanel');
    panel.classList.toggle('active');
    updateMapOverview();
}

function toggleQuestLog() {
    const panel = document.getElementById('questLogPanel');
    panel.classList.toggle('active');
    updateQuestLog();
}

function toggleSettings() {
    const panel = document.getElementById('settingsPanel');
    panel.classList.toggle('active');
}

function updateInventory() {
    const container = document.getElementById('inventoryItems');
    if (gameState.inventory.length === 0) {
        container.innerHTML = '<p class="empty-message">Seu inventário está vazio</p>';
    } else {
        container.innerHTML = gameState.inventory.map(item => `
            <div class="inventory-item">
                <i class="${item.icon}"></i>
                <span>${item.name}</span>
            </div>
        `).join('');
    }
}

function updateMapOverview() {
    const container = document.getElementById('worldMapOverview');
    container.innerHTML = `
        <div class="map-overview">
            <h4>Mapa do Mundo</h4>
            <p>Posição atual: (${gameState.playerPosition.x}, ${gameState.playerPosition.y})</p>
            <div class="map-legend">
                <div class="legend-item">
                    <div class="legend-color" style="background: #10b981;"></div>
                    <span>Áreas Iniciantes</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #3b82f6;"></div>
                    <span>Áreas Intermediárias</span>
                </div>
                <div class="legend-item">
                    <div class="legend-color" style="background: #8b5cf6;"></div>
                    <span>Áreas Avançadas</span>
                </div>
            </div>
        </div>
    `;
}

function updateQuestLog() {
    const container = document.getElementById('questLogContent');
    const progress = gameState.currentCourse === 'html' ? 
        currentUser.htmlProgress : currentUser.typingProgress;
    
    const allQuests = getAvailableQuests(gameState.currentCourse);
    const completedQuests = allQuests.filter(quest => 
        progress.completedQuests.includes(quest.id)
    );
    const availableQuests = allQuests.filter(quest => 
        !progress.completedQuests.includes(quest.id)
    );
    
    container.innerHTML = `
        <div class="quest-log-section">
            <h4>Missões Disponíveis (${availableQuests.length})</h4>
            ${availableQuests.map(quest => `
                <div class="quest-log-item available">
                    <h5>${quest.title}</h5>
                    <p>${quest.description}</p>
                </div>
            `).join('')}
        </div>
        <div class="quest-log-section">
            <h4>Missões Concluídas (${completedQuests.length})</h4>
            ${completedQuests.map(quest => `
                <div class="quest-log-item completed">
                    <h5>${quest.title}</h5>
                    <p>${quest.description}</p>
                    <span class="completion-badge">✓ Concluída</span>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== SISTEMA DE PAUSA =====
function pauseGame() {
    gameState.isPaused = true;
    showNotification('Jogo pausado. Pressione ESC para continuar.', 'info');
    
    // Adicionar listener para ESC
    const resumeListener = function(e) {
        if (e.key === 'Escape') {
            resumeGame();
            document.removeEventListener('keydown', resumeListener);
        }
    };
    document.addEventListener('keydown', resumeListener);
}

function resumeGame() {
    gameState.isPaused = false;
    showNotification('Jogo retomado!', 'success');
}

// ===== SISTEMA DE DADOS =====
function saveGameData() {
    if (currentUser) {
        localStorage.setItem('skillQuestUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('skillQuestGameState', JSON.stringify(gameState));
}

function loadGameData() {
    const savedUser = localStorage.getItem('skillQuestUser');
    const savedGameState = localStorage.getItem('skillQuestGameState');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    if (savedGameState) {
        const saved = JSON.parse(savedGameState);
        gameState = { ...gameState, ...saved };
    }
}

function loadUserData() {
    // Simular carregamento de dados do usuário
    if (!currentUser) {
        currentUser = userDatabase.users[0];
    }
}

// ===== ATUALIZAÇÃO DE INTERFACE =====
function updatePlayerInfo() {
    if (!currentUser) return;
    
    document.getElementById('playerName').textContent = currentUser.name;
    document.getElementById('playerLevel').textContent = gameState.playerLevel;
    
    const progress = gameState.currentCourse === 'html' ? 
        currentUser.htmlProgress : currentUser.typingProgress;
    
    const xpPercentage = (progress.xp % GAME_CONFIG.XP_PER_LEVEL) / GAME_CONFIG.XP_PER_LEVEL * 100;
    document.getElementById('xpFill').style.width = xpPercentage + '%';
    document.getElementById('xpText').textContent = `${progress.xp % GAME_CONFIG.XP_PER_LEVEL} / ${GAME_CONFIG.XP_PER_LEVEL} XP`;
}

function updateCourseProgress() {
    if (!currentUser) return;
    
    // Atualizar progresso HTML
    const htmlProgress = currentUser.htmlProgress;
    const htmlPercentage = (htmlProgress.completedQuests.length / 4) * 100; // 4 missões total
    
    document.getElementById('htmlLevel').textContent = htmlProgress.level;
    document.getElementById('htmlProgress').textContent = Math.round(htmlPercentage) + '%';
    document.getElementById('htmlBadges').textContent = htmlProgress.badges.length;
    document.getElementById('htmlProgressBar').style.width = htmlPercentage + '%';
    
    // Atualizar progresso Typing
    const typingProgress = currentUser.typingProgress;
    const typingPercentage = (typingProgress.completedQuests.length / 4) * 100; // 4 missões total
    
    document.getElementById('typingLevel').textContent = typingProgress.level;
    document.getElementById('typingWPM').textContent = typingProgress.wpm;
    document.getElementById('typingBadges').textContent = typingProgress.badges.length;
    document.getElementById('typingProgressBar').style.width = typingPercentage + '%';
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
function showNotification(message, type = 'info') {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 6000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== CONFIGURAÇÃO DE EVENTOS =====
function setupEventListeners() {
    // Fechar modais com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => modal.classList.remove('active'));
            
            const panels = document.querySelectorAll('.side-panel.active');
            panels.forEach(panel => panel.classList.remove('active'));
        }
    });
    
    // Fechar quest interface com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('questInterface').style.display === 'block') {
            document.getElementById('questInterface').style.display = 'none';
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
        }, 500);
    }, 1000);
}

// ===== ESTILOS CSS DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(-50%) translateY(-100%); opacity: 0; }
        to { transform: translateX(-50%) translateY(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(-50%) translateY(0); opacity: 1; }
        to { transform: translateX(-50%) translateY(-100%); opacity: 0; }
    }
    
    .quest-list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    .quest-item {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .quest-item:hover {
        background: #e5e7eb;
        transform: translateY(-2px);
    }
    
    .quest-reward {
        display: flex;
        justify-content: space-between;
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #6b7280;
    }
    
    .quest-log-section {
        margin-bottom: 2rem;
    }
    
    .quest-log-item {
        background: #f9fafb;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    
    .quest-log-item.completed {
        background: #d1fae5;
        border-left: 4px solid #10b981;
    }
    
    .completion-badge {
        background: #10b981;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        float: right;
    }
    
    .map-overview {
        text-align: center;
    }
    
    .map-legend {
        margin-top: 1rem;
    }
    
    .legend-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
    }
    
    .legend-color {
        width: 20px;
        height: 20px;
        border-radius: 4px;
    }
    
    .inventory-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        background: #f9fafb;
        border-radius: 8px;
        margin-bottom: 0.5rem;
    }
    
    .empty-message {
        text-align: center;
        color: #6b7280;
        font-style: italic;
    }
`;
document.head.appendChild(style); 