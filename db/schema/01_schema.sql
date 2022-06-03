-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS pins CASCADE;
-- DROP TABLE IF EXISTS maps CASCADE;
-- DROP TABLE IF EXISTS map_pins CASCADE;
-- DROP TABLE IF EXISTS fav_maps CASCADE;

-- CREATE TABLE users (
--   id SERIAL PRIMARY KEY,
--   username VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   location point NOT NULL
-- )

-- CREATE TABLE pins (
--   id SERIAL PRIMARY KEY NOT NULL,
--   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   image_url VARCHAR(255),
--   location point NOT NULL
-- );

-- CREATE TABLE maps (
--   id SERIAL PRIMARY KEY NOT NULL,
--   owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
--   name VARCHAR(255) NOT NULL,
--   location point NOT NULL
-- );

-- CREATE TABLE maps_pins (
--   id SERIAL PRIMARY KEY NOT NULL,
--   map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
--   pin_id INTEGER REFERENCES pins(id) ON DELETE CASCADE
-- );

-- CREATE TABLE fav_maps (
--   id SERIAL PRIMARY KEY NOT NULL,
--   map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
--   user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
-- );
