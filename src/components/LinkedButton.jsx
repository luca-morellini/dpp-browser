
function LinkedButton( {fetchData, linked_batch} ) {
  const handleButtonClick = (e) => {
    let api_url = `${linked_batch.partner_webservice}/browser-protocol/get_batch_details/${linked_batch.batch_code}/${linked_batch.item_code}/${linked_batch.productfamily_code}/${linked_batch.partner_code}/?format=json`;
    if (!api_url.startsWith("http://")) {
      api_url = `http://${api_url}`;
    }
    fetchData({api_url});
  };

  return (
    <section>
      <button className="mt-4 btn btn-info" onClick={handleButtonClick}>{linked_batch.item_code}</button>
    </section>
  )
}

export default LinkedButton;
