import { Link } from 'react-router-dom'
import styles from './successRegistration.module.scss'

const SuccessRegistration = () => {
  return (
    <div className='wrapper'>
      <h1>Вы успешно зарегистрировались!</h1>
      <p>Нажмите "Войти" для авторизации.</p>
      <Link to={'/signin'} className={styles.authorization}>Войти</Link>
    </div>
  )
}

export default SuccessRegistration;