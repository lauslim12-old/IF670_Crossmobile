DROP DATABASE IF EXISTS memories;
CREATE DATABASE memories;
USE memories;

CREATE TABLE memories (
  id INT NOT NULL UNIQUE AUTO_INCREMENT,
  title TEXT NOT NULL,
  type ENUM('good', 'bad') NOT NULL,
  photo TEXT NOT NULL,
  lat INT NOT NULL,
  lng INT NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE=InnoDB;

INSERT INTO memories (title, type, photo, lat, lng) VALUES
('Sample good memory', 'good', '', 120, 120),
('Sample bad memory', 'bad', '', 0, 0);