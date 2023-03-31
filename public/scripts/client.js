/*
 * Client-side JS logic
 */

$(() => {

  //HELPER FUNCTIONS//
  const escape = function(str) {
    //to prevent XSS
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function(tweet) {
    const timestamp = timeago.format(tweet.created_at);
    const secureTweetContent = escape(tweet.content.text);

    //returns <article> element containing the entire HTML structure of tweet
    const $tweet = $(`
    <article class="tweet">
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}">
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="content">
        <p>${secureTweetContent}</p>
      </div>
      <footer>${timestamp}
        <span>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;

  };

  const renderTweets = function(tweets) {
    //takes in array of tweet objects - appends each tweet to tweet-container 

    // clear out tweetcontainer before prepending all the tweets so it goes to initial state
    $('#tweet-container').empty();

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $('#tweet-container').prepend($tweet);
    }

  };

  const loadTweets = function() {
    //responsible for fetching tweets from the /tweets page
    //make a request to /tweets and receive the array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) => {
      renderTweets(tweets);
    });
  };

  //INITIAL STATE//
  //Load the tweets on the initial page load
  loadTweets();

  //NEW TWEETS//
  //grab new tweet form from DOM 
  const $form = $('#new-tweet-form');
  const $tweetText = $('#tweet-text');
  //Event Handler for tweet posts
  $form.on('submit', (event) => {
    //prevent page from refreshing
    event.preventDefault();

    //slide up any previous error messages
    $('#error-message-box').slideUp("slow");

    //Error Messages//
    if (!$tweetText.val()) {
      $('#error-message-box').addClass('error-message');
      $('#error-text').html('No content entered, please add text to post your tweet');
      $('#error-message-box').slideDown("slow");
      return;
    }
    if ($tweetText.val().length > 140) {
      $('#error-message-box').addClass('error-message');
      $('#error-text').html('Error: Tweet exceeds character limit');
      $('#error-message-box').slideDown("slow");
      return;
    }

    //create a text string in standard URL-encoded notation
    const urlEncoded = $form.serialize();

    //ajax request to send tweet to backend
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlEncoded
    }).then(() => {
      loadTweets(); //reload all the tweets so it includes the new one now
      $tweetText.val(''); //reset input to be blank
      $('.counter').val(140); //reset character counter to 140
    });

  });

});

