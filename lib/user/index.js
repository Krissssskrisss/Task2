const path = require('path');
const fs = require('fs');
const dbPath = path.join(__dirname, '../../db.json');
let users = require('../../db.json');

module.exports = class User {

  get(req, res, next) {
    res.json(users);
  }

  add(req, res, next) {
    let user = Object.assign({}, req.body);

    user.id = Date.now();
    users.push(user);

    writeFile(dbPath, users)
      .then(() => {
        res.end('Done');
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
        res.end('Done');
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
          res.end('Done');
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
