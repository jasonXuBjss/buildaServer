CREATE DATABASE bench_todo;

DROP TABLE IF EXISTS bench_todo;
CREATE TABLE bench_todo(
    bench_todo_id SERIAL PRIMARY KEY,
    description VARCHAR(300)
); 