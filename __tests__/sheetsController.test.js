const mongodb = require("../db/connect");
const { getSheets, getSheetById, createSheet, updateSheet, deleteSheet } = require('../controllers/sheets');

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

// test for GET function getSheets
describe('getSheets', () => {
  test('returns sheets with status 200', async () => {
    const mockData = [{ title: 'Test Sheet' }];

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

    await getSheets(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

// test for GET :id function getSheetById
describe('getSheetById', () => {
  test('returns one sheet with status 200', async () => {
    const mockSheet = { title: 'Test Sheet' };

    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          findOne: () => Promise.resolve(mockSheet)
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };

    const res = mockRes();

    await getSheetById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockSheet);
  });

  // test for invalid id
  test('returns 400 for invalid id', async () => {
    const req = {
      params: { id: 'invalid-id' }
    };

    const res = mockRes();

    await getSheetById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid id format."
    });
  });
});

// test for POST function createSheet
describe('createSheet', () => {
  test('creates a sheet and returns 201', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          insertOne: () => Promise.resolve({ insertedId: 'abc123' })
        })
      })
    });

    const req = {
      body: {
        title: 'Ward Dinner',
        description: 'Bring food',
        date: '2026-04-11',
        time: '6:00 PM',
        location: 'Church'
      }
    };

    const res = mockRes();

    await createSheet(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'abc123' });
  });
});

// test for PUT function updateSheet
describe('updateSheet', () => {
  test('updates a sheet and returns 204', async () => {
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
        title: 'Ward Potluck',
        description: 'Bring a side dish',
        date: '2026-04-10',
        time: '7:00 PM',
        location: 'Park'
      }
    };

    const res = mockRes();

    await updateSheet(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});

// test DELETE function deleteSheet
describe('deleteSheet', () => {
  test('deletes a sheet and returns 200', async () => {
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

    await deleteSheet(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});
