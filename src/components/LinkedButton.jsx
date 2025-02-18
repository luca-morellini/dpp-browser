
function LinkedButton( {getApiUrl, fetchData, linked_batch} ) {
  const handleButtonClick = (e) => {
    let api_url = getApiUrl({url:linked_batch.partner_webservice,
      batch_code:linked_batch.batch_code,
      item_code:linked_batch.item_code,
      productfamily_code:linked_batch.productfamily_code,
      company_code:linked_batch.partner_code
    });

    fetchData({ api_url:api_url, mnsave_data:true });
  };

  return (
    <section>
      <button className="mt-4 btn btn-info" onClick={handleButtonClick}>{linked_batch.item_code}</button>
    </section>
  )
}

export default LinkedButton;
