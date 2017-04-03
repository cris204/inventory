var express = require('express');
var router = express.Router();

/* GET home page. */

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

var gold;
var cost;
var buy;

router.get('/:userId?',function(req,res,next){
      var client = new pg.Client(config);

          id=req.params.userId;
          item=req.query.item;

        client.connect(function (err,client,done) {
            if (err) {
          return   console.log("no connect");
            }
            if(id)
            {
             client.query('SELECT "gold" FROM "user" WHERE "id" = $1', [id], function (err, data){
            if (err){
              return console.error('error runnning query', err);
            }
            if(data.rows[0]==null){
              res.send("id invalido");
            }else{
            gold=data.rows[0];
              if(item){
                    client.query('SELECT "cost" FROM "items"  WHERE "id"=$1',[item] , function (err, result) {
                         if (err) {
                          return console.error('error runnning query', err);
                         }
                         if(result.rows[0]==null){
                           res.send("item id invalido");
                         }else{
                           cost=(result.rows[0]);

                      buy=purchase(cost["cost"],gold["gold"])

                      console.log(buy);
                      if(buy){
                        client.query('UPDATE "inventory" SET "amount" = "amount"+1 WHERE "user_id" = $1 AND "item_id" = $2 ', [id, item], function (err, data){
                        if (err){
                            return console.error('error runnning query', err);
                          }
                            gold=goldAmount(cost["cost"],gold["gold"])
                          client.query('UPDATE "user" SET "gold" = $1 WHERE "id" = $2 ', [gold, id], function (err, data){
                            if (err){
                                return console.error('error runnning query', err);
                              }
                          });
                          res.send("compraste un arma, dinero restante "+gold)
                        });
                      }else {
                        res.send("no tienes dinero suficiente");
                      }


                  }
                  });

                 }else {
                   client.query('SELECT * FROM "items" ', function (err, result){
                    if (err){
                      return console.error('error runnning query', err);
                    }
                    res.send(result.rows)
                  });
                 }
               }
             });
         }else{
           client.query('SELECT * FROM "user" ', function (err, result){
             if (err){
               return console.error('error runnning query', err);
             }

             res.send(" inserte el id del jugador"+'</br>'+" ids=10 u 11" );
           });
         }
          });

    });

  function purchase(cost, gold){
    var response;
    if(cost>gold){
      response=false;
    }
    else{
      response=true;

    }

    return response;

  }

  function goldAmount(cost,gold){
    if(buy){
    var restantGold;
    restantGold=gold-cost;
    return restantGold;
  }else {
  return  restantGold=gold;
  }


  }



module.exports = router;
