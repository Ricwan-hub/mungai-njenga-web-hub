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

describe('Practice Area API', () => {
  // beforeEach is in setupTests.js to clear PracticeArea table

  describe('POST /api/practice-areas', () => {
    it('should create a new practice area with valid data and API key', async () => {
      const res = await request(app)
        .post('/api/practice-areas')
        .set('X-API-KEY', API_KEY)
        .send({
          title: 'New Area',
          description: 'Description for new area.',
          icon: 'Briefcase', // Assuming icon is a string
        });
      if (res.statusCode !== 201) logError(res);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('New Area');
      expect(res.body.icon).toBe('Briefcase');
    });

    it('should fail to create without API key', async () => {
      const res = await request(app)
        .post('/api/practice-areas')
        .send({ title: 'NoKey Area', description: 'Desc' });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });

    it('should fail with missing required fields (title)', async () => {
      const res = await request(app)
        .post('/api/practice-areas')
        .set('X-API-KEY', API_KEY)
        .send({ description: 'Desc only' });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Title and description are required/i);
    });

    it('should fail with missing required fields (description)', async () => {
      const res = await request(app)
        .post('/api/practice-areas')
        .set('X-API-KEY', API_KEY)
        .send({ title: 'Title only' });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Title and description are required/i);
    });

    it('should allow creation if icon is null or missing', async () => {
      const res = await request(app)
        .post('/api/practice-areas')
        .set('X-API-KEY', API_KEY)
        .send({
          title: 'Iconless Area',
          description: 'This area has no icon.',
          // icon is omitted or can be null
        });
      if (res.statusCode !== 201) logError(res);
      expect(res.statusCode).toEqual(201);
      expect(res.body.title).toBe('Iconless Area');
      expect(res.body.icon).toBeNull(); // Or undefined, depending on controller logic for missing optional fields
    });
  });

  describe('GET /api/practice-areas', () => {
    beforeEach(async () => {
      await db.PracticeArea.destroy({ where: {}, truncate: true, cascade: true });
      await db.PracticeArea.create({ title: 'Area 1', description: 'Desc 1', icon: 'Icon1' });
      await db.PracticeArea.create({ title: 'Area 2', description: 'Desc 2', icon: 'Icon2' });
    });

    it('should return all practice areas', async () => {
      const res = await request(app).get('/api/practice-areas');
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /api/practice-areas/:id', () => {
    let area1;
    beforeEach(async () => {
      await db.PracticeArea.destroy({ where: {}, truncate: true, cascade: true });
      area1 = await db.PracticeArea.create({ title: 'Specific Area', description: 'Specific Desc', icon: 'SpecificIcon' });
    });

    it('should return a single practice area by id', async () => {
      const res = await request(app).get(`/api/practice-areas/${area1.id}`);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', area1.id);
    });

    it('should return 404 if practice area not found', async () => {
      const res = await request(app).get(`/api/practice-areas/${area1.id + 999}`);
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('PUT /api/practice-areas/:id', () => {
    let areaToUpdate;
    beforeEach(async () => {
      await db.PracticeArea.destroy({ where: {}, truncate: true, cascade: true });
      areaToUpdate = await db.PracticeArea.create({ title: 'Original Title', description: 'Original Desc', icon: 'OriginalIcon' });
    });

    it('should update an existing practice area', async () => {
      const res = await request(app)
        .put(`/api/practice-areas/${areaToUpdate.id}`)
        .set('X-API-KEY', API_KEY)
        .send({ title: 'Updated Title', description: 'Updated Desc', icon: 'UpdatedIcon' });
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.title).toBe('Updated Title');
      expect(res.body.icon).toBe('UpdatedIcon');
    });

    it('should fail to update without API key', async () => {
      const res = await request(app)
        .put(`/api/practice-areas/${areaToUpdate.id}`)
        .send({ title: 'Attempted Update' });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });

    it('should return 404 if updating non-existent area', async () => {
        const res = await request(app)
        .put(`/api/practice-areas/${areaToUpdate.id + 999}`)
        .set('X-API-KEY', API_KEY)
        .send({ title: 'Ghost Update' });
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
    });
  });

  describe('DELETE /api/practice-areas/:id', () => {
    let areaToDelete;
    beforeEach(async () => {
      await db.PracticeArea.destroy({ where: {}, truncate: true, cascade: true });
      areaToDelete = await db.PracticeArea.create({ title: 'To Delete', description: 'Temp Desc' });
    });

    it('should delete an existing practice area', async () => {
      const res = await request(app)
        .delete(`/api/practice-areas/${areaToDelete.id}`)
        .set('X-API-KEY', API_KEY);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toMatch(/Practice area deleted successfully/i);

      const findRes = await request(app).get(`/api/practice-areas/${areaToDelete.id}`);
      if (findRes.statusCode !== 404) logError(findRes);
      expect(findRes.statusCode).toEqual(404);
    });

    it('should fail to delete without API key', async () => {
      const res = await request(app).delete(`/api/practice-areas/${areaToDelete.id}`);
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });
  });
});
