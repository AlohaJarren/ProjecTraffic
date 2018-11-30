const rp = require('request-promise');
const url = 'http://www.goakamai.org/icx/pages/cameras.aspx';

rp(url)
  .then(function(html){
    //success!
    console.log(html);
  })
  .catch(function(err){
    //handle error
  });
