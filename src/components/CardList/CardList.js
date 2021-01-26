import React from 'react';
import './CardList.css';
import Card from '../Card/Card';
import articles from '../../utils/articles';

function CardList() {

    const [showCards, setShowCards] = React.useState(3);
    const [visibleButton, setVisibleButton] = React.useState(true)
    const visibleArticles = articles.slice(0, showCards);
    const setCards = () => {
        setShowCards(showCards + 3);        
    }

    React.useEffect(() => {
        if (visibleArticles.length === articles.length) {
            return setVisibleButton(false);
        }
    }, [visibleArticles])

    

    return (
        <section className="cardList">
            <h2 className="cardList__title">Результаты поиска</h2>
            <div className="cardList__section">
                {
                    visibleArticles.map((card) => (
                        <Card
                            key={card.owner}
                            card={card}
                        />
                    ))
                }
                

            </div>
             <button className={visibleButton ? `cardList__button` : `cardList__button-disabled`} onClick={setCards}>Показать еще</button> 
        </section>
    )
}

export default CardList;