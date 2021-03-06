var sortBooks = function(a,b) {
  if (a.author.split(' ').slice(-1)[0] < b.author.split(' ').slice(-1)[0]) {
    return -1
  } else if (a.author.split(' ').slice(-1)[0] > b.author.split(' ').slice(-1)[0]) {
    return 1
  } else {
    return 0;
  }
}

var sortBooksByTitle = function(a,b) {
  if (a.title < b.title) {
    return -1
  } else if (a.title > b.title) {
    return 1
  } else {
    return 0;
  }
}

var checkUser = function() {
  $.get('/current_user.json', function(result){
    userId = result.id;
  })
  .fail(function() {
    userId = "Fail";
  })
}

var formatShelf = function(book) {
  return `<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 book-details"><div id="img-placeholder-${book.id}"><img class="book-cover" src='${book.image}' style=''></img><br></div><br><a href="" class="more-book-info" id="${book.id}">more information</a><br><a href=""><i class="fa fa-times delete-book ${book.id}" aria-hidden="true"></i></a></div>`
}

var formatOtherUserShelf = function(book) {
  return `<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 book-details"><div id="img-placeholder-${book.id}"><img class="book-cover" src='${book.image}' style=''></img><br></div><br><a href="" class="more-book-info" id="${book.id}">more information</a></div>`
}

var bookAddLoop = function(currentBookcase, sorted) {
  if (currentBookcase == userId) {
    for (var i = 0; i < sorted.length; i++) {
        $('.all-the-books .row').append(formatShelf(sorted[i]));
      }
  }
  else {
    for (var i = 0; i < sorted.length; i++) {
      $('.all-the-books .row').append(formatOtherUserShelf(sorted[i]));
    }
  }
}

var appendBooks = function() {
  $(document).on('click', '.all-the-books .more-book-info', function(e) {
    e.preventDefault();
    var id = $(this).attr('id');

    if ( $(`#img-placeholder-${id}`).hasClass('clicked') ) {
      $(`#img-placeholder-${id} img`).show();
      $(`#img-placeholder-${id} p, h2, h3`).hide();
      $(`#${id}`).text('more information');
      $(`#img-placeholder-${id}`).removeClass('clicked');

  } else {
    $.getJSON( `/books/${id}.json`, function(res) {
        $(`#img-placeholder-${id}`).addClass('fixed-img-div');
        $(`#img-placeholder-${id} img`).hide();
        $(`#img-placeholder-${id}`).append(`<h2>${res.title}</h2><h3>by ${res.author}</h3><p><a class='nyrb-link' href='${res.link}' target="_blank">on nyrb.com</a><br><br>${res.description}</p>`);
        $(`#img-placeholder-${id}`).addClass('clicked');
        $(`#${id}`).text('back');
      });
     }
    })
  }

var clearOldSearch = function() {
$(document).on('click', '.add-book-button', function() {
  $('#search-results').html('');
  })
}

$(document).on('click', '.sort-collection-author', function() {
  var id = window.location.pathname.split('/').slice(-1)[0];
  $.getJSON(`/bookshelf/${id}.json`, function(res) {
    var allBooks = res.books;
    var sorted = allBooks.sort(sortBooks);
    $('.all-the-books .row').html('');
    bookAddLoop(id, sorted);
  })
})

  $(document).on('click', '.sort-collection-title', function() {
    var id = window.location.pathname.split('/').slice(-1)[0];
    $.getJSON(`/bookshelf/${id}.json`, function(res) {
      var allBooks = res.books;
      var sorted = allBooks.sort(sortBooksByTitle);
      $('.all-the-books .row').html('');
      bookAddLoop(id, sorted);
    })
  })

  $(document).on('click', '.sort-collection-date-old', function() {
    var id = window.location.pathname.split('/').slice(-1)[0];
    $.getJSON(`/bookshelf/${id}.json`, function(res) {
      var allBooks = res.books;
      $('.all-the-books .row').html('');
      bookAddLoop(id, allBooks);
    })
  })

  $(document).on('click', '.sort-collection-date-new', function() {
    var id = window.location.pathname.split('/').slice(-1)[0];
    $.getJSON(`/bookshelf/${id}.json`, function(res) {
      var allBooks = res.books;
      $('.all-the-books .row').html('');
      if (id == userId) {
        for (var i = allBooks.length - 1 ; i >= 0; i--) {
          $('.all-the-books .row').append(formatShelf(allBooks[i]));
        }
      }
      else {
        for (var i = allBooks.length - 1 ; i >= 0; i--) {
          $('.all-the-books .row').append(formatOtherUserShelf(allBooks[i]));
        }
      }
    })
  })

  $(document).on('click', '.delete-book', function(e) {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this book?')) {
      var id = window.location.pathname.split('/').slice(-1)[0];
      var bookToDelete = $(this)['context']['classList'][3];

      $.ajax({
        url: `/bookshelf/${id}.json`,
        data: {'delete_id': bookToDelete},
        type: 'PATCH'
      })

      $.getJSON(`/bookshelf/${id}.json`, function(res) {
        $('.all-the-books .row').html('');
        var allBooks = res.books;
        $('.book-count').text(`${allBooks.length}`);
        for (var i = 0; i < allBooks.length; i++) {
          $('.all-the-books .row').append(formatShelf(allBooks[i]));
          }
        })
      }
})


$(document).ready(function() {
  checkUser();
  appendBooks();
  clearOldSearch();
})
