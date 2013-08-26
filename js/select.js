
(function () {
  var SelectMenu = function (options) {
    this.profiles = options.data;
    this.select = options.select;
    this.init();
  };
  
  var fn = SelectMenu.prototype;
  
  // four methods on events
  
  fn.emit = function(eventName, data) {
    var self = this;
    if (this.eventsOutside[eventName] != null) {
      $.each(this.eventsOutside[eventName], function(index, callback) {
        callback.call(self, data);
      });
    };
  };
  
  fn.on = function(eventName, callback) {
    if (eventName != null && (typeof callback) == 'function') {
      if (! (callback in this.eventsOutside[eventName])) {
        this.eventsOutside[eventName].push(callback);
      }
    }
  };
  
  fn.trigger = function(eventName, data) {
    var self = this;
    if (this.eventsInside[eventName] != null) {
      $.each(this.eventsInside[eventName], function(index, callback) {
        callback.call(self, data);
      });
    };
  };
  
  fn.bind = function(eventName, callback) {
    if (eventName != null && (typeof callback) == 'function') {
      if (! (callback in this.eventsInside[eventName])) {
        this.eventsInside[eventName].push(callback);
      }
    }
  };
  
  // methods for rendering HTML

  fn.template = function() {
    this.el = $('<div>');
    this.el.addClass('select-menu');
    
    this.el.append('<div class="select-title"></div>');
    this.el.append('<div class="select-arrow">▾</div>')
    
    var listElement = $('<div>').addClass('select-list');
    var listHTML = $.map(this.profiles, function(data, index) {
      return "<div class='option-item' data-key='"
      + data.key + "' >"
      + data.value + "</div>" 
    }).join('');
    listElement.append(listHTML);
    
    this.el.append(listElement);
  };

  fn.renderTitle = function() {
    var selectedProfile = this.findSelected(this.select);
    $(this.el).find('.select-title').text(selectedProfile.value);
  };
  
  // methods for dealing with data
  
  fn.checkData = function() {
    if (this.select == null) throw new Error('no select');
    if (this.profiles == null) throw new Error('no profiles');
    if (this.profiles.length < 1) throw new Error('profiles empty');
  };

  fn.findSelected = function(key) {
    if (key == null) {
      key = this.select;
    }
    var selectedProfile;
    $.each(this.profiles, function(index, profile) {
      if (profile.key == key) selectedProfile = profile;
    });
    if (selectedProfile == null) {
      selectedProfile = this.profiles[0];
    }
    return selectedProfile;
  };
  
  // bootstrap this object

  fn.init = function() {
    this.eventsInside = {
      open: [],
      close: [],
      select: []
    };
    this.eventsOutside = {
      open: [],
      close: [],
      select: []
    };
    this.menuIsOpen = false;
    this.checkData();
    this.template();
    this.renderTitle();
    this.startBind();
  };
  
  fn.bindArrow = function() {
    var self = this;
    $(this.el).on('click', '.select-arrow', function() {
      self.toggleMenu();
    });
  };
  
  fn.bindItem = function() {
    var self = this;
    $(this.el).on('click', '.option-item', function(event) {
      var key = $(event.target).attr('data-key');
      self.justUseItem(key);
      self.justCloseMenu();
      self.emit('select', self.findSelected(key));
    });
  };
  
  // menu opening and closing
  
  fn.justOpenMenu = function() {
    $(this.el).find('.select-list').addClass('menu-open');
    this.menuIsOpen = true;
    var selectQuery = '.option-item[data-key='+ this.select + ']';
    $(this.el).find(selectQuery).addClass('selected-item');
  };
  
  fn.justCloseMenu = function() {
    $(this.el).find('.select-list').removeClass('menu-open');
    this.menuIsOpen = false;
    $(this.el).find('.selected-item').removeClass('selected-item');
  };
  
  fn.toggleMenu = function() {
    if (this.menuIsOpen) {
      this.justCloseMenu();
      this.emit('close', this.findSelected(this.select));
    } else {
      this.justOpenMenu();
      this.emit('open', this.findSelected(this.select));
    }    
  };
  
  // select an item

  fn.justUseItem = function(item) {
    this.select = item;
    var profile = this.findSelected(item);
    $(this.el).find('.select-title').text(profile.value);
  };
  
  fn.markSelect = function() {
    var value = this.findSelected().value;
    $(this.el).find();
  };
  
  // exposed events
  
  fn.startBind = function() {
    this.bindArrow();
    this.bindItem();
    
    this.bind('select', this.trySelectItem);
    this.bind('open', this.tryOpen);
    this.bind('close', this.tryClose);
  };
  
  fn.trySelectItem = function(key) {
    this.justUseItem(key);
    this.justCloseMenu();
  };
  
  fn.tryOpen = function() {
    this.justOpenMenu();
  };
  
  fn.tryClose = function() {
    this.justCloseMenu();
  };

  window.SelectMenu = SelectMenu;
})();