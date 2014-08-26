/**
 * Created by Madole on 19/08/2014.
 */
App.LogoutRoute = Ember.Route.extend({
  beforeModel: function() {
    localStorage.clear();
    App.set('authToken', null);
    this.transitionTo('login');
  }
});