/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

//returns a tweet <article> element containing the entire HTML structure of the tweet.
const createTweetElement = function(obj) {
  const name = obj.user.name;
  const avatar = obj.user.avatars;
  const handle = obj.user.handle;
  const content = obj.content.text;

  let $tweet =  $(`
  <article class="tweet">
    <header>
      <div class="profile">
        <img src="${avatar}">
        <span class="name">${name}</span>
      </div>
      <span class="handle">${handle}</span>
    </header>
    <div class="content">
      <p>${content}</p>
    </div>
    <footer>${obj.created_at}
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

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log($tweet); // to see what it looks like
$(document).ready(function() {
  $('.all-tweets').append($tweet); // to add it to the page so we can make sure it's got all the right elements
});