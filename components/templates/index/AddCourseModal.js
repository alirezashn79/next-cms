import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faTag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/Modal.module.css";
import { useState } from "react";
import { ToRial, rialToNumber } from "@/utils/utils";
import Swal from "sweetalert2";

const AddCourseModal = ({ hideAddCourseModal }) => {
  const [inputsData, setInputsData] = useState({
    title: "",
    price: "",
    teacher: "",
  });

  const changeInputHandler = (type, value) => {
    setInputsData((prev) => ({ ...prev, [type]: value }));
  };

  const addCourseHandler = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: inputsData.title,
        price: rialToNumber(inputsData.price),
        teacher: inputsData.teacher,
      }),
    });
    const data = await res.json();

    if (res.status === 201) {
      setInputsData({ title: "", price: "", teacher: "" });
      hideAddCourseModal();
      Swal.fire({
        title: "دوره مورد نظر ایجاد شد",
        text: data.data.title,
        icon: "success",
        confirmButtonText: "خوبه!",
      });
    } else {
      Swal.fire({
        title: "خطا!",
        icon: "error",
        confirmButtonText: "اوکی",
      });
    }
  };

  return (
    <div className={styles.modal_container} id="add-new-course-modal">
      <div className={styles.modal_bg} onClick={hideAddCourseModal}></div>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_title}>اضافه کردن دوره جدید</h1>
        <form onSubmit={addCourseHandler} className={styles.edit_user_form}>
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faTag} />
            </span>
            <input
              type="text"
              value={inputsData.title}
              onChange={(e) => changeInputHandler("title", e.target.value)}
              placeholder="عنوان دوره"
              spellCheck="false"
              required={true}
            />
          </div>
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faCashRegister} />{" "}
            </span>
            <input
              type="text"
              value={ToRial(inputsData.price)}
              onChange={(e) => changeInputHandler("price", e.target.value)}
              placeholder="قیمت دوره"
              spellCheck="false"
              required={true}
            />
            <span style={{ fontSize: "12px", paddingRight: "5px" }}>تومان</span>
          </div>
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              type="text"
              value={inputsData.teacher}
              onChange={(e) => changeInputHandler("teacher", e.target.value)}
              placeholder="مدرس دوره"
              spellCheck="false"
              required={true}
            />
          </div>

          <button type="submit" className={styles.update_btn}>
            ایجاد دوره
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
