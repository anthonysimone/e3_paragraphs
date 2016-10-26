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
      // console.log($(this)[0]);
      var drake = dragula([$(this)[0]]);
      drake.on('drop', function(el) {
        // console.log(this);
        adjustOrder(drake);
      });

      // drake.on('cloned', function(clone, original, type) {
      //   console.log(clone);
      //   console.log(original);
      //   console.log(type);
      //   if (type === 'mirror') {
      //     setTimeout(function() {
      //       $(clone).addClass('fancy');
      //     }, 100);
      //   }
      // });
      // console.log(drake);
    });
  }

  function adjustOrder(dragulaObject) {
    var $draggableItems = $(dragulaObject.containers[0]).children();
    $draggableItems.each(function(i, el) {
      $(this).children('div').children('div').children('.form-type-select').children('select').val(i);
    });
  }

})(jQuery, Drupal, drupalSettings);