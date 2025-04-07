import PropTypes from 'prop-types';

function OutputForm({ form, data_list, lang }) {
  const orderedData = form.fields.map(field => 
    data_list.find(item => item.ID === field.ID))
    .filter(item => item != undefined);

  const value_class_name_list = orderedData.map(e =>
     e.language.toLowerCase() === lang.toLowerCase() ? 'value py-2' : 'value py-2 bg-warning');

  const form_name_class = `mb-3 mt-4 text-start ${form.form_language.toLowerCase() === lang.toLowerCase() ? '' : 'bg-warning'}`;

  return (
    <section>
      <div className="row">
        {/*<div className="col-12 offset-md-3 col-md-6"> */}
        <div className="col-12">
          <h2 className={form_name_class}>{form.form_name}</h2>
          {orderedData.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-6 pe-0">
                <div className="label py-2 fw-bold">
                  {item.label}
                </div>
              </div>
              <div className="col-6 ps-0">
                  <div className={value_class_name_list[index]}>
                    {item.value_url ? 
                      (item.value_url_type === "image" ? 
                        <img src={item.value_url} className="col-6"/> :
                        <a href={item.value_url}>{item.value_text ? item.value_text : "Link"}</a> 
                      ) :
                      <div>{item.value_text}{item.value_number} {item.value_number_unit_of_measure}</div>
                    }
                  </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
OutputForm.propTypes = {
  form: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
  data_list: PropTypes.array.isRequired,
};

export default OutputForm;
