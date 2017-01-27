$(document).ready(function() {
  var addaddTitleSortOpen = false;
  var addAuthorSortOpen = false;


$('#addByTitle').on('click', function() {
  if (addaddTitleSortOpen === false) {
    $('#edit-author-sorted').css({"display": "none"});
    $('#edit-title-sorted').css({"display": "inline"});
    addTitleSortOpen = !addTitleSortOpen;
    addAuthorSortOpen = false;
  }
  else {
    $('#edit-title-sorted').css({"display": "none"});
    addTitleSortOpen = !addTitleSortOpen;
  }
})

$('#addByAuthor').on('click', function() {
  if (addAuthorSortOpen === false ) {
    $('#edit-title-sorted').css({"display": "none"});
    $('#edit-author-sorted').css({"display": "inline"});
    addTitleSortOpen = false;
    addAuthorSortOpen = !addAuthorSortOpen;
  }
  else {
    $('#edit-author-sorted').css({"display": "none"});
    addAuthorSortOpen = !addAuthorSortOpen;
  }

  })



})
