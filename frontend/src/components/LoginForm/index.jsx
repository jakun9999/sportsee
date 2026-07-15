import styles from "./style.module.css";

function LoginForm() {
  return (
    <div className={styles.loginForm}>
      <h1 className={`heading-3 ${styles.title}`}>
        Transformez
        <br /> vos stats en résultats
      </h1>
      <h2 className={`heading-4 ${styles.connection}`}>Se connecter</h2>
      <form action="">
        <label htmlFor="" className={styles.label}>
          Adresse email
        </label>
        <input type="text" className={`input-default ${styles.inputEmail}`} />
        <label htmlFor="" className={styles.label}>
          Mot de passe
        </label>
        <input type="" className={`input-default ${styles.inputPassword}`} />
        <button className={`btn btn-default ${styles.button}`}>
          Se connecter
        </button>
      </form>
      <p className={`body-default ${styles.forgotPassword}`}>
        Mot de passe oublié ?
      </p>
    </div>
  );
}

export default LoginForm;
