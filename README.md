# Интеллектуальный помощник студента (React)

Два экрана: **главная** (`/`) с описанием и **чат** (`/chat`) — темы из `public/data.xml`, переписка, сохранение в `localStorage`, на телефоне список тем открывается выдвижной панелью.

Ответы помощника сейчас **локальная заглушка** (`src/lib/mockAssistant.js`): имитация задержки и короткий текст по теме. Подключение реальной языковой модели можно добавить позже через backend (ключ не хранить во фронтенде).

## Запуск

```bash
npm install
npm run dev
```

```bash
npm run build
npm run lint
```

## Маршруты

| Путь    | Назначение              |
| ------- | ----------------------- |
| `/`     | Текстовая главная страница |
| `/chat` | Чат с темами и сообщениями |

## Функции чата

- **Скачать чат (JSON)** — экспорт темы и сообщений.
- **Копировать последний ответ** — в буфер обмена (если браузер разрешит).
- **Очистить чат** — и запись в `localStorage`.

## Структура проекта

- `src/App.jsx` — маршруты (`react-router-dom`).
- `src/pages/HomePage.jsx` — главная страница.
- `src/pages/ChatPage.jsx` — логика чата, XML, drawer на мобилке.
- `src/lib/fetchHelpTopics.js` — `fetch` + `DOMParser` для XML.
- `src/lib/mockAssistant.js` — заглушка ответов помощника.
- `src/lib/chatStorage.js` — `localStorage`, очистка чата.
- `src/components/*` — UI + SCSS Modules, переменные в `src/styles/variables.scss`.
- `public/data.xml` — темы помощи.

## Формат `data.xml`

```xml
<helpTopics>
  <topic id="уникальный-id">
    <title>Заголовок</title>
    <description>Краткое описание темы</description>
  </topic>
</helpTopics>
```
