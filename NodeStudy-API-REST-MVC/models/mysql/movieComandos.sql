-- // Creacion de la base de datos
-- CREATE DATABASE moviesdb;
CREATE DATABASE IF NOT EXISTS moviesdb;

-- // usar la base de datos
USE moviesdb;

-- // Crear la tabla movie
CREATE TABLE movie (
	id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) UNIQUE NOT NULL,
    year INT NOT NULL,
    director VARCHAR(255) NOT NULL,
    duration INT NOT NULL,
    poster TEXT, 
    rate DECIMAL(2,1) unsigned NOT NULL
);


-- // Crear la tabla genre
CREATE TABLE genre (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE
);

-- // Crear la tabla movie_genres
CREATE TABLE movie_genres (
	movie_id BINARY(16) REFERENCES movies(id),
    genre_id INT REFERENCES genres(id),
    PRIMARY KEY (movie_id, genre_id)
);

-- // Crear la tabla genero
INSERT INTO genre (name) VALUES
('Drama'),
('Action'),
('Crime'),
('Adventure'),
('Scri-Fi'),
('Romance');

-- // Insertar películas
INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES 
(UUID(), "Inception", 2010, "Christopher Nolan", 180, "https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg", 8.8),
(UUID(), "The Shawshank Redemption", 1994, "Frank Darabont", 142, "https://i.ebayimg.com/images/g/4goAAOSwMyBe7hnQ/s-l1200.webp", 9.3),
(UUID(), "The Dark Knight", 2008, "Christopher Nolan", 152, "https://i.ebayimg.com/images/g/yokAAOSw8w1YARbm/s-l1200.jpg", 9.0);

-- // Insertar relaciones entre películas y géneros
INSERT INTO movie_genres (movie_id, genre_id)
VALUES
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Sci-Fi')),
	((SELECT id FROM movie WHERE title = 'Inception'), (SELECT id FROM genre WHERE name = 'Action')),
	((SELECT id FROM movie WHERE title = 'The Shawshank Redemption'), (SELECT id FROM genre WHERE name = 'Drama')),
	((SELECT id FROM movie WHERE title = 'The Dark Knight'), (SELECT id FROM genre WHERE name = 'Action'));


-- // Mostrar todas las películas
SELECT * FROM movie;
SELECT title, year, director, duration, poster, CAST(id AS CHAR) as id FROM movie; 
SELECT * FROM genre;
SELECT * FROM movie_genres;

-- // te crear un identificado unico
SELECT UUID() uuid;


-- // Para eliminar tablas
-- DROP TABLE movie;
-- DROP TABLE genre;
-- DROP TABLE movie_genres;


-- // Es para hacer unico el titulo y alterar la tabla 
-- ALTER TABLE movie
-- ADD CONSTRAINT unique_title UNIQUE (title);




