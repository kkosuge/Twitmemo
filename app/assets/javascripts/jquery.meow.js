(function ($) {
  'use strict';
  var meow_area,
    meows = {
      queue: {},
      add: function (meow) {
        this.queue[meow.timestamp] = meow;
      },
      get: function (timestamp) {
        return this.queue[timestamp];
      },
      remove: function (timestamp) {
        delete this.queue[timestamp];
      },
      size: function () {
        var timestamp,
          size = 0;
        for (timestamp in this.queue) {
          if (this.queue.hasOwnProperty(timestamp)) { size += 1; }
        }
        return size;
      }
    },
    Meow = function (options) {
      var that = this,
        message_type;
      this.timestamp = new Date().getTime(); // used to identify this meow and timeout
      this.hovered = false;         // whether mouse is over or not
      this.manifest = {};           // stores the DOM object of this meow
      
      if (meows.size() <= 0) {
        meow_area = 'meows-' + new Date().getTime();
        $('body').prepend($(document.createElement('div')).attr({id: meow_area, 'class': 'meows'}));
        if (typeof options.beforeCreateFirst === 'function') {
          options.beforeCreateFirst.call(that);
        }
      }
      if (typeof options.title === 'string') {
        this.title = options.title;
      }
      if (typeof options.message === 'string') {
        message_type = 'string';
      } else if (typeof options.message === 'object') {
        message_type = options.message.get(0).nodeName;
        if (typeof this.title === 'undefined' && typeof options.message.attr('title') === 'string') {
          this.title = options.message.attr('title');
        }
      }
      switch (message_type) {
      case 'string':
        this.message = options.message;
        break;
      case 'INPUT':
      case 'TEXTAREA':
        this.message = options.message.attr('value');
        break;
      case 'SELECT':
        this.message = options.message.find('option:selected').text();
        break;
      default:
        this.message = options.message.text();
        break;
      }
      if (typeof options.icon === 'string') {
        this.icon = options.icon;
      }
      if (options.sticky) {
        this.duration = Infinity;
      } else {
        this.duration = options.duration || 5000;
      }
      if (typeof options.beforeCreate === 'function') {
        options.beforeCreate.call(that);
      }
      $('#' + meow_area).append($(document.createElement('div'))
        .attr('id', 'meow-' + this.timestamp.toString())
        .addClass('meow')
        .html($(document.createElement('div')).addClass('inner').html(this.message))
        .hide()
        .fadeIn(400));

      this.manifest = $('#meow-' + this.timestamp.toString());
      if (typeof this.title === 'string') {
        this.manifest.find('.inner').prepend(
          $(document.createElement('h1')).text(this.title)
        );
      }
      if (typeof that.icon === 'string') {
        this.manifest.find('.inner').prepend(
          $(document.createElement('div')).addClass('icon').html(
            $(document.createElement('img')).attr('src', this.icon)
          )
        );
      }
      if (options.closeable !== false) {
        this.manifest.find('.inner').prepend(
          $(document.createElement('a'))
            .addClass('close')
            .html('&times;')
            .attr('href', '#close-meow-' + that.timestamp)
            .click(function (e) {
              e.preventDefault();
              that.destroy();
            })
        );
      }
      this.manifest.bind('mouseenter mouseleave', function (event) {
        if (event.type === 'mouseleave') {
          that.hovered = false;
          that.manifest.removeClass('hover');
          // Destroy the mow on mouseleave if it's timed out
          if (that.timestamp + that.duration <= new Date().getTime()) {
            that.destroy();
          }
        } else {
          that.hovered = true;
          that.manifest.addClass('hover');
        }
      });
      if (this.duration !== Infinity) {
        this.timeout = setTimeout(function () {
          if (typeof meows.get(that.timestamp) !== 'undefined') {
            if (typeof options.onTimeout === 'function') {
              options.onTimeout.call(that.manifest);
            }
            if (that.hovered !== true && typeof that === 'object') {
              that.destroy();
            }
          }
        }, that.duration);
      }
      this.destroy = function () {
        if (typeof options.beforeDestroy === 'function') {
          options.beforeDestroy.call(that.manifest);
        }
        that.manifest.find('.inner').fadeTo(400, 0, function () {
          that.manifest.slideUp(function () {
            that.manifest.remove();
            meows.remove(that.timestamp);
            if (typeof options.afterDestroy === 'function') {
              options.afterDestroy.call(null);
            }
            if (meows.size() <= 0) {
              $('#' + meow_area).remove();
              if (typeof options.afterDestroyLast === 'function') {
                options.afterDestroyLast.call(null);
              }
            }
          });
        });
      };
    };
  $.fn.meow = function (args) {
    meows.add(new Meow(args));
  };
  $.meow = function (args) {
    $.fn.meow(args);
  };
}(jQuery));
