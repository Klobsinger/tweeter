/* logic for counter feature which displays a character counter which adds and removes
classes for css styling to update counter color*/
$(document).ready(function() {
  const maxLength = 140;

  $('#tweet-text').on('input', function() {
    const currentLength = $(this).val().length; // Get the current length of the input
    const remainingLength = maxLength - currentLength; // Calculate the remaining length

    // Update the counter value
    $('.counter').text(remainingLength);
    //adds class low which gives text yellow color
    if (remainingLength < 40) {
      $('.counter').addClass('low');
    }
    //removes the class if the user deletes text
    if (remainingLength >= 40) {
      $('.counter').removeClass('low');
    }
    //removes class low and adds class negative which adds red css styling to counter
    if (remainingLength < 0) {
      $('.counter').removeClass('low');
      $('.counter').addClass('negative');
    }
    // if user goes back above threshold removes red css styling
    if (remainingLength >= 0) {
      $('.counter').removeClass('negative');
    }
  });
});