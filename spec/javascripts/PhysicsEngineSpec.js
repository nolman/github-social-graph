describe("PhysicsEngine", function() {

  beforeEach(function() {
  });

  it("should repulse points according to the inverse square of seperation", function() {
    var physicsEngine = new PhysicsEngine();
    var distanceOne = 3.0;
    var magnitudeOne = physicsEngine.magnitudeOfRepulsiveForceAt(distanceOne);
    var distanceTwo = 7.0;
    var magnitudeTwo = physicsEngine.magnitudeOfRepulsiveForceAt(distanceTwo);
    expect(Math.pow(distanceTwo/distanceOne, 2.0)).toBeWithin(magnitudeOne/magnitudeTwo, 0.0001);
  });

  it("should update widget position based on its velocity", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(0, 0), new Point(1, 1));
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    var expectedPosition = new Point(milliSeconds * physicsEngine.dampening, milliSeconds * physicsEngine.dampening);
    physicsEngine.runPhysics(milliSeconds);
    expect(node.position).toBeSamePointAs(expectedPosition);
  });

  it("should not move widgets that have been clicked", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(2, 3), new Point(1, 1));
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    node.mousedown();
    physicsEngine.runPhysics(10);
    expect(node.position).toBeSamePointAs(new Point(2, 3));
  });

});
