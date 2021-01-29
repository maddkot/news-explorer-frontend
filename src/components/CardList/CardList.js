import React from 'react';
import './CardList.css';
import Card from '../Card/Card';

function CardList({loggedIn, articles, keyword, checkMySaveArticle, mySavedArticle, isLoginPopupOpen}) {

   

    const [showCards, setShowCards] = React.useState([]);
    const [visibleButton, setVisibleButton] = React.useState(false)

    React.useEffect(() => {        
        setShowCards(articles.slice(0, 3));
        if (articles.length <= 3) {
            return setVisibleButton(false)
        } else {
            return setVisibleButton(true);
        }
    }, [articles]);
    
    function showMore() {
        setShowCards(articles.slice(0, showCards.length + 3));
        if (showCards.length >= articles.length - 3) {
            setVisibleButton(false);
        }
    }
   

    return (
        <section className={showCards.length > 0  ? "cardList" : 'cardList_off'}>
            <h2 className="cardList__title">Результаты поиска</h2>
            <div className="cardList__section">
                {   
                    showCards.map((card) => (
                        
                        <Card
                            key={card.url + Math.random()}
                            card={card}
                            loggedIn={loggedIn}
                            keyword={keyword}
                            title={card.title}
                            text={card.description}
                            date={card.publishedAt}
                            source={card.source.name}
                            link={card.url}
                            image={card.urlToImage}
                            checkMySaveArticle={checkMySaveArticle}
                            mySavedArticles={mySavedArticle}
                            isLoginPopupOpen={isLoginPopupOpen}
                        />
                    ))
                }
                

            </div>
            {articles.length > 3 && <button className={visibleButton ? `cardList__button` : `cardList__button-disabled`} onClick={showMore}>Показать еще</button>}
        </section>
    )
}

export default CardList;