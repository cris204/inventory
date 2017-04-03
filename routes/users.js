var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'Inventory', //env var: PGDATABASE
  password: 'cris0717', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};



/* GET users listing. */
router.get('/:userId?', function(req, res, next) {
var client = new pg.Client(config);

    id=req.params.userId;

  client.connect(function (err,client,done) {
      if (err) {
        console.log("no connect");
      }

     client.query('SELECT "Name","gold" FROM "user"  WHERE "id"=$1',[id] , function (err, result) {
        if (err) {
          console.Log(err);
        };
          res.send(result.rows[0]);

    });
  });
});




module.exports = router;
