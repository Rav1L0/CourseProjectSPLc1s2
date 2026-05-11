import { useState } from 'react'
import SendIcon from '../icons/SendIcon.jsx'
import styles from './MessageInput.module.scss'

export default function MessageInput(props) {
  const onSend = props.onSend
  const disabled = props.disabled
  const maxLength = props.maxLength

  const [value, setValue] = useState('')

  const tooLong = value.length > maxLength
  const empty = value.trim() === ''
  const canSend = !disabled && !tooLong && !empty

  function submit() {
    if (!canSend) {
      return
    }

    onSend(value)
    setValue('')
  }

  let hintClass = ''
  let hintText = 'Введите вопрос'

  if (tooLong) {
    hintClass = styles.error
    hintText = 'Слишком длинное сообщение'
  }

  return (
    <section className={styles.wrap} aria-label="Ввод сообщения">
      <div className={styles.leftCol}>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="Ваш вопрос... Enter — отправить"
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          onChange={function (e) {
            setValue(e.target.value)
          }}
          onKeyDown={function (e) {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault()
              submit()
            }
          }}
          aria-label="Поле ввода сообщения"
        />

        <div className={styles.hintRow}>
          <span className={hintClass}>{hintText}</span>
          <span>
            {value.length} / {maxLength}
          </span>
        </div>
      </div>

      <button
        type="button"
        className={styles.sendButton}
        onClick={submit}
        disabled={!canSend}
        aria-label="Отправить сообщение"
      >
        <SendIcon />
      </button>
    </section>
  )
}
