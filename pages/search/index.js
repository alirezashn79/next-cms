import Courses from "@/components/templates/search/Courses";
import coursesModel from "@/models/course";

const SearchPage = ({ courses }) => {
  return <Courses data={courses} />;
};

export const getServerSideProps = async (context) => {
  const { q } = context.query;
  const filteredCourses = await coursesModel.find({ title: { $regex: q } });
  return {
    props: {
      courses: JSON.parse(JSON.stringify(filteredCourses)),
    },
  };
};

export default SearchPage;
