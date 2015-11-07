(function(){
  var zIndexVal=1000;
  total_number_of_marbles=34;
  marbles_remaining=34;
  var BrainVita = {
    init: function(){
      $('.marble').draggable({
        containment: '.playArea',
        cursor: 'move',
        revert: true,
        stack: '.moving',
        start: BrainVita.handleDragStart,
        stop: BrainVita.handleDragStop
      });

      $('.holder').droppable({
        accept: '.marble',
        drop: BrainVita.handleDropEvent
        });

    },
    resetDraggable:function() {
      $('.marble').draggable("destroy");
      $('.holder').droppable("destroy");
      BrainVita.init();
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
          if ($('#'+id_holder).hasClass('empty')) {
            return false;
          }
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
          if ($('#'+id_holder).hasClass('empty')) {
            return false;
          }
          marble=$('#'+id_holder+ " > div");
          marble.addClass('chuck-out');
          return true;
        }
      }
      return false;
    },
    handleDragStart: function (ev,ui) {
      //console.log("Draggin started");
    },
    handleDragStop: function (ev,ui) {
      //console.log("Draggin stopped");
    },
    checkGameOver: function() {
        // Check if game is over
        // Get all the marbles available
        marblesArray=$('.marble');
    },
    handleDropEvent: function (ev,ui) {
      //console.log("Element dropped");
      if (BrainVita.canBeDropped($(this),ui.draggable)) {
          // This will make the marble not to be dragged back to its original position
          ui.draggable.draggable( 'option', 'revert', false );
          // This will make the marble to fit in the slot of the holder perfectly
          ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
          // Add the class empty to the holder from where the marble was moved
          holder_of_dragged_marble=$(ui.draggable).parent();
          holder_of_dragged_marble.addClass('empty');
          $(ui.draggable).appendTo(this);
          // Reset the position properties as its being inserted into a new div
          ui.draggable.css("left", "0");
          ui.draggable.css("right", "0");
          ui.draggable.css("top", "0");
          ui.draggable.css("bottom", "0");
          ui.draggable.css("height", "10vh");
          ui.draggable.css("width", "10vh");
          ui.draggable.draggable( 'option', 'revert', true );
          // Remove the class empty from the holder where the marble was dropped into
          $(this).removeClass('empty');
          // Now the remove the marble which was jumped across
          // We can remove the marble which is marked as chuck-out
          marble=$('.chuck-out');
          holder=marble.parent();
          holder.addClass('empty');
          marble.fadeOut('slow','swing');
          marble.remove();
          marbles_remaining--;
          if (marbles_remaining < 10) {
            Calci.checkGameOver();
          }
      }
    },
  }

  $(document).ready(function(){
    BrainVita.init();
  });
})();
