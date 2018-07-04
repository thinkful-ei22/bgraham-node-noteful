DROP TABLE IF EXISTS notes;


CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  title text NOT NULL,
  content text,
  created timestamp DEFAULT now()
);

INSERT INTO notes (title, content)
VALUES ( 'Five life lessons learned from cats', 
'Lorem ipsum dolor sit amet consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ('What the government doesn''t want you to know about cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ('The most boring article about cats you''ll ever read', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ('Seven things lady gaga has in common with cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ( 'The most incredible article about cats you''ll ever read', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ( 'Ten ways cats can help you live to 100', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

INSERT INTO notes ( title, content)
VALUES ('Nine reasons you can blame the recession on cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

