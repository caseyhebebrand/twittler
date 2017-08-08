$(document).ready(function() {
	var $tweetFeed = $('#tweetFeed');
        $tweetFeed.html('');
    var $users = $('#users')
    var $userFeed = $('#userfeed');
    var tweetUser = $('')

    function updateTweets() {
    	$tweetFeed.html('')
    	var streamLength = streams.home.length;
    	var maxFeedLength = 20;
        var index = streamLength - 1;
        var stopIndex = streamLength > maxFeedLength ?  streamLength - maxFeedLength - 1 : 0;
        while(index >= stopIndex){
          var tweet = streams.home[index];
          var $tweetDiv = $('<div></div>');
          var $tweetTime = $('<h6></h6>');
          var $tweetMessage = $('<p></p>');
          var $tweetUser = $('<a>tweet.user</a>');
          $tweetUser.data('userNameVal', tweet.user);
          $tweetUser.text('@' + tweet.user);
          var month = tweet.created_at.getMonth() + 1;
          var day = tweet.created_at.getDate();
          var year = tweet.created_at.getFullYear();
          var hour = tweet.created_at.getHours() === 0 ? 12 : tweet.created_at.getHours() % 12;
          var minute = tweet.created_at.getMinutes() >= 10 ? tweet.created_at.getMinutes() : "0" + tweet.created_at.getMinutes().toString();
          var ampm = tweet.created_at.getHours() < 12 ? "am" : "pm";
          $tweetTime.text(month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ampm);
          $tweetMessage.text(tweet.message);

          $tweetUser.appendTo($tweetDiv);
          $tweetTime.appendTo($tweetDiv);
          $tweetMessage.appendTo($tweetDiv);

          $tweetDiv.appendTo($tweetFeed);
          index -= 1;
        }
        setTimeout(updateTweets, 20000);
    }

    updateTweets();    

    function showUserFeed(selectedUser) {
    	$tweetFeed.hide().fadeOut();
    	var $userPage = $('<div></div>')
    	$userPage.text('Welcome to ' + selectedUser + '\'s Page!')
    	$userPage.appendTo($userFeed)
    	var $userTweets = $('<div></div>')

    	var allUserTweets = streams.users[selectedUser];
    	allUserTweets.forEach(function(tweet) {
    		var $userTime = $('<h6></h6>');
    		var $userMessage = $('<p></p>');
    		var $userName = $('<a>tweet.user</a>');

    		$userName.text('@' + tweet.user);
    		var month = tweet.created_at.getMonth() + 1;
          	var day = tweet.created_at.getDate();
          	var year = tweet.created_at.getFullYear();
          	var hour = tweet.created_at.getHours() === 0 ? 12 : tweet.created_at.getHours() % 12;
          	var minute = tweet.created_at.getMinutes() >= 10 ? tweet.created_at.getMinutes() : "0" + tweet.created_at.getMinutes().toString();
          	var ampm = tweet.created_at.getHours() < 12 ? "am" : "pm";
          	$userTime.text(month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ampm);
          	$userMessage.text(tweet.message);

    		$userName.appendTo($userTweets);
    		$userTime.appendTo($userTweets);
    		$userMessage.appendTo($userTweets);

    		$userTweets.appendTo($userFeed);
    	});
    	$users.show().fadeIn();
    }


    $tweetFeed.on('click', 'a', function() {
    	//var user = $(this).text();
    	//var username = user.slice(1, user.length);
    	var user = $(this).data('userNameVal')
    	showUserFeed(user);
    })

   $('#users').on('click', 'button', function() {
   		$userFeed.html('')
   		$users.hide().fadeOut();
   		$tweetFeed.show().fadeIn();
   })

    
});