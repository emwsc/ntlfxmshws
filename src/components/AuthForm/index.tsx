import React, { useCallback, FormEvent, useState } from "react";
import Router from "next/router";

import { loginIntoMyshows, saveToken } from "../../logic";

import loginLottieIcon from "./assets/login.json";
import { LottieIcon } from "../LottieIcon";

import { AuthFormHtmlElement } from "./types";

export const AuthForm = () => {
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const handleLogin = useCallback(async (event: FormEvent<AuthFormHtmlElement>) => {
    event.preventDefault();
    setDisabled(true);
    const { loginEl, pwdEl } = event.currentTarget.elements;
    const login = loginEl.value;
    const pwd = pwdEl.value;
    const token = await loginIntoMyshows(login, pwd);
    if (token) {
      saveToken(token);
      return Router.push("/");
    }
    setDisabled(false);
    setError(JSON.stringify("dsajkhdskaj"));
  }, []);

  return (
    <section className="container">
      <h1>Привет!</h1>
      <h2>
        Тут можно загрузить свою историю просмотров с{" "}
        <span className="netflix">Netflix</span> на MyShows.
      </h2>
      <p>
        К сожалению, мне не отвечают на{" "}
        <span className="bold">api@myshows.ru</span>, поэтому здесь нет кнопки
        "Войти через MyShows" (а хотелось бы), и придется вбивать логин и пароль
        (что поделать).
      </p>
      <p>
        Рекомендую использовать уникальный пароль на каждом сайте, а еще лучше
        используйте менеджеры паролей.
      </p>
      <p>
        Мне нужны ваши учетные данные только для того, чтобы подключиться под
        вашей учеткой к MyShows и проставить в вашем профиле отметки о сериалах.
        Данные нигде не хранятся, а после подключения используется только
        специальный токен для работы с MyShows.
      </p>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          disabled={disabled}
          name="loginEl"
          className="auth-form__input"
          type="text"
          placeholder="Тут логин"
          required
        />
        <input
          disabled={disabled}
          name="pwdEl"
          className="auth-form__input"
          type="password"
          placeholder="А сюда пароль"
          required
        />
        <div className="auth-form__login-loader">
          <span className="icon">
            <LottieIcon animationData={loginLottieIcon} />
          </span>
          Подождите
        </div>
        <button
          disabled={disabled}
          className="button button_inverse auth-form__login-btn"
        >
          Войти
        </button>
      </form>
      <p className="msg">
        Для интересующихся, clientId и clientSecret я взял из расшрения для
        Chrome. Посмотреть на код сайта можно{" "}
        <a target="__blank" href="https://github.com/emwsc/ntlfxmshws">
          тут
        </a>
        .
      </p>
      {error && (
        <div className="msg">
          <p className="bold">Что-то пошло не так</p>
          <p className="error">${error}</p>
          <p>
            Ошибку можно отправить мне в{" "}
            <a href="https://twitter.com/eatmeplzzz">твиттер</a>, а еще лучше
            создать issue на{" "}
            <a target="__blank" href="https://github.com/emwsc/ntlfxmshws/issues/new">
              Github
            </a>.
          </p>
        </div>
      )}
      <style jsx>{`
        .container {
          padding: 10px;
          max-width: 700px;
        }

        .auth-form {
          display: grid;
          grid-gap: 5px;
          grid-template-columns: 200px 200px 200px;
          margin: 10px auto;
          overflow: hidden;
          position: relative;
        }

        .auth-form__login-loader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: absolute;
          right: 130px;
          width: 140px;
          color: var(--cool-grey);
          transform: ${disabled ? "translateY(0px)" : "translateY(-10px)"};
          opacity: ${disabled ? 1 : 0};
        }

        .icon {
          width: 30px;
          height: 30px;
        }

        .auth-form__login-btn {
          transition: all 0.25s ease;
          position: relative;
          transform: ${disabled ? "translateY(10px)" : "unset"};
          opacity: ${disabled ? 0 : 1};
        }

        .auth-form__input {
          border-radius: 5px;
          padding: 5px 10px;
          border: 1px solid var(--graish);
        }

        .msg {
          font-size: var(--font-size-s);
        }

        .error {
          color: var(--netflix);
        }
      `}</style>
    </section>
  );
};
