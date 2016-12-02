(function ($, Drupal, drupalSettings, CKEDITOR) {

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

  // Make sure this WAS a wysiwyg initially, not any textarea, maybe selectors or something
  function initCkeditorFromSavedStatus(el, id, config, content) {
    if ($(el).find('#'+id).length) {
      var newEditor = CKEDITOR.replace(id, config);
      newEditor.on('instanceReady', function() {
        console.log('this is my new instance and it is READY');
        newEditor.setData(content);
      });
    }
  }

  function initDraggableItems($draggableItemContainers) {
    // Declare variables for the currently dragged item so they can be accessed in any even handler
    var draggedItemConfig,
        draggedItemInstance,
        draggedItemId,
        draggedItemContent;

    // Initialize dragula on draggable containers
    var drake = dragula([$draggableItemContainers[0]], {
      // Only handle drags items
      moves: function (el, container, handle) {
        return $(el).children('.dragula-handle')[0] === $(handle)[0];
      },
      // Drop can only happen in source element
      accepts: function (el, target, source, sibling) {
        return target === source;
      }
    });

    // On drop we need to recreate the editor from saved config
    drake.on('drop', function(el, target, source, sibling) {
      initCkeditorFromSavedStatus(el, draggedItemId, draggedItemConfig, draggedItemContent);
    });

    // On cancel we need to recreate the editor from saved config
    drake.on('cancel', function(el, container, source) {
      initCkeditorFromSavedStatus(el, draggedItemId, draggedItemConfig, draggedItemContent);
    });

    // On drag start we need to save the config from the ckeditor instance and destroy it
    drake.on('drag', function(el, source) {
      // Get id from textarea
      draggedItemId = $(el).find('textarea').attr('id');
      if (CKEDITOR.instances[draggedItemId]) {
        draggedItemInstance = CKEDITOR.instances[draggedItemId];
        draggedItemConfig = draggedItemInstance.config;
        draggedItemContent = draggedItemInstance.getData();
        if (draggedItemInstance) { draggedItemInstance.destroy(true); }
      }
    });
  }

  function adjustOrder(dragulaObject) {
    var $draggableItems = $(dragulaObject.containers[0]).children();
    $draggableItems.each(function(i, el) {
      $(this).children('div').children('div').children('.form-type-select').children('select').val(i);
    });
  }

})(jQuery, Drupal, drupalSettings, CKEDITOR);