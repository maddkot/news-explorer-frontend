import React from 'react';
import './About.css';
import author_img from'../../images/author.png'

function About() {
    return (
        <section className="about">
            <img className="about__img" src={author_img} alt="изображение автора проекта"></img>
            <div className="about__container-text">
                <h3 className="about__title">Об авторе</h3>
                <p className="about__subtitle">Привет. Меня зовут Сергей и перед Вами проект NewsExplorer - сервис поиска новостей с возможностью сохранения их в личном кабинете.
                </p>
                <p className="about__subtitle">С другими моими проектами вы можете ознакомиться на моей страничке в GitHub.</p>
                <p className="about__subtitle">По возникающим вопросам - пишите мне в Instagram.</p>
            </div>  
        </section>
    )
}

export default About;