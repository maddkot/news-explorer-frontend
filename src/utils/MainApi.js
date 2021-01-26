export const base_url = 'http://localhost:3000';

// создание нового пользователя 
export const createUser = (email, password, name) => {
    return fetch(`${base_url}//signup`, {
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
        //.catch((error) => Promise.reject(error));
}

// логин пользователя в системе 9авторизация)

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
        //.catch((error) => Promise.reject(error));
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
}

// получение карточек
export const getArticle = (token) => {
    return fetch(`${base_url}/articles`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(new Error(`Ошибка: ${res.status}`));
            }
        });
}

// удаление карточки
export const deleteArticle = (article, token) => {
    return fetch(`${base_url}/articles/${article._id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'
        }
    })
    .then(res => { 
        if (res.ok) { 
            return res.json(); 
        } else {  
            return Promise.reject(new Error(`Ошибка: ${res.status}`)); 
        }             
    });
}

//создание карточки
export const createArticles = (article, token, keyword) => {
    return fetch(`${base_url}/articles`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json'  
        },
        body: JSON.stringify({
            keyword,
            title: article.title,
            text: article.text,
            date: article.date,
            source: article.source,
            link: article.link,
            image: article.image,
        })
    })
    .then(res => { 
        if (res.ok) { 
            return res.json(); 
        } else { 
            return Promise.reject(new Error(`Ошибка: ${res.status}`)); 
        }             
    });
}



