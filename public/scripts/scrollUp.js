/*logic for scroll up feature: button appears after 500 px of scrolling that brings user
back to the top of the page with a slow animation and focuses the tweet text field */
$(document).ready(function() {
  const textInput = $('#tweet-text');
  const tweetForm = $('#tweet-form');
  const bottomButton = $('.bottom-button');
  //pixles scroll threshhold
  const scrollThreshold = 500;

  $(window).scroll(function() {
    //if the amount the user has scrolled down on the window is more then 500px
    if ($(this).scrollTop() > scrollThreshold) {
      //the buttons css class is removed revealing the button
      bottomButton.removeClass('none');
    } else {
      //if not then the button stays hidden
      bottomButton.addClass('none');
    }
  });

  bottomButton.click(function() {
    //if the user has not slid down the tweet form the scroll up button will
    if (tweetForm.is(':hidden')) {
      tweetForm.slideDown();
      //slowly scrolls up the page then focuses the tweet text form
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      textInput.focus();
    } else {
      //the tweet text form is already showing! so we just scroll up and focus the text
      $('html, body').animate({ scrollTop: 0 }, 'slow');
      textInput.focus();
    }
  });
});