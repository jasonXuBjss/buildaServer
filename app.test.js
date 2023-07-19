const request = require('supertest')
const app = require('./app')

describe('/todo', () => {

    describe('POST', () => {
        test('should respond with status code: 200', async () => {
            const res = await request(app).post('/todo').send({
                description: "read 'Head First Java'"
            })
            expect(res.statusCode).toBe(200)
        });
        test('should return json in the content type header', async () => {
            const res = await request(app).post('/todo').send({
                description: "read 'Learning Processing"
            })
            expect(res.headers['content-type']).toEqual(expect.stringContaining('json'))
        });
        test('should return with correct data type', async () => {
            const res = await request(app).post('/todo').send({
                description: "do more katas"
            })
            const id = res.body.bench_todo_id;
            const description = res.body.description
            expect(typeof(id)).toBe('number')
            expect(typeof(description)).toBe('string')          
        });
       

        test.only('should return with correct input', async () => {
            const res = await request(app).post('/todo').send({
                description: "learn typescript"
            })
           
            expect(res.body.description).toBe("learn typescript")          
        });
        
    });
    describe('GET', () => {
        test('should respond with status code: 200', async () => {
          const res = await request(app).get('/todo');
          expect(res.statusCode).toBe(200);
        });
    
        test('should return json in the content type header', async () => {
          const res = await request(app).get('/todo');
          expect(res.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    
        test('should return an array of todo items', async () => {
          const res = await request(app).get('/todo');
          expect(Array.isArray(res.body)).toBe(true);
        });
    
        test('should return todo items with correct data types', async () => {
          const res = await request(app).get('/todo');
          if (res.body.length > 0) {
            const todoItem = res.body[0];
            expect(typeof todoItem.bench_todo_id).toBe('number');
            expect(typeof todoItem.description).toBe('string');
          }
        });
    
        test('should return todo items with correct structure', async () => {
          const res = await request(app).get('/todo');
          if (res.body.length > 0) {
            const todoItem = res.body[0];
            expect(todoItem).toHaveProperty('bench_todo_id');
            expect(todoItem).toHaveProperty('description');
          }
        });
      });
    

   
});

