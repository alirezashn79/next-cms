import CoursesItem from "@/components/modules/coursesItem/CoursesItem";
import { useState } from "react";
import AddCourseModal from "./AddCourseModal";
import styles from "@/styles/Course.module.css";
import Swal from "sweetalert2";

const Course = ({ courses }) => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [data, setData] = useState([...courses]);

  const getCourses = async () => {
    const res = await fetch("/api/courses");
    const coursesData = await res.json();
    if (res.status === 200) {
      setData(coursesData.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "خطا در بازیابی اطلاعات",
        text: "لطفا صفحه را رفرش کنید",
        confirmButtonText: "رفرش صفحه",
        didClose: () => {
          window.location.reload();
        },
      });
    }
  };

  const hideAddCourseModal = () => setShowAddCourseModal(false);

  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>دوره ها</h2>
          <a
            href="#"
            className={styles.new_course_btn}
            onClick={() => setShowAddCourseModal(true)}
          >
            اضافه کردن دوره جدید
          </a>
        </div>
        <ul className={styles.courses_list}>
          {data.map((course) => (
            <CoursesItem key={course._id} getCourses={getCourses} {...course} />
          ))}
        </ul>
      </section>

      {showAddCourseModal && (
        <AddCourseModal
          getCourses={getCourses}
          hideAddCourseModal={hideAddCourseModal}
        />
      )}
    </>
  );
};

export default Course;
