/**
 * Created by Madole on 19/08/2014.
 */
App.LogoutRoute = Ember.Route.extend({
  beforeModel: function() {
    localStorage.clear();
    this.controllerFor('application').set('token', null);
    this.controllerFor('application').set('isAuthenticated', false);
    this.transitionTo('login');

  }
})