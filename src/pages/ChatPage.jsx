import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header/Header.jsx'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import ChatWindow from '../components/ChatWindow/ChatWindow.jsx'
import { fetchHelpTopics } from '../lib/fetchHelpTopics.js'
import { mockAssistantReply } from '../lib/mockAssistant.js'
import {
  loadStoredMessages,
  loadStoredTopicId,
  saveMessages,
  saveTopicId,
  clearChatStorage,
} from '../lib/chatStorage.js'
import styles from './ChatPage.module.scss'

const MAX_MESSAGE_LENGTH = 2000

export default function ChatPage() {
  const [helpTopics, setHelpTopics] = useState([])
  const [topicsLoading, setTopicsLoading] = useState(true)
  const [topicsError, setTopicsError] = useState('')
  const [selectedTopicId, setSelectedTopicId] = useState('')
  const [messages, setMessages] = useState([])
  const [assistantTyping, setAssistantTyping] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function applyTopics(topics) {
    setHelpTopics(topics)

    let selectedId = ''
    const storedTopicId = loadStoredTopicId()

    for (let i = 0; i < topics.length; i += 1) {
      if (topics[i].id === storedTopicId) {
        selectedId = storedTopicId
      }
    }

    if (selectedId === '') {
      if (topics.length > 0) {
        selectedId = topics[0].id
      }
    }

    setSelectedTopicId(selectedId)

    const storedMessages = loadStoredMessages()
    if (storedMessages.length > 0) {
      setMessages(storedMessages)
    }
  }

  useEffect(function () {
    fetchHelpTopics('/data.xml')
      .then(function (topics) {
        applyTopics(topics)
      })
      .catch(function () {
        setTopicsError('Ошибка загрузки тем')
      })
      .finally(function () {
        setTopicsLoading(false)
      })
  }, [])

  function handleRetryTopics() {
    setTopicsLoading(true)
    setTopicsError('')

    fetchHelpTopics('/data.xml')
      .then(function (topics) {
        applyTopics(topics)
      })
      .catch(function () {
        setTopicsError('Ошибка загрузки тем')
      })
      .finally(function () {
        setTopicsLoading(false)
      })
  }

  useEffect(function () {
    saveMessages(messages)
  }, [messages])

  useEffect(function () {
    saveTopicId(selectedTopicId)
  }, [selectedTopicId])

  useEffect(function () {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return function () {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  let selectedTopic = null
  for (let i = 0; i < helpTopics.length; i += 1) {
    if (helpTopics[i].id === selectedTopicId) {
      selectedTopic = helpTopics[i]
    }
  }

  function handleSelectTopic(topicId) {
    setSelectedTopicId(topicId)
    setSidebarOpen(false)
  }

  function handleClearChat() {
    setMessages([])
    clearChatStorage()
  }

  async function handleSendMessage(text) {
    const trimmed = text.trim()

    if (trimmed === '') {
      return
    }

    if (trimmed.length > MAX_MESSAGE_LENGTH) {
      return
    }

    const topicId = selectedTopicId
    const userMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: trimmed,
      createdAt: Date.now(),
      topicId: topicId,
    }

    setMessages(function (prev) {
      return [...prev, userMessage]
    })

    setAssistantTyping(true)

    try {
      const replyText = await mockAssistantReply(topicId, trimmed)
      const botMessage = {
        id: String(Date.now() + 1),
        sender: 'assistant',
        text: replyText,
        createdAt: Date.now(),
        topicId: topicId,
      }

      setMessages(function (prev) {
        return [...prev, botMessage]
      })
    } catch {
      const errorMessage = {
        id: String(Date.now() + 2),
        sender: 'assistant',
        text: 'Не удалось получить ответ. Попробуйте ещё раз.',
        createdAt: Date.now(),
        topicId: topicId,
      }

      setMessages(function (prev) {
        return [...prev, errorMessage]
      })
    }

    setAssistantTyping(false)
  }

  let sidebarClass = styles.sidebarShell
  if (sidebarOpen) {
    sidebarClass = styles.sidebarShell + ' ' + styles.sidebarShellOpen
  }

  let backdropTabIndex = -1
  let backdropOpen = 'false'
  if (sidebarOpen) {
    backdropTabIndex = 0
    backdropOpen = 'true'
  }

  return (
    <div className={styles.layout}>
      <Header
        onOpenSidebar={function () {
          setSidebarOpen(true)
        }}
        showMobileNav={true}
        homeLink={<Link to="/">На главную</Link>}
      />

      <div className={styles.body}>
        <button
          type="button"
          className={styles.backdrop}
          aria-label="Закрыть меню тем"
          tabIndex={backdropTabIndex}
          data-open={backdropOpen}
          onClick={function () {
            setSidebarOpen(false)
          }}
        />

        <div className={sidebarClass}>
          <Sidebar
            topics={helpTopics}
            selectedTopicId={selectedTopicId}
            loading={topicsLoading}
            error={topicsError}
            onSelectTopic={handleSelectTopic}
            onRetryTopics={handleRetryTopics}
          />
        </div>

        <div className={styles.chatColumn}>
          <ChatWindow
            messages={messages}
            selectedTopic={selectedTopic}
            assistantTyping={assistantTyping}
            onSendMessage={handleSendMessage}
            onClearChat={handleClearChat}
            maxMessageLength={MAX_MESSAGE_LENGTH}
          />
        </div>
      </div>
    </div>
  )
}
