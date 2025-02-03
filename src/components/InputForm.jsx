import React, { useState } from 'react';

function InputForm({ fetchData }) {
  const [formData, setFormData] = useState({
    batch_code: '',
    item_code: '',
    productfamily_code: '',
    company_code: '',
    url: '',
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
    <section>
      <form>
        <div>
          <input
            type="text"
            placeholder="Inserisci il codice lotto"
            name="batch_code"
            value={formData.batch_code}
            onChange={handleFormChange}
          />
        </div>

        <div>
          <input
            type="text"
            placeholder="Inserisci il codice articolo"
            name="item_code"
            value={formData.item_code}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Inserisci il codice famiglia prodotto"
            name="productfamily_code"
            value={formData.productfamily_code}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Inserisci il codice azienda"
            name="company_code"
            value={formData.company_code}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Inserisci l'url dell'azienda"
            name="url"
            value={formData.url}
            onChange={handleFormChange}
          />
        </div>
      </form>
      <button onClick={handleButtonClick}>Invia</button>
    </section>
  )
}

export default InputForm;
