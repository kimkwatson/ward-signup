const mongodb = require('../db/connect');
const { getClaims, getClaimById, createClaim, updateClaim, deleteClaim } = require('../controllers/claims');

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

// test GET function getClaims
describe('getClaims', () => {
  test('returns claims with status 200', async () => {
    const mockData = [{ quantityClaimed: 2 }];

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

    await getClaims(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockData);
  });
});

// test GET :id function getClaimById
describe('getClaimById', () => {
  test('returns one claim with status 200', async () => {
    const mockClaim = { quantityClaimed: 2 };

    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          findOne: () => Promise.resolve(mockClaim)
        })
      })
    });

    const req = {
      params: { id: '507f1f77bcf86cd799439011' }
    };

    const res = mockRes();

    await getClaimById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockClaim);
  });

  test('returns 400 for invalid id', async () => {
    const req = {
      params: { id: 'invalid-id' }
    };

    const res = mockRes();

    await getClaimById(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invalid id format.'
    });
  });
});

// test POST function createClaim
describe('createClaim', () => {
  test('creates a claim and returns 201', async () => {
    mongodb.getDb.mockReturnValue({
      db: () => ({
        collection: () => ({
          insertOne: () => Promise.resolve({ insertedId: 'abc123' })
        })
      })
    });

    const req = {
      body: {
        quantityClaimed: 2
      }
    };

    const res = mockRes();

    await createClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ id: 'abc123' });
  });
});

// test PUT function updateClaim
describe('updateClaim', () => {
  test('updates a claim and returns 204', async () => {
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
        quantityClaimed: 3
      }
    };

    const res = mockRes();

    await updateClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });
});

// test DELETE function deleteClaim
describe('deleteClaim', () => {
  test('deletes a claim and returns 200', async () => {
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

    await deleteClaim(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalled();
  });
});