/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


// Test / driver code (temporary). Eventually will get this from the server.
// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

$(document).ready(function() {
  const createTweetElement = function(tweet) {
    
    const $tweet = $(`
  <article class="tweet">
    <header>
      <div class="left-section">
        <img src="${tweet.user.avatars}" alt="Profile Image">
        <p class="name">${tweet.user.name}</p>
      </div>
      <p class="handle">${tweet.user.handle}</p>
    </header>
    <div class="tweet">
      <p class="text">${tweet.content.text}</p>
    </div>
    <footer> 
      <div class="left">
        <span class="created-at">${tweet.created_at}</span>
      </div>
      <div class="symbol">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-sharp fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
`);
    return $tweet;
  };

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      const $tweet = createTweetElement(tweet);
      $('#tweet-container').append($tweet);
    });
  };
  renderTweets(data);
});