$(document).ready(function() {
	var $tweetFeed = $('.tweetFeed');
        $tweetFeed.html('');

    function updateTweets() {
    	$tweetFeed.html('')
    	var streamLength = streams.home.length;
    	var maxFeedLength = 20;
        var index = streamLength - 1;
        var stopIndex = streamLength > maxFeedLength ?  streamLength - maxFeedLength - 1 : 0;
        while(index >= stopIndex){
          var tweet = streams.home[index];
          var $tweetDiv = $('<div></div>');
          $tweetDiv.text('@' + tweet.user + ' (' + tweet.created_at + '): ' + tweet.message);

          $tweetDiv.appendTo($tweetFeed);
          index -= 1;
        }
        setTimeout(updateTweets, 5000);
    }

    updateTweets();    
});