describe("Point", function() {

  it("should add to points together", function() {
    var point = new Point(2,2);
    expect(point.plus(new Point(3,3))).toBeSamePointAs(new Point(5,5));
  });

  it("multiply a point by a value", function(){
    var point = new Point(2,2);
    expect(point.times(3)).toBeSamePointAs(new Point(6,6));
  });

});
