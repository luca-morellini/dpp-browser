import React, { useState } from 'react';

function InputForm({ fetchData }) {
  const [formData, setFormData] = useState({
    batch_code: 'C685',
    item_code: 'MED000X-60620-XL',
    productfamily_code: 'MED000X-60620',
    company_code: 'StaffJersey',
    url: 'http://31.14.134.199:8000',
  });

  const handleFormChange = (event) => {
    //Extract the name and the value from the element that triggered the event
    const { name, value } = event.target;

    //...formData keep the previous values
    setFormData({ ...formData, [name]: value });
  };

  const handleButtonClick = (e) => {
    let api_url = `${formData.url}/browser-protocol/get_batch_details/${formData.batch_code}/${formData.item_code}/${formData.productfamily_code}/${formData.company_code}/?format=json`;
    if (!api_url.startsWith("http://")) {
      api_url = `http://${api_url}`;
    }
    fetchData({api_url});
  };

  return (
    <section className="text-start">
      <form >
        <div class="form-group">
          <label>Codice Lotto</label>
          <input type="text" class="form-control" name="batch_code" placeholder="Inserisci il codice lotto" value={formData.batch_code} onChange={handleFormChange}/>
        </div>
        <div class="form-group">
          <label>Codice Articolo</label>
          <input type="text" class="form-control" placeholder="Inserisci il codice articolo" name="item_code" value={formData.item_code} onChange={handleFormChange}/>
        </div>
        <div class="form-group">
          <label>Codice Famiglia Articolo</label>
          <input type="text" class="form-control" placeholder="Inserisci il codice famiglia prodotto" name="productfamily_code" value={formData.productfamily_code} onChange={handleFormChange}/>
        </div>
        <div class="form-group">
          <label>Codice Azienda</label>
          <input type="text" class="form-control" placeholder="Inserisci il codice azienda" name="company_code" value={formData.company_code} onChange={handleFormChange}/>
        </div>
        <div class="form-group">
          <label>URL</label>
          <input type="text" class="form-control" placeholder="Inserisci l'url dell'azienda" name="url" value={formData.url} onChange={handleFormChange}/>
        </div>
      </form>
      <button className="mt-2 btn btn-primary" onClick={handleButtonClick}>Invia</button>
    </section>
  )
}

export default InputForm;
