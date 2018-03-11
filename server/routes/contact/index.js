/**
 * Created by chang on 2018/3/11.
 */

var express = require('express');
var router = express.Router();
var Contacts = require('../../models/contact');

router.get('/getContacts', (req, res, next) => {
  "use strict";
  Contacts.find({},(err, docs) => {
    if (err) {
      console.log(err);
      res.send({
        success: false,
        data: [],
        desc: err
      })
    } else {
      res.send({
        success: true,
        data: docs,
        desc: ''
      })
    }
  })
});
 module.exports = router;
