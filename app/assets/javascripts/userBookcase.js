var appendBooks = function() {

$(document).on('click', '.all-the-books a', function(e) {
  e.preventDefault();
  var id = $(this).attr('id');

  if ( $(`#img-placeholder-${id}`).hasClass('clicked') ) {
    $(`#img-placeholder-${id} img`).show();
    $(`#img-placeholder-${id} p`).hide();
    $(`#${id}`).text('more information');
    // $(`#img-placeholder-${id} a`).text('more information');
    $(`#img-placeholder-${id}`).removeClass('clicked');

} else {
  $.getJSON( `/books/${id}.json`, function(res) {
      $(`#img-placeholder-${id}`).addClass('fixed-img-div');
      $(`#img-placeholder-${id} img`).hide();
      $(`#img-placeholder-${id}`).append(`<p>${res.title}<br><br>by ${res.author}<br><br>${res.description}</p>`);
      $(`#img-placeholder-${id}`).addClass('clicked');
      $(`#${id}`).text('back');
    });
   }
  })
}



$(document).ready(function() {
  appendBooks();
})
