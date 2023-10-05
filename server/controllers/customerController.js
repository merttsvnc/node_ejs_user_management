/*
 * GET /
 * Homepage
 */

exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJS",
    description: "Free NodeJS User Management System",
  };
  res.render("index", locals);
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

  const locals = {
    title: "New Customer Added",
    description: "Free NodeJS User Management System",
  };
  res.render("customer/add", locals);
};
