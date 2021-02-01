import React from 'react';
import './Search.css'

function Search({searchNews}) {

    const [keyword, setKeyword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('Введите тему новости');
    
    function handleChangeKeyword(event) {
        setKeyword(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (!keyword) {
            setErrorMessage('Введите ключевое слово');
            return;
        }
        searchNews(keyword);
        setErrorMessage();        
        return;
        

    }

    return (
        <section className="search">
            <div className="search__container">
            <h1 className="search__title">Что творится в мире?</h1>
            <p className="search__subtitle">Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.</p>
            <form className="search__form" onSubmit={handleSubmit} noValidate>
                <input className="search__input"
                    placeholder={errorMessage}
                        required
                        value={keyword || ''}
                        onChange={handleChangeKeyword}
                ></input>
                <button className="search__button">Искать</button>
            </form>
            </div>    
        </section>
    )
}

export default Search;