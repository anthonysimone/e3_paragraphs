(function ($, Drupal, drupalSettings) {

  // Drupal.behaviors.draggableItems = {
  //   attach: function (context, settings) {
  //     function initDraggableItems(container, base) {
  //       if (container.length) {
  //         // Create the new tableDrag instance. Save in the Drupal variable
  //         // to allow other scripts access to the object.
  //         Drupal.draggableItems[base] = new Drupal.draggableItems(container[0], settings.draggableItems[base]);
  //       }
  //     }
  //
  //     for (var base in settings.draggableItems) {
  //       if (settings.draggableItems.hasOwnProperty(base)) {
  //         initDraggableItems($(context).find('#' + base).once('draggableitems'), base);
  //       }
  //     }
  //   }
  // };

  Drupal.behaviors.draggableItems = {
    attach: function (context, settings) {
      initDraggableItems($(context).find('.draggable-items-container'));
    }
  };

  function initDraggableItems($draggableItemContainers) {
    $draggableItemContainers.each(function() {
      console.log($(this)[0]);
      var drake = dragula([$(this)[0]]);
      drake.on('drop', function(el) {
        console.log(this);
        adjustOrder(drake);
      });
      console.log(drake);
    });
  }

  function adjustOrder(dragulaObject) {
    var $draggableItems = $(dragulaObject.containers[0]).children();
    console.log($draggableItems);
    $draggableItems.each(function(el, i) {
      $(el).find('> div > div > select.form-select').val(i);
      console.log(el);
      console.log(i);
    });
  }

})(jQuery, Drupal, drupalSettings);