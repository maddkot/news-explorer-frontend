import React from 'react';
import '../Preloader/Preloader.css'

function Preloader({handlePreloader}) {
    
    return (
        <section className={`preloader ${handlePreloader ? '' : 'preloader_off'}`}>
            <div className="preloader__container">
                <h5 className="preloader__title">Идет поиск новостей...</h5>
                <div className="preloader__circle"></div>                
            </div>
        </section>
    )
}

export default Preloader;