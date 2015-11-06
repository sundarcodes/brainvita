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
      source_row=parseInt(id_source_holder.split('_')[0]);
      source_col=parseInt(id_source_holder.split('_')[1]);
      dest_row=parseInt(id_dest_holder.split('_')[0]);
      dest_col=parseInt(id_dest_holder.split('_')[1]);
      //console.log(source_row,source_col,dest_row,dest_col);
      if (source_row === dest_row) {
        // If the rows are same, the absolute difference between columns should be two
        if (Math.abs(source_col-dest_col) === 2){
          // Mark the in-between marble to be chucked out
          // Find which column is minimum and add 1 to it
          chucked_out_col=Math.min(source_col,dest_col)+1;
          chucked_out_row=source_row;
          // Find the holder corresponding to this id and mark the marble in it to chuck-out
          id_holder=chucked_out_row.toString()+"_"+chucked_out_col.toString();
          //console.log('#'+id_holder+ " > div");
          marble=$('#'+id_holder+ " > div");
          marble.addClass('chuck-out');
          return true;
        }
      }else if (source_col === dest_col) {
        // If the columns are same, the absolute difference between rows should be two
        if (Math.abs(dest_row-source_row) === 2){
          // Mark the in-between marble to be chucked out
          chucked_out_row=Math.min(dest_row,source_row)+1;
          chucked_out_col=source_col;
          // Find the holder corresponding to this id and mark the marble in it to chuck-out
          id_holder=chucked_out_row.toString()+"_"+chucked_out_col.toString();
          marble=$('#'+id_holder+ " > div");
          marble.addClass('chuck-out');
          return true;
        }
      }
      return false;
    },
    handleDragStart: function (ev,ui) {
      // This function will be triggered when the drag starts.
      // This will be used to highlight the possible moves that could be done
      //console.log("Element drag started");
    },
    handleDropEvent: function (ev,ui) {
      //console.log("Element dropped");
      if (BrainVita.canBeDropped($(this),ui.draggable)) {
          // This will make the marble not to be dragged back to its original position
          ui.draggable.draggable( 'option', 'revert', false );

          // This will make the marble to fit in the slot of the holder perfectly
          ui.draggable.css("position", "absolute");
          ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
          // Remove the class empty from the holder where the marble was dropped into
          //debugger
          // Add the class empty to the holder from where the marble was moved
          holder_of_dragged_marble=$(ui.draggable).parent();
          holder_of_dragged_marble.addClass('empty');
          $(ui.draggable).appendTo(this);
          $(this).removeClass('empty');
          // Now the remove the marble which was jumped across
          // We can remove the marble which is marked as chuck-out
          marble=$('.chuck-out');
          holder=marble.parent();
          holder.addClass('empty');
          marble.fadeOut('slow','swing');
          marble.remove();
      }

    },

  }

  $(document).ready(function(){
    BrainVita.init()
  });
})();
