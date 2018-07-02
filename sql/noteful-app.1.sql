DROP TABLE IF EXISTS notes;


CREATE TABLE notes (
  id INTEGER PRIMARY KEY,
  title text NOT NULL,
  content text,
  created DATE
);

INSERT INTO notes (id, title, content, created)
VALUES ('1001', 'Five life lessons learned from cats', 
'Lorem ipsum dolor sit amet consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created )
VALUES ('1002', 'What the government doesn''t want you to know about cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created )
VALUES ('1003', 'The most boring article about cats you''ll ever read', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created )
VALUES ('1004', 'Seven things lady gaga has in common with cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created)
VALUES ('1005', 'The most incredible article about cats you''ll ever read', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created)
VALUES ('1006', 'Ten ways cats can help you live to 100', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

INSERT INTO notes (id, title, content, created)
VALUES ('1007', 'Nine reasons you can blame the recession on cats', 
'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', CURRENT_DATE);

