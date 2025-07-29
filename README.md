# SkillQuest - Plataforma de Aprendizado Gamificado

## 🎮 Sobre o Projeto

SkillQuest é uma plataforma de aprendizado gamificado inspirada no Codecademy e Codedex, mas com elementos únicos de gamificação. Os usuários aprendem programação enquanto evoluem seus personagens, desbloqueiam acessórios e competem em rankings.

## ✨ Características Únicas

### 🎯 Sistema de Personagem Evolutivo
- **Evolução Visual**: A cada missão completada, o personagem evolui com animações
- **Acessórios Únicos**: Sistema de recompensas a cada 5 níveis com acessórios equipáveis
- **Progressão Visual**: O personagem muda de aparência conforme o progresso

### 🏆 Sistema de Recompensas
- **XP por Missão**: 50 XP por lição completada
- **Acessórios Especiais**: Desbloqueados a cada 5 níveis
- **Conquistas**: Sistema de badges e títulos únicos
- **Ranking Competitivo**: Comparação com outros usuários

### 📚 Cursos Disponíveis
- **HTML & CSS Básico**: 15 lições progressivas
- **JavaScript Fundamentos**: 20 lições interativas
- **Python para Iniciantes**: Em breve (25 lições)

## 🚀 Como Usar em Computadores com Restrições

### Método 1: GitHub Pages (Recomendado)
1. **Acesse o repositório**: Vá para `https://github.com/SEU_USUARIO/aprendizado-gamificado`
2. **Ative GitHub Pages**:
   - Vá em Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)
   - Clique Save
3. **Acesse o site**: `https://SEU_USUARIO.github.io/aprendizado-gamificado`

### Método 2: Raw GitHub (Alternativo)
1. **Acesse diretamente**: `https://raw.githubusercontent.com/SEU_USUARIO/aprendizado-gamificado/main/index.html`
2. **Copie o conteúdo** e cole em um arquivo .html local
3. **Abra no navegador** (funciona offline após o primeiro carregamento)

### Método 3: CodePen/JSFiddle
1. **Copie os arquivos** para plataformas online
2. **Use os CDNs** já incluídos no projeto
3. **Funciona sem downloads**

## 📁 Estrutura do Projeto

```
aprendizado-gamificado/
├── index.html              # Página principal
├── course.html             # Interface do curso
├── styles.css              # Estilos principais
├── course-styles.css       # Estilos do curso
├── script.js               # JavaScript principal
├── course.js               # JavaScript do curso
└── README.md               # Este arquivo
```

## 🎯 Funcionalidades Principais

### Sistema de Autenticação
- ✅ Registro e login de usuários
- ✅ Persistência no localStorage
- ✅ Sistema de sessão

### Sistema de Cursos
- ✅ Interface inspirada no Codecademy
- ✅ Editor de código integrado
- ✅ Validação de código em tempo real
- ✅ Progresso salvo automaticamente

### Sistema Gamificado
- ✅ Evolução visual do personagem
- ✅ Sistema de acessórios equipáveis
- ✅ Animações de conquista
- ✅ Ranking competitivo
- ✅ Streak de dias

### Sistema de Recompensas
- ✅ XP por lição completada
- ✅ Acessórios a cada 5 níveis
- ✅ Conquistas especiais
- ✅ Badges únicos

## 🎮 Como Jogar

### Primeiros Passos
1. **Acesse o site**: Abra `index.html` ou use GitHub Pages
2. **Crie uma conta**: Registre-se com nome, email e senha
3. **Escolha um curso**: HTML, JavaScript ou Python
4. **Comece a aprender**: Complete lições e evolua seu personagem

### Sistema de Progresso
- **Lição Completa**: 50 XP
- **Nível 1-4**: Acessórios básicos
- **Nível 5**: Primeiro acessório especial
- **Nível 10**: Segundo acessório especial
- **E assim por diante...**

### Tipos de Acessórios
- **Chapéus**: Diferentes estilos e cores
- **Óculos**: Para ver melhor o código
- **Cachecóis**: Para se manter aquecido
- **Capas**: Para se sentir poderoso
- **Espadas**: Para cortar bugs

## 🛠️ Tecnologias Utilizadas

### Frontend
- **HTML5**: Estrutura semântica
- **CSS3**: Flexbox, Grid, animações
- **JavaScript ES6+**: Lógica de jogo
- **Font Awesome**: Ícones
- **Google Fonts**: Tipografia Inter

