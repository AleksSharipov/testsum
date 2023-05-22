import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/authSlice/authSlice';

import styles from './profile.module.scss'

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.userData);

  return (
    <div className='wrapper'>
      <h1>Профиль</h1>
      <div className={styles.profile}>
        <h2>Name: {user.name}</h2>
        <h2>Username: {user.username}</h2>
        <h2>Email: {user.email}</h2>
        <Link
            to={'/signin'}
            className={styles.logout}
            onClick={() => dispatch(logout())}
          >
            Выйти
          </Link>
      </div>
    </div>
  )
}

export default Profile;