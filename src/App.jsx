import OutputForm from "./components/OutputForm";
import InputForm from "./components/InputForm";
import LinkedCard from "./components/LinkedCard.jsx";
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import translations from "./components/Translations.json";
import Header from "./components/Header";
import CompareForms from "./components/CompareForms";
//import json_template from "./data_template.json"
//import json_template2 from "./data_template2.json"
import BottomBar from "./components/BottomBar";
import {isTokenValid, getCookie} from './utilities.jsx'
import { jwtDecode } from "jwt-decode";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [back_button_visible, setBackButtonVisible] = useState(false);
  const [parent_list, setParentList] = useState([]);
  const [language, setLanguage] = useState('IT');
  const [compare_list, setCompareList] = useState([]);
  const [show_compare, setShowCompare] = useState(false);
  const [data_history, setDataHistory] = useState(new Set());

  const addElementToHistory = (element) => {
    setDataHistory(prev => new Set(prev).add(element));
  };

  const addCompareElement = (element) => {
    if (compare_list.length < 2) {
      setCompareList([...compare_list, element]);
    }
  };

  const removeCompareElement = (indexToRemove) => {
    setCompareList(compare_list.filter((_, index) => index !== indexToRemove));
  };

  const pushElement = (new_element) => {
    if (new_element) {
      setParentList([...parent_list, new_element]);
      setBackButtonVisible(true);
    }
  };

  const popElement = () => {
    if (parent_list.length > 0) {
      const element = parent_list.shift();
      setParentList([...parent_list]);
      setBackButtonVisible(parent_list.length > 0);
      return element;
    }
    return null;
  };

  const handleBackButtonClick = () => {
    const new_data = popElement();
    setData(new_data);
  };

  const getApiUrl = ({url, batch_code, item_code, productfamily_code, company_code}) => {
    let api_url = `${url}/browser-protocol/get_batch_details/${batch_code}/${item_code}/${productfamily_code}/${company_code}/${language}/?format=json`;
    if (!api_url.startsWith("https://")) {
      api_url = `https://${api_url}`;
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

    var token = getCookie("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (!isTokenValid(decodedToken)) {
          token = null;
        }
      } catch (error) {
        console.log(error);
      }
    }
    else {
      token = null;
    }

    try {
      const response = await fetch(api_url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Errore nella richiesta: ${response.status}`);
      }
      if (save_data) {
        pushElement(data);
      }
      const jsonData = await response.json();
      setData(jsonData);
      if (data_history.size > 0){
        //open popup
      }
      addElementToHistory(jsonData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header setLanguage={setLanguage}/>
      
      <h1 className="title">{translations[language].dpp_title_text}</h1>

      {show_compare
        ? <CompareForms data1={compare_list[0]} data2={compare_list[1]} setShowCompare={setShowCompare} language={language}/>
        : <div>
            <div>
              <InputForm getApiUrl={getApiUrl} fetchData={fetchData} lang={language}/>
      
              {error && <p style={{ color: 'red' }}>{error}</p>}
      
              {loading && <p>{translations[language].loading_text}</p>}
      
              {back_button_visible && 
                <button className="mt-2 btn btn-secondary" onClick={handleBackButtonClick}>{translations[language].back_text}</button>
              }

              {data && data.forms.map((form, index) => (
                <OutputForm form={form} data_list={data.data} lang={language} key={index}/>
              ))}
      
              {data && <button className="btn btn-primary mt-2" onClick={() => addCompareElement(data)}>{translations[language].compare_text}</button>}
      
              {data && data.linked_batches.map((linked_batch, index) => (
                <LinkedCard getApiUrl={getApiUrl} fetchData={fetchData} linked_batch={linked_batch} key={index}/>
              ))}
            </div>
          </div>
      }
      <div className="p-4" style={{ height: '60px' }}>
        {(compare_list.length > 0) && <BottomBar items={compare_list} removeItem={removeCompareElement} setShowCompare={setShowCompare} language={language}/>}
      </div>
    </div>
  )
}

export default App
