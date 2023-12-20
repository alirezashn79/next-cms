const { default: coursesModel } = require("@/models/course");
const { default: connectToDB } = require("@/utils/db");

const handler = async (req, res) => {
  await connectToDB();
  if (req.method === "GET") {
    try {
      // check search or get all
      if (!!req.query.search) {
        const { search } = req.query;

        const filteredCourses = await coursesModel.find({
          title: { $regex: search },
        });
        return res.json(filteredCourses);
      } else {
        const courses = await coursesModel.find({});
        return res.json({
          message: "get all courses successfully :))",
          data: courses,
        });
      }
    } catch (err) {
      return res.status(500).json({ message: "server error", data: err });
    }
  } else if (req.method === "POST") {
    try {
      const { title, price, teacher } = req.body;

      if (!title.trim() || !teacher.trim() || !price.trim()) {
        return res.status(422).json({ message: "invalid data...!" });
      }

      const course = await coursesModel.create({ title, price, teacher });

      return res
        .status(201)
        .json({ message: "Course created successfully :))", data: course });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "internal server error...!", data: err });
    }
  }
};
export default handler;
