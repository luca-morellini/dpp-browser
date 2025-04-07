import PropTypes from 'prop-types';
import LinkedCard from './LinkedCard';
import translations from "./Translations.json";

function LinkedBatches( {loadNewElement, linked_batches, lang} ) {

  return (
    <div>
      <h2 className="mb-3 mt-4 text-start">{translations[lang].traceability_text}</h2>
      <div className="d-flex flex-wrap gap-2">
        {
          linked_batches.map((linked_batch, index) => (
            <LinkedCard loadNewElement={loadNewElement} linked_batch={linked_batch} lang={lang} key={index}/>
          ))
        }
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
