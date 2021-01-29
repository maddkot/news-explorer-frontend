//const apiKey = 'd6950557b87c4d5eadd5860a779009e4';

// GET https:nomoreparties.co/news/v2/top-headlines?country=us&apiKey=[ваш_ключ] 
// GET https://newsapi.org/v2/top-headlines?country=us&apiKey=[ваш_ключ] 

/* 
  const = API_URL ='https:nomoreparties.co/news/v2/everything?q=${keyword}&from=${}&to=${}&sortBy=publishedAt&apiKey={apiKey}&pageSize=30';
*/

import { API_KEY, PROXY_URL, DECREASE_DAY, NEWS_SHOWED } from './constant';

export default function getArticlesNewsApi(keyword) {

  const dateNow = new Date();
  const dateTo = dateNow.toISOString().slice(0, 10);
  //используем сеттер и геттер даты с вычетом дней
  dateNow.setDate(dateNow.getDate() - DECREASE_DAY);
  const dateFrom = dateNow.toISOString().slice(0, 10)

  return (
    fetch(`${PROXY_URL}?q=${keyword}&from=${dateFrom}&to=${dateTo}&sortBy=publishedAt&apiKey=${API_KEY}&pageSize=${NEWS_SHOWED}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(res.status));
      })
  );
}