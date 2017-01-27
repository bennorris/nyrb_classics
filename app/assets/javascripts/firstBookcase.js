$(document).ready(function() {
  var titleSortOpen = false;
  var authorSortOpen = false;

$('#titleSearchToggle').on('click', function() {
  if (titleSortOpen === false) {
    $('#author-sorted').css({"display": "none"});
    $('#title-sorted').css({"display": "inline"});
    titleSortOpen = !titleSortOpen;
    authorSortOpen = false;
  }
  else {
    $('#title-sorted').css({"display": "none"});
    titleSortOpen = !titleSortOpen;
  }
})

$('#authorSearchToggle').on('click', function() {
  if (authorSortOpen === false ) {
    $('#title-sorted').css({"display": "none"});
    $('#author-sorted').css({"display": "inline"});
    titleSortOpen = false;
    authorSortOpen = !authorSortOpen;
  }
  else {
    $('#author-sorted').css({"display": "none"});
    authorSortOpen = !authorSortOpen;
  }

})


})
