const mongodb = require('../db/connect');
const { getUsers, getUserById, createUser, updateUser, deleteUser } = require('../controllers/users');

// mock database connection
jest.mock('../db/connect');

// mock express response object (res)
const mockRes = () => {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    send: jest.fn()
  };
};

// test GET function getUsers
describe('getUsers', () => {
  test('returns users with status 200', async () => {
    const mockData = [{ name: 'John Doe', email: 'john@test.com' }];

    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          find: () => ({
            toArray: () => Promise.resolve(mockData)
          })
        })
      })
    });

    const req = {};
    const res = mockRes();

    await getUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

// test GET :id function getUserById
describe('getUserById', () => {
  test('returns one user with status 200', async () => {
    const mockUser = { name: 'John Doe', email: 'john@test.com' };

    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          findOne: () => Promise.resolve(mockUser)
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };

    const res = mockRes();

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  test('returns 400 for invalid id', async () => {
    const req = {
      params: { id: 'invalid-id' }
    };

    const res = mockRes();

    await getUserById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid id format.'
    });
  });
});

// test POST function createUser
describe('createUser', () => {
  test('creates a user and returns 201', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          insertOne: () => Promise.resolve({ insertedId: 'abc123' })
        })
      })
    });

    const req = {
      body: {
        name: 'John Doe',
        email: 'john@test.com',
        phone: '123-456-7890',
        role: 'admin'
      }
    };

    const res = mockRes();

    await createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'abc123' });
  });
});

// test PUT function updateUser
describe('updateUser', () => {
  test('updates a user and returns 204', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          replaceOne: () => Promise.resolve({ matchedCount: 1 })
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' },
      body: {
        name: 'Updated User',
        email: 'updated@test.com',
        phone: '987-654-3210',
        role: 'member'
      }
    };

    const res = mockRes();

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});

// test DELETE function deleteUser
describe('deleteUser', () => {
  test('deletes a user and returns 200', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          deleteOne: () => Promise.resolve({ deletedCount: 1 })
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };

    const res = mockRes();

    await deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});