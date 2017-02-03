var appendBooks = function() {

$(document).on('click', '.all-the-books .more-book-info', function(e) {
  e.preventDefault();
  var id = $(this).attr('id');

  if ( $(`#img-placeholder-${id}`).hasClass('clicked') ) {
    $(`#img-placeholder-${id} img`).show();
    $(`#img-placeholder-${id} p, h2, h3`).hide();
    $(`#${id}`).text('more information');
    // $(`#img-placeholder-${id} a`).text('more information');
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



$(document).ready(function() {
  appendBooks();
})
