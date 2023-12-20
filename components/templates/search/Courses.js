import CoursesItem from "@/components/modules/coursesItem/CoursesItem";
import styles from "@/styles/Course.module.css";

const Courses = () => {
  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>نتایج جستجو:</h2>
        </div>
        <ul className={styles.courses_list}>
          {/* {data.map((course) => (
            <CoursesItem key={course._id} getCourses={getCourses} {...course} />
          ))} */}
          <CoursesItem title="تستی" price="10" teacher="علی" />
        </ul>
      </section>
    </>
  );
};

export default Courses;
