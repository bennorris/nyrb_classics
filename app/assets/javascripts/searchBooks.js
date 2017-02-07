var foundBooks = [];

var searchBooks = function() {
  $(document).on('click', '#entering', function(e) {
    foundBooks = [];
    $('#search-results').html('');
    e.preventDefault();
    var term = ($('input[id="testing"]').val());
    $.getJSON( "/all_books.json", function(res) {
      for (var i=0 ; i < res.length; i++) {
        if ( res[i].author.toLowerCase().includes(term.toLowerCase()) || res[i].title.toLowerCase().includes(term.toLowerCase()) ) {
          $('#search-results').append(`<div class="col-xs-12 col-sm-4 col-md-3 col-lg-3 book-details found-book book-num-${res[i].id}"><div class="contain-search"><img class="search-image-result" src="${res[i].image}"></img><br><div class="hidden-class title-author"><h1>${res[i].title}</h1><h3>${res[i].author}</h3></div></div><button id="${res[i].id}" class="more-info-search">title / author</button><br><button id="${res[i].id}" class="add-to-list-button">add to your shelf</button></div>
`);
        foundBooks.push(res[i]);
        }
      }
    })
  })
}

var moreInfo = function() {
  $(document).on('click', '.more-info-search', function() {
    var id = $(this)[0].id;

    if ($(`.book-num-${id} div`).hasClass('hidden-class')) {
          $(`.book-num-${id} div`).removeClass('hidden-class');
          $(`.book-num-${id} div`).addClass('visible-class');
          $(`.book-num-${id} img`).removeClass('visible-class');
          $(`.book-num-${id} img`).addClass('hidden-class');
    } else {
        $(`.book-num-${id} div`).removeClass('visible-class');
        $(`.book-num-${id} div`).addClass('hidden-class');
        $(`.book-num-${id} img`).addClass('visible-class');
        $(`.book-num-${id} img`).removeClass('hidden-class');
    }
  })

}

var addBookToShelf = function() {
  $(document).on('click', '.add-to-list-button', function(e) {
      e.preventDefault();
      var book_id = $(this)[0].id;
      var bookshelf_id = window.location.pathname.split("/")[2];
      var book_url = `/books/${book_id}.json`;

      var result = foundBooks.filter(function( obj ) {
        return obj.id == book_id;
      });

      var values = {book_id: book_id, bookshelf_id: bookshelf_id}

      $.post('/add_new_book', values)
      .done(function(res) {
        $(`.book-num-${book_id}`).html('<h1>Successfully<br>Added!</h1><br><h1><a class="back-to-shelf" href="/">back to your bookshelf</a></h1>');
      })
  })
}



$(document).ready(function() {
  searchBooks();
  addBookToShelf();
  moreInfo();
})
