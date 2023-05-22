import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/authSlice/authSlice';

import styles from './singin.module.scss';

const Signin = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userData);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formIsValid, setFormIsValid] = useState(true);

  const [data, setData] = useState(null);

  const changeUsername = (e) => {
    setUsername(e.target.value)
  };

  const changePassword = (e) => {
    setPassword(e.target.value)
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await axios.get('http://localhost:3000/db.json')
      .then(res => {
        const result = res.data.find(i => i.username === username);
        if (result) {
          localStorage.setItem('userData', JSON.stringify(username));
          setData(result);
          setFormIsValid(true);
          setUsername('');
          setPassword('')
        } else {
          setFormIsValid(false)
        }
      })
      .catch(err => console.log(err))
  };

  useEffect(() => {
    dispatch(userData(data));
  }, [data])

  return (
    <div className='wrapper'>
      {
        user
          ?
          <h1>
            Добро пожаловать: {user.name}
          </h1>
          :
          <>
            <h1>Авторизируйтесь</h1>
            <form
              className={styles.form}
              onSubmit={handleSubmitForm}
            >
              <div className={styles.formRow}>
                <label htmlFor='login'>
                  Логин:
                </label>
                <input
                  type='text'
                  id='login'
                  value={username}
                  onChange={e => changeUsername(e)}
                  autoComplete='off'
                />
              </div>
              <div className={styles.formRow}>
                <label htmlFor='password'>
                  Пароль:
                </label>
                <input
                  type='password'
                  id='password'
                  value={password}
                  onChange={e => changePassword(e)}
                  autoComplete='off'
                />
              </div>
              {
                !formIsValid && <span>Неверный логин или пароль</span>
              }
              <button
                className={username && password ? styles.formBtn : styles.formBtnDisabled}
              >
                Войти
              </button>
            </form>
          </>
      }

    </div>
  )
}

export default Signin;