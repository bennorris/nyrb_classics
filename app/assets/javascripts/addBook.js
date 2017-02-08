var addBookToShelf = function() {
  $(document).on('click', '.add-to-list-button', function(e) {
      e.preventDefault();
      var book_id = $(this)[0].id;
      var bookshelf_id = window.location.pathname.split("/")[2];
      var book_url = `/books/${book_id}.json`;

      var result = foundBooks.filter(function( obj ) {
        return obj.id == book_id;
      });

      var values = {book_id: book_id, id: bookshelf_id}

      $.post('/add_new_book', values)
      .done(function(res) {
        $(`.book-num-${book_id}`).html('<h1>Successfully<br>Added!</h1><br><h1><a class="back-to-shelf" href="/">back to your bookshelf</a></h1>');
      })
      .fail(function(error) {
        $(`.book-num-${book_id}`).html('<h1>Sorry, it looks like there\'s<br>a problem.</h1><br><h1>This may\'ve already been added to your shelf.</h1>');
      })
  })
}


$(document).ready(function() {
  addBookToShelf();
})
