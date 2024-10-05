const validator = require('../helpers/validate');

const savebook = (req, res, next) => {
  const validationRule = {
    book_id: 'required|numeric',
    additionalInfo: 'required|boolean',
    series: 'string',
    name: 'required|string',
    author_first: 'required|string',
    author_middle: 'required|string',
    author_last: 'required|string',
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