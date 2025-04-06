export function getCookie(name) {
  const cookieName = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(';');
 
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
}

export function isTokenValid(token) {
  var result = false;
  if (token) {
    result = (Date.now() / 1000) < token.exp;
  }

  return result;
};

export function getApiUrl (url, batch_code, item_code, productfamily_code, company_code, language) {
  let api_url = `${url}/browser-protocol/get_batch_details/${batch_code}/${item_code}/${productfamily_code}/${company_code}/${language}/?format=json`;
  if (!api_url.startsWith("https://")) {
    api_url = `https://${api_url}`;
  }

  return api_url;
};
