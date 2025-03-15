import PropTypes from 'prop-types';

function LinkedCard( {getApiUrl, fetchData, linked_batch} ) {
  const handleCardClick = () => {
    let api_url = getApiUrl({url:linked_batch.partner_webservice,
      batch_code:linked_batch.batch_code,
      item_code:linked_batch.item_code,
      productfamily_code:linked_batch.productfamily_code,
      company_code:linked_batch.partner_code
    });

    fetchData({ api_url:api_url, save_data:true });
  };

  return (
    <section>
      <div className="card cursor-pointer mt-2 mb-2" onClick={handleCardClick}>
        <div className="card-body">
          <h5 className="card-title">{linked_batch.item_code}</h5>
          <p className="card-text">{linked_batch.batch_qty} {linked_batch.batch_qty_unit_of_measure}</p>
        </div>
      </div>
    </section>
  )
}
LinkedCard.propTypes = {
  getApiUrl: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  linked_batch: PropTypes.shape({
    partner_webservice: PropTypes.string.isRequired,
    batch_code: PropTypes.string.isRequired,
    item_code: PropTypes.string.isRequired,
    productfamily_code: PropTypes.string.isRequired,
    partner_code: PropTypes.string.isRequired,
    batch_qty: PropTypes.number,
    batch_qty_unit_of_measure: PropTypes.string.isRequired,
  }),
};


export default LinkedCard;
