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
import Preloader from '../Preloader/Preloader';
import NotFound from '../NotFound/NotFound';
import PopupWithLogin from '../PopupWithLogin/PopupWithLogin';
import PopupWithRegister from '../PopupWithRegister/PopupWithRegister';
import PopupConfirm from '../PopupConfirm/PopupConfirm';
import ProtectRoute from '../ProtectedRoute/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import CurrentUserContext from '../../context/CurrentUserContext';
import getArticlesNewsApi from '../../utils/NewsApi';


function App() {

  // стейт логина
  const [loggedIn, setLoggedIn] = React.useState(false);

  //стейты модальных окон
  const [isPopupLoginOpen, setPopupLogin] = React.useState(false);
  const [isPopupRegisterOpen, setPopupRegister] = React.useState(false);
  const [isPopupConfirmOpen, setPopupConfirm] = React.useState(false);
  const [isBurgerOpen, setBurgerOpen] = React.useState(false);

  //стейт токена
  //const [token, setToken] = React.useState('');

  //стейт данных пользователя
  const [currentUser, setCurrentUser] = React.useState({});

  //стейт текста ошибки в попапе
  const [errorMessageInPopup, setErrorMessageInPopup] = React.useState('');

  //стейт ключевого слова поиска/тега
  const [keyword, setKeyword] = React.useState('');

  //стейт крточек новостей с новостного апи
  const [articles, setArticles] = React.useState([]);

  //стейт изменения состояния прелоудера
  const [preloader, setPreloader] = React.useState(false);

  //стейт страницы, если новости не найдены
  const [notFound, setNotFound] = React.useState(false);

  //стейт текста страницы, когда на сервере ошибка
  const [errorServer, setErrorServer] = React.useState(false);

  //стейт сохраненных статей
  const [mySavedArticle, setMySavedArticle] = React.useState([]);

  //стейт всех сохраненных ключевых слов
  const [savedKeywords, setSavedKeywords] = React.useState([]);
  
  
  const history = useHistory();
  
  
  //функция получения токена
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {      
      //setToken(jwt);
      setLoggedIn(true);      
      mainApi.getUser(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setCurrentUser(JSON.parse(localStorage.getItem('user')));
          }
        })
        .catch((error) => {
          console.log(new Error(`Ошибка ${error}`));
        });
    }
  }

  // проверка состояния токена
  React.useEffect(() => {
    tokenCheck();
  }, [loggedIn]);

  //эфеект при изменении сохраненных статей на сервере для пересчета тегов
  React.useEffect(() => {
    const temporaryKeywords = [];
    mySavedArticle.forEach((item) => {
      let keyW = temporaryKeywords.find((itemKeyword) => {
        return itemKeyword.keyword === item.keyword;
      });
      if (keyW) {
        keyW.count ++
      } else {
        temporaryKeywords.push({ keyword: item.keyword, count: 1 })
      }
    })
    temporaryKeywords.sort((item1, item2) => {
      return item2.count - item1.count
    })
    setSavedKeywords(temporaryKeywords);
  }, [mySavedArticle])
  
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
        if(error === 500)
        setErrorMessageInPopup('Что-то пошло не так.')
      })
  }

  function handleSubmitLogin(email, password) {
    mainApi.loginUser(email, password)
      .then((res) => {        
        if (res) {
          localStorage.clear();
          setArticles([]);
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
            })
        }
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
      })
  }

  function logout() {
    localStorage.clear();
    setLoggedIn(false);    
    setNotFound(false);
    setArticles([]);
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
  
  function openPopupLogin() {
    setPopupConfirm(false);    
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

  function searchNews(keyword) {
    setNotFound(false);
    setPreloader(true);    
    setErrorServer(false);
    getArticlesNewsApi(keyword)
      .then((data) => {
        localStorage.setItem('articles', JSON.stringify(data.articles));
        localStorage.setItem('keyword', keyword);
        setKeyword(keyword);        
        setArticles(data.articles);
        if (data.articles.length === 0) {
          setErrorServer(false);
          setNotFound(true);
        }
        setPreloader(false);
      })
      .catch((error) => {
        setPreloader(false);
        setNotFound(true);
        setErrorServer(error.message);
      })
  }

  React.useEffect(() => {
    if (localStorage.getItem('articles') !== null ) {
      const articles = localStorage.getItem('articles');      
      setArticles(JSON.parse(articles));
      
    }
  }, [])

  React.useEffect(() => {
    setKeyword(localStorage.getItem('keyword'))
  }, [keyword])

  function getSavedNews() {    
    if (loggedIn) {
      return mainApi.getArticle()
        .then((articles) => {         
          setMySavedArticle(articles);
          
           /* вернуться при работе с ключевыми словами!!!!!! */
        })
        .catch((error) => {
          console.log(new Error(`Ошибка ${error}`));
        })
    } return '';    
  }

  React.useEffect(() => {
    if (loggedIn) {
      return mainApi.getArticle()
        .then((article) => {          
          setMySavedArticle(article);
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }, [currentUser.name, loggedIn])


  function saveNews(article, keyword) {        
    if (loggedIn) {      
      return mainApi.createArticles(article, keyword)
        .then(() => {          
          getSavedNews();
        })
        .catch((error) => {
          console.log(new Error(`Ошибка ${error}`));;
        })
    } return '';
  }

  function deleteNews(article) {
    return mainApi.deleteArticle(article)
      .then(() => {        
        setMySavedArticle(mySavedArticle.filter((item) => item !== article));        
      })
      .catch((error) => {
        console.log(new Error(`Ошибка ${error}`));
      })
  }  

  function checkMySaveArticle(article, keyword) {
    
    const savedArticle = mySavedArticle.find((item) => {      
      return item.link === article.link || item.link === article.url;
    });


    if (savedArticle) {
      return deleteNews(savedArticle);
    }
    return saveNews(article, keyword );
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
          
          <Search
           searchNews={searchNews}
          />  
          <CardList
              loggedIn={loggedIn}
              articles={articles}
              keyword={keyword}
              checkMySaveArticle={checkMySaveArticle}
              mySavedArticle={mySavedArticle}
              isLoginPopupOpen={handlePopupLoginOpen}
            />
          <NotFound
              handleNotFound={notFound}
              errorServer={errorServer}
          />
          <Preloader
            handlePreloader={preloader} 
          /> 
          <About/>
        </Route>

          < ProtectRoute path="/saved-news"
            loggedIn={loggedIn}
            component={SavedNews}
            mySavedArticle={mySavedArticle}
            keyword={keyword}
            checkMySaveArticle={checkMySaveArticle}
            savedKeywords={savedKeywords}
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
