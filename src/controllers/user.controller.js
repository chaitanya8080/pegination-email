const User = require("../models/user.model");
const Admin = require('../models/admin.model');

const express = require("express");
const transporter = require('../configs/mail')
const router = express.Router();


router.post("/", async (req, res) => {
  try {
    let user = await User.create(req.body);

    transporter.sendMail({
        from:'"ABC" admin <admin@abc.com>',
        to:req.body.email,
        subject: `Welcome to ABC system ${req.body.first_name} ${req.body.last_name}`,
        text:`Please confirm your email address.`
    });

    let admins = await Admin.find()
      .populate({path:'userId',select:{email:1 ,_id:0}})
      .lean()
      .exec();


    admins.forEach((el)=>{
       transporter.sendMail({
         from: '"ABC" admin <admin@abc.com>',
         to: el.userId.email,
         subject: `${req.body.first_name} ${req.body.last_name} has registered with us`,
         text: `Please welcome ${req.body.first_name} ${req.body.last_name}.`,
       });
    })


    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {

    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;

    const offset = (page-1)*pageSize;

    let users = await User.find()
      .skip(offset)
      .limit(pageSize)
      .lean()
      .exec();

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});


router.patch("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    .lean()
    .exec();

    return res.status(200).send(user);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
