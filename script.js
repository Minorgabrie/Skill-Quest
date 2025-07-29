// ===== DADOS DO JOGO =====
let currentUser = null;
let userDatabase = {
    users: [
        {
            id: 1,
            name: "Aventureiro",
            email: "teste@teste.com",
            password: "123456",
            level: 1,
            totalXP: 0,
            accessories: [],
            courses: {
                html: { level: 1, xp: 0, completedLessons: [] },
                javascript: { level: 1, xp: 0, completedLessons: [] },
                python: { level: 1, xp: 0, completedLessons: [] }
            },
            missionsCompleted: 0,
            daysStreak: 0,
            lastLogin: null
        }
    ],
    currentId: 2
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
    },
    "cape-basic": {
        name: "Capa Básica",
        icon: "fas fa-cape",
        color: "#7c3aed",
        description: "Uma capa para se sentir mais poderoso"
    },
    "sword-basic": {
        name: "Espada Básica",
        icon: "fas fa-sword",
        color: "#6b7280",
        description: "Espada para cortar bugs de código"
    }
};

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserProgress();
    setupEventListeners();
    generateLeaderboard();
    updateCharacterAvatars();
});

function initializeApp() {
    // Carregar dados salvos
    loadGameData();
    
    // Configurar navegação
    setupNavigation();
    
    // Configurar modais
    setupModals();
    
    // Atualizar interface
    updateUI();
}

// ===== SISTEMA DE AUTENTICAÇÃO =====
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

function openRegisterModal() {
    document.getElementById('registerModal').style.display = 'block';
}

function closeRegisterModal() {
    document.getElementById('registerModal').style.display = 'none';
}

function switchToRegister() {
    closeLoginModal();
    openRegisterModal();
}

function switchToLogin() {
    closeRegisterModal();
    openLoginModal();
}

function registerUser(name, email, password) {
    // Verificar se o email já existe
    const existingUser = userDatabase.users.find(user => user.email === email);
    if (existingUser) {
        showNotification('Email já cadastrado!', 'error');
        return;
    }
    
    // Criar novo usuário
    const newUser = {
        id: userDatabase.currentId++,
        name: name,
        email: email,
        password: password,
        level: 1,
        totalXP: 0,
        accessories: [],
        courses: {
            html: { level: 1, xp: 0, completedLessons: [] },
            javascript: { level: 1, xp: 0, completedLessons: [] },
            python: { level: 1, xp: 0, completedLessons: [] }
        },
        missionsCompleted: 0,
        daysStreak: 0,
        lastLogin: new Date().toISOString()
    };
    
    userDatabase.users.push(newUser);
    currentUser = newUser;
    
    // Salvar dados
    saveGameData();
    
    // Fechar modal e atualizar interface
    closeRegisterModal();
    updateUI();
    showNotification('Conta criada com sucesso!', 'success');
}

function loginUser(email, password) {
    const user = userDatabase.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        
        // Atualizar streak de dias
        updateDaysStreak();
        
        saveGameData();
        closeLoginModal();
        updateUI();
        showNotification('Login realizado com sucesso!', 'success');
    } else {
        showNotification('Email ou senha incorretos!', 'error');
    }
}

function updateDaysStreak() {
    if (!currentUser.lastLogin) {
        currentUser.daysStreak = 1;
        currentUser.lastLogin = new Date().toISOString();
        return;
    }
    
    const lastLogin = new Date(currentUser.lastLogin);
    const today = new Date();
    const diffTime = Math.abs(today - lastLogin);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
        currentUser.daysStreak++;
    } else if (diffDays > 1) {
        currentUser.daysStreak = 1;
    }
    
    currentUser.lastLogin = new Date().toISOString();
}

function startLearning() {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    
    // Redirecionar para o catálogo de cursos
    scrollToSection('catalog');
}

function startCourse(courseType) {
    if (!currentUser) {
        openLoginModal();
        return;
    }
    
    // Verificar se o curso está disponível
    if (courseType === 'python') {
        showNotification('Curso Python em breve!', 'info');
        return;
    }
    
    // Redirecionar para a página do curso
    window.location.href = `course.html?course=${courseType}`;
}

