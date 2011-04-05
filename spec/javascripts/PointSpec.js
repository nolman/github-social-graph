describe("Point", function() {

  it("should add two points together", function() {
    var point = new Point(2,2);
    expect(point.plus(new Point(3,3))).toBeSamePointAs(new Point(5,5));
  });

  it("should subtract two points from each other", function() {
    var point = new Point(2,2);
    expect(point.minus(new Point(3,3))).toBeSamePointAs(new Point(-1,-1));
  });

  it("multiply a point by a value", function(){
    var point = new Point(2,2);
    expect(point.times(3)).toBeSamePointAs(new Point(6,6));
  });

  it("calculate the distance between two points", function(){
    var point = new Point(3,0);
    var point2 = new Point(0,4);
    expect(point.distanceFrom(point2)).toEqual(5);
  });

});
