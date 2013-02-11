jQuery(document).ready(function(){
  jQuery('#screenshots-carousel').carousel();
  $(function () {
    $('#myTab a:first').tab('show');
  })
});

angular.module('filters', [])
  .filter('hyperlinkize', function () {
    return function (text) {
      return text.replace(
        /(http:\/[\w\d\.\/]+)/,
        '<a href="$1">$1</a>'
      );
    }
  })
  .filter('ADNHandles', function () {
    return function (text) {
      return text.replace(
        /(@(\w+))/,
        '<a href="https://alpha.app.net/$2">$1</a>');
    }
  })
  .filter('ADNTags', function () {
    return function (text) {
      return text.replace(
        /(#(\w+))/g,
        '<a href="https://alpha.app.net/hashtags/$2">$1</a>');
    }
  })


;



angular.module('mcrlndcz', ['filters']);