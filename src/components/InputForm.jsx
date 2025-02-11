import React, { useState } from 'react';
import Scanner from './Scanner';

function InputForm({ getApiUrl, fetchData }) {
  const [formData, setFormData] = useState({
    batch_code: 'C685',
    item_code: 'MED000X-60620-XL',
    productfamily_code: 'MED000X-60620',
    company_code: 'StaffJersey',
    url: 'http://31.14.134.199:8000',
  });
  const [formVisible, setFormVisible] = useState(true);
  const [btnLabel, setBtnLabel] = useState("QR Reader");

  const handleShowButtonClick = (e) => {
    if (formVisible) {
      setBtnLabel("Input Manuale");
    }
    else {
      setBtnLabel("QR Reader");
    }
    setFormVisible(!formVisible);
  };

  const handleFormChange = (event) => {
    //Extract the name and the value from the element that triggered the event
    const { name, value } = event.target;

    //...formData keep the previous values
    setFormData({ ...formData, [name]: value });
  };

  const handleEnterButtonClick = (e) => {
    let api_url = getApiUrl({url:formData.url,
      batch_code:formData.batch_code,
      item_code:formData.item_code,
      productfamily_code:formData.productfamily_code,
      company_code:formData.company_code
    });
    
    fetchData({api_url:api_url});
  };

  return (
    <section>
      <button className="mt-2 btn btn-primary" onClick={handleShowButtonClick}>{btnLabel}</button>
      {formVisible
        ? <div className="text-start">
            <form>
              <div className="form-group">
                <label>Codice Lotto</label>
                <input type="text" className="form-control" name="batch_code" placeholder="Inserisci il codice lotto" value={formData.batch_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>Codice Articolo</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice articolo" name="item_code" value={formData.item_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>Codice Famiglia Articolo</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice famiglia prodotto" name="productfamily_code" value={formData.productfamily_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>Codice Azienda</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice azienda" name="company_code" value={formData.company_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>URL</label>
                <input type="text" className="form-control" placeholder="Inserisci l'url dell'azienda" name="url" value={formData.url} onChange={handleFormChange}/>
              </div>
            </form>
            <button className="mt-2 btn btn-primary" onClick={handleEnterButtonClick}>Invia</button>
          </div>
        : <Scanner fetchData={fetchData}/>
      }
    </section>
  )
}

export default InputForm;
