import translations from "./Translations.json";
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';

function ComparePopup({ show, handleClose, handleConfirm, lang }) {

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{translations[lang].compare_popup_title_text}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {translations[lang].compare_popup_body_text}
      </Modal.Body>
      <Modal.Footer>
        <button className="secondary" onClick={handleClose}>
          {translations[lang].no_text}
        </button>
        <button className="primary" onClick={handleConfirm}>
          {translations[lang].yes_text}
        </button>
      </Modal.Footer>
    </Modal>
  );
}
ComparePopup.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default ComparePopup;
