import React from 'react';
import TitleSavedNews from '../TitleSavedNews/TitleSavedNews';
import CardListSaved from '../CardListSaved/CardListSaved';

function SavedNews({mySavedArticle, loggedIn, checkMySaveArticle, savedKeywords,} ) {
    return (
        <>
            <TitleSavedNews
                mySavedArticle={mySavedArticle}
                savedKeywords={savedKeywords}
            />
            
            <CardListSaved
                mySavedArticle={mySavedArticle}
                loggedIn={loggedIn}
                checkMySaveArticle={checkMySaveArticle}
            />
        </>    
    )
}

export default SavedNews;