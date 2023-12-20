import Course from "@/components/templates/index/Course";
import connectToDB from "@/utils/db";
import coursesModel from "@/models/course";

const IndexPage = ({ courses }) => {
  return <Course courses={courses} />;
};

export const getStaticProps = async (context) => {
  await connectToDB();

  const courses = await coursesModel.find({});

  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
    },
    revalidate: 60 * 60 * 12, //12 hours
  };
};

export default IndexPage;
