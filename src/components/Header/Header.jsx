import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice/authSlice';

import style from './header.module.scss';

export const Header = () => {

  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userData);

  return (
    <header className={style.header}>
      <div className={style.wrapper}>
        <Link to={'/'} className={style.link}>Главная</Link>
        {
          user
            ?
            <Link to={'/profile'} className={style.link}>Регистрация</Link>
            :
            <Link to={'/registration'} className={style.link}>Регистрация</Link>
        }
        <Link to={'/profile'} className={style.link}>Профиль</Link>
        {user
          ?
          <Link
            to={'/signin'}
            className={style.authorization}
            onClick={() => dispatch(logout())}
          >
            Выйти
          </Link>
          :
          <Link to={'/signin'} className={style.authorization}>Войти</Link>}
      </div>
    </header >
  )
}
