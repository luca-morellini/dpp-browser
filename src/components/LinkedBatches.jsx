import PropTypes from 'prop-types';
import LinkedCard from './LinkedCard';
import translations from "./Translations.json";

function LinkedBatches( {loadNewElement, linked_batches, lang} ) {

  return (
    <div className="mt-4">
      <div style={{ backgroundColor: '#f8f8f8', padding: '20px' }}>
        <h2 className="text-start">{translations[lang].traceability_text}</h2>
        <div className="d-flex flex-wrap gap-2">
          {
            linked_batches.map((linked_batch, index) => (
              <LinkedCard loadNewElement={loadNewElement} linked_batch={linked_batch} lang={lang} key={index}/>
            ))
          }
        </div>
      </div>
    </div>

  )
}
LinkedBatches.propTypes = {
  loadNewElement: PropTypes.func.isRequired,
  linked_batches: PropTypes.array.isRequired,
  lang: PropTypes.string.isRequired,
};


export default LinkedBatches;
