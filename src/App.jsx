import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "./firebase";
import "./App.css";

function App() {
  const [testimonio, setTestimonio] = useState("");
  const [testimonios, setTestimonios] = useState([]);

  // Cargar testimonios desde Firestore
  useEffect(() => {
    const fetchTestimonios = async () => {
      const querySnapshot = await getDocs(collection(db, "testimonios"));
      const data = querySnapshot.docs.map(doc => doc.data().text);
      setTestimonios(data);
    };

    fetchTestimonios();
  }, []);

  // Enviar testimonio a Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (testimonio) {
      await addDoc(collection(db, "testimonios"), {
        text: testimonio,
      });
      setTestimonio("");
      // Recargar testimonios
      const querySnapshot = await getDocs(collection(db, "testimonios"));
      const data = querySnapshot.docs.map(doc => doc.data().text);
      setTestimonios(data);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Testimonios - Derechos Humanos UD</h1>
        <p>Comparte tu experiencia y denuncia situaciones de vulneración de derechos.</p>
      </header>

      <main>
        <section>
          <h2>Deja tu Testimonio</h2>
          <form onSubmit={handleSubmit}>
            <textarea
              value={testimonio}
              onChange={(e) => setTestimonio(e.target.value)}
              placeholder="Escribe tu testimonio aquí..."
              rows="4"
            ></textarea>
            <button type="submit">Enviar Testimonio</button>
          </form>
        </section>

        <section>
          <h2>Testimonios Recientes</h2>
          <div className="testimonios-list">
            {testimonios.map((item, index) => (
              <div key={index} className="testimonio">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2>Más Información</h2>
          <p>
            Visita la documentación oficial de Derechos Humanos de la universidad:{" "}
            <a
              href="https://bienestar.udistrital.edu.co/servicios/derechos-humanos-y-equidad-de-genero"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentación
            </a>
          </p>
          <p>Si necesitas ayuda, puedes contactar a bienestarud@udistrital.edu.co.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
