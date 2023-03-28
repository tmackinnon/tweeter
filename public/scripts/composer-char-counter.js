$(document).ready(function() {
  $('#tweet-text').on('input', function(){
    const MAX_CHARS = 140;
    const counter = $('.counter');

    const length = $(this).val().length; //gives character length
    const charLimit = (MAX_CHARS - length);

    counter.val(charLimit); //assigns html content to 

    // if statements on whether is above or below zero to update colour
    if (charLimit < 0) {
      counter.addClass('over-limit');
    } else {
      counter.removeClass('over-limit');
    }
  });
});

//Note: $(.counter) can also be found by $(this).siblings('footer').children('output') 