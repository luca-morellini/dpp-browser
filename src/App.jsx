import OutputForm from "./components/OutputForm";
import InputForm from "./components/InputForm";
import LinkedButton from "./components/LinkedButton";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [back_button_visible, setBackButtonVisible] = useState(false);
  const [queue, setQueue] = useState([]);

  const pushElement = (new_element) => {
    if (new_element) {
      setQueue([...queue, new_element]);
      setBackButtonVisible(true);
    }
  };

  const popElement = () => {
    if (queue.length > 0) {
      const element = queue.shift();
      setQueue([...queue]);
      setBackButtonVisible(queue.length > 0);
      return element;
    }
    return null;
  };

  const handleBackButtonClick = (e) => {
    const new_data = popElement();
    setData(new_data);
  };

  const fetchData = async ({url, batch_code, item_code, productfamily_code, company_code, save_data=false}) => {
    let api_url = `${url}/browser-protocol/get_batch_details/${batch_code}/${item_code}/${productfamily_code}/${company_code}/?format=json`;
    if (!api_url.startsWith("http://")) {
      api_url = `http://${api_url}`;
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
      <h1 className="title">Digital Product Passport</h1>

      <InputForm fetchData={fetchData}/>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading && <p>Caricamento in corso...</p>}

      {back_button_visible && 
        <button className="mt-2 btn btn-secondary" onClick={handleBackButtonClick}>Indietro</button>
      }

      {data && data.forms.map((form, index) => (
        <OutputForm form={form} data_list={data.data} key={index}/>
      ))}

      {data && data.linked_batches.map((linked_batch, index) => (
        <LinkedButton fetchData={fetchData} linked_batch={linked_batch} key={index}/>
      ))}
    </div> 
  )
}

export default App
