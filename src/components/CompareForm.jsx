import PropTypes from 'prop-types';
import translations from "./Translations.json";

const mergeLists = (list1, list2) => {
  const result = new Map();

  if (list1) {
    list1.forEach(item => {
      result.set(item.label, { label: item.label, value1: item, value2: '' });
    });
  }

  if (list2) {
    list2.forEach(item => {
      if (result.has(item.label)) {
        result.get(item.label).value2 = item;
      } else {
        result.set(item.label, { label: item.label, value1: '', value2: item });
      }
    });
  }

  return Array.from(result.values());
};
  
function CompareForm({ form1, data_list1, form2, data_list2, lang }) {  
  const orderedData1 = form1 ? form1.fields.map(field => 
    data_list1.find(item => item.ID === field.ID))
    .filter(item => item != undefined) : "";

  const orderedData2 = form2 ? form2.fields.map(field => 
    data_list2.find(item => item.ID === field.ID))
    .filter(item => item != undefined) : "";
  
  const mergedList = mergeLists(orderedData1, orderedData2);

  return (
    <section>
        <div className="col-12">
          <h2 className="mb-3 mt-4 text-start">
            {form1
            ? form1.form_name
            : form2.form_name
            }
          </h2>
          {mergedList.map((item, index) => (
            <div style={ index === 0 ? {borderTop: '1px solid #989898'} : {}} key={index}>
              <div className="label text-start py-2 fw-bold col-12 pe-0">
                {item.label}
              </div>
              <div className="d-flex col-12">
                <div className="col-6 pe-0">
                  <div className="value py-2">
                      {item.value1.value_url ? 
                        (item.value1.value_url_type === "image" ? 
                          <img src={item.value1.value_url} className="col-6"/> :
                          <a href={item.value1.value_url}>{item.value1.value_text ? item.value1.value_text : translations[lang].link_text}</a> 
                        ) :
                        <div>{item.value1.value_text}{item.value1.value_number} {item.value1.value_number_unit_of_measure}</div>
                      }
                    </div>
                </div>
                <div className="col-6 pe-0">
                    <div className="value py-2">
                      {item.value2.value_url ? 
                        (item.value2.value_url_type === "image" ? 
                          <img src={item.value2.value_url} className="col-6"/> :
                          <a href={item.value2.value_url}>{item.value2.value_text ? item.value2.value_text : translations[lang].link_text}</a> 
                        ) :
                        <div>{item.value2.value_text}{item.value2.value_number} {item.value2.value_number_unit_of_measure}</div>
                      }
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  )
}
CompareForm.propTypes = {
  form1: PropTypes.object.isRequired,
  form2: PropTypes.object.isRequired,
  data_list1: PropTypes.array.isRequired,
  data_list2: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
};
  
export default CompareForm;
    