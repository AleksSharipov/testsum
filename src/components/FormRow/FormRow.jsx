import styles from './formRow.module.scss'

export const FormRow = ({htmlform, label, type, value, handleChange, isValid}) => {
  return (
    <div className={styles.formRow}>
      <label htmlFor={htmlform}>
        {label}:
      </label>
      <div className={styles.inputRow}>
        <input
          type={type}
          id={htmlform}
          autoComplete='off'
          value={value}
          onChange={handleChange}
        />
        {!isValid && value && <span>Имя от 3 до 23 символов. Только англ.</span>}
      </div>
    </div>
  )
}
