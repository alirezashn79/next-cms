const { Schema, model, models } = require("mongoose");

const schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  teacher: {
    type: String,
    required: true,
  },
});

const coursesModel = models.Course || model("Course", schema);

export default coursesModel;
