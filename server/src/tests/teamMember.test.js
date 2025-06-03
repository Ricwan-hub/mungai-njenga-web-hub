import request from 'supertest';
import app from '../app.js'; // Express app
import db from '../models/index.js'; // Sequelize instance and models

// API_SECRET_KEY should be loaded from .env by setupTests.js
const API_KEY = process.env.API_SECRET_KEY;

// Helper function to log response body on error for debugging
const logError = (res) => {
  if (res.body && Object.keys(res.body).length > 0) {
    console.error('Response body on error:', JSON.stringify(res.body, null, 2));
  }
};

describe('Team Member API', () => {
  // Note: beforeEach to clear TeamMember table is in setupTests.js

  describe('POST /api/team-members', () => {
    it('should create a new team member with valid data and API key', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .set('X-API-KEY', API_KEY)
        .send({
          name: 'Test User',
          role: 'Tester',
          bio: 'Loves testing APIs.',
          imageUrl: 'http://example.com/image.png',
        });
      if (res.statusCode !== 201) logError(res);
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toBe('Test User');
      expect(res.body.role).toBe('Tester');
    });

    it('should fail to create a team member without API key', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .send({
          name: 'NoKey User',
          role: 'Intruder',
          bio: 'Trying to bypass auth.',
        });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Unauthorized: Invalid or missing API key/i);
    });

    it('should fail to create a team member with an incorrect API key', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .set('X-API-KEY', 'incorrectkey123')
        .send({
          name: 'WrongKey User',
          role: 'Mistaken',
          bio: 'Used the wrong key.',
        });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toMatch(/Unauthorized: Invalid or missing API key/i);
    });

    it('should fail with missing required fields (e.g., name)', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .set('X-API-KEY', API_KEY)
        .send({
          // name is missing
          role: 'Incomplete Tester',
          bio: 'Forgot to send name.',
        });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Name, role, and bio are required/i);
    });

    it('should fail with missing required fields (e.g., role)', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .set('X-API-KEY', API_KEY)
        .send({
          name: 'Roleless User',
          // role is missing
          bio: 'Forgot to send role.',
        });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Name, role, and bio are required/i);
    });

    it('should fail with missing required fields (e.g., bio)', async () => {
      const res = await request(app)
        .post('/api/team-members')
        .set('X-API-KEY', API_KEY)
        .send({
          name: 'Bio-less User',
          role: 'Mysterious',
          // bio is missing
        });
      if (res.statusCode !== 400) logError(res);
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Name, role, and bio are required/i);
    });

    it('should create a team member even if imageUrl is null', async () => {
        const res = await request(app)
          .post('/api/team-members')
          .set('X-API-KEY', API_KEY)
          .send({
            name: 'NoImage User',
            role: 'Minimalist',
            bio: 'Prefers no image.',
            imageUrl: null,
          });
        if (res.statusCode !== 201) logError(res);
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toBe('NoImage User');
        expect(res.body.imageUrl).toBeNull();
      });
  });

  describe('GET /api/team-members', () => {
    beforeEach(async () => {
      // Clear and seed data for GET tests
      await db.TeamMember.destroy({ where: {}, truncate: true, cascade: true });
      await db.TeamMember.create({ name: 'Member 1', role: 'Role 1', bio: 'Bio 1', imageUrl: 'img1.png' });
      await db.TeamMember.create({ name: 'Member 2', role: 'Role 2', bio: 'Bio 2', imageUrl: null });
    });

    it('should return all team members', async () => {
      const res = await request(app).get('/api/team-members');
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(2);
      expect(res.body[0].name).toBe('Member 1');
      expect(res.body[1].name).toBe('Member 2');
    });

    it('should return an empty array if no team members exist', async () => {
      await db.TeamMember.destroy({ where: {}, truncate: true, cascade: true }); // Clear again
      const res = await request(app).get('/api/team-members');
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBeInstanceOf(Array);
      expect(res.body.length).toBe(0);
    });
  });

  describe('GET /api/team-members/:id', () => {
    let member1;
    beforeEach(async () => {
      await db.TeamMember.destroy({ where: {}, truncate: true, cascade: true });
      member1 = await db.TeamMember.create({ name: 'Specific Member', role: 'Specific Role', bio: 'Specific Bio' });
    });

    it('should return a single team member by id', async () => {
      const res = await request(app).get(`/api/team-members/${member1.id}`);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id', member1.id);
      expect(res.body.name).toBe('Specific Member');
    });

    it('should return 404 if team member not found', async () => {
      const nonExistentId = member1.id + 999;
      const res = await request(app).get(`/api/team-members/${nonExistentId}`);
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
      expect(res.body.message).toMatch(/Team member not found/i);
    });

    it('should return 500 for invalid ID format (if not caught by router/Sequelize as 404 first)', async () => {
      // This depends on how Express/Sequelize handles malformed IDs (e.g., "abc" instead of a number)
      // Often, it might result in a 404 or a specific Sequelize error leading to 500 if not handled.
      // For this test, assuming it's a generic server error or unhandled rejection.
      // If your router or Sequelize model validation catches this and returns 400/404, adjust expectation.
      const res = await request(app).get('/api/team-members/invalid-id-format');
      // Default Express behavior for unhandled errors in async routes might be just hanging or HTML error page.
      // Proper error handling middleware in app.js would convert this to a JSON 500.
      // For now, we expect a 500 from the controller's catch block if findByPk throws on bad ID format.
      // Or it might be a 404 if findByPk(NaN) returns null. findByPk usually handles non-integer gracefully (returns null).
      if (res.statusCode !== 404 && res.statusCode !== 500 && res.statusCode !== 400) logError(res); // Allow a few valid options
      expect([400, 404, 500]).toContain(res.statusCode); // findByPk('abc') will result in null -> 404
    });
  });

  describe('PUT /api/team-members/:id', () => {
    let memberToUpdate;
    beforeEach(async () => {
      await db.TeamMember.destroy({ where: {}, truncate: true, cascade: true });
      memberToUpdate = await db.TeamMember.create({ name: 'Original Name', role: 'Original Role', bio: 'Original Bio' });
    });

    it('should update an existing team member with valid data and API key', async () => {
      const updatedData = { name: 'Updated Name', role: 'Updated Role', bio: 'Updated Bio', imageUrl: 'updated.png' };
      const res = await request(app)
        .put(`/api/team-members/${memberToUpdate.id}`)
        .set('X-API-KEY', API_KEY)
        .send(updatedData);
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Updated Name');
      expect(res.body.role).toBe('Updated Role');
      expect(res.body.imageUrl).toBe('updated.png');
    });

    it('should fail to update without API key', async () => {
      const res = await request(app)
        .put(`/api/team-members/${memberToUpdate.id}`)
        .send({ name: 'Attempted Update' });
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });

    it('should return 404 if trying to update a non-existent team member', async () => {
      const nonExistentId = memberToUpdate.id + 999;
      const res = await request(app)
        .put(`/api/team-members/${nonExistentId}`)
        .set('X-API-KEY', API_KEY)
        .send({ name: 'Ghost Update' });
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
    });

     it('should allow partial updates (e.g., only name)', async () => {
      const res = await request(app)
        .put(`/api/team-members/${memberToUpdate.id}`)
        .set('X-API-KEY', API_KEY)
        .send({ name: 'Just Name Updated' });
      if (res.statusCode !== 200) logError(res);
      expect(res.statusCode).toEqual(200);
      expect(res.body.name).toBe('Just Name Updated');
      expect(res.body.role).toBe('Original Role'); // Role should remain unchanged
    });
  });

  describe('DELETE /api/team-members/:id', () => {
    let memberToDelete;
    beforeEach(async () => {
      await db.TeamMember.destroy({ where: {}, truncate: true, cascade: true });
      memberToDelete = await db.TeamMember.create({ name: 'To Be Deleted', role: 'Temporary', bio: 'Will vanish' });
    });

    it('should delete an existing team member with API key', async () => {
      const res = await request(app)
        .delete(`/api/team-members/${memberToDelete.id}`)
        .set('X-API-KEY', API_KEY);
      if (res.statusCode !== 200) logError(res); // Controller sends 200 with message
      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toMatch(/Team member deleted successfully/i);

      // Verify it's actually deleted
      const findRes = await request(app).get(`/api/team-members/${memberToDelete.id}`);
      if (findRes.statusCode !== 404) logError(findRes);
      expect(findRes.statusCode).toEqual(404);
    });

    it('should fail to delete without API key', async () => {
      const res = await request(app).delete(`/api/team-members/${memberToDelete.id}`);
      if (res.statusCode !== 401) logError(res);
      expect(res.statusCode).toEqual(401);
    });

    it('should return 404 if trying to delete a non-existent team member', async () => {
      const nonExistentId = memberToDelete.id + 999;
      const res = await request(app)
        .delete(`/api/team-members/${nonExistentId}`)
        .set('X-API-KEY', API_KEY);
      if (res.statusCode !== 404) logError(res);
      expect(res.statusCode).toEqual(404);
    });
  });
});
