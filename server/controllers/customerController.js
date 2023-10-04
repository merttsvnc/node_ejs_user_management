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
