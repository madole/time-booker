/**
 * Created with JetBrains WebStorm.
 * User: chris
 * Date: 29/05/2014
 * Time: 20:48
 * To change this template use File | Settings | File Templates.
 */
 
module('Splash Page', {
  setup: function(){
    App.reset();
  },
  teardown: function() {
    App.reset();
  }
});

test('should show the login page if the user is not logged in', function() {
  expect(1);
  Ember.run(function() {
    visit('/');
    andThen(function() {
        equal(currentRouteName(), 'login');
    });
  });
});

test('Should display links for login', function() {
  expect(1);
  Ember.run(function(){
    visit('/');
    andThen(function() {
      var el = find('a');
      equal(el[1].innerText, 'Login', 'Login link must be present');

    });
  });
});

test('Should go to login route if login link is clicked', function() {
  expect(1);
  Ember.run(function(){
    visit('/');

    click('a:contains("Login")');

    andThen(function() {
      equal(currentRouteName(), 'login');
    });
  });
});

module('Login Page', {
  setup: function() {
    ajax.defineFixture('/auth.json', {
      response: {
          success: true,
          token: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        },
        jqXHR: {},
        textStatus: 'success'
    });
    ajax.defineFixture('/booking.json', {
      response: {
          id:1,
          booking: 'fake'
        },
      jqXHR: {},
      textStatus: 'success'
    });
    ajax.defineFixture('/articles.json', {
      response: [
        {
            id: 1,
            title: 'How to write a JavaScript Framework',
            author: 'Tomhuda Katzdale',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 2,
            title: 'Chronicles of an Embereño',
            author: 'Alerik Bryneer',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        },
        {
            id: 3,
            title: 'The Eyes of Thomas',
            author: 'Yehuda Katz',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        }
    ],
    jqXHRL: {},
    textStatus: 'success'
    })
  },
  teardown: function() {
    App.reset();
  }
});

test('Should check the login form exists', function() {
  expect(3);
  visit('/login');
  andThen(function() {
    var username = find('#username')[0];
    var password = find('#password')[0];
    var button = find('#loginSubmit')[0];
    equal(username.placeholder, 'Username');
    equal(password.placeholder, 'Password');
    equal(button.value, 'Log In');
  });
});

test('Should fill in login form with correct credentials and click submit', function() {
  expect(1);
  Ember.run(function(){
    visit('/login');
    successfulLogin();
    andThen(function() {
      equal(currentRouteName(), 'booking');
    });
  });
});


test('Should display links for Ember Digest, Articles, Photos and Login', function() {
  expect(4);
  Ember.run(function(){
    visit('/login');
    successfulLogin();
    andThen(function() {
      var el = find('a');
      equal(el[1].innerText, 'Articles', 'Articles link must be present');
      equal(el[2].innerText, 'Photos', 'Photos link must be present');
      equal(el[3].innerText, 'Booking', 'Login link must be present');
      equal(el[4].innerText, 'Logout', 'Login link must be present');

    });
  });
});

test('Should log out when log out button is clicked after a successful login', function() {
  expect(2);
  Ember.run(function(){
    visit('/login');
    successfulLogin();
    andThen(function(){
      equal(currentRouteName(), 'booking', 'Should be taken to the booking page');
      click('a:contains("Logout")');
      andThen(function(){
        equal(currentRouteName(), 'logout', 'Should log the user out');
      });
    });
  });
});

function successfulLogin() {
    fillIn('#username', 'ember');
    fillIn('#password', 'casts');
    return click('#loginSubmit');
}

module('Login Page', {
    setup: function() {
        ajax.defineFixture('/auth.json', {
            response: {
                success: false,
                message: 'Invalid username/password'
            },
            jqXHR: {},
            textStatus: 'fail'
        });
    },
    teardown: function() {
      App.reset();
    }
});

test('Should fill in login form with incorrect credentials and click submit', function() {
    expect(2);
    visit('/login');
    unsucessfulLogin();
    andThen(function() {
        equal(currentRouteName(), 'login');
        equal(find('.alert alert-danger') != null, true, 'Alert block must be present');
    });
});

function unsucessfulLogin() {
    fillIn('#username', 'wrong user');
    fillIn('#password', 'wrong pass');
    return click('#loginSubmit');
}

   

