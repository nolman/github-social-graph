describe("Widget", function() {

  it("should calculate the attraction between two widgets", function() {
    var widget1 = new Widget(new Point(0,0), new Point(0,0));
    var widget2 = new Widget(new Point(0,5), new Point(0,0));
    expect(widget1.attractionTo(widget2)).toBeSamePointAs(new Point(0,0.0025));
  });

  it("should calculate zero attraction for a widget between two equally space widgets", function() {
    var widget1 = new Widget(new Point(0,0), new Point(0,0));
    var widget2 = new Widget(new Point(0,5), new Point(0,0));
    var widget3 = new Widget(new Point(0,-5), new Point(0,0));
    widget1.connectTo(widget2);
    widget1.connectTo(widget3);
    expect(widget1.aggregateAttraction()).toBeSamePointAs(new Point(0,0));
  });

  it("should calculate the attraction between all widgets", function() {
    var widget1 = new Widget(new Point(0,0), new Point(0,0));
    var widget2 = new Widget(new Point(0,5), new Point(0,0));
    var widget3 = new Widget(new Point(5,5), new Point(0,0));
    widget1.connectTo(widget2);
    widget1.connectTo(widget3);
    expect(widget1.aggregateAttraction()).toBeSamePointAs(new Point(0.0025,0.005));
  });

  it("should have no attraction force to itself", function() {
    var widget = new Widget(new Point(0,0), new Point(0,0));
    expect(widget.attractionTo(widget)).toBeSamePointAs(new Point(0,0));
  });

  it("should repulsion between two widgets", function() {
    var widget1 = new Widget(new Point(0,0), new Point(0,0));
    var widget2 = new Widget(new Point(0,5), new Point(0,0));
    expect(widget1.repulsionFrom(widget2)).toBeSamePointAs(new Point(0,-4));
  });

});
