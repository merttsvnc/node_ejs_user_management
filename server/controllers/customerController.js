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
 * Homepage
 */

exports.addCustomer = async (req, res) => {
  const locals = {
    title: "Add New Customer",
    description: "Free NodeJS User Management System",
  };
  res.render("customer/add", locals);
};