// ===== SISTEMA DE RANKING =====
function generateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;
    
    // Ordenar usuários por XP total
    const sortedUsers = [...userDatabase.users].sort((a, b) => b.totalXP - a.totalXP);
    
    leaderboardList.innerHTML = sortedUsers.slice(0, 10).map((user, index) => `
        <div class="leaderboard-item">
            <div class="leaderboard-position">#${index + 1}</div>
            <div class="leaderboard-user">
                <div class="user-avatar">
                    <div class="avatar-base">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="avatar-accessories">
                        ${user.accessories.slice(0, 3).map(acc => {
                            const accessory = accessoriesDatabase[acc];
                            return accessory ? `<i class="${accessory.icon}" style="color: ${accessory.color}; position: absolute; top: 0; left: 50%; transform: translateX(-50%); font-size: 0.8rem;"></i>` : '';
                        }).join('')}
                    </div>
                </div>
                <div class="user-info">
                    <h4>${user.name}</h4>
                    <span class="user-level">Nível ${user.level}</span>
                </div>
            </div>
            <div class="leaderboard-stats">
                <div class="stat">
                    <span class="stat-label">XP Total</span>
                    <span class="stat-value">${user.totalXP}</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Missões</span>
                    <span class="stat-value">${user.missionsCompleted}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function showLeaderboard(type) {
    // Atualizar botões ativos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Aqui você pode filtrar o ranking por tipo se necessário
    generateLeaderboard();
}

// ===== FUNÇÕES AUXILIARES =====
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

function saveGameData() {
    if (currentUser) {
        localStorage.setItem('skillQuestUser', JSON.stringify(currentUser));
    }
    localStorage.setItem('skillQuestUsers', JSON.stringify(userDatabase));
}

function loadGameData() {
    const savedUser = localStorage.getItem('skillQuestUser');
    const savedUsers = localStorage.getItem('skillQuestUsers');
    
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    
    if (savedUsers) {
        userDatabase = JSON.parse(savedUsers);
    }
}

function loadUserProgress() {
    if (!currentUser) return;
    
    updateProgressBars();
    updateUserStats();
    updateCharacterAvatars();
}

function updateProgressBars() {
    if (!currentUser) return;
    
    // Atualizar progresso HTML
    const htmlProgress = currentUser.courses.html;
    const htmlPercentage = (htmlProgress.completedLessons.length / 15) * 100; // 15 lições total
    
    const htmlProgressBar = document.getElementById('htmlProgress');
    const htmlProgressText = document.getElementById('htmlProgressText');
    
    if (htmlProgressBar) {
        htmlProgressBar.style.width = htmlPercentage + '%';
    }
    if (htmlProgressText) {
        htmlProgressText.textContent = Math.round(htmlPercentage) + '% Completo';
    }
    
    // Atualizar progresso JavaScript
    const jsProgress = currentUser.courses.javascript;
    const jsPercentage = (jsProgress.completedLessons.length / 20) * 100; // 20 lições total
    
    const jsProgressBar = document.getElementById('jsProgress');
    const jsProgressText = document.getElementById('jsProgressText');
    
    if (jsProgressBar) {
        jsProgressBar.style.width = jsPercentage + '%';
    }
    if (jsProgressText) {
        jsProgressText.textContent = Math.round(jsPercentage) + '% Completo';
    }
}

function updateUserStats() {
    if (!currentUser) return;
    
    // Atualizar estatísticas HTML
    const htmlLevel = document.getElementById('htmlLevel');
    const htmlXP = document.getElementById('htmlXP');
    const htmlAccessories = document.getElementById('htmlAccessories');
    
    if (htmlLevel) htmlLevel.textContent = currentUser.courses.html.level;
    if (htmlXP) htmlXP.textContent = currentUser.courses.html.xp;
    if (htmlAccessories) htmlAccessories.textContent = currentUser.accessories.filter(acc => acc.startsWith('html')).length;
    
    // Atualizar estatísticas JavaScript
    const jsLevel = document.getElementById('jsLevel');
    const jsXP = document.getElementById('jsXP');
    const jsAccessories = document.getElementById('jsAccessories');
    
    if (jsLevel) jsLevel.textContent = currentUser.courses.javascript.level;
    if (jsXP) jsXP.textContent = currentUser.courses.javascript.xp;
    if (jsAccessories) jsAccessories.textContent = currentUser.accessories.filter(acc => acc.startsWith('js')).length;
    
    // Atualizar estatísticas do perfil
    const totalXP = document.getElementById('totalXP');
    const missionsCompleted = document.getElementById('missionsCompleted');
    const accessoriesUnlocked = document.getElementById('accessoriesUnlocked');
    const daysStreak = document.getElementById('daysStreak');
    
    if (totalXP) totalXP.textContent = currentUser.totalXP;
    if (missionsCompleted) missionsCompleted.textContent = currentUser.missionsCompleted;
    if (accessoriesUnlocked) accessoriesUnlocked.textContent = currentUser.accessories.length;
    if (daysStreak) daysStreak.textContent = currentUser.daysStreak;
    
    // Atualizar XP do herói
    const heroXP = document.getElementById('heroXP');
    if (heroXP) {
        const xpPercentage = (currentUser.totalXP % 100);
        heroXP.style.width = xpPercentage + '%';
    }
}

function updateCharacterAvatars() {
    if (!currentUser) return;
    
    // Atualizar avatar do herói
    const heroAccessories = document.getElementById('characterAccessories');
    if (heroAccessories) {
        heroAccessories.innerHTML = '';
        currentUser.accessories.slice(0, 3).forEach(accessoryId => {
            const accessory = accessoriesDatabase[accessoryId];
            if (accessory) {
                const accessoryElement = document.createElement('i');
                accessoryElement.className = accessory.icon;
                accessoryElement.style.cssText = `
                    position: absolute;
                    color: ${accessory.color};
                    font-size: 1.2rem;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                `;
                heroAccessories.appendChild(accessoryElement);
            }
        });
    }
    
    // Atualizar avatar do perfil
    const profileAccessories = document.getElementById('profileAccessories');
    if (profileAccessories) {
        profileAccessories.innerHTML = '';
        currentUser.accessories.slice(0, 3).forEach(accessoryId => {
            const accessory = accessoriesDatabase[accessoryId];
            if (accessory) {
                const accessoryElement = document.createElement('i');
                accessoryElement.className = accessory.icon;
                accessoryElement.style.cssText = `
                    position: absolute;
                    color: ${accessory.color};
                    font-size: 1rem;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                `;
                profileAccessories.appendChild(accessoryElement);
            }
        });
    }
}

function updateUI() {
    if (currentUser) {
        // Atualizar interface para usuário logado
        const authButtons = document.querySelector('.nav-auth');
        if (authButtons) {
            authButtons.innerHTML = `
                <span class="user-welcome">Olá, ${currentUser.name}!</span>
                <button class="btn btn-secondary" onclick="logout()">
                    <i class="fas fa-sign-out-alt"></i>
                    <span>Sair</span>
                </button>
            `;
        }
        
        // Atualizar informações do perfil
        const profileName = document.getElementById('profileName');
        const profileLevel = document.getElementById('profileLevel');
        const profileXP = document.getElementById('profileXP');
        const profileXPText = document.getElementById('profileXPText');
        
        if (profileName) profileName.textContent = currentUser.name;
        if (profileLevel) profileLevel.textContent = `Nível ${currentUser.level} - Aventureiro`;
        if (profileXP) {
            const xpPercentage = (currentUser.totalXP % 100);
            profileXP.style.width = xpPercentage + '%';
        }
        if (profileXPText) profileXPText.textContent = `${currentUser.totalXP % 100} / 100 XP`;
        
    } else {
        // Atualizar interface para usuário não logado
        const authButtons = document.querySelector('.nav-auth');
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="btn btn-secondary" onclick="openLoginModal()">
                    <i class="fas fa-sign-in-alt"></i>
                    <span>Entrar</span>
                </button>
                <button class="btn btn-primary" onclick="openRegisterModal()">
                    <i class="fas fa-user-plus"></i>
                    <span>Cadastrar</span>
                </button>
            `;
        }
    }
}

