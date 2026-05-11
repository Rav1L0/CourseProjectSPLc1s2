import BotIcon from '../icons/BotIcon.jsx'
import styles from './Header.module.scss'

export default function Header(props) {
  const onOpenSidebar = props.onOpenSidebar
  const showMobileNav = props.showMobileNav
  const homeLink = props.homeLink

  return (
    <header className={styles.header}>
      <section className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <BotIcon size={26} />
          </div>
          <div>
            <h1 className={styles.title}>Интеллектуальный помощник студента</h1>
            <p className={styles.subtitle}>Выберите тему и задайте вопрос</p>
          </div>
        </div>

        {showMobileNav && (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.menuBtn}
              onClick={onOpenSidebar}
              aria-label="Открыть список тем"
            >
              <svg
                className={styles.menuIcon}
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className={styles.menuLabel}>Темы</span>
            </button>

            {homeLink && <span className={styles.homeWrap}>{homeLink}</span>}
          </div>
        )}
      </section>
    </header>
  )
}
