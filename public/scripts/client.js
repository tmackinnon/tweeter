/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = [
  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Penny Lane",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@Band-aid"
      },
    "content": {
        "text": "It's all happening"
      },
    "created_at": 1461116232227
    },
]

//jQuery's doc.ready function
$(() => {

  const createTweetElement = function(tweet) {
    //takes in tweet obj 
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
      <footer>${tweet.created_at}
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

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      let $tweet = createTweetElement(tweet);
      // takes return value and prepends it to the tweets container
      $('#tweet-container').prepend($tweet);
    }

  }
  
  renderTweets(tweetData);

});