var express = require('express');
var router = express.Router();
  var pg = require('pg');
  var url = require("url");
/* GET users listing. */

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'Inventory', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var amount;
var item_id;
router.get('/:user_id?', function(req, res, next) {
  var client = new pg.Client(config);
  var query = url.parse(req.url,true).query;
  id = req.params.user_id;
  amount=req.query.amount;
  item_id=req.query.item_id
  client.connect(function (err, client, done) {
    if (err){
      return console.log("error en la conexion de purchases");
    }

    if(id)
    {
      if (amount && item_id)
      {
        client.query('UPDATE inventory SET amount = amount + $1 WHERE "user_id" = $2 AND item_id = $3', [query.amount,id, query.item_id], function (err, result){
        if (err){
          return console.error('error runnning query', err);
        }
        client.query('SELECT * FROM inventory WHERE user_id = $1 AND item_id = $2', [id, query.item_id], function (err, data){
        if (err){
          return console.error('error runnning query', err);
        }
        res.send(data.rows);
        console.log();
        });
        });
      }
      else {
        client.query('SELECT * FROM inventory WHERE user_id = $1', [id], function (err, result){
        if (err){
          return console.error('error runnning query', err);
        }
        res.send(result.rows);
        console.log();
        });

      }
    }
    else{
      res.send("Entro a inventory");
    }

  });
});

module.exports = router;