function logout() {
    currentUser = null;
    saveGameData();
    updateUI();
    showNotification('Logout realizado com sucesso!', 'success');
}

function showNotification(message, type = 'info') {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : type === 'info' ? '#3b82f6' : '#fbbf24'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
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
    // Formulários de autenticação
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            loginUser(email, password);
        });
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            registerUser(name, email, password);
        });
    }
    
    // Fechar modais com clique fora
    window.addEventListener('click', function(e) {
        const loginModal = document.getElementById('loginModal');
        const registerModal = document.getElementById('registerModal');
        
        if (e.target === loginModal) {
            closeLoginModal();
        }
        if (e.target === registerModal) {
            closeRegisterModal();
        }
    });
}

function setupNavigation() {
    // Navegação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function setupModals() {
    // Configurar modais se necessário
}

// ===== ESTILOS CSS DINÂMICOS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .user-welcome {
        color: #7c3aed;
        font-weight: 600;
        margin-right: 1rem;
    }
    
    .notification {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .character-avatar, .user-avatar, .profile-avatar {
        position: relative;
        width: 100%;
        height: 100%;
    }
    
    .avatar-accessories {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
    
    .leaderboard-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 12px;
        margin-bottom: 1rem;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }
    
    .leaderboard-item:hover {
        transform: translateY(-2px);
    }
    
    .leaderboard-position {
        font-size: 1.2rem;
        font-weight: 700;
        color: #7c3aed;
        min-width: 40px;
    }
    
    .leaderboard-user {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex: 1;
    }
    
    .leaderboard-stats {
        display: flex;
        gap: 1rem;
    }
    
    .leaderboard-stats .stat {
        text-align: center;
    }
    
    .leaderboard-stats .stat-label {
        font-size: 0.8rem;
        color: #6b7280;
        display: block;
    }
    
    .leaderboard-stats .stat-value {
        font-size: 1rem;
        font-weight: 600;
        color: #1f2937;
    }
`;
document.head.appendChild(style); 