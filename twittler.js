$(document).ready(function() {
  var $homePage = $('#homePage');
	var $homeFeed = $('#homeFeed');
  var $userPage = $('#userPage')
  var $userFeed = $('#userFeed');

  function constructTweetDiv(tweet) {
    // Construct html for tweet user
    var $tweetUser = $('<a>tweet.user</a>');
    $tweetUser.data('userNameVal', tweet.user);
    $tweetUser.text('@' + tweet.user); 

    // Construct html for tweet time
    var $tweetTime = $('<h6></h6>');
    var month = tweet.created_at.getMonth() + 1;
    var day = tweet.created_at.getDate();
    var year = tweet.created_at.getFullYear();
    var hour = tweet.created_at.getHours() === 0 ? 12 : tweet.created_at.getHours() % 12;
    var minute = tweet.created_at.getMinutes() >= 10 ? tweet.created_at.getMinutes() : "0" + tweet.created_at.getMinutes().toString();
    var ampm = tweet.created_at.getHours() < 12 ? "am" : "pm";
    $tweetTime.text(month + '/' + day + '/' + year + ' ' + hour + ':' + minute + ampm);

     // Construct html for tweet message
    var $tweetMessage = $('<p></p>');
    $tweetMessage.text(tweet.message);

    // Build tweet div
    var $tweetDiv = $('<div></div>');
    // Add the 'tweetUser', 'tweetTime', and 'tweetMessage' to the 'tweetDiv'
    $tweetUser.appendTo($tweetDiv);
    $tweetTime.appendTo($tweetDiv);
    $tweetMessage.appendTo($tweetDiv);

    return $tweetDiv;
  }

  function updateHomeFeedTweets() {
    // Clear the home feed
  	$homeFeed.html('')

    // Defining length of homeFeed
    var maxFeedLength = 20;

  	var streamLength = streams.home.length;
    var index = streamLength - 1;
    var stopIndex = streamLength > maxFeedLength ?  streamLength - maxFeedLength - 1 : 0;

    // Add most recent 'maxFeedLength' tweets to homeFeed
    while(index >= stopIndex){
      // Grab a tweet from the tweet stream
      var tweet = streams.home[index];

      // Add the tweetDiv to the 'homeFeed'
      constructTweetDiv(tweet).appendTo($homeFeed);
      index -= 1;
    }
    setTimeout(updateHomeFeedTweets, 20000);
  }
  updateHomeFeedTweets();    

  function showUserFeed(selectedUser) {
    // Clear the 'userFeed'
    $userFeed.html('');

    // Hide homePage
  	$homePage.hide().fadeOut();

    // Update 'userWelcome' text to greet 'selectedUser'
  	var $userWelcome = $('#userWelcome') 
  	$userWelcome.text('Welcome to ' + selectedUser + '\'s Page!')

    // Grab all the tweets for the 'selectedUser' from the tweet stream
  	var allUserTweets = streams.users[selectedUser];

    // Add all user tweets to the 'userFeed'
  	allUserTweets.forEach(function(tweet) {
      // Add the tweetDiv to the 'userFeed'
      constructTweetDiv(tweet).appendTo($userFeed);
  	});
    // Show the 'userPage'
  	$userPage.show().fadeIn();
  }

  $homeFeed.on('click', 'a', function() {
  	var user = $(this).data('userNameVal')
  	showUserFeed(user);
  })

  $('#userPageBackButton').click(function() {
   	$userPage.hide().fadeOut();
   	$homePage.show().fadeIn();
  }) 
});