describe("Widget", function() {
  beforeEach(function() {
    var userData = {"name":"Nolan Evans","company":"Involver","gravatar_id":"492d8bf8006b56b62e159d5bbe2df2d5","location":"San Francisco","blog":"http://www.nolanevans.com","type":"User","contributions":8,"login":"nolman","email":null};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    githubUser = new GithubUserRender(userData, context);
  });

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

  it("should know if a point is left of a widget", function() {
    var widget = new Widget(new Point(0,0), new Point(0,0), githubUser);
    expect(widget.contains(new Point((-widget.width()/2),0))).toEqual(true);
    expect(widget.contains(new Point((-widget.width()/2)-1,0))).toEqual(false);
  });

  it("should know if a point is right of a widget", function() {
    var widget = new Widget(new Point(0,0), new Point(0,0), githubUser);
    expect(widget.contains(new Point((widget.width()/2),0))).toEqual(true);
    expect(widget.contains(new Point((widget.width()/2)+1,0))).toEqual(false);
  });

  it("should know if a point is above of a widget", function() {
    var widget = new Widget(new Point(0,0), new Point(0,0), githubUser);
    expect(widget.contains(new Point(0,-widget.height()/2))).toEqual(true);
    expect(widget.contains(new Point(0, (-widget.height()/2)-1))).toEqual(false);
  });

  it("should know if a point is under a widget", function() {
    var widget = new Widget(new Point(0,0), new Point(0,0), githubUser);
    expect(widget.contains(new Point(0, widget.height()/2))).toEqual(true);
    expect(widget.contains(new Point(0, (widget.height()/2)+1))).toEqual(false);
  });

});
