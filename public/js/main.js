jQuery(document).ready(function(){
  jQuery('#screenshots-carousel').carousel();
  jQuery.ajaxSetup({
    error: function(jqXHR, status, thrownError) {
//      var responseText = jQuery.parseJSON(jqXHR.responseText);
      console.log(status);
    }
  });
  jQuery.ajax({
    url:      'http://query.fakaheda.eu/93.91.250.130:27296.feed',
    type:     'GET',
    contentType: 'application/json; charset=utf-8',
    dataType: 'jsonp',
    jsonp:  false,
    jsonpCallback:  'mailo',
    success:  function(data) {
//      console.log(data);
    }
  })
  jQuery(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError){
      console.log('Hey boys');
    })
  ;
});
