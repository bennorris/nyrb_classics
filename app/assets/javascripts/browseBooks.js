  var formatSearchPaginateShelf = function(book, field) {
    if (field == "author") {
      var letter = book.author.split(' ').slice(-1)[0].split('')[0];
      return `<div class="letter-${letter} col-xs-12 col-sm-4 col-md-3 col-lg-3 book-details found-book book-num-${book.id}"><div class="contain-search"><img class="search-image-result" src="${book.image}"></img><br><div class="hidden-class title-author"><h1>${book.title}</h1><h3>${book.author}</h3></div></div><button id="${book.id}" class="more-info-search">title / author</button><br><button id="${book.id}" class="add-to-list-button">add to your shelf</button></div>`
    } else if (field == "title") {
      var letter = book.title.split(' ')[0].split('')[0];
      return `<div class="letter-${letter} col-xs-12 col-sm-4 col-md-3 col-lg-3 book-details found-book book-num-${book.id}"><div class="contain-search"><img class="search-image-result" src="${book.image}"></img><br><div class="hidden-class title-author"><h1>${book.title}</h1><h3>${book.author}</h3></div></div><button id="${book.id}" class="more-info-search">title / author</button><br><button id="${book.id}" class="add-to-list-button">add to your shelf</button></div>`
    }
  }

  var sortByAuthor = function(a,b) {
    if (a.author.split(' ').slice(-1)[0] < b.author.split(' ').slice(-1)[0]) {
      return -1
    } else if (a.author.split(' ').slice(-1)[0] > b.author.split(' ').slice(-1)[0]) {
      return 1
    } else {
      return 0;
    }
  }

  var appendBooksByTitle = function() {
    $(document).on('click', '#addByTitle', function() {
      searchbar();
      $("#search-results").html('');
      $.getJSON('/catalog.json', function(res) {
        for (var i = 0; i < res.length; i ++ ) {
          $('#search-results').append(formatSearchPaginateShelf(res[i], "title"));
        }
      })
    })
  }


var appendBooksByAuthor = function() {
  $(document).on('click', '#addByAuthor', function() {
    searchbar();
    $("#search-results").html('');
    $.getJSON('/catalog.json', function(res) {
      var sorted = res.sort(sortByAuthor);
      for (var i = 0; i < sorted.length; i ++ ) {
        $('#search-results').append(formatSearchPaginateShelf(sorted[i], "author"));
      }
    })

  })
}

var searchbar = function() {
    $(window).scroll(function() {
        var distanceFromTop = $(document).scrollTop();
        if (distanceFromTop >= $('.browse-row').height()) {
            $('.letter-bar').fadeIn(400).addClass('fixed');
        } else {
            $('.letter-bar').fadeOut(400).removeClass('fixed');
        }
    });
  }

var jumpByLetter = function() {
  $(document).on('click', '.letter', function() {
    var letter = $(this).html();
    $('html, body').animate({
        scrollTop: $(`.letter-${letter}`).offset().top
    }, 2000);
  })

  $(document).on('click', '.back-to-top', function() {
    $('html, body').animate({
        scrollTop: $(`.browse-row`).offset().top
    }, 2000);
  })
}



$(document).ready(function() {
  appendBooksByTitle();
  appendBooksByAuthor();
  jumpByLetter();
})
