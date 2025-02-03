
function OutputForm({ form, data_list }) {
  const orderedData = form.fields.map(field => 
    data_list.find(item => item.ID === field.ID))
    .filter(item => item != undefined);

  return (
    <section>
      <div className="row">
        {/*<div className="col-12 offset-md-3 col-md-6"> */}
        <div className="col-12">
          <h2 className="mb-3 mt-5 text-start">{form.form_name}</h2>

          {orderedData.map((item, index) => (
            <div className="row" key={index}>
              <div className="col-6 pe-0">
                <div className="label py-2 fw-bold">
                  {item.label}
                </div>
              </div>
              <div className="col-6 ps-0">
                  <div className="value py-2">
                    {item.value_url ? 
                      (item.value_url_type === "image" ? 
                        <img src={item.value_url} className="col-6"/> :
                        <a href={item.value_url}>{item.value_text}</a> 
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

export default OutputForm;
