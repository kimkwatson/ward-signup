const mongodb = require('../db/connect');
const { ObjectId } = require('mongodb');

// get all claims
const getClaims = async (req, res) => {
    try {
        const lists = await mongodb
            .getDb()
            .db()
            .collection('claims')
            .find()
            .toArray();

        return res.status(200).json(lists);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving claims." });
    }
};

// get one claim by id
const getClaimById = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }

        const claim = await mongodb
            .getDb()
            .db()
            .collection('claims')
            .findOne({ _id: new ObjectId(id) });

        if (!claim) {
            return res.status(404).json({ message: "Claim not found." });
        }

        return res.status(200).json(claim);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while retrieving claim."});
    }
};

// create new claim
const createClaim = async (req, res) => {
    try {
        const claim = {
             quantityClaimed: req.body.quantityClaimed,
            // add other fields here
        };

        const response = await mongodb
                    .getDb()
                    .db()
                    .collection("claims")
                    .insertOne(claim);
        
                return res.status(201).json({ id: response.insertedId });
            } catch(err) {
                console.error(err);
                return res.status(500).json({ message: "An error occurred while creating the claim." });
            }
};

// update claim by ID
const updateClaim = async (req, res) => {
    try{
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
        
        const claimId = new ObjectId(id);
        
        const claim = {
            quantityClaimed: req.body.quantityClaimed,
            // add other fields here
        };
        
        const response = await mongodb
            .getDb()
            .db()
            .collection("claims")
            .replaceOne({ _id: claimId }, claim);
        
            if (response.matchedCount > 0) {
                return res.status(204).send();
        } else {
            return res.status(404).json({ message: "Claim not found." });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while updating the claim." });
    }
    
};

// delete claim by ID
const deleteClaim = async (req, res) => {
    try {
        const id = req.params.id;

        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid id format." });
        }
    
        const claimId = new ObjectId(id);

    const response = await mongodb.getDb().db().collection("claims").deleteOne({ _id: claimId });

    if (response.deletedCount > 0) {
        return res.status(200).send();
    } else {
        return res.status(404).json({ message: "Claim not found." });
    }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "An error occurred while deleting the claim." });
    }
};

module.exports = { getClaims, getClaimById, createClaim, updateClaim, deleteClaim };