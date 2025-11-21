import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

// Acceder a la cadena de conexión desde el archivo .env
const NETLIFY_API_URL = "https://api.netlify.com/sites/{your-site-name}/db"; // Reemplaza con tu URL de API
const API_KEY = process.env.REACT_APP_NETLIFY_DB_URL;  // Usamos la variable de entorno

function App() {
  const [testimonio, setTestimonio] = useState("");
  const [testimonios, setTestimonios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Estado para cargar testimonios
  const [isAdmin, setIsAdmin] = useState(false); // Estado para el modo administrador
  const [deleteKey, setDeleteKey] = useState(""); // Almacenar la clave
  const [isKeyValid, setIsKeyValid] = useState(false); // Validación de la clave secreta
  const correctKey = "admin123"; // La clave secreta para activar el modo admin

  // Función para obtener los testimonios desde Netlify DB
  const fetchTestimonios = async () => {
    try {
      const response = await axios.get(`${NETLIFY_API_URL}/testimonios`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setTestimonios(Object.values(response.data)); // Convertir objeto a array
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los testimonios:", error);
      setIsLoading(false);
    }
  };

  // Cargar los testimonios cuando el componente se monta
  useEffect(() => {
    fetchTestimonios();
  }, []); // Solo se ejecuta cuando el componente se monta

  // Enviar un nuevo testimonio a Netlify DB
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testimonio.trim() !== "") {
      try {
        // Agregar testimonio localmente
        const nuevoTestimonio = { text: testimonio.trim() };
        setTestimonios(prevTestimonios => [...prevTestimonios, nuevoTestimonio]);

        // Enviar testimonio a Netlify DB
        const result = await axios.post(
          `${NETLIFY_API_URL}/testimonios`,
          { text: testimonio.trim() },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        console.log("Testimonio enviado:", result.data);
        setTestimonio("");  // Limpiar campo de entrada
        setIsLoading(true);  // Activar estado de carga

        // Recargar los testimonios desde Netlify DB
        fetchTestimonios();
      } catch (error) {
        console.error("Error al agregar el testimonio:", error);
      }
    }
  };

  // Eliminar un testimonio de Netlify DB
  const handleDelete = async (id) => {
    if (isAdmin) {
      try {
        // Eliminar del estado de testimonios (solo el testimonio específico)
        const testimoniosFiltrados = testimonios.filter(test => test.id !== id);
        setTestimonios(testimoniosFiltrados);  // Actualiza el estado con los testimonios restantes

        // Eliminar del Netlify DB
        await axios.delete(`${NETLIFY_API_URL}/testimonios/${id}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        console.log(`Testimonio con id ${id} eliminado de Netlify DB.`);
      } catch (error) {
        console.error("Error al eliminar el testimonio:", error);
      }
    }
  };

  // Activar el modo administrador con clave
  const handleActivateAdmin = () => {
    if (deleteKey === correctKey) {
      setIsAdmin(true);
      setIsKeyValid(true); // La clave fue validada correctamente
      setDeleteKey(""); // Limpiar la clave después de validarla
    } else {
      alert("Clave incorrecta");
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Testimonios – Derechos Humanos UD</h1>
        <p>Un espacio seguro donde puedes contar lo que viviste.</p>
      </header>

      <main className="main-content">
        <section className="section">
          <h2>Deja tu Testimonio Anónimo</h2>
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <textarea
                value={testimonio}
                onChange={(e) => setTestimonio(e.target.value)}
                placeholder="Escribe aquí lo que viviste…"
                rows="4"
                className="textarea"
              />
              <button type="submit" className="primary-btn">Enviar Testimonio</button>
            </form>
          </div>
        </section>

        <section className="section">
          <h2>Tablero de Testimonios</h2>
          <div className="board">
            {isLoading ? (
              <p>Cargando testimonios...</p>
            ) : (
              testimonios.length === 0 ? (
                <p>No hay testimonios disponibles. ¡Sé el primero en compartir!</p>
              ) : (
                testimonios.map((item) => (
                  <div key={item.id || item._id} className="postit">
                    <p>{item.text}</p>
                    {isAdmin && (
                      <button onClick={() => handleDelete(item.id || item._id)} className="delete-btn">Eliminar</button>
                    )}
                  </div>
                ))
              )
            )}
          </div>
        </section>

        <section className="section">
          <h2>Acciones Importantes</h2>
          <p>
            Si deseas reportar formalmente, haz clic en el botón a continuación:
          </p>
          <a href="https://forms.office.com/r/zPinsnJBkV" target="_blank" rel="noopener noreferrer" className="link-btn">
            <button className="primary-btn">Botón Violeta – Formulario</button>
          </a>
          <p>
            Consulta la documentación oficial sobre derechos humanos:{" "}
            <a href="https://bienestar.udistrital.edu.co/servicios/derechos-humanos-y-equidad-de-genero" target="_blank" rel="noopener noreferrer" className="link-btn">
              <button className="primary-btn">Ver Documentación</button>
            </a>
          </p>
          <p>
            Para contacto o dudas: <a href="mailto:bienestarud@udistrital.edu.co">bienestarud@udistrital.edu.co</a>
          </p>
        </section>

        {!isAdmin && !isKeyValid && (
          <section className="section">
            <h2>Activar Modo Administrador</h2>
            <input
              type="password"
              value={deleteKey}
              onChange={(e) => setDeleteKey(e.target.value)}
              placeholder="Ingresa la clave para activar el modo administrador"
              className="admin-input"
            />
            <button onClick={handleActivateAdmin} className="primary-btn">Activar Admin</button>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 Derechos Humanos - Universidad Distrital</p>
      </footer>
    </div>
  );
}

export default App;
