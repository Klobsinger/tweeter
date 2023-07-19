/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};
// This script handles form submission, tweet creation, rendering tweets, and loading tweets from the server.
// It utilizes jQuery and timeago.js for various functionalities.

$(document).ready(function() {

  /**
 * Handles the form submission event and posts the serialized form data to the server.
 *
 * @param {Event} event - The form submission event.
 * @returns {void}
 */
  $('form').on('submit', function(event) {
    event.preventDefault();
    const errorMessage = $('.error-message');
    const errorText = errorMessage.find('.error-text');
    const tweetText = $('#tweet-text');
    //if user inputs a blank tweet
    if (tweetText.val().length === 0) {
      //removing show class to allow error boxes to play limitlessly
      errorMessage.removeClass('show');
      //adding class show which uses css to reveal error box
      //setTimeout used to prevent removing class and adding class instantly causing error box issues
      setTimeout(function() {
        errorMessage.addClass('show');
      }, 10);
      //applying unique error message for empty tweet
      errorText.text('ERROR Empty Tweet ya Dingus');
    }   //if user inputs more then tweet limit
    if (tweetText.val().length > 140) {
      errorMessage.removeClass('show');
      setTimeout(function() {
        errorMessage.addClass('show');
      }, 10);
      //applying unique error message for tweet above char limit
      errorText.text('ERROR Tweets too long ya Dingus');
    } else {
      const formData = $(this).serialize();
      $.post('/tweets', formData)
        .then(function() {
          // Clear the textarea after posting is successful 
        $('#tweet-text').val('');
        //resets counter to max length after posting
        $('.counter').text(140)
         // removes the css classes low and negative so counter css colors reset apon tweeting
          $('.counter').removeClass('low');
          $('.counter').removeClass('negative');
          //after tweeting focuses text input form again for rapid tweeting
          tweetText.focus();
          //removing css class apon posting hidding error message
          errorMessage.removeClass('show');
          loadTweets();
        });
    }
  });

  /**
 * Creates a tweet element based on the provided tweet data.
 *
 * @param {Object} tweet - The tweet object containing user and content information.
 * @returns {jQuery} $tweet - The jQuery element representing the tweet HTML structure.
 */
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="left-section">
            <img src="${escape(tweet.user.avatars)}" alt="Profile Image">
            <p class="name">${escape(tweet.user.name)}</p>
          </div>
          <p class="handle">${escape(tweet.user.handle)}</p>
        </header>
        <div class="tweet">
          <p class="text">${escape(tweet.content.text)}</p>
        </div>
        <footer> 
          <div class="left">
            <span class="created-at">${escape(tweet.created_at)}</span>
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
/**
 * Renders the tweets by iterating over an array of user objects.
 *
 * @param {Object[]} users - An array of user objects containing tweet data.
 * @returns {void}
 */
  const renderTweets = function(users) {
    const container = $('#tweet-container');
    container.empty();
    users.forEach(user => {
      const $user = createTweetElement(user);
      container.prepend($user);
    });
  };
/**
 * Loads tweets by making an AJAX request to the server and updates the tweet timestamps using timeago.js.
 *
 * @returns {void}
 */
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(users) {
        users.forEach(function(user) {
          const timeSince = timeago.format(user.created_at);
          user.created_at = timeSince;
        });
        renderTweets(users);
      });
  };
  loadTweets();
});