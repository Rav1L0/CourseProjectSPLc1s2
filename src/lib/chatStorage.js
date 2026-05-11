const KEY_MESSAGES = 'student-assistant-messages'
const KEY_TOPIC = 'student-assistant-topic-id'

export function loadStoredMessages() {
  const raw = localStorage.getItem(KEY_MESSAGES)

  if (!raw) {
    return []
  }

  const data = JSON.parse(raw)

  if (Array.isArray(data)) {
    return data
  }

  return []
}

export function saveMessages(messages) {
  localStorage.setItem(KEY_MESSAGES, JSON.stringify(messages))
}

export function loadStoredTopicId() {
  const topicId = localStorage.getItem(KEY_TOPIC)

  if (topicId) {
    return topicId
  }

  return ''
}

export function saveTopicId(topicId) {
  if (topicId) {
    localStorage.setItem(KEY_TOPIC, topicId)
  } else {
    localStorage.removeItem(KEY_TOPIC)
  }
}

export function clearChatStorage() {
  localStorage.removeItem(KEY_MESSAGES)
  localStorage.removeItem(KEY_TOPIC)
}
