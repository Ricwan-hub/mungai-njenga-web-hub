import request from 'supertest';
import app from '../app.js'; // Express app
import db from '../models/index.js'; // Sequelize instance and models

const API_KEY = process.env.API_SECRET_KEY;

// Helper function to log response body on error for debugging
const logError = (res) => {
  if (res.body && Object.keys(res.body).length > 0) {
    console.error('Response body on error:', JSON.stringify(res.body, null, 2));
  }
};

describe('Testimonial API', () => {
  // beforeEach is in setupTests.js to clear Testimonial table

  describe('POST /api/testimonials', () => {
    it('should create a new testimonial with valid data and API key', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .set('X-API-KEY', API_KEY)
        .send({
          quote: 'This is a great service!',
          author: 'Satisfied Client',
          authorTitle: 'CEO of ClientCorp',
        });
      if (res.statusCode !== 201) logError(res);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.quote).toBe('This is a great service!');
      expect(res.body.authorTitle).toBe('CEO of ClientCorp');
    });

    it('should fail to create without API key', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .send({ quote: 'NoKey Testimonial', author: 'Auth Tester' });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });

    it('should fail with missing required fields (quote)', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .set('X-API-KEY', API_KEY)
        .send({ author: 'Author Only' });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Quote and author are required/i);
    });

    it('should fail with missing required fields (author)', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .set('X-API-KEY', API_KEY)
        .send({ quote: 'Quote Only' });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Quote and author are required/i);
    });

    it('should allow creation if authorTitle is null or missing', async () => {
      const res = await request(app)
        .post('/api/testimonials')
        .set('X-API-KEY', API_KEY)
        .send({
          quote: 'Great job!',
          author: 'Anonymous User',
          // authorTitle is omitted
        });
      if (res.statusCode !== 201) logError(res);
      expect(res.statusCode).toEqual(201);
      expect(res.body.author).toBe('Anonymous User');
      expect(res.body.authorTitle).toBeNull();
    });
  });

  describe('GET /api/testimonials', () => {
    beforeEach(async () => {
      await db.Testimonial.destroy({ where: {}, truncate: true, cascade: true });
      await db.Testimonial.create({ quote: 'Quote 1', author: 'Author 1', authorTitle: 'Title 1' });
      await db.Testimonial.create({ quote: 'Quote 2', author: 'Author 2', authorTitle: null });
    });

    it('should return all testimonials', async () => {
      const res = await request(app).get('/api/testimonials');
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/testimonials/:id', () => {
    let testimonial1;
    beforeEach(async () => {
      await db.Testimonial.destroy({ where: {}, truncate: true, cascade: true });
      testimonial1 = await db.Testimonial.create({ quote: 'Specific Quote', author: 'Specific Author' });
    });

    it('should return a single testimonial by id', async () => {
      const res = await request(app).get(`/api/testimonials/${testimonial1.id}`);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', testimonial1.id);
    });

    it('should return 404 if testimonial not found', async () => {
      const res = await request(app).get(`/api/testimonials/${testimonial1.id + 999}`);
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /api/testimonials/:id', () => {
    let testimonialToUpdate;
    beforeEach(async () => {
      await db.Testimonial.destroy({ where: {}, truncate: true, cascade: true });
      testimonialToUpdate = await db.Testimonial.create({ quote: 'Original Quote', author: 'Original Author', authorTitle: 'Original Title' });
    });

    it('should update an existing testimonial', async () => {
      const res = await request(app)
        .put(`/api/testimonials/${testimonialToUpdate.id}`)
        .set('X-API-KEY', API_KEY)
        .send({ quote: 'Updated Quote', author: 'Updated Author', authorTitle: 'Updated Title' });
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.quote).toBe('Updated Quote');
      expect(res.body.authorTitle).toBe('Updated Title');
    });

    it('should fail to update without API key', async () => {
      const res = await request(app)
        .put(`/api/testimonials/${testimonialToUpdate.id}`)
        .send({ quote: 'Attempted Update' });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });
  });

  describe('DELETE /api/testimonials/:id', () => {
    let testimonialToDelete;
    beforeEach(async () => {
      await db.Testimonial.destroy({ where: {}, truncate: true, cascade: true });
      testimonialToDelete = await db.Testimonial.create({ quote: 'To Delete', author: 'Temp Author' });
    });

    it('should delete an existing testimonial', async () => {
      const res = await request(app)
        .delete(`/api/testimonials/${testimonialToDelete.id}`)
        .set('X-API-KEY', API_KEY);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toMatch(/Testimonial deleted successfully/i);

      const findRes = await request(app).get(`/api/testimonials/${testimonialToDelete.id}`);
      if (findRes.statusCode !== 404) logError(findRes);
      expect(findRes.statusCode).toEqual(404);
    });

    it('should fail to delete without API key', async () => {
      const res = await request(app).delete(`/api/testimonials/${testimonialToDelete.id}`);
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });
  });
});
