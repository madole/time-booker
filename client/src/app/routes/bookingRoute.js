App.BookingRoute = App.AuthenticatedRoute.extend({

  model: function () {
    return this.getJSONWithToken('/booking.json');
  }
});