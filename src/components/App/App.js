import React from 'react';
import {Switch, Route, Redirect, useHistory } from 'react-router-dom';
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
import * as mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';


function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isPopupLoginOpen, setPopupLogin] = React.useState(false);
  const [isPopupRegisterOpen, setPopupRegister] = React.useState(false);
  const [isPopupConfirmOpen, setPopupConfirm] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);
  const [token, setToken] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({});
  const [errorMessageInPopup, setErrorMessageInPopup] = React.useState('');

  const history = useHistory();

  const name = 'Владислав';

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {      
      setToken(jwt);
      mainApi.getUser(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
          }
        })
        .catch((error) => {
          Promise.reject(new Error(`Ошибка ${error}`));
        });
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);
  
  function handleRegistration(email, password, name) {
    mainApi.createUser(email, password, name)
      .then((res) => {
        if (res) {
          closeAllPopups();
          setPopupConfirm(true);
          history.push('./')
         }
      })
      .catch((error) => {
        if (error === 409) {
          console.log('Данный email уже зарегистрирован');
          setErrorMessageInPopup('Данный email уже зарегистрирован');
        }

        if (error === 400) {
          console.log('Некорректно заполнено одно из полей');
          setErrorMessageInPopup('Некорректно заполнено одно из полей');
        }
        setErrorMessageInPopup('Что-то пошло не так.')
      })
  }

  function handleSubmitLogin(email, password) {
    mainApi.loginUser(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem('jwt', res.token)
          mainApi.getUser(res.token)
            .then((userData) => {
              localStorage.setItem('user', JSON.stringify(userData));
              setCurrentUser(userData);
              setLoggedIn(true);
              setErrorMessageInPopup(null);
              closeAllPopups();
              history.push('./');
            })
            .catch((error) => {
              if (error === 400) {
                console.log('Не передано одно из полей');
                setErrorMessageInPopup('Не передано одно из полей');
              }
              if (error === 401) {
                console.log('Пользователь не найден');
                setErrorMessageInPopup('Пользователь не найден');
              }
              setErrorMessageInPopup('Сервер не отвечает');
            })
        }
      })
  }

  function logout() {
    setLoggedIn(false);
    localStorage.clear();
    history.push('/');
  }


  
  function handlePopupLoginOpen() {
    setErrorMessageInPopup(null);
    setPopupLogin(true);
  }
  
  function handlePopupRegister() {
    setErrorMessageInPopup(null);
    setPopupRegister(true);
  }
  
  function handlePopupConfirm() {
    setPopupConfirm(true);
  }
  
  function openPopupLogin() {
    handlePopupConfirm();    
    handlePopupLoginOpen();    
  }
  
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
      <CurrentUserContext.Provider value={currentUser}>
          <Header            
            isLoginPopupOpen={handlePopupLoginOpen}
            isOpenBurgerMenu={handleBurger}
            burgerSetStyle={isBurgerOpen}
            onClose={closeAllPopups}
            isLogout={logout}
            loggedIn={loggedIn}
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
          errorMessageInPopup={errorMessageInPopup}
          onLogin={handleSubmitLogin}  
        />
        <PopupWithRegister
          isOpen={isPopupRegisterOpen}
          onChangePopup={changePopup}
          onClose={closeAllPopups}
          errorMessageInPopup={errorMessageInPopup}
          onRegister={handleRegistration}  
        />
        <PopupConfirm
          isOpen={ isPopupConfirmOpen}
          onClose={closeAllPopups}
          openPopupLogin={openPopupLogin}
        />
      </section>

      </CurrentUserContext.Provider>
    </div>
  )
}

export default App;
