$(document).ready(function() {
  console.log('ready to script')
  const maxLength = 140;

  $('#tweet-text').on('input', function() {
    const currentLength = $(this).val().length; // Get the current length of the input
    const remainingLength = maxLength - currentLength; // Calculate the remaining length

    // Update the counter value
    $('.counter').text(remainingLength);

    if (remainingLength < 40) {
      $('.counter').addClass('low');
    }
    if (remainingLength >= 40) {
      $('.counter').removeClass('low');
    }
    if (remainingLength < 0) {
      $('.counter').removeClass('low');
      $('.counter').addClass('negative');
    }
      if (remainingLength >= 0) {
      $('.counter').removeClass('negative');
    }
  });
});
