import translations from "./Translations.json";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { compareDppDatas } from "../utilities";

function SelectListPopup({ show, history, curr_element, handleClose, handleConfirmCompare, lang }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);

  const filteredHistory = history.filter(
    (item) => compareDppDatas(item, curr_element)
  );

  const handleCompare = () => {
    handleConfirmCompare(filteredHistory[selectedItemIndex]);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translations[lang].select_item_text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul className="list-group">
          {filteredHistory.map((item, index) => (
            <li
              key={index}
              className={`list-group-item ${
                selectedItemIndex === index ? "active" : ""
              }`}
              onClick={() => setSelectedItemIndex(index)}
              style={{ cursor: "pointer" }}
            >
              {item.summary.item_code}
            </li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <button className="secondary" onClick={handleCompare}>
          {translations[lang].compare_text}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
SelectListPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  history: PropTypes.array.isRequired,
  curr_element: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirmCompare: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default SelectListPopup;
