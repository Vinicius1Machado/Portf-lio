document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');

    // 1. Interatividade de Navegação (Ativa o link clicado)
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove a classe 'active' de todos os itens
            navItems.forEach(i => i.classList.remove('active'));
            
            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');
        });
    });

    // 2. Interatividade de Scroll (Para marcar a seção ativa no Navbar)
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            // Verifica se a seção está visível (considerando 10% do viewport como acionamento)
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });

        // Atualiza a classe 'active' do navbar
        navItems.forEach(item => {
            item.classList.remove('active');
            const targetId = item.getAttribute('data-section');
            if (targetId === currentSection) {
                item.classList.add('active');
            }
        });
    });

    // 3. Interatividade de Skills (Exemplo simples de feedback)
    const skillSpans = document.querySelectorAll('.skill-list span');
    skillSpans.forEach(span => {
        span.addEventListener('click', function() {
            const skill = this.textContent;
            alert(`🔍 Detalhe da Habilidade: "${skill}"\n\nEsta tecnologia me permite realizar tarefas como: conectar APIs complexas, otimizar consultas de banco de dados e criar componentes reutilizáveis. (Simulação de um modal de detalhe)`);
        });
    });
});