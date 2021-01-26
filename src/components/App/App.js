import React from 'react';
import {Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Footer from '../Footer/Footer';
import About from '../About/About';
import CardList from '../CardList/CardList';
import Search from '../Search/Search';
import Header from '../Header/Header';
import SavedNews from '../SavedNews/SavedNews';
/* import TitleSavedNews from '../TitleSavedNews/TitleSavedNews';
import CardListSaved from '../CardListSaved/CardListSaved'; */
/* import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound'; */
import PopupWithLogin from '../PopupWithLogin/PopupWithLogin';
import PopupWithRegister from '../PopupWithRegister/PopupWithRegister';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import ProtectRoute from '../ProtectedRoute/ProtectedRoute';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  const name = 'Владислав';

  const [isPopupLoginOpen, setPopupLogin] = React.useState(false);
  function handlePopupLoginOpen() {
    setPopupLogin(true);
  }

  const [isPopupRegisterOpen, setPopupRegister] = React.useState(false);
  function handlePopupRegister() {
    setPopupRegister(true);
  }

  const [isPopupConfirmOpen, setPopupConfirm] = React.useState(false);
  function handlePopupConfirm() {
    setPopupConfirm(true);
  }
  
  function openPopupLogin() {
    handlePopupConfirm();    
    handlePopupLoginOpen();    
  }

  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  function handleBurger() {
    setBurgerOpen(true);
  }
  

  function closeAllPopups() {
    setPopupLogin(false);
    setPopupRegister(false);
    setBurgerOpen(false);
    setPopupConfirm(false);
  }

  React.useEffect(() => {
    function handleOverlayClose(event) {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
      if (event.target.classList.contains('burger_open')) {
        closeAllPopups();
      }
      
    }

    function handleCloseEsc(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('click', handleOverlayClose);
    document.addEventListener('keydown', handleCloseEsc);

    return () => {
      document.removeEventListener('click', handleOverlayClose);
      document.removeEventListener('keydown', handleCloseEsc);
    };
  }, []);

  function changePopup() {
    if (isPopupLoginOpen) {
      closeAllPopups();
      handlePopupRegister();
    }
    if (isPopupRegisterOpen) {
      closeAllPopups();
      handlePopupLoginOpen();
    }
    }

  return (
    <div className="App">

          <Header
            name={name}
            isLoginPopupOpen={handlePopupLoginOpen}
            isOpenBurgerMenu={handleBurger}
            burgerSetStyle={isBurgerOpen}
            onClose={closeAllPopups}
          />

      <Switch>

        <Route exact path="/">
          
          <Search />  
          <CardList />          
          <About/>
        </Route>

        < ProtectRoute path="/saved-news"
          name={name}
          loggedIn={loggedIn}
          component={SavedNews}
        />

        <Route>
          {loggedIn ? <Redirect to="/saved-news"/> : <Redirect to="/"/>}
        </Route>

      </Switch>
      
      <Footer />
      
      <section className="popups">
        <PopupWithLogin
          isOpen={isPopupLoginOpen}
          onChangePopup={changePopup}
          onClose={closeAllPopups}
          
        />
        <PopupWithRegister
          isOpen={isPopupRegisterOpen}
          onChangePopup={changePopup}
          onClose={closeAllPopups}
        />
        <PopupConfirm
          isOpen={ isPopupConfirmOpen}
          onClose={closeAllPopups}
          openPopupLogin={openPopupLogin}
        />
      </section>


    </div>
  )
}

export default App;
