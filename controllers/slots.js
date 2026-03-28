const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// get all slots
const getSlots = async (req, res) => {
    try {
        const lists = await mongodb
            .getDb()
            .db()
            .collection('slots')
            .find()
            .toArray();

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving slots." });
    }
};

// get one slot by id
const getSlotById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const slot = await mongodb
            .getDb()
            .db()
            .collection('slots')
            .findOne({ _id: new ObjectId(id) });

        if (!slot) {
            return res.status(404).json({ message: "Slot not found." });
        }

        return res.status(200).json(slot);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving slot."});
    }
};

// create new slot
const createSlot = async (req, res) => {
    try {
        const slot = {
            label: req.body.label,
            details: req.body.details,
            quantityNeeded: req.body.quantityNeeded,
            // add other fields here
        };

        const response = await mongodb
                    .getDb()
                    .db()
                    .collection("slots")
                    .insertOne(slot);
        
                return res.status(201).json({ id: response.insertedId });
            } catch(err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred while creating the slot." });
            }
};

// update slot by ID
const updateSlot = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
        
        const slotId = new ObjectId(id);
        
        const slot = {
            label: req.body.label,
            details: req.body.details,
            quantityNeeded: req.body.quantityNeeded,
            // add other fields here
        };
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("slots")
            .replaceOne({ _id: slotId }, slot);
        
            if (response.matchedCount > 0) {
                return res.status(204).send();
        } else {
            return res.status(404).json({ message: "Slot not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating the slot." });
    }
    
};

// delete slot by ID
const deleteSlot = async (req, res) => {
    try {
        const id = req.params.id;

        if(!Object.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
    
        const slotId = new ObjectId(id);

    const response = await mongodb.getDb().db().collection("slots").deleteOne({ _id: slotId });

    if (response.deletedCount > 0) {
        return res.status(200).send();
    } else {
        return res.status(404).json({ message: "Slot not found." });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the slot." });
    }
};

module.exports = { getSlots, getSlotById, createSlot, updateSlot, deleteSlot };