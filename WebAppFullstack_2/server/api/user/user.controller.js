'use strict';

var User = require('./user.model');

module.exports = {
  deleteUser: function(req, res){
    User.findOne({username: req.params.username})
      .exec(function(err, data){
        if (data){
          data.remove(function(err){
            if (err){
              res.json({status: false, message:'delete failed!!!'});
            }else{
              res.json({status: true, message:'delete succeed!!!'});
            }
          })
        }else{
          res.json({status: false, message:'delete failed!!!'});
        }
      })
  },
  edit: function(req,res){
    if(req.body){
      User.findOne({username: req.body.username}).exec(function(err, data){
        if (data){
          data.age = req.body.age;
          data.role = req.body.role;
          data.name = req.body.name;
        }
        data.save(function(err, newData){
          if (err){
            res.json({status: false, message: 'Update failed!!!'});
          }
          else{
            res.json({status: true, message: 'Update succeed!!!'});
          }
        });
      });
    }
    else {
      res.json({status: false, message: 'Update fail!!!'})
    }
  },
  addUser: function(req, res) {
    if (req.body) {
      User.findOne({username: req.body.username}).exec(function(err, data){
        if (data) {
          res.json({status: false, message: 'User are already exist!'})
        } else {
          var newUser = {
            username: req.body.username,
            password: req.body.password,
            role: req.body.role,
            age: req.body.age,
            name: req.body.name
          }
          console.log(newUser);
          User.create(newUser, function(err, data){
            res.json({status: true, message: 'Success'});
          });
        }
      });
    }
  },

  findAll : function(req, res){
    User.find().exec(function(err, data){
      res.json(data);
    });
  },

  findByAccount : function(req, res){
    if (req.params.account) {
      logger.log('debug', 'START- findByAccount %s', req.params.account);
      User.find({username: req.params.account}).exec(function(err, data){
        res.json(data);
        logger.log('debug', 'END- findByAccount');
      });
    } else {
      res.json([]);
    }
  },

  findByName : function(req, res){
    if (req.params.name) {
      User.find({name: {'$regex': req.params.name}}).exec(function(err, data){
        res.json(data);
      });
    } else {
      res.json([]);
    }
  },

  find : function(req, res){
    if (req.query) {
      var query = {};
      if(req.query.name){
        query.name = {'$regex': req.query.name}
      }
      if(req.query.username){
        query.username = req.query.username
      }

      if(req.query.agefrom){
        if (!query.age) query.age = {};
        query.age.$gte = parseInt(req.query.agefrom)
      }
      if(req.query.ageto){
        if (!query.age) query.age = {};
        query.age.$lte = parseInt(req.query.ageto)
      }
      if(req.query.role){
        query.role = req.query.role
      }
      console.log(query);
      User.find(query).exec(function(err, data){
        res.json(data);
      });
    } else {
      res.json([]);
    }
  }
}
