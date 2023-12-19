import Course from "@/components/templates/index/Course";
import connectToDB from "@/utils/db";
import coursesModel from "@/models/course";

const index = () => {
  return <Course />;
};

export const getStaticProps = async (context) => {
  await connectToDB();

  const courses = await coursesModel.find({});

  return {
    props: {},
  };
};

export default index;
