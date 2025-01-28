import React, { useState } from 'react';
import json_data from "../data_template.json"
import Form from "../components/Form";

function Dpp() {
  return (
    <>
      <div className="container">
        <h1>Digital Product Passport</h1>

        {json_data.forms.map((form, index) => (
          <Form form={form} data_list={json_data.data} key={index}/>
        ))}
      </div>
    </>
  )
}

export default Dpp;
