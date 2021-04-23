$(document).ready(function() {

  //Updates the character counter for every character input to textfield
  $('#tweet-text').on('input', function() {

    const output = $(this).parent().parent().find('output');

    let count = 140 - this.textLength;

    console.log(output);

    output.css({
      color: '#254441'
    });

    if (count < 0) {
      output.css({
        color: 'red'
      });
    }

    output.text(count);
  });
});