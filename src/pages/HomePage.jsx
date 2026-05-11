import { Link } from 'react-router-dom'
import styles from './HomePage.module.scss'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Курсовой проект</p>
        <h1 className={styles.title}>Интеллектуальный помощник студента</h1>
        <p className={styles.lead}>
          Одностраничное приложение на React: слева список учебных тем (данные
          подгружаются из XML), справа — диалог с «помощником». Тему можно не только
          выбрать для чата, но и раскрыть: появится пояснение и ссылка на внешний
          материал.
        </p>
        <div className={styles.actions}>
          <Link className={styles.primary} to="/chat">
            Открыть чат
          </Link>
       </div>
      </header>

      <section className={styles.section} aria-labelledby="how-heading">
        <h2 id="how-heading" className={styles.sectionTitle}>
          Как пользоваться
        </h2>
        <ol className={styles.steps}>
          <li>
            Перейдите в раздел «Чат» и дождитесь загрузки тем из{' '}
            <code className={styles.code}>public/data.xml</code>.
          </li>
          <li>
            Нажмите на карточку темы, чтобы выбрать её для вопросов в чате. Под
            карточкой есть «Подробнее» — откроется текст и ссылка на статью или
            документацию.
          </li>
          <li>
            Введите вопрос и отправьте сообщение (кнопка или Enter). Переписка
            сохраняется в браузере до очистки.
          </li>
        </ol>
      </section>

      <section className={styles.grid} aria-label="Возможности">
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Темы из файла</h2>
          <p className={styles.cardText}>
            Список тем читается через <code className={styles.code}>fetch</code> и{' '}
            <code className={styles.code}>DOMParser</code>. В XML есть короткое
            описание, развёрнутый текст <code className={styles.code}>
              longDescription
            </code>{' '}
            и опциональная ссылка <code className={styles.code}>materialUrl</code>.
          </p>
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Чат и память</h2>
          <p className={styles.cardText}>
            Сообщения в состоянии React и в <code className={styles.code}>
              localStorage
            </code>
            . Можно очистить переписку, скачать её JSON-файлом или скопировать
            последний ответ помощника.
          </p>
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Телефон</h2>
          <p className={styles.cardText}>
            На узком экране список тем открывается выезжающей панелью по кнопке
            «Темы», чтобы область чата оставалась удобной для чтения.
          </p>
        </article>
      </section>

      <section className={styles.section} aria-labelledby="stack-heading">
        <h2 id="stack-heading" className={styles.sectionTitle}>
          Технологии в проекте
        </h2>
        <ul className={styles.bullets}>
          <li>React 19, React Router, Vite</li>
          <li>SCSS Modules и общие переменные в styles</li>
          <li>Семантическая разметка: header, main, nav, aside</li>
        </ul>
      </section>

      <footer className={styles.footer}>
        <p>
       </p>
      </footer>
    </div>
  )
}
