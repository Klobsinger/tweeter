$(document).ready(function() {
  $(".nav-right").click(function() {
    const textInput = $('#tweet-text');
    const tweetForm = $('#tweet-form');
    //checks if the tweet post is visible so user can slide up form
    if (tweetForm.is(':visible')) {
      tweetForm.slideUp();
      //resets my text counter to max length if user typed something then slid tweet forum up
      $('.counter').text(140)
      // removes the css classes low and negative apon changing counter value to fix issue where the text would reset to max but the color would be incorrect
      $('.counter').removeClass('low');
      $('.counter').removeClass('negative');
    } else {
      //makes sure text input in tweet form is empty when sliding down
      textInput.val('')
      tweetForm.slideDown(function() {
        //allows user to type right away after clicking write a new tweet
        textInput.focus();
      });
    }
  });
});