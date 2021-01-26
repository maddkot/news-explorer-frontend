import React from 'react'
import '../TitleSavedNews/TitleSavedNews.css';

function TitleSavedNews({ name }) {

    

    return (
        <section className="savedNews">
            <div className="savedNews__container">
                <p className="savedNews__subtitle">Сохранённые статьи</p>
                <h2 className="savedNews__title">{name}, у Вас 5 сохраненных статей</h2>
                <p className="savedNews__keywords">По ключевым словам:
                    <span className="savedNews__tag"> Природа, Тайга</span> и 
                    <span className="savedNews__counter"> 2-м другим</span>
                </p>    
            </div>
            

        </section>
    )
}

export default TitleSavedNews;