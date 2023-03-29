/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//jQuery's doc.ready function
$(() => {

  const createTweetElement = function(tweet) {
    //takes in tweet obj 

    const timestamp = timeago.format(tweet.created_at);

    //returns <article> element containing the entire HTML structure of tweet
    let $tweet =  $(`
    <article class="tweet">
      <header>
        <div class="profile">
          <img src="${tweet.user.avatars}">
          <span class="name">${tweet.user.name}</span>
        </div>
        <span class="handle">${tweet.user.handle}</span>
      </header>
      <div class="content">
        <p>${tweet.content.text}</p>
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
  }

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

  }

  const loadTweets = function() {
    //responsible for fetching tweets from the /tweets page
    //make a request to /tweets and receive the array of tweets as JSON
    $.ajax({
      method: 'GET',
      url: '/tweets'
    }).then((tweets) => {
      renderTweets(tweets);
    })
  }

  //INITIAL STATE//
  //Load the tweets on the initial load
  loadTweets();
  
  //NEW TWEETS//
  //grab new tweet form from DOM 
  const $form = $('#new-tweet-form')
  //submit event handler for new tweets
  $form.on('submit', (event) => {
    event.preventDefault(); //so page doesn't refresh
    //create a text string in standard URL-encoded notation
    const urlEncoded = $form.serialize();
    //ajax request to send tweet to backend
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: urlEncoded
    }).then(() => {
      loadTweets(); //reload all the tweets so it includes the new one now
    })
    
  });


});