### CDNs (Funcionam Offline)
- Font Awesome: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Google Fonts: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap`

## 🎨 Design e UX

### Inspirações
- **Codecademy**: Interface limpa e moderna
- **Codedex**: Sistema de progressão
- **Duolingo**: Elementos gamificados
- **Khan Academy**: Abordagem educacional

### Características Visuais
- **Glassmorphism**: Efeitos de vidro
- **Gradientes**: Cores vibrantes
- **Animações**: Transições fluidas
- **Responsividade**: Funciona em todos os dispositivos

## 🔧 Configuração para Apresentação

### Preparação Antes da Apresentação
1. **Faça upload para GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/aprendizado-gamificado.git
   git push -u origin main
   ```

2. **Ative GitHub Pages**:
   - Settings → Pages → Source: Deploy from a branch
   - Branch: main, Folder: / (root)

3. **Teste o site**:
   - Acesse `https://SEU_USUARIO.github.io/aprendizado-gamificado`
   - Verifique se tudo funciona

### Durante a Apresentação
1. **Abra o navegador** no computador da apresentação
2. **Acesse o GitHub Pages**: URL do seu projeto
3. **Demonstre as funcionalidades**:
   - Registro de usuário
   - Seleção de curso
   - Interface de aprendizado
   - Evolução do personagem
   - Sistema de recompensas

### Funcionalidades para Demonstrar
- ✅ **Registro/Login**: Mostre o sistema de autenticação
- ✅ **Catálogo de Cursos**: Navegue pelos cursos disponíveis
- ✅ **Interface do Curso**: Mostre a página de aprendizado
- ✅ **Editor de Código**: Execute código HTML/JavaScript
- ✅ **Evolução do Personagem**: Complete uma lição e mostre a animação
- ✅ **Sistema de Recompensas**: Mostre acessórios desbloqueados
- ✅ **Ranking**: Exiba o sistema competitivo

## 🎯 Diferencial Competitivo

### Elementos Únicos
1. **Evolução Visual do Personagem**: Não é apenas ilustração, mas progresso real
2. **Sistema de Acessórios**: Recompensas tangíveis a cada 5 níveis
3. **Animações de Conquista**: Feedback visual imediato
4. **Ranking com Avatares**: Personagens únicos no ranking
5. **Streak de Dias**: Motivação para retorno diário

### Vantagens sobre Codecademy/Codedex
- **Gamificação Real**: Não apenas badges, mas evolução visual
- **Personagem Único**: Cada usuário tem aparência diferente
- **Recompensas Visuais**: Acessórios equipáveis
- **Competição Social**: Ranking com avatares personalizados

## 🚀 Próximas Melhorias

### Funcionalidades Planejadas
- [ ] Mais cursos (CSS, React, Node.js)
- [ ] Sistema de amigos
- [ ] Chat em tempo real
- [ ] Modo multiplayer
- [ ] Integração com APIs externas

### Melhorias Técnicas
- [ ] Backend com banco de dados
- [ ] Sistema de autenticação robusto
- [ ] PWA (Progressive Web App)
- [ ] Otimização de performance

## 📝 Instruções para Apresentação

### Checklist de Preparação
- [ ] Projeto no GitHub
- [ ] GitHub Pages ativado
- [ ] Site funcionando online
- [ ] Conta de teste criada
- [ ] Funcionalidades testadas

### Script de Apresentação
1. **Introdução** (2 min):
   - "SkillQuest é uma plataforma de aprendizado gamificado"
   - "Inspirada no Codecademy, mas com elementos únicos"

2. **Demonstração** (5 min):
   - Registro de usuário
   - Seleção de curso
   - Interface de aprendizado
   - Evolução do personagem
   - Sistema de recompensas

3. **Diferencial** (2 min):
   - "O que torna único: evolução visual do personagem"
   - "Sistema de acessórios equipáveis"
   - "Ranking com avatares personalizados"

4. **Conclusão** (1 min):
   - "Aprendizado gamificado que realmente funciona"
   - "Motivação através de progresso visual"

### Dicas para Apresentação
- **Prepare uma conta de teste** com progresso
- **Tenha o site aberto** antes de começar
- **Demonstre uma lição completa** para mostrar a evolução
- **Mostre o ranking** com diferentes usuários
- **Destaque os elementos únicos** do projeto

## 🎉 Conclusão

SkillQuest combina o melhor do Codecademy e Codedex com elementos gamificados únicos. O sistema de evolução visual do personagem e recompensas equipáveis cria uma experiência de aprendizado verdadeiramente envolvente e motivadora.

**Funciona perfeitamente em computadores com restrições através do GitHub Pages!**

---

**Desenvolvido com ❤️ para tornar o aprendizado de programação mais divertido e eficaz!** 