import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

import { useState, useEffect, useCallback } from 'react';
import { USER_REGEX } from '../../utils/reg';

import styles from './registration.module.scss';
import { FormRow } from '../../components/FormRow/FormRow';

const Registration = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.userData);

  const [username, setUsername] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);

  const [login, setLogin] = useState('');
  const [isValidLogin, setIsValidLogin] = useState(false);

  const [password, setPassword] = useState('');
  const [isValidPassword, setIsValidPassword] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);

  const [userInDB, setUserInDB] = useState(false);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (isValidUsername && isValidLogin && isValidPassword && validMatch) {

      await axios.get('http://localhost:3000/db.json')
        .then(res => {
          const result = res.data.find(i => i.username === login);
          if (result) {
            setUserInDB(true);
          } else {
            setUserInDB(false);
            setUsername('');
            setLogin('');
            setPassword('');
            setMatchPwd('');
            navigate('/success')
          }
        })
        .catch(err => console.log(err))
    }
  };


  useEffect(() => {
    setIsValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setIsValidLogin(USER_REGEX.test(login));
  }, [login])

  useEffect(() => {
    setIsValidPassword(password.length > 7);
    setValidMatch(password === matchPwd);
  }, [password, matchPwd])



  if (user) {
    return navigate('/profile');
  }

  return (
    <div className='wrapper'>
      <h1>Форма регистрация</h1>
      {
        userInDB && <p>Пользователь с таким логином уже зарегистрирован</p>
      }
      <form
        className={styles.form}
        onSubmit={handleSubmitForm}
      >
        <FormRow
          htmlform={'username'}
          label={'Имя'}
          type={'text'}
          value={username}
          handleChange={e => setUsername(e.target.value)}
          isValid={isValidUsername}
        />
        <FormRow
          htmlform={'login'}
          label={'Логин'}
          type={'text'}
          value={login}
          handleChange={e => setLogin(e.target.value)}
          isValid={isValidLogin}
        />
        <FormRow
          htmlform={'password'}
          label={'Пароль'}
          type={'password'}
          value={password}
          handleChange={e => setPassword(e.target.value)}
          isValid={isValidPassword}
        />
        <FormRow
          htmlform={'confirm_pwd'}
          label={'Подтвердите пароль'}
          type={'password'}
          value={matchPwd}
          handleChange={(e) => setMatchPwd(e.target.value)}
          isValid={validMatch}
        />
        <button
          className={isValidUsername && isValidLogin && isValidPassword && validMatch ? styles.formBtn : styles.formBtnDisabled}
        >
          Зарегистрироваться
        </button>
      </form>
    </div>
  )
}

export default Registration;