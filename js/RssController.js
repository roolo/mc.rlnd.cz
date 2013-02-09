/**
 * Created with JetBrains RubyMine.
 * User: Mailo Svetel
 * Date: 2/9/13
 * Time: 12:52 PM
 */

/**
 * Encapsulates logic for loading RSS news about this server
 *
 * @param $scope
 * @param $http
 * @constructor
 */
function RssController($scope, $http) {
  $scope.rssPosts = [];

  $http.jsonp(
    document.location.protocol
    + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=JSON_CALLBACK&q='
    + encodeURIComponent('https://alpha-api.app.net/feed/rss/posts/tag/mcrlndcz')
  )
    .success(function(data) {
      $scope.rssCallback(data.responseData.feed.entries);
    })
    .error(function(err){
      console.log(err);
    })
  ;
  $scope.rssCallback = function(data) {
    var imgRegExp = /(http:\/[\w\d\.\/]+\.png$)/;
    $scope.rssPosts = data.map(function(item){
      return {
        title: $scope.parseTitle(imgRegExp, item.title),
        imageUrl: $scope.getImages(imgRegExp, item.title)
      }
    });
  };
  $scope.parseTitle = function(imgRegExp, title){
    var output = $scope.removeImages(imgRegExp, title);
    output = $scope.clickableADNHandles(output);

    return output;
  };
  $scope.removeImages = function (imgRegExp, text) {
    return text.replace(imgRegExp, '');
  };
  $scope.getImages = function (imgRegExp, text) {
    var imgUrl = text.match(imgRegExp);
    if( imgUrl) {
      return imgUrl[0];
    }
  };
  $scope.clickableADNHandles = function(text){
    return text.replace(/(@(\w+))/,'<a href="https://alpha.app.net/$2">$1</a>');
  }

}

