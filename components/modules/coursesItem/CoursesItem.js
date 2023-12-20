import DeleteModal from "@/components/templates/index/DeleteModal";
import EditModal from "@/components/templates/index/EditModal";
import { useState } from "react";
import styles from "@/styles/Course.module.css";
import Swal from "sweetalert2";
import { rialToNumber } from "@/utils/utils";
const CoursesItem = (props) => {
  const { _id, title, getCourses } = props;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hideEditModal = () => setShowEditModal(false);
  const hideDeleteModal = () => setShowDeleteModal(false);

  const deleteCourse = async () => {
    const res = await fetch(`/api/courses/${_id}`, {
      method: "DELETE",
    });

    if (res.status === 200) {
      const data = await res.json();
      setShowDeleteModal(false);
      Swal.fire({
        icon: "success",
        title: "دوره مورد نظر با موفقیت حذف شد",
        text: data.data.title,
        confirmButtonText: "اوکی!",
      });
      await getCourses();
    } else {
      Swal.fire({
        icon: "error",
        title: "خطا در حذف دوره",
        confirmButtonText: "اوکی!",
      });
    }
  };

  const updateCourse = async (e, { title, price, teacher }) => {
    e.preventDefault();
    if (title.trim().length && price.trim().length && teacher.trim().length) {
      const res = await fetch(`/api/courses/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: rialToNumber(price),
          teacher,
        }),
      });

      if (res.status === 200) {
        hideEditModal();
        Swal.fire({
          icon: "success",
          title: "دوره مورد نظر با موفقیت آپدیت شد",
          confirmButtonText: "اوکی",
        });
        await getCourses();
      } else {
        Swal.fire({
          icon: "error",
          title: "خطا در آپدیت اطلاعات",
          confirmButtonText: "اوکی",
        });
      }
    }
  };

  return (
    <>
      <li className={styles.courses_item}>
        <div className={styles.courses_img_title}>
          <img
            src="/images/courses/PWA.jpg"
            alt="course-item-img"
            className={styles.courses_img}
          />
          <h5 className={styles.courses_name}>{title}</h5>
        </div>
        <div className={styles.courses_btns}>
          <a
            href="#"
            className={styles.courses_btn_edit}
            onClick={() => setShowEditModal(true)}
          >
            {" "}
            ویرایش{" "}
          </a>
          <a
            href="#"
            className={styles.courses_btn_delete}
            onClick={() => setShowDeleteModal(true)}
          >
            {" "}
            حذف{" "}
          </a>
        </div>
      </li>
      {showEditModal && (
        <EditModal
          {...props}
          updateCourseHandler={updateCourse}
          hideEditModal={hideEditModal}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          deleteHandler={deleteCourse}
          hideDeleteModal={hideDeleteModal}
        />
      )}
    </>
  );
};

export default CoursesItem;
