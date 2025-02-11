import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
import { useState } from "react";

function Scanner({ fetchData }) {
  const [scanResult, setScanResult] = useState(null);

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
  }, []);

  return (
    <div>
      <div id="reader"></div>
    </div>
  )
}

export default Scanner;
