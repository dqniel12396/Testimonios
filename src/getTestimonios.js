// functions/getTestimonios.js
const { neon } = require("@neondatabase/serverless");

exports.handler = async function(event, context) {
  // Usar la variable de entorno para la conexión
  const sql = neon(process.env.NETLIFY_DATABASE_URL); // La URL de la base de datos se obtiene desde las variables de entorno
  
  try {
    const testimonios = await sql`SELECT * FROM testimonios`;
    
    // Devuelve los datos de la base de datos como JSON
    return {
      statusCode: 200,
      body: JSON.stringify(testimonios),
    };
  } catch (error) {
    console.error("Error al obtener los testimonios:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error al consultar la base de datos" }),
    };
  }
};
