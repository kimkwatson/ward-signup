const mongodb = require('../db/connect');
const { getSlots, getSlotById, createSlot, updateSlot, deleteSlot } = require('../controllers/slots');

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

// test for GET function getSlots
describe('getSlots', () => {
  test('returns slots with status 200', async () => {
    const mockData = [{ label: 'Chairs' }];

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

    await getSlots(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

// test for GET :id function getSlotById
describe('getSlotById', () => {
  test('returns one slot with status 200', async () => {
    const mockSlot = { label: 'Chairs' };

    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          findOne: () => Promise.resolve(mockSlot)
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };

    const res = mockRes();

    await getSlotById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSlot);
  });

  test('returns 400 for invalid id', async () => {
    const req = {
      params: { id: 'invalid-id' }
    };

    const res = mockRes();

    await getSlotById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid id format.'
    });
  });
});

// test for POST function createSlot
describe('createSlot', () => {
  test('creates a slot and returns 201', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          insertOne: () => Promise.resolve({ insertedId: 'abc123' })
        })
      })
    });

    const req = {
      body: {
        label: 'Chairs',
        details: 'Set up folding chairs',
        quantityNeeded: 6
      }
    };

    const res = mockRes();

    await createSlot(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'abc123' });
  });
});

// test for PUT function updateSlot
describe('updateSlot', () => {
  test('updates a slot and returns 204', async () => {
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
        label: 'Updated Chairs',
        details: 'Updated details',
        quantityNeeded: 8
      }
    };

    const res = mockRes();

    await updateSlot(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});

// test for DELETE function deleteSlot
describe('deleteSlot', () => {
  test('deletes a slot and returns 200', async () => {
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

    await deleteSlot(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});
