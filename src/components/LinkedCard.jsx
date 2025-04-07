import PropTypes from 'prop-types';
import {getApiUrl} from '../utilities.jsx'

function LinkedCard( {loadNewElement, linked_batch, lang} ) {
  const handleCardClick = () => {
    let api_url = getApiUrl(linked_batch.company_webservice,
      linked_batch.batch_code,
      linked_batch.item_code,
      linked_batch.productfamily_code,
      linked_batch.partner_code,
      lang);

    loadNewElement({ api_url:api_url, save_parent:true });
  };

  return (
    <div className="card clickable-card-blue" role="button" onClick={handleCardClick} style={{ width: '10rem' }}>
      <div className="card-body">
        <h5 className="card-title">{linked_batch.item_code}</h5>
        <p className="card-text">{linked_batch.batch_qty} {linked_batch.batch_qty_unit_of_measure}</p>
      </div>
    </div>
  )
}
LinkedCard.propTypes = {
  loadNewElement: PropTypes.func.isRequired,
  linked_batch: PropTypes.shape({
    company_webservice: PropTypes.string.isRequired,
    batch_code: PropTypes.string.isRequired,
    item_code: PropTypes.string.isRequired,
    productfamily_code: PropTypes.string.isRequired,
    partner_code: PropTypes.string.isRequired,
    batch_qty: PropTypes.number,
    batch_qty_unit_of_measure: PropTypes.string.isRequired,
  }),
  lang: PropTypes.string.isRequired,
};


export default LinkedCard;
