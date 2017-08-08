const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '../../db.json');
let users = require('../../db.json');

module.exports = class User {

  get(req, res, next) {
    let userName = req.query.name;
    let index = users.findIndex(function(x){return x.name == userName});
    if (userName == '*' || userName == undefined) {
      res.json(users);
    } else if (index === -1) {
      res.status(500).send('There are no users with such name ' + userName);
    } else if (userName.length > 0) {
      let updatedUsers = users.filter(user => user.name === userName);
      res.json(updatedUsers);
    } else {
      res.status(500).send('Something went wrong');
    }
  }

  add(req, res, next) {
    let user = Object.assign({}, req.body);

    user.id = Date.now() + "";
    users.push(user);

    writeFile(dbPath, users)
      .then(() => {
        res.end('Added user with ' + user.id + ' ID');
      })
      .catch(err =>  {
        console.log(err.message);
        res.status(500).send('Can not add');
    })
  }

  update(req, res, next) {
    let index = users.findIndex(function(x){return x.id == req.body.id});

    if (index === -1) {
      res.status(500).send('Can not update');
    } else {
      users[index].name = req.body.name;
      users[index].email = req.body.email;

      writeFile(dbPath, users)
        .then(() => {
        res.end('Updated user with ' + req.body.id + ' ID');
        })
        .catch(err =>  {
          console.log(err.message);
        res.status(500).send('Can not delete');
      })
    }
  }

  delete(req,res, next) {
    let index = users.findIndex(function(x){return x.id == req.body.id});

    if (index === -1) {
      res.status(500).send('Can not delete');
    } else {
      users = users.filter(function(x){return x.id != req.body.id;});

      writeFile(dbPath, users)
        .then(() => {
          res.end('Deleted user with ' + req.body.id + ' ID');
        })
        .catch(err =>  {
          console.log(err.message);
          res.status(500).send('Can not delete');
      })
    }
  }
};

function writeFile(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(data), (err, data) => {
      if (err) return reject();
      resolve();
    })
  })
}
