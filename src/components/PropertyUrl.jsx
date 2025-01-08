function PropertyURL({ property }) {
  return (
    <a href={property.PropertyValue}>{property.PropertyDescription}</a>
  )
}

export default PropertyURL;
