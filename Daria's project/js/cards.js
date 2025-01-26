async function fetchAndRenderCards() {
    const container = document.getElementById('cards-container');

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error('Ошибка при загрузке данных');
        }

        const posts = await response.json();
        
        posts.forEach(post => {
            const card = document.createElement('div');
            card.classList.add('card');
            
            const image = document.createElement('img');
            image.src = 'https://cakeshop.com.ua/images/AcpSe7kFpmzMfgJUwhyXbNbja_gwkleunua5ZVM9jTQ/h:5000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC81NzEzXzEuanBn';  // Пример изображения
            card.appendChild(image);
            
            const title = document.createElement('div');
            title.classList.add('card-title');
            title.textContent = post.title;
            card.appendChild(title);

            const body = document.createElement('div');
            body.classList.add('card-description');
            body.textContent = post.body;
            card.appendChild(body);
            
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

fetchAndRenderCards();
