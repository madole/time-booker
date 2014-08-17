App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      var self = this,
        data = this.getProperties('username', 'password');
      // Clear out any error messages.
      this.set('errorMessage', null);

      ajax.request({
        url: '/auth.json',
        type: 'POST',
        data: data
      }).then(function(response) {

        self.set('errorMessage', response.message);
        if (response.success) {
          self.set('token', response.token);

          var attemptedTransition = self.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            self.set('attemptedTransition', null);
          }
          else {
            // Redirect to 'articles' by default.
            self.transitionToRoute('booking');
          }
        }
      });
    }
  },
  reset: function() {
    this.setProperties({
      username: '',
      password: '',
      errorMessage: ''
    });
  },

  token: localStorage.token,
  tokenChanged: function() {
    localStorage.token = this.get('token');
  }.observes('token')
});