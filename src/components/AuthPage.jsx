import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import styled from 'styled-components';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Button = styled.button`
  margin-right: 25px;
`;

export const AuthPage = () => {

  const auth = useContext(AuthContext);

  const message = useMessage();
  const { loading, error, request } = useHttp();

  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    message(error);
  }, [error, message]);

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form});
      message(data.message);
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form});
      auth.login(data.token, data.userId);
    } catch (e) {}
  }

  return (
    <Container className="row valign-wrapper">
      <div className="col s4 offset-s4">
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title center-align">Авторизация</span>

            <div className="input-field">
              <input placeholder="Введите email" id="email" type="text" name="email" onChange={changeHandler} />
              <label htmlFor="email">Email</label>
            </div>

            <div className="input-field">
              <input placeholder="Введите пароль" id="password" type="password" name="password" onChange={changeHandler} />
              <label htmlFor="password">Пароль</label>
            </div>
          </div>
          <div className="card-action">
            <Button className="btn yellow darken-4" onClick={loginHandler} disabled={loading}>Войти</Button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Регистрация</button>
          </div>
        </div>
      </div>
    </Container>
  )
}