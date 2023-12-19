import connectToDB from "@/utils/db";
import { isValidObjectId } from "mongoose";
import coursesModel from "@/models/course";

const handler = async (req, res) => {
  // connect to database
  await connectToDB();
  if (req.method === "DELETE") {
    // get dynamic id
    const { id } = req.query;
    // check course is available on database
    if (!isValidObjectId(id)) {
      return res.status(422).json({ message: "course is unavailable...!" });
    }

    try {
      const course = await coursesModel.findByIdAndDelete(id);
      return res.json({
        message: "course deleted successfully :))",
        data: course,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "internal server error...!", data: err });
    }
  }
};

export default handler;
