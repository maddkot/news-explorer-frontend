import React from 'react';
import TitleSavedNews from '../TitleSavedNews/TitleSavedNews';
import CardListSaved from '../CardListSaved/CardListSaved';

function SavedNews({name}) {
    return (
        <>
            <TitleSavedNews
                name={name}
            />
            
            <CardListSaved />
        </>    
    )
}

export default SavedNews;