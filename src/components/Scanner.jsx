import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import PropTypes from 'prop-types';

function Scanner({ fetchData }) {

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
      //setScanResult(result);
      //console.log(scanResult);
      if (result) {
        fetchData({api_url:result});
      }

      scanner.clear();
    }
  
    function error(err){
      console.warn(err);
    }
  });

  return (
    <div>
      <div id="reader"></div>
    </div>
  )
}
Scanner.propTypes = {
  fetchData: PropTypes.func.isRequired,
};

export default Scanner;
