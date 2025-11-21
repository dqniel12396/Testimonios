import React from "react";
import "./App.css";

function App() {
  return (
    <div>
      <header className="header">
        <h1>Testimonios Anonimos – Derechos Humanos UD</h1>
        <p>Un espacio seguro donde puedes contar lo que viviste.</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>Accede a los Formularios y Testimonios Anonimos</h2>
          <div>
            <a href="https://forms.gle/zC7xS1dy8UrRAWzx9" target="_blank" rel="noopener noreferrer">
              <button className="primary-btn">Ir al Formulario de Testimonios</button>
            </a>
            <a href="https://docs.google.com/spreadsheets/d/1Y9zj9GNIw-Q8uGuJm_4jHy-_r2hAmlb-ulD9rlENvGQ/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
              <button className="primary-btn">Ver Testimonios en Google Sheets</button>
            </a>
          </div>
        </section>

        <section className="section">
          <h2>Información Básica sobre Derechos Humanos</h2>
          <p>
            Los Derechos Humanos son los derechos y libertades que nos corresponden a todos por el hecho de ser humanos. Son universales, inalienables e indivisibles. Cada ser humano tiene derecho a vivir con dignidad, libertad y justicia.
          </p>
          <p>
            Principales derechos humanos incluyen:
            <ul>
              <li>El derecho a la vida, la libertad y la seguridad.</li>
              <li>El derecho a la educación, la salud y la igualdad ante la ley.</li>
              <li>El derecho a un trato justo y sin discriminación.</li>
            </ul>
          </p>
          <p>
            Para más información, puedes consultar la Declaración Universal de los Derechos Humanos de la ONU.
          </p>
        </section>

        <section className="section">
          <h2>Información de Contacto</h2>
          <p>
            Para consultas o más información, puedes ponerte en contacto con el área de Bienestar Universitario:
            <br />
            Email: <a href="mailto:bienestarud@udistrital.edu.co">bienestarud@udistrital.edu.co</a>
          </p>
          <p>
            Consulta la documentación oficial sobre derechos humanos en la Universidad Distrital en el siguiente enlace:
            <br />
            <a href="https://bienestar.udistrital.edu.co/servicios/derechos-humanos-y-equidad-de-genero" target="_blank" rel="noopener noreferrer">
              Ver Documentación
            </a>
          </p>
          <p>
            Si deseas reportar formalmente, haz clic en el botón a continuación:
          </p>
          <a href="https://forms.office.com/r/zPinsnJBkV" target="_blank" rel="noopener noreferrer" className="link-btn">
            <button className="primary-btn">Botón Violeta – Formulario</button>
          </a>
        </section>
      </main>

      <footer className="footer">
        <p>&copy; 2025 Derechos Humanos - Universidad Distrital</p>
      </footer>
    </div>
  );
}

export default App;
