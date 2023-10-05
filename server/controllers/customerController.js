const Customer = require("../models/Customer");

/*
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash("info");
  const locals = {
    title: "NodeJS",
    description: "Free NodeJS User Management System",
  };

  try {
    const customers = await Customer.find({}).limit(22);
    res.render("index", {
      locals,
      messages,
      customers,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 * GET /
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer",
    description: "Free NodeJS User Management System",
  };
  res.render("customer/add", locals);
};

/*
 * POST /
 * Create New Customer
 */

exports.postCustomer = async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, tel, email, description } = req.body;

  const newCustomer = new Customer({
    firstName,
    lastName,
    tel,
    email,
    description,
  });
  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};
