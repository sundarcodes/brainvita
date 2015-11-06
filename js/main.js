(function(){
  var BrainVita = {
    init: function(){
      $('.marble').draggable({
        containment: '.playArea',
        cursor: 'move',
        revert: "invalid",
        stack: '.marble',
        start: BrainVita.handleDragStart
      });

      $('.holder').droppable({
        drop: BrainVita.handleDropEvent
        });

    },
    handleDragStart: function handleDragStart(ev,ui) {
      // This function will be triggered when the drag starts.
      // This will be used to highlight the possible moves that could be done
      console.log("Element drag started");
    },
    handleDropEvent: function handleDropEvent(ev,ui) {
      console.log("Element dropped");
    }
  }

  $(document).ready(function(){
    BrainVita.init()
  });
})();
