(function(){
  var BrainVita = {
    init: function(){
      $('.marble').draggable({
        containment: '.playArea',
        cursor: 'move',
        revert: true,
        stack: '.marble',
        start: BrainVita.handleDragStart
      });

      $('.holder').droppable({
        accept: '.marble',
        drop: BrainVita.handleDropEvent
        });

    },
    canBeDropped: function (droppedToObj,draggedObj) {

      // Check if the destination postion is empty
      // This can be checked by the empty class
      if (!$(droppedToObj).hasClass('empty')) {
        return false;
      }

      //Get the holder from which the marble was dragged into
      draggedFromObject = draggedObj.parent();
      // Get the id of the from source holder
      id_source_holder=draggedFromObject.attr('id');
      // Get the id of the destination holder
      id_dest_holder=droppedToObj.attr('id');
      // Check if the holders are adjacent
      source_row=parseInt(id_source_holder.split('.')[0]);
      source_col=parseInt(id_source_holder.split('.')[1]);
      dest_row=parseInt(id_dest_holder.split('.')[0]);
      dest_col=parseInt(id_dest_holder.split('.')[1]);
      console.log(source_row,source_col,dest_row,dest_col);
      if (source_row === dest_row) {
        // If the rows are same, the absolute difference between columns should be two
        if (Math.abs(source_col-dest_col) === 2){
          // Mark the in between marble to be chucked out

          return true;
        }
      }else if (source_col === dest_col) {
        // If the columns are same, the absolute difference between rows should be two
        if (Math.abs(dest_row-source_row) === 2){
          // Mark the in between marble to be chucked out

          return true;
        }
      }
      return false;
    },
    handleDragStart: function (ev,ui) {
      // This function will be triggered when the drag starts.
      // This will be used to highlight the possible moves that could be done
      console.log("Element drag started");
    },
    handleDropEvent: function (ev,ui) {
      console.log("Element dropped");
      if (BrainVita.canBeDropped($(this),ui.draggable)) {
          // This will make the marble not to be dragged back to its original position
          ui.draggable.draggable( 'option', 'revert', false );
          // This will make the marble to fit in the slot of the holder perfectly
          ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
          

      }

    },

  }

  $(document).ready(function(){
    BrainVita.init()
  });
})();
