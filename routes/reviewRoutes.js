const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { updateReview, deleteReview } = require('../controller/reviewController');

router.put('/reviews/:id', auth, updateReview);
router.delete('/reviews/:id', auth, deleteReview);

module.exports = router;

