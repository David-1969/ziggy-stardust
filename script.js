document.addEventListener('DOMContentLoaded', () => {
    let userRating = 0;
    const starsContainer = document.getElementById('starRating');
    const ratingMessage = document.getElementById('ratingMessage');
    const reviewText = document.getElementById('reviewText');
    const submitReviewButton = document.getElementById('submitReview');
    const reviewsList = document.getElementById('reviewsList');

    // Cria as estrelas
    for (let i = 1; i <= 10; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.dataset.value = i * 1; // Cada estrela representa 0.5
        star.textContent = '★';
        
        // Adiciona o comportamento de hover (mostrar a avaliação enquanto passa o mouse)
        star.addEventListener('mouseover', () => {
            updateStars(i * 0.5); // Atualiza as estrelas de acordo com o mouse
        });

        // Remove a avaliação enquanto o mouse sai
        star.addEventListener('mouseout', () => {
            updateStars(userRating); // Retorna ao valor de avaliação atual
        });

        // Permite ao usuário clicar nas estrelas para definir sua avaliação
        star.addEventListener('click', () => {
            userRating = i * 1;
            updateStars(userRating); // Atualiza as estrelas no clique
            ratingMessage.textContent = `Você avaliou com ${userRating} estrelas`;
        });

        starsContainer.appendChild(star);
    }

    // Função para atualizar as estrelas
    function updateStars(rating) {
        const stars = document.querySelectorAll('.star');
        stars.forEach(star => {
            const starValue = parseFloat(star.dataset.value);
            if (starValue <= rating) {
                star.classList.add('filled');
                star.classList.remove('half');
            } else if (starValue - 1 <= rating) {
                star.classList.add('half');
                star.classList.remove('filled');
            } else {
                star.classList.remove('filled', 'half');
            }
        });
    }

    // Verifica se já existem resenhas no localStorage
    const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

    // Função para renderizar as resenhas na página
    function renderReviews() {
        reviewsList.innerHTML = '';
        savedReviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.classList.add('review-item');
            
            reviewItem.innerHTML = `
                <div class="review-author">Avaliação: ${review.rating}</div>
                <div class="review-text">${review.text}</div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    // Inicializa as resenhas
    renderReviews();

    // Função para enviar resenha
    submitReviewButton.addEventListener('click', () => {
        if (reviewText.value && userRating) {
            const newReview = {
                rating: userRating,
                text: reviewText.value
            };
            savedReviews.push(newReview);
            localStorage.setItem('reviews', JSON.stringify(savedReviews));
            reviewText.value = ''; // Limpa o campo de resenha após envio
            renderReviews(); // Atualiza a lista de resenhas
        }
    });
});
