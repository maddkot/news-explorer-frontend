export const base_url = 'http://localhost:3000';
const ImgPlug = 'https://yadi.sk/i/QkgRhn9fhtIRRw';

// создание нового пользователя 
export const createUser = (email, password, name) => {
    return fetch(`${base_url}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, name }),
    })

        .then((res) => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(res.status);
        })    
        .catch((error) => Promise.reject(error));
}

// логин пользователя в системе (авторизация)

export const loginUser = (email, password) => {
    return fetch(`${base_url}/signin`, { 
        method: 'POST', 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
        }, 
        body: JSON.stringify({ email, password }) 
    }) 
        .then((res) => { 
            if (res.ok) { 
                return res.json(); 
            } return Promise.reject(res.status); 
        })
        .then((res) => {
            if (res.token) {
                localStorage.setItem('jwt', res.token);
                return res;
            } return Promise.reject(res.status);
        })        
        .catch((error) => Promise.reject(error));
}

// получение информации о пользователе и проверка токена

export const getUser = (token) => {
    return fetch(`${base_url}/users/me`, { 
        method: 'GET', 
        headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json', 
            'Authorization': `Bearer ${token}`, 
        } 
    }) 
        .then((res) => { 
            if (res.ok) { 
                return res.json(); 
            } return Promise.reject(res.status);  
        })
        .catch((error) => Promise.reject(error));
}

// получение карточек
export const getArticle = () => {
    return fetch(`${base_url}/articles`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } return Promise.reject(new Error(`Ошибка: ${res.status}`));            
        })
        .catch((err) => Promise.reject(new Error(`Error: ${err}`)));
}

// удаление карточки
export const deleteArticle = (article) => {
    console.log(article);
    return fetch(`${base_url}/articles/${article._id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${localStorage.getItem('jwt')}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(res => { 
        if (res.ok) { 
            return res.json(); 
        } return Promise.reject(new Error(`Ошибка: ${res.status}`));                      
    })
    .catch((err) => Promise.reject(new Error(`Error: ${err}`)));
}

//создание карточки
export const createArticles = (article, keyword) => {
    
    return fetch(`${base_url}/articles`, {
        method: 'POST',
        headers: {            
            Authorization: `Bearer ${localStorage.getItem('jwt')}`, 
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
            keyword,
            title: article.title,
            text: article.description ||article.text,
            date: article.publishedAt,
            source: article.source.name,
            link: article.url,
            image: article.urlToImage || ImgPlug,
        })
    })
    .then(res => { 
        if (res.ok) { 
            return res.json(); 
        } return Promise.reject(new Error(`Ошибка: ${res.status}`));                    
    })
    .catch((error) => Promise.reject(error));
}



