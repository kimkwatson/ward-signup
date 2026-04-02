const mongodb = require("../db/connect");
const sheetsController = require("../controllers/sheets");

// mock database
jest.mock("../db/connect", () => ({
    getDb: jest.fn()
}));

describe("Sheets controller", () => {
    let req;
    let res;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });
});