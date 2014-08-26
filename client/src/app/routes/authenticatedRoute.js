App.AuthenticatedRoute = Ember.Route.extend({

    beforeModel: function (transition) {
        if (!App.get('authToken')) {
            this.redirectToLogin(transition);
        }
    },

    redirectToLogin: function (transition) {
        var loginController = this.controllerFor('login');
        loginController.set('attemptedTransition', transition);
        this.transitionTo('login');
    },

    getJSONWithToken: function (url) {
        var token = App.get('authToken');
        return ajax.request({
            dataType: 'json',
            url: url,
            data: {
                token: token
            }
        });
    },
    actions: {
        error: function (reason, transition) {
            if (reason.status === 401) {
                this.redirectToLogin(transition);
            }
            else {
                console.log('Something went wrong');
            }
        }
    }
});