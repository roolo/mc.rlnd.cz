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
        title: $scope.removeImages(imgRegExp, item.title),
        imageUrl: $scope.getImage(imgRegExp, item.content)
      }
    });
  };
  $scope.removeImages = function (imgRegExp, text) {
    return text.replace(imgRegExp, '');
  };
  $scope.getImage = function (imgRegExp, text) {
    var imgUrl = text.match(imgRegExp);
    if(imgUrl) {
      return imgUrl[0];
    } else {
      return jQuery(text).find('img').attr('src')
    }
  };

}

