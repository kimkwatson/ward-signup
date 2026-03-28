const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// get all sheets
const getSheets = async (req, res) => {
    try {
        const lists = await mongodb
            .getDb()
            .db()
            .collection('sheets')
            .find()
            .toArray();

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving sheets." });
    }
};

// get one sheet by id
const getSheetById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const sheet = await mongodb
            .getDb()
            .db()
            .collection('sheets')
            .findOne({ _id: new ObjectId(id) });

        if (!sheet) {
            return res.status(404).json({ message: "Sheet not found." });
        }

        return res.status(200).json(sheet);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving sheet."});
    }
};

// create new sheet
const createSheet = async (req, res) => {
    try {
        const sheet = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            // add other fields here
        };

        const response = await mongodb
                    .getDb()
                    .db()
                    .collection("sheets")
                    .insertOne(sheet);
        
                return res.status(201).json({ id: response.insertedId });
            } catch(err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred while creating the sheet." });
            }
};

// update sheet by ID
const updateSheet = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
        
        const sheetId = new ObjectId(id);
        
        const sheet = {
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            time: req.body.time,
            location: req.body.location,
            // add other fields here
        };
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("sheets")
            .replaceOne({ _id: sheetId }, sheet);
        
            if (response.matchedCount > 0) {
                return res.status(204).send();
        } else {
            return res.status(404).json({ message: "Sheet not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating the sheet." });
    }
    
};

// delete sheet by id
const deleteSheet = async (req, res) => {
    try {
        const id = req.params.id;

        if(!Object.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
    
        const sheetId = new ObjectId(id);

    const response = await mongodb.getDb().db().collection("sheets").deleteOne({ _id: sheetId });

    if (response.deletedCount > 0) {
        return res.status(200).send();
    } else {
        return res.status(404).json({ message: "Sheet not found." });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the sheet." });
    }
};

module.exports = { getSheets, getSheetById, createSheet, updateSheet, deleteSheet };