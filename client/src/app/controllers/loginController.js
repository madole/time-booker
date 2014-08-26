App.LoginController = Ember.Controller.extend({
  actions: {
    login: function() {
      var that = this,
        data = this.getProperties('username', 'password');
      // Clear out any error messages.
      this.set('errorMessage', '');

      ajax.request({
        url: '/auth.json',
        type: 'POST',
        data: data
      }).then(function(response) {
        that.set('errorMessage', response.message);
        if (response.success) {
          App.set('authToken', response.token);
          var attemptedTransition = that.get('attemptedTransition');
          if (attemptedTransition) {
            attemptedTransition.retry();
            that.set('attemptedTransition', null);
          }
          else {
            // Redirect to 'booking' by default.
            that.transitionToRoute('booking');
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
  }
});