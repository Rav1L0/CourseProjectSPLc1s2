import { useEffect, useRef, useState } from 'react'
import MessageInput from '../MessageInput/MessageInput.jsx'
import styles from './ChatWindow.module.scss'

export default function ChatWindow(props) {
  const messages = props.messages
  const selectedTopic = props.selectedTopic
  const assistantTyping = props.assistantTyping
  const onSendMessage = props.onSendMessage
  const onClearChat = props.onClearChat
  const maxMessageLength = props.maxMessageLength

  const messagesScrollRef = useRef(null)
  const [hintText, setHintText] = useState('')

  useEffect(function () {
    const box = messagesScrollRef.current
    if (box) {
      box.scrollTop = box.scrollHeight
    }
  }, [messages, assistantTyping])

  function getLastAssistantText() {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i].sender === 'assistant') {
        return messages[i].text
      }
    }
    return ''
  }

  function handleExport() {
    const payload = {
      exportedAt: new Date().toISOString(),
      topic: selectedTopic,
      messages: messages,
    }

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json;charset=utf-8',
    })

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'chat-export-' + Date.now() + '.json'
    link.click()
    URL.revokeObjectURL(url)

    setHintText('Файл сохранён')
    setTimeout(function () {
      setHintText('')
    }, 2000)
  }

  async function handleCopyLastAssistant() {
    const text = getLastAssistantText()

    if (text === '') {
      setHintText('Пока нет ответа помощника')
      setTimeout(function () {
        setHintText('')
      }, 2000)
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setHintText('Последний ответ скопирован')
    } catch {
      setHintText('Не удалось скопировать')
    }

    setTimeout(function () {
      setHintText('')
    }, 2000)
  }

  let topicTitle = 'Выберите тему слева'
  if (selectedTopic) {
    topicTitle = 'Тема: ' + selectedTopic.title
  }

  const lastAssistantText = getLastAssistantText()

  return (
    <main className={styles.main} aria-label="Чат">
      <section className={styles.topBar} aria-label="Тема и действия">
        <div className={styles.topRow}>
          <div className={styles.topicBadge}>{topicTitle}</div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.toolBtn}
              onClick={handleExport}
              disabled={assistantTyping || messages.length === 0}
            >
              Скачать чат
            </button>

            <button
              type="button"
              className={styles.toolBtn}
              onClick={handleCopyLastAssistant}
              disabled={assistantTyping || lastAssistantText === ''}
            >
              Копировать ответ
            </button>

            <button
              type="button"
              className={styles.toolBtn + ' ' + styles.toolBtnDanger}
              onClick={onClearChat}
              disabled={assistantTyping}
            >
              Очистить чат
            </button>
          </div>
        </div>

        {hintText !== '' && (
          <p className={styles.copyHint} role="status" aria-live="polite">
            {hintText}
          </p>
        )}
      </section>

      <section
        ref={messagesScrollRef}
        className={styles.messages}
        aria-label="Сообщения"
      >
        {messages.length === 0 && !assistantTyping && (
          <div className={styles.empty}>
            Напишите вопрос ниже и нажмите Enter.
          </div>
        )}

        {messages.map(function (m) {
          let rowClass = styles.messageRow + ' ' + styles.assistant
          if (m.sender === 'user') {
            rowClass = styles.messageRow + ' ' + styles.user
          }

          return (
            <div key={m.id} className={rowClass}>
              <div className={styles.bubble}>{m.text}</div>
            </div>
          )
        })}

        {assistantTyping && <div className={styles.typing}>Помощник печатает...</div>}
      </section>

      <MessageInput
        onSend={onSendMessage}
        disabled={assistantTyping}
        maxLength={maxMessageLength}
      />
    </main>
  )
}
