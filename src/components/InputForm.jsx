import { useState, useEffect } from 'react';
import Scanner from './Scanner';
import translations from "./Translations.json";
import PropTypes from 'prop-types';
import {getApiUrl} from '../utilities.jsx'

function InputForm({ loadNewElement, lang }) {
  const [formData, setFormData] = useState({
    batch_code: 'MG01S-A',
    item_code: 'MG01S',
    productfamily_code: 'MG',
    company_code: 'GreenFashionLab',
    url: 'https://80.211.143.55',
  });
  const [formVisible, setFormVisible] = useState(true);
  const [btnLabel, setBtnLabel] = useState(translations[lang].qr_reader_text);

  useEffect(() => {
    if (formVisible) {
      setBtnLabel(translations[lang].qr_reader_text);
    }
    else {
      setBtnLabel(translations[lang].manual_input_text);
    }
  }, [lang, formVisible]);

  const handleShowButtonClick = () => {
    setFormVisible(!formVisible);
  };

  const handleFormChange = (event) => {
    //Extract the name and the value from the element that triggered the event
    const { name, value } = event.target;

    //...formData keep the previous values
    setFormData({ ...formData, [name]: value });
  };

  const handleEnterButtonClick = () => {
    let api_url = getApiUrl(formData.url,
      formData.batch_code,
      formData.item_code,
      formData.productfamily_code,
      formData.company_code,
      lang);
    
    loadNewElement({api_url:api_url});
  };

  return (
    <section>
      <button className="mt-2 btn btn-primary" onClick={handleShowButtonClick}>{btnLabel}</button>
      {formVisible
        ? <div className="text-start">
            <form>
              <div className="form-group">
                <label>{translations[lang].batch_code_text}</label>
                <input type="text" className="form-control" name="batch_code" placeholder="Inserisci il codice lotto" value={formData.batch_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>{translations[lang].item_code_text}</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice articolo" name="item_code" value={formData.item_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>{translations[lang].productfamily_code_text}</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice famiglia prodotto" name="productfamily_code" value={formData.productfamily_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>{translations[lang].company_code_text}</label>
                <input type="text" className="form-control" placeholder="Inserisci il codice azienda" name="company_code" value={formData.company_code} onChange={handleFormChange}/>
              </div>
              <div className="form-group">
                <label>URL</label>
                <input type="text" className="form-control" placeholder="Inserisci l'url dell'azienda" name="url" value={formData.url} onChange={handleFormChange}/>
              </div>
            </form>
            <button className="mt-2 btn btn-primary" onClick={handleEnterButtonClick}>{translations[lang].send_text}</button>
          </div>
        : <Scanner loadNewElement={loadNewElement}/>
      }
    </section>
  )
}
InputForm.propTypes = {
  loadNewElement: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default InputForm;
