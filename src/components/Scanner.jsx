import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function Scanner({ loadNewElement }) {

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader',{
      qrbox: {
        height: 450,
        width: 450,
      },
      fps: 30,
    })
  
    scanner.render(success, error);
  
    function success(result) {
      if (result) {
        loadNewElement({api_url:result});
      }

      scanner.clear();
    }
  
    function error(error){
      console.warn(error);
    }
  });

  return (
    <div>
      <div id="reader"></div>
    </div>
  )
}
Scanner.propTypes = {
  loadNewElement: PropTypes.func.isRequired,
};

export default Scanner;
