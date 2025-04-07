import CompareForm from "./CompareForm";
import PropTypes from 'prop-types';
import translations from "./Translations.json";

const getFormNameList = (form_list1, form_list2) => {
  const combinedList = [...form_list1, ...form_list2];
  const result = [...new Set(combinedList.map(item => item.form_name))];

  return result;
}

function CompareForms({ data1, data2, setShowCompare, language }) {
  const form_name_list = getFormNameList(data1.forms, data2.forms);

  return (
    <section className="mb-3">
      <button className='btn btn-secondary mt-3' onClick={() => setShowCompare(false)}>
        {translations[language].back_text}
      </button>
      <h2 className="d-flex mt-3 text-center fw-bold">
        <div className="col-6">
            {data1.summary.item_name
            ? data1.summary.item_name
            : data1.summary.item_code}
        </div>
        <div className="col-6">
            {data2.summary.item_name
            ? data2.summary.item_name
            : data2.summary.item_code}
        </div>
      </h2>
      {form_name_list.map((form_name, index) => (
        <CompareForm
          form1={data1.forms.find(form => form.form_name === form_name)}
          data_list1={data1.data}
          form2={data2.forms.find(form => form.form_name === form_name)}
          data_list2={data2.data}
          lang={language}
          key={index} />
      ))}
    </section>
  )
}
CompareForms.propTypes = {
  data1: PropTypes.shape({
    forms: PropTypes.array.isRequired,
    summary: PropTypes.shape({
      item_name: PropTypes.string,
      item_code: PropTypes.string.isRequired,
    }),
    data: PropTypes.array.isRequired,
  }),
  data2: PropTypes.shape({
    forms: PropTypes.array.isRequired,
    summary: PropTypes.shape({
      item_name: PropTypes.string,
      item_code: PropTypes.string.isRequired,
    }),
    data: PropTypes.array.isRequired,
  }),
  setShowCompare: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};
  
export default CompareForms;
  