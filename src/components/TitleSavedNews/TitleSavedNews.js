import React, { useContext } from 'react'
import '../TitleSavedNews/TitleSavedNews.css';
import CurrentUserContext from '../../context/CurrentUserContext';

function TitleSavedNews({mySavedArticle, savedKeywords}) {

    const user = useContext(CurrentUserContext);
    const { tagsString, otherCount } = printTagsString();
    function printTagsString() {
        let tagsString = '';
        let otherCount = 0;
        for (let i = 0; i < savedKeywords.length; i++){
            if (savedKeywords.length > 3) {
                if (i > 1) {
                    otherCount += savedKeywords[i].count  
                } else {
                    tagsString += savedKeywords[i].keyword + ', '  
                }
            }
            else {
                tagsString += savedKeywords[i].keyword + ', '
            }
        }
        /* if (otherCount) {
            tagsString += 'и' 
        } */
        tagsString = tagsString.slice(0, -2);
        return { tagsString, otherCount }
    } 
   

    return (
        <section className="savedNews">
            <div className="savedNews__container">
                <p className="savedNews__subtitle">Сохранённые статьи</p>
                <h2 className="savedNews__title">{user.name}, у Вас {mySavedArticle.length} статей сохранено</h2>
                <p className="savedNews__keywords">По ключевым словам:
                    <span className="savedNews__tag"> {tagsString}</span>  
                    {otherCount ? <> и 
                        <span className="savedNews__counter"> {otherCount} другим</span></>  : null}
                        
                </p>    
            </div>
            

        </section>
    )
}

export default TitleSavedNews;