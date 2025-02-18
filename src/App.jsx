import OutputForm from "./components/OutputForm";
import InputForm from "./components/InputForm";
import LinkedButton from "./components/LinkedButton";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Select from 'react-flags-select';
//import json_template from "./data_template.json"

const languages = {
  IT: "IT",
  GB: "UK",
  ES: "ES",
  FR: "FR",
};

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [back_button_visible, setBackButtonVisible] = useState(false);
  const [list, setList] = useState([]);
  const [selectedCountry, setCountry] = useState('IT');

  const pushElement = (new_element) => {
    if (new_element) {
      setQList([...list, new_element]);
      setBackButtonVisible(true);
    }
  };

  const popElement = () => {
    if (list.length > 0) {
      const element = list.shift();
      setList([...list]);
      setBackButtonVisible(list.length > 0);
      return element;
    }
    return null;
  };

  const handleBackButtonClick = (e) => {
    const new_data = popElement();
    setData(new_data);
  };

  const getApiUrl = ({url, batch_code, item_code, productfamily_code, company_code}) => {
    let api_url = `${url}/browser-protocol/get_batch_details/${batch_code}/${item_code}/${productfamily_code}/${company_code}/${languages[selectedCountry]}/?format=json`;
    if (!api_url.startsWith("http://")) {
      api_url = `http://${api_url}`;
    }
    return api_url;
  };

  const fetchData = async ({api_url, save_data=false}) => {
    if (!api_url.endsWith("/?format=json")) {
      if (!api_url.endsWith("/")) {
        api_url = `${api_url}/`;
      }
      api_url = `${api_url}?format=json`;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      if (save_data) {
        pushElement(data);
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Select
        className="mt-2 col-md-1"
        countries={["IT", "GB", "ES", "FR"]}
        customLabels={{ "IT": "Italiano", "GB": "English", "ES": "Español", "FR": "Français" }}
        onSelect={setCountry}
        selected={selectedCountry}
      />
      <h1 className="title">Digital Product Passport</h1>

      <InputForm getApiUrl={getApiUrl} fetchData={fetchData}/>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Caricamento in corso...</p>}

      {back_button_visible && 
        <button className="mt-2 btn btn-secondary" onClick={handleBackButtonClick}>Indietro</button>
      }

      {data && data.forms.map((form, index) => (
        <OutputForm form={form} data_list={data.data} key={index}/>
      ))}

      {data && data.linked_batches.map((linked_batch, index) => (
        <LinkedButton getApiUrl={getApiUrl} fetchData={fetchData} linked_batch={linked_batch} key={index}/>
      ))}
    </div> 
  )
}

export default App
