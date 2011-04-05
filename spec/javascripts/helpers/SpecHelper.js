beforeEach(function() {
  this.addMatchers({
    toBeWithin: function(expected, delta) {
      return delta > (this.actual - expected);
    },
    toBeSamePointAs: function(expected){
      return this.actual.x == expected.x && this.actual.y == expected.y;
    }
  })
});
