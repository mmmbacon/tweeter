$(document).ready(function() {

  $('.new-tweet').find('form').on('submit', function(e) {

    e.preventDefault();

    // get all the inputs into an array.
    let $text = $(this).find('textarea').val();

    if (!$text) {
      return error("Tweet cannot be empty");
    }
    
    if ($text.length > 140) {
      return error("Tweet has a maximum of 140 Characters");
    }

    const formData = $(this).serialize();

    $(this).find('textarea').val('');

    $.ajax('/tweets', { type: 'POST', data: formData})
      .then(() => {
        loadTweets();
        return;
      })
      .catch((err) => {
        if (err) {
          return console.log(err.status, err.statusText);
        }
      });
    
  });

  $('nav #write-new').on('click', function(e) {
    e.preventDefault();

    if ($('.new-tweet').hasClass('panel-hidden')) {
      $('.new-tweet').slideDown();
      $('.new-tweet').removeClass('panel-hidden');
    } else {
      $('.new-tweet').slideUp();
      $('.new-tweet').addClass('panel-hidden');
    }
    
  });

  const error = function(message) {
    $('.error').text('Error: ' + message);
    $('.error').css({ 'display' : 'flex', 'opacity' : 1});
    $('.error').delay(3000).fadeOut(2000);
  };
  
  const renderTweets = function(tweetData) {
    $('#tweets-container').empty();
    // loops through tweets
    for (const key of Object.keys(tweetData)) {
      let tweet = createTweetElement(tweetData[key]);
      $('#tweets-container').prepend(tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
    }
  };
  
  const createTweetElement = function(tweet) {

    const date = timeago.format(new Date(tweet.created_at));

    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    
    let $tweet = $(
      `<article class="tweet">
        <header>
          <div><i class="far fa-surprise user-icon"></i>${tweet.user.name}</div>
          <div class="handle">${tweet.user.handle}</div>
        </header>
        <content>
          <div>${escape(tweet.content.text)}</div>
        </content>
        <footer>
        <div>${date}</div>
          <div >
            <a class="actions" href="/">
              <i class="fas fa-flag"></i>
            </a>
            <a class="actions" href="/">
              <i class="fas fa-retweet"></i>
            </a>
            <a class="actions" href="/">
              <i class="fas fa-heart heart"></i><sup class="heart">1</sup>
            </a>
          </div>
        </footer>
      </article>`
    );
  
    return $tweet;
  };

  const loadTweets = function() {
    $.ajax('/tweets', { type: 'GET'})
      .then((result) => {
        renderTweets(result);
      })
      .catch((err) => {
        if (err) {
          console.log(err.status, err.statusText);
        }
      });
  };

  loadTweets();
  
});



