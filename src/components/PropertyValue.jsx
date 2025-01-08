
function PropertyValue({ property }) {
  return (
    <a>
      <strong>{property.PropertyDescription}: </strong> {property.PropertyValue}{property.PropertyUnitOfMeasure}
    </a>
  )
}

export default PropertyValue;
