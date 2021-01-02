import React from 'react';
import './About.css';
import author_img from'../../images/author.png'

function About() {
    return (
        <section className="about">
            <img className="about__img" src={author_img} alt="изображение автора проекта"></img>
            <div className="about__container-text">
                <h3 className="about__title">Об авторе</h3>
                <p className="about__subtitle">Привет. меня зовут Сергей и я начинающий веб-разработчик.
                Верстаю адаптивные и кроссбраузерные сайты, использую javaScript, React, Node (Express).
                Мои работы Вы можете посмотреть на моей странице GitHub.
                Если возникнут вопросы или предложения - смело пишите мне в инстаграм.</p>
            </div>  
        </section>
    )
}

export default About;