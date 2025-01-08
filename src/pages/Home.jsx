import { Link } from "react-router-dom";
import data from "../data.json"
import Dropdown from "../components/Dropdown";

function Home() {
  return (
    <>
      <h1>Digital Product Passport</h1>
      <div className="prop-id">
        <strong>Lotto: </strong>{data.Batch.BatchID}
      </div>
      {data.Batch.BatchProperties.map(property => (
        <div key={property.PropertyName}>
          <Dropdown property={property} />
        </div>
      ))}

      <div className="prop-id">
        <strong>Oggetto: </strong>{data.Item.ItemID}
      </div>
      {data.Item.ItemProperties.map(property => (
        <div key={property.PropertyName}>
          <Dropdown property={property} />
        </div>
      ))}

      <div className="prop-id">
        <strong>Famiglia Prodotto: </strong>{data.ProductFamily.ProductFamilyID}
      </div>
      {data.ProductFamily.ProductFamilyProperties.map(property => (
        <div key={property.PropertyName}>
          <Dropdown property={property} />
        </div>
      ))}

      <div className="prop-id">
        <strong>Company: </strong>{data.Company.CompanyID}
      </div>
      {data.Company.CompanyProperties.map(property => (
        <div key={property.PropertyName}>
          <Dropdown property={property} />
        </div>
      ))}
    </>
  )
}

export default Home;
