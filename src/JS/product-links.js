document.addEventListener('DOMContentLoaded', () => {
    const productMapping = {
        'Boné Alerta de Erro Crítico': 1,
        'Camiseta Jame Jones': 2,
        'Camiseta Java Dev Raiz': 3,
        'Camiseta Drama da Programação': 4,
        'Camiseta Fórmula do Programador': 5,
        'Camiseta Linux Fanatic': 6,
        'Pantufa Binária 0 e 1': 7,
        'Kit Porta-Copos Code & Coffee Break': 8,
        'Relógio Matrix Time (Hora na Matriz)': 9,
        'Smartwatch Dev Pro': 10,
        'Smartwatch Execução Rápida': 11,
        'MousePad for Dev': 12,
        'MousPad Binário': 13,
        'Stickers Linguagens de Programação': 14,
        'Sticker Linguagens de Programação': 15,
        'Sticker Tech Premium': 16,
        'ATTACK SHARK x AJAZZ AK820 Teclado Mecânico': 17,
        'ATTACK SHARK x AJAZZ AK820 Teclado mecânico': 17,
        'Caneca amarela de programador': 18,
        'Caneca Amarela de Programador': 18,
        'Caneca branca de programador.': 19,
        'Caneca Branca de Programador': 19,
        'Caneca preta de programador': 20,
        'Caneca Preta de Programador': 20,
        'Caneca preta de códigos': 21,
        'Caneca Preta de Códigos': 21,
        'Caneca de erro': 22,
        'Caneca de Erro': 22,
        'Caneca verde start': 23,
        'Caneca Verde Start': 23,
        'Caneca branca de programadoras': 24,
        'Caneca Branca de Programadoras': 24,
        'Carteira para programador (Marrom)': 25,
        'Carteira para Programador (Marrom)': 25,
        'Carteira para programador(Preta)': 26,
        'Carteira para Programador (Preta)': 26,
        'Manguito Profissional de Binário': 27,
        'KIT Coffee dev + Café Artesanal': 28,
        'KIT Coffee Dev + Café Artesanal': 28,
        'KIT Bonés de Desenvolvedor + Livros dev': 29,
        'KIT Bonés de Desenvolvedor + Livros Dev': 29,
        'KIT Moletons de programação': 30,
        'KIT Moletons de Programação': 30,
        'KIT Canecas personalizadas de programação': 31,
        'KIT Canecas Personalizadas de Programação': 31,
        'KIT Dev java completo': 32,
        'KIT Dev Java Completo': 32,
        'KIT Camisetas Dev do Rock': 33,
        'Garrafa branca': 34,
        'Garrafa Branca': 34,
        'Garrafa marrom': 35,
        'Garrafa Marrom': 35,
        'Garrafa preta': 36,
        'Garrafa Preta': 36,
        'Garrafa verde': 37,
        'Garrafa Verde': 37,
        'Moletom preto': 38,
        'Moletom Preto': 38,
        'Moletom branco': 39,
        'Moletom Branco': 39,
        'Moletom azul': 40,
        'Moletom Azul': 40,
        'Mochhila My Development Environment': 41,
        'Mochila My Development Environment': 41,
        'Mochila Sistema Operacionais': 42,
        'Mochila Estratégia': 43,
        'Mochila System Failure': 44
    };

    const productCards = document.querySelectorAll('.grid-produtos .card, .grid-products .card, .list-produtos .card');

    console.log("teste"+ productCards);

    productCards.forEach(card => {
        const titleElement = card.querySelector('h3');
        if (titleElement) {
            const productName = titleElement.textContent.trim();
            const productId = productMapping[productName];

            if (productId) {
                card.href = `/pages/produto-detalhes.html?id=${productId}`;
                
                const buttons = card.querySelectorAll('button');
                buttons.forEach(button => {
                    button.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                });
            }
        }
    });

    const featureCards = document.querySelectorAll('.section-cards .card button');
    featureCards.forEach((button, index) => {
        const productIds = [1, 2, 3, 4]; 
        const card = button.closest('.card');
        
        const link = document.createElement('a');
        link.href = `/pages/produto-detalhes.html?id=${productIds[index]}`;
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';
        
        const cardClone = card.cloneNode(true);
        card.parentNode.replaceChild(link, card);
        link.appendChild(cardClone);
    });
});
