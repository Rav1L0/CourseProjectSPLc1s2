import { useState } from 'react'
import TopicIcon from '../icons/TopicIcon.jsx'
import styles from './Sidebar.module.scss'

export default function Sidebar(props) {
  const topics = props.topics
  const selectedTopicId = props.selectedTopicId
  const loading = props.loading
  const error = props.error
  const onSelectTopic = props.onSelectTopic
  const onRetryTopics = props.onRetryTopics

  const [expandedTopicId, setExpandedTopicId] = useState('')

  let loadingText = ''
  if (loading) {
    loadingText = 'Загрузка...'
  }

  function toggleDetails(topicId, event) {
    event.stopPropagation()
    if (expandedTopicId === topicId) {
      setExpandedTopicId('')
    } else {
      setExpandedTopicId(topicId)
    }
  }

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav} aria-label="Темы помощи">
        <div className={styles.headingRow}>
          <h2 className={styles.heading}>Темы помощи</h2>
          <div className={styles.status}>{loadingText}</div>
        </div>

        {error !== '' && (
          <div>
            <p className={styles.empty}>Ошибка: {error}</p>
            <button
              type="button"
              className={styles.retryButton}
              onClick={onRetryTopics}
            >
              Повторить загрузку
            </button>
          </div>
        )}

        <ul className={styles.list}>
          {topics.length === 0 && !loading && error === '' && (
            <li className={styles.empty}>Темы не найдены.</li>
          )}

          {topics.map(function (topic) {
            const active = topic.id === selectedTopicId
            const expanded = expandedTopicId === topic.id

            let buttonClass = styles.topicButton
            if (active) {
              buttonClass = styles.topicButton + ' ' + styles.topicButtonActive
            }

            let currentValue
            if (active) {
              currentValue = 'page'
            }

            let longText = topic.longDescription
            if (!longText) {
              longText = ''
            }

            let materialUrl = topic.materialUrl
            if (!materialUrl) {
              materialUrl = ''
            }

            let toggleLabel = 'Подробнее'
            if (expanded) {
              toggleLabel = 'Скрыть'
            }

            return (
              <li key={topic.id} className={styles.topicRow}>
                <div className={styles.topicRowInner}>
                  <button
                    type="button"
                    className={buttonClass}
                    onClick={function () {
                      onSelectTopic(topic.id)
                      setExpandedTopicId(topic.id)
                    }}
                    disabled={loading}
                    aria-current={currentValue}
                  >
                    <span className={styles.topicIcon}>
                      <TopicIcon />
                    </span>
                    <span className={styles.topicText}>
                      <p className={styles.topicTitle}>{topic.title}</p>
                      {topic.description !== '' && (
                        <p className={styles.topicDescription}>
                          {topic.description}
                        </p>
                      )}
                    </span>
                  </button>
                  <button
                    type="button"
                    className={styles.detailsToggle}
                    onClick={function (e) {
                      toggleDetails(topic.id, e)
                    }}
                    disabled={loading}
                    aria-expanded={expanded}
                  >
                    {toggleLabel}
                  </button>
                </div>

                {expanded && (
                  <div
                    id={'topic-details-' + topic.id}
                    className={styles.topicDetails}
                    role="region"
                    aria-label={'Подробности: ' + topic.title}
                  >
                    {longText !== '' && (
                      <p className={styles.detailText}>{longText}</p>
                    )}
                    {materialUrl !== '' && (
                      <a
                        className={styles.materialLink}
                        href={materialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Материал по теме (откроется в новой вкладке)
                      </a>
                    )}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
