$(document).ready(function() {


        var $tweetFeed = $('.tweetFeed');
        $tweetFeed.html('');

        var index = streams.home.length - 1;
        while(index >= 0){
          var tweet = streams.home[index];
          var $tweet = $('<div></div>');
          $tweet.text('@' + tweet.user + ': ' + tweet.message);
          $tweet.appendTo($tweetFeed);
          index -= 1;
        }

});