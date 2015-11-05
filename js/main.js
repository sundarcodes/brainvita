$(document).ready(function(){
  $('.marble').draggable({
    containment: '.playArea',
    cursor: 'move',
    revert: "invalid",
    stack: '.marble',
    start: handleDragStart
  });
  function handleDragStart(ev,ui) {
    // This function will be triggered when the drag starts.
    // This will be used to highlight the possible moves that could be done
    console.log("Element drag started");
  }
  $('.holder').droppable({
    drop: handleDropEvent
    });
  function handleDropEvent(ev,ui) {
    console.log("Element dropped");
  }
});
