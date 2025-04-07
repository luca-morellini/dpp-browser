import OutputForm from "./components/OutputForm";
import InputForm from "./components/InputForm";
import LinkedCard from "./components/LinkedCard.jsx";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import translations from "./components/Translations.json";
import Header from "./components/Header";
import CompareForms from "./components/CompareForms";
//import json_template from "./data_template.json"
//import json_template2 from "./data_template2.json"
import {isTokenValid, getCookie} from './utilities.jsx'
import { jwtDecode } from "jwt-decode";
import ComparePopup from "./components/ComparePopup.jsx";
import SelectListPopup from "./components/SelectListPopup.jsx";

function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [back_button_visible, setBackButtonVisible] = useState(false);
  const [parent_list, setParentList] = useState([]);
  const [language, setLanguage] = useState('IT');
  const [compare_list, setCompareList] = useState([]);
  const [show_compare, setShowCompare] = useState(false);
  const [data_history, setDataHistory] = useState([]);
  const [odata_history_ids, setDataHistoryIds] = useState(new Set());
  const [show_confirmation_popup, setShowConfirmationPopup] = useState(false);
  const [show_select_popup, setShowSelectPopup] = useState(false);
  const [ask_to_compare, setAskToCompare] = useState(true);

  const handleAskToCompareCheckbox = (event) => {
    setAskToCompare(event.target.checked);
  };

  const addElementToHistory = (element) => {
    const newId = element.summary.company_code + element.summary.productfamily_code + element.summary.item_code + element.summary.batch_code + element.summary.language;
    if (!odata_history_ids.has(newId)) {
      setDataHistory(prevList => [...prevList, element]);

      setDataHistoryIds(prevIds => new Set(prevIds).add(newId));
    }
  };

  useEffect(() => {
    if (data_history.length >= 2 && ask_to_compare) {
      setShowConfirmationPopup(true);
    }
  }, [data_history, ask_to_compare]);

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

  const fetchData = async ({api_url}) => {
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
      }
      catch (error) {
        console.log(error);
      }
    }
    else {
      token = null;
    }

    var jsonData = null;
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
      jsonData = await response.json();
      setData(jsonData);
      return jsonData;
    }
    catch (err) {
      setError(err.message);
      return jsonData;
    }
    finally {
      setLoading(false);
    }
  };

  const loadNewElement = async ({api_url, save_parent=false}) => {
    const parent_data = data;
    const new_element_data = await fetchData({api_url:api_url});

    if (new_element_data) {
      if (save_parent) {
        pushElement(parent_data);
      }

      addElementToHistory(new_element_data);
    }
  };

  const handleCloseConfirmationPopup = () => {
    setShowConfirmationPopup(false);
  };

  const handleConfirmPopup = () => {
    setShowConfirmationPopup(false);
    setShowSelectPopup(true);
  };

  const handleCloseSelectPopup = () => {
    setShowSelectPopup(false);
  };

  const handleConfirmCompare = (item) => {
    setShowSelectPopup(false);
    console.log(data);
    console.log(item);
    setCompareList([data, item]);
    setShowCompare(true);
  };

  return (
    <div className="container mb-5">
      <Header setLanguage={setLanguage}/>
      
      <h1 className="title">{translations[language].dpp_title_text}</h1>

      <div className="form-check mt-3 mb-4">
        <input
          className="form-check-input"
          type="checkbox"
          id="compare-checkbox"
          checked={ask_to_compare}
          onChange={handleAskToCompareCheckbox}
        />
        <label className="form-check-label" htmlFor="compare-checkbox" >
          {translations[language].ask_to_compare_text}
        </label>
      </div>

      {show_compare
        ? <CompareForms data1={compare_list[0]} data2={compare_list[1]} setShowCompare={setShowCompare} language={language}/>
        : <div>
            <div>
              <InputForm loadNewElement={loadNewElement} lang={language}/>
      
              {error && <p style={{ color: 'red' }}>{error}</p>}
      
              {loading && <p>{translations[language].loading_text}</p>}
      
              {back_button_visible && 
                <button className="mt-2 btn btn-secondary" onClick={handleBackButtonClick}>{translations[language].back_text}</button>
              }

              {data && data.forms.map((form, index) => (
                <OutputForm form={form} data_list={data.data} lang={language} key={index}/>
              ))}
      
              {data && (data_history.length > 1) &&
                <button className="btn btn-primary mt-4" onClick={() => setShowSelectPopup(true)}>{translations[language].compare_text}</button>
              }
      
              {data && data.linked_batches.map((linked_batch, index) => (
                <LinkedCard loadNewElement={loadNewElement} linked_batch={linked_batch} lang={language} key={index}/>
              ))}

              <ComparePopup
                show={show_confirmation_popup}
                handleClose={handleCloseConfirmationPopup}
                handleConfirm={handleConfirmPopup}
                lang={language}
              />

              {show_select_popup &&
                <SelectListPopup
                  show={show_select_popup}
                  history={data_history}
                  curr_element={data}
                  handleClose={handleCloseSelectPopup}
                  handleConfirmCompare={handleConfirmCompare}
                  lang={language}
                />
              }

            </div>
          </div>
      }
    </div>
  )
}

export default App
