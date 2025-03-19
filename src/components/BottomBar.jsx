import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

function BottomBar({ items, removeItem }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: '#f8f9fa',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
        borderTop: '1px solid #dee2e6',
      }}
    >
      {items.map((item, index) => (
        <div
          key={item.id}
          style={{
            backgroundColor: 'white',
            border: '1px solid #ced4da',
            borderRadius: '5px',
            padding: '5px 10px',
            marginRight: '10px',
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          {item.summary.item_name}
          <button
            onClick={() => removeItem(index)}
            style={{
              position: 'absolute',
              top: '-5px',
              right: '0px',
              background: 'none',
              border: 'none',
              fontSize: '14px',
              cursor: 'pointer',
              color: 'red',
            }}
          >
            x
          </button>
        </div>
      ))}
    </div>
  );
}
BottomBar.propTypes = {
  items: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default BottomBar;
