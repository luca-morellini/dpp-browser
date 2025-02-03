import OutputForm from "../components/OutputForm";
import InputForm from "../components/InputForm";
import React, { useState } from 'react';

function Dpp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async ({api_url}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch({api_url});
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
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
    <>
      <div className="container">
        <h1>Digital Product Passport</h1>

        <InputForm fetchData={fetchData}/>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {loading && <p>Caricamento in corso...</p>}

        {data && data.forms.map((form, index) => (
          <OutputForm form={form} data_list={data.data} key={index}/>
        ))}
      </div>
    </>
  )
}

export default Dpp;
