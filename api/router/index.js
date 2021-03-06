const router = require('express').Router();
const userRouter = require('./userRouter');
const projectRouter = require('./projectRouter');

router.use('/user', userRouter);
router.use(
  '/projects',
  (req, res, next) => {
    next();
  },
  projectRouter
);

module.exports = router;
