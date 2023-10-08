const Customer = require("../models/Customer");

/*
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const messages = await req.consumeFlash("info");
  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const customers = await Customer.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();
    const count = await Customer.count();

    res.render("index", {
      locals,
      customers,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
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
  const { firstName, lastName, tel, email, details } = req.body;

  const newCustomer = new Customer({
    firstName,
    lastName,
    tel,
    email,
    details,
  });
  try {
    await Customer.create(newCustomer);
    await req.flash("info", "New customer has been added");
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/*
 * GET /
 *  View Customer
 */

exports.viewCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "View Customer",
      description: "Free NodeJs User Management System",
    };
    res.render("customer/view", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 * GET /
 * Edit Customer
 */

exports.editCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({ _id: req.params.id });
    const locals = {
      title: "Edit Customer",
      description: "Free NodeJs User Management System",
    };
    res.render("customer/edit", {
      locals,
      customer,
    });
  } catch (error) {
    console.log(error);
  }
};

/*
 * GET /
 * Update Customer Data
 */

exports.editCustomerData = async (req, res) => {
  try {
    const { firstName, lastName, tel, email, details } = req.body;
    await Customer.findByIdAndUpdate(req.params.id, {
      firstName,
      lastName,
      tel,
      email,
      details,
      updatedAt: Date.now(),
    });
    await res.redirect(`/edit/${req.params.id}`);
    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};
