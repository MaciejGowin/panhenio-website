import styles from './Illustration.module.css'

export default function Illustration() {
  return (
    <div className={styles.wrapper}>
      <img src="/panhenio-banner.png" alt="Pan Henio" className={styles.banner} />
    </div>
  )
}
