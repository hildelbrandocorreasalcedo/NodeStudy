import mysql from 'mysql2/promise'

const config = {
    host: 'localhost',
    user: 'root',
    port: '3306',
    password: '',
    database: 'moviesdb'
}

const connection = await mysql.createConnection(config) // Corregido 'conncetion' a 'connection'

export class MovieModel {

    // Mostrar todas las películas y filtrar por género si se proporciona
    static async getAll({ genre }) {
        try {
        // Si se proporciona un género, realizar el filtro
        if (genre) {
            const lowerCaseGenre = genre.toLowerCase();
    
            // Obtener el ID del género correspondiente
            const [genres] = await connection.query(
            'SELECT id FROM genre WHERE LOWER(name) = ?;',
            [lowerCaseGenre]
            );
    
            // Si no se encontró el género, devolver un mensaje de error
            if (genres.length === 0) {
            return { error: 'Genre not found' };
            }
    
            // Obtener el id del género
            const [{ id: genreId }] = genres;
    
            // Obtener las películas que tienen el género especificado usando un JOIN
            const [movies] = await connection.query(
            `SELECT m.title, m.year, m.director, m.duration, m.poster, m.rate, CAST(m.id AS CHAR) as id
            FROM movie m
            JOIN movie_genres mg ON m.id = mg.movie_id
            WHERE mg.genre_id = ?;`,
            [genreId]
            );
            return movies;
        }
    
        // Si no se proporciona un género, devolver todas las películas
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, CAST(id AS CHAR) as id FROM movie;'
        );
    
        return movies;
    
        } catch (error) {
        return { error: 'An error occurred while fetching movies' };
        }
    }
  


    // Buscar por id de pelicula
    static async getById ({ id }) {
        const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, CAST(id AS CHAR) as id FROM movie WHERE id = CAST(? AS CHAR);', 
            [id]) 

            if(movies.length === 0) return null

        return movies[0];
    }



    // Crear una pelicula
    static async create({ input }) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input;
    
        // Generar el UUID
        const [uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{ uuid }] = uuidResult;
    
        try {
        // Validar si ya existe una película con el mismo título
        const [existingMovies] = await connection.query(
            'SELECT title FROM movie WHERE title = ?;',
            [title]
        );
    
        if (existingMovies.length > 0) {
            // En lugar de lanzar un error, devuelves un valor o manejas la respuesta en el controlador
            return { error: true, message: 'A movie with this title already exists. Please choose a different title.' };
        }
    
        // Insertar nueva película si el título es único
        await connection.query(
            `INSERT INTO movie (id, title, year, director, duration, poster, rate)
            VALUES (CAST("${uuid}" AS CHAR), ?, ?, ?, ?, ?, ?);`,
            [title, year, director, duration, poster, rate]
        );
    
        // Obtener y devolver la película recién creada
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, CAST(id AS CHAR) as id FROM movie WHERE id = CAST(? AS CHAR);',
            [uuid]
        );
    
        return movies[0];
    
        } catch (error) {
        // Capturar cualquier otro error inesperado sin exponer detalles sensibles
        console.error('Error creating movie:', error);
        throw new Error('Error creating movie');
        }
    }
  


    // eliminar una pelicula
    static async delete ({ id }) {
        const [result] = await connection.query(
          'DELETE FROM movie WHERE id = CAST(? AS CHAR);',
          [id]
        );
    
        // Si no se eliminó ninguna fila, significa que no se encontró la película
        if (result.affectedRows === 0) {
          return false;
        }
        return true;
    }
    

    // Modificar una pelicula
    static async update ({ id, input }) {
        const {
            genre: genreInput,
            title,
            year,
            duration,
            director,
            rate,
            poster
        } = input;

        // Ejecutar la consulta de actualización
        const [result] = await connection.query(
            `UPDATE movie
            SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ?
            WHERE id = CAST(? AS CHAR);`,
            [title, year, director, duration, poster, rate, id]
        );

        // Verificar si se modificó alguna fila
        if (result.affectedRows === 0) {
            return null; // No se encontró la película con el ID dado
        }

        // Retornar la película actualizada
        const [movies] = await connection.query(
            'SELECT title, year, director, duration, poster, rate, CAST(id AS CHAR) as id FROM movie WHERE id = CAST(? AS CHAR);',
            [id]
        );
        return movies[0]; // Retornar la película actualizada
    }
}