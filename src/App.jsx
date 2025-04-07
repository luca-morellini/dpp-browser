import OutputForm from "./components/OutputForm";
import InputForm from "./components/InputForm";
import LinkedBatches from "./components/LinkedBatches.jsx";
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import translations from "./components/Translations.json";
import Header from "./components/Header";
import CompareForms from "./components/CompareForms";
//import json_template from "./data_template.json"
//import json_template2 from "./data_template2.json"
import { isTokenValid, getCookie, compareDppDatas } from './utilities.jsx'
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
  const [show_confirmation_popup, setShowConfirmationPopup] = useState(false);
  const [show_select_popup, setShowSelectPopup] = useState(false);
  const [ask_to_compare, setAskToCompare] = useState(true);

  const handleAskToCompareCheckbox = (event) => {
    setAskToCompare(event.target.checked);
  };

  const addElementToHistory = (newElement) => {
    const is_already_in_list = data_history.some((existingItem) => {
      return compareDppDatas(newElement, existingItem) === 0;
    });

    if (!is_already_in_list) {
      setDataHistory([...data_history, newElement]);
    }
  };

  useEffect(() => {
    if (data_history.length >= 2 && ask_to_compare) {
      setShowConfirmationPopup(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data_history]);

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
    setCompareList([data, item]);
    setShowCompare(true);
  };

  return (
    <div className="container mb-5">
      <Header setLanguage={setLanguage}/>
      
      <h1 className="title">{translations[language].dpp_title_text}</h1>

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

              {data && data.linked_batches.length > 0 &&
                <LinkedBatches loadNewElement={loadNewElement} linked_batches={data.linked_batches} lang={language}/>
              }

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
                  setHistory={setDataHistory}
                  curr_element={data}
                  ask_to_compare={ask_to_compare}
                  handleAskToCompareCheckbox={handleAskToCompareCheckbox}
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
