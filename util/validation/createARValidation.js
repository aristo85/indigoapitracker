const yup = require("yup");

exports.createARValidationSchema = yup.object({
  body: yup.object({
    name: yup.string().min(3).max(32).required(),
  }),
  // params: yup.object({
  //     id: yup.number().required(),
  // }),
});
