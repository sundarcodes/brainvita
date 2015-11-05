$(document).ready(function(){
  $('.holder').append('<div class="marble"></div>');
  $('.marble').draggable({
    containment: '.playArea',
    cursor: 'move',
    snap: '.playArea',
    revert: "invalid"
  });
  $('.holder').droppable();
  $('.holder-empty').droppable();
});
