const DELAY_MS = 700

const TOPIC_ANSWERS = {
  'react-state':
    'useState хранит значение между рендерами. Когда вызываем setState, React обновляет компонент.',
  'components-architecture':
    'Лучше делить интерфейс на маленькие части: Header, Sidebar, ChatWindow и так далее.',
  'xml-parsing':
    'Сначала fetch получает XML как текст. Потом DOMParser превращает текст в документ.',
  'scss-modules':
    'SCSS Modules нужны, чтобы стили компонентов не конфликтовали между собой.',
  accessibility:
    'Используйте семантические теги и aria-label, тогда сайт проще читать скринридером.',
  'chat-logic':
    'Сообщения лучше хранить в массиве useState и рисовать через map.',
  'js-basics':
    'Потренируйтесь с массивами и функциями — в React это используется постоянно.',
  'html-css-basics':
    'Сначала разметка HTML, потом стили CSS. Так проще не запутаться.',
  'git-intro':
    'Делайте коммиты с понятным текстом и сохраняйте проект в репозитории.',
  'exam-prep':
    'Составьте список тем и учите по чуть-чуть каждый день — так спокойнее.',
}

export function mockAssistantReply(topicId, userText) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      const text = userText.trim()

      if (text.length < 3) {
        resolve('Напишите вопрос подробнее.')
        return
      }

      if (TOPIC_ANSWERS[topicId]) {
        resolve(TOPIC_ANSWERS[topicId])
      } else {
        resolve('Спасибо за вопрос. Попробуйте уточнить, что именно не получается.')
      }
    }, DELAY_MS)
  })
}
