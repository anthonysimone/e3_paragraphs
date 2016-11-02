(function ($, Drupal, drupalSettings) {

  Drupal.behaviors.draggableItems = {
    attach: function (context, settings) {
      $('.draggable-items-container').each(function(e) {
        if (!$(this).hasClass('dragula-processed')) {
          initDraggableItems($(this));
          $(this).addClass('dragula-processed');
        }
      });
    }
  };

  function initDraggableItems($draggableItemContainers) {
    var drake = dragula([$draggableItemContainers[0]], {
      moves: function (el, container, handle) {
        return $(el).children('.dragula-handle')[0] === $(handle)[0];
      },
      accepts: function (el, target, source, sibling) {
        return target === source;
      },
    });

    drake.on('drop', function(el) {
      adjustOrder(drake);
    });
  }

  function adjustOrder(dragulaObject) {
    var $draggableItems = $(dragulaObject.containers[0]).children();
    $draggableItems.each(function(i, el) {
      $(this).children('div').children('div').children('.form-type-select').children('select').val(i);
    });
  }

})(jQuery, Drupal, drupalSettings);