App.ApplicationController = Ember.Controller.extend({

  token: localStorage.token,

  isAuthenticated: function() {
    return !!this.get('token');
  }.property('localStorage.token')

});