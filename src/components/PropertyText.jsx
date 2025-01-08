function PropertyText({ property }) {
  return (
    <a>
      <strong>{property.PropertyDescription}: </strong> {property.PropertyValue}
    </a>
  )
}

export default PropertyText;
