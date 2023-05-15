const express = require('express');
const router = express.Router();
const { startSession } = require('mongoose');

const money = require('../models/money.model');

// tao ATM
router.post('/v1/api/user', async (req, res) => {
    try {
        const { userId, amount } = req.body;
        const rs = await money.create({ userId, amount });
        res.status(200).json(rs);
    } catch (error) {
        res.status(500).send({ message: 'Tao tai khoan that bai' });
    }
});

// chuyen tien A -> B
router.post('/v1/api/transfer', async (req, res) => {
    const session = await startSession();
    try {
        const { fromId, toId, amount } = req.body;
        // create transaction
        session.startTransaction();
        // findOneANdUpdate is a atomic operation
        // if userIdA not found, it will throw error
        // if found userIdA, it will update amount
        // and other transaction will wait until this transaction is done
        const amountFrom = await money.findOneAndUpdate(
            {
                userId: fromId,
            },
            { $inc: { amount: -amount } },
            { new: true, session }
        );

        console.log(`Account ${fromId} is ::: ${amountFrom.amountFrom}`);
        if(amountFrom.amount < 0) {
            throw new Error('Tai khoan khong du tien');
        }

        const amountTo = await money.findOneAndUpdate(
            {
                userId: toId,
            },
            { $inc: { amount: amount } },
            { new: true, session }
        );

        console.log(`Account ${toId} is ::: ${amountTo.amountTo}`);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json({ message: 'Chuyen tien thanh cong' });

    } catch (error) {
        console.log('Error', error);
        // Error MongoServerError: Transaction numbers are only allowed on a replica set member or mongos
        // mongdb is not a replica set
        // rs.status() run in mongo shell
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json({ message: 'Chuyen tien that bai' });
    }
});

module.exports = router;
