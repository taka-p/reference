function Modal(el) {
  this.initialize(el);
}

Modal.prototype.initialize = function(el) {
  this.$el = el;  
  this.$container = $("#modal");
  this.$contents = $("#modal-contents");
  this.$close = $("#modal-close");
  this.$next = $("#modal-next");
  this.$prev = $("#modal-prev");
  this.$overlay = $("#modal-overlay");
  this.$window = $(window);
  this.index = 0;
  this.handleEvents();
};

Modal.prototype.handleEvents = function() {
  var self = this;
  this.$el.on("click", function(e) {
    self.show(e);
    return false;
  });

  this.$close.on("click", function(e) {
    self.hide(e);
    return false;
  });

  this.$overlay.on("click", function(e) {
    self.hide(e);
    return false;
  });

  this.$next.on("click", function(e) {
    self.next(e);
    return false;
  });

  this.$prev.on("click", function(e) {
    self.prev(e);
    return false;
  });

};

Modal.prototype.show = function(e) {
  var $target = $(e.currentTarget),
      src = $target.attr("href");
  this.$contents.html("<img src=\"" + src + "\" />");
  this.$container.fadeIn();
  this.$overlay.fadeIn();
  this.index = $target.data("index");
  return false;
};

Modal.prototype.hide = function(e) {
  this.$container.fadeOut();
  this.$overlay.fadeOut();
};

Modal.prototype.slide = function(index) {
  this.$contents.find("img").fadeOut({
    complete: function() {
      var src = $("[data-index=\"" + index + "\"]").find("img").attr("src");
      $(this).attr("src", src).fadeIn();
    }
  });
};

Modal.prototype.countChange = function(num, index, len){
  return (index + num + len) % len;
};

Modal.prototype.next = function() {
  this.index = this.countChange( 1, this.index, this.$el.length);
  this.slide(this.index);
};

Modal.prototype.prev = function() {
  this.index = this.countChange( -1, this.index, this.$el.length);
  this.slide(this.index);
};

var modal = new Modal($("#modal-thumb a"));