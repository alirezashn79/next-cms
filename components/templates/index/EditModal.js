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
import { ToRial } from "@/utils/utils";
import { useState } from "react";

const EditModal = ({
  hideEditModal,
  updateCourseHandler,
  title,
  price,
  teacher,
}) => {
  const [inputsData, setInputsData] = useState({
    title,
    price: price.toString(),
    teacher,
  });

  const changeInputs = (type, value) => {
    setInputsData((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <div className={styles.modal_container} id="edit-modal">
      <div className={styles.modal_bg} onClick={hideEditModal}></div>
      <div className={styles.modal_content}>
        <h1 className={styles.modal_title}>اطلاعات جدید را وارد کنید</h1>
        <form
          onSubmit={(e) => updateCourseHandler(e, inputsData)}
          className={styles.edit_user_form}
        >
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faTag} />
            </span>
            <input
              value={inputsData.title}
              onChange={(e) => changeInputs("title", e.target.value)}
              type="text"
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
              value={ToRial(inputsData.price)}
              onChange={(e) => changeInputs("price", e.target.value)}
              type="text"
              placeholder="قیمت دوره"
              spellCheck="false"
              required={true}
            />
            <span style={{ fontSize: "12px", paddingLeft: "5px" }}>تومان</span>
          </div>
          <div className={styles.input_field}>
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
            <input
              value={inputsData.teacher}
              onChange={(e) => changeInputs("teacher", e.target.value)}
              type="text"
              placeholder="مدرس دوره"
              spellCheck="false"
              required={true}
            />
          </div>

          <button type="submit" className={styles.update_btn}>
            آپدیت دوره
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
