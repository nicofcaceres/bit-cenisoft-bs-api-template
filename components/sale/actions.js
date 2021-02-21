const Sale = require('./model')

const createSale = (req, res) => {  
  const newSale = new Sale(req.body);
  newSale.save((error, saleSaved) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.status(200).send(saleSaved);
    }
  })
}

const getSales = (req, res) => {
  let query = req.query
  const regex =  new RegExp(`.*${req.query.name}.*`, 'i');
  if (req.query.name) {
    query = { 
      name: regex
    }
  }
  Sale.
  Sale.find(Object.assign({}, query, { clientId: req.params.clientId }), (error, sales) => {
    if (error) {
      res.status(401).send(error);
    } else {
      res.send(sales);
    }
  })
}

const getSale = (req, res) => {
  Sale.findOne(
      { 
        _id: req.params.id,
        clientId: req.params._id
      }, (error, sale) => {
        sale
          .populate('clientId')
          .populate('details.bookId')
          .execPopulate((error, saleWithAllInfo) => {
            if (error) {
              res.status(401).send(error);
            } else if (saleWithAllInfo) {
              res.status(200).send(saleWithAllInfo);
            } else {
              res.status(400).send({});
            }
          });
      });
}

const updateSale = (req, res) => {  
    Sale.updateOne({ 
      _id: req.params.id, 
      clientId: 
      req.params.clientId 
    }, 
    req.body, (error, result) => {
      if (error) {
        res.status(401).send(error);
      } else {
        res.send(result);
      }
    });
}

const deleteSale = (req, res) => {
  Sale.findOneAndDelete(
    {
      _id: req.params.id,
      clientId: req.params.clientId 
    }, (error, result) => {
      if (error) {
        res.status(401).send(error)
      } else {
        res.status(200).send();
      }
    });
}



module.exports = { createSale, deleteSale, getSale, getSales, updateSale }