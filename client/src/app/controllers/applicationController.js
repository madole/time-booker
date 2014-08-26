App.ApplicationController = Ember.Controller.extend({

  isAuthenticated: function() {
    return !!App.get('authToken');
  }.property('App.authToken')

});
