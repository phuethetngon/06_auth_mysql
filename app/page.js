import Link from "next/link";
import styles from "./home.module.css";
export default function Home() {
   return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>
          MemberSpace
        </div>

        <nav className={styles.nav}>
          <Link href="/">Home</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/dashboard">Dashboard</Link>
        </nav>
      </header>

      <section className={styles.hero}>
        <div>
          <p className={styles.eyebrow}>
            WELCOME TO MY WEB APPLICATION
          </p>

          <h1 className={styles.title}>
            A smarter way to manage your account.
          </h1>

          <p className={styles.description}>
            A modern member portal for secure
            registration, login, and personal
            account access.
          </p>

          <div className={styles.actions}>
            <Link
              href="/register"
              className={styles.primary}
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className={styles.secondary}
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className={styles.card}>
          <h2>Student Information</h2>

          <div className={styles.info}>
            <span>FIRST NAME</span>
            <strong>Phue</strong>
          </div>

          <div className={styles.info}>
            <span>LAST NAME</span>
            <strong>Thet Ngon</strong>
          </div>

          <div className={styles.info}>
            <span>STUDENT ID</span>
            <strong>6708140</strong>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        DIT205 Web Application Development
      </footer>
    </main>
    
  );
}
