const { fetchToken } = require('../controllers/verificationController');
const { authenticateJWT } = require('../middleware/authMiddleware');

const router = require('express').Router();

//fetch jwtToken
router.get('/', authenticateJWT,fetchToken)

module.exports = router;