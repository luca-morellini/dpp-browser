import React, { useState } from 'react';
import PropertyValue from './PropertyValue';
import PropertyText from './PropertyText';
import PropertyURL from './PropertyUrl';

function Dropdown({property}) {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="dropdown">
      <button onClick={toggleDetails}>
        {property.PropertyName} {showDetails ? '▲' : '▼'}
      </button>
      {showDetails && (
        <div className="dropdown-details">
          {property.PropertyValueType == "V" ? <PropertyValue property={property} /> : ""}
          {property.PropertyValueType == "T" ? <PropertyText property={property} /> : ""}
          {property.PropertyValueType == "U" ? <PropertyURL property={property} /> : ""}
        </div>
      )}
    </div>
  )
}

export default Dropdown;
