import styles from "./style.module.css";
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

/**
 * Formulaire de connexion affiché dans la page Home.
 *
 * @example
 * <LoginForm />
 */
function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Appel de la fonction login du context auth
      // pour générer un token afin de discuter avec
      // le backend.
      await login({ username, password });

      navigate("/dashboard");
    } catch (err) {
      setError("Identifiants incorrects ou serveur injoignable.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.loginForm}>
      <h1 className={`heading-3 ${styles.title}`}>
        Transformez
        <br /> vos stats en résultats
      </h1>
      <h2 className={`heading-4 ${styles.connection}`}>Se connecter</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" className={styles.label}>
          Adresse email
        </label>
        <input
          id="username"
          type="text"
          className={`input-default ${styles.inputEmail}`}
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <label htmlFor="password" className={styles.label}>
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          className={`input-default ${styles.inputPassword}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isSubmitting}
        />
        <button className={`btn btn-default ${styles.button}`}>
          {isSubmitting ? "Connexion en cours..." : "Se connecter"}
        </button>
        <label htmlFor="">{error}</label>
      </form>
      <p className={`body-default ${styles.forgotPassword}`}>
        Mot de passe oublié ?
      </p>
    </div>
  );
}

export default LoginForm;
