const validator = require('../helpers/validate');

const savebook = (req, res, next) => {
  const validationRule = {
    book_id: 'requires|string',
    additionalInfo: 'string',
    series: 'string',
    name: 'requires|string',
    author_first: 'requires|string',
    author_middle: 'requires|string',
    author_last: 'requires|string',
    order_in_series: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  savebook
};