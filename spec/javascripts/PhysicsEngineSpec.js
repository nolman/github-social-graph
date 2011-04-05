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

  it("should repell nodes from each other", function(){
    var startPoint = new Point(0, 0);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity);
    var node2 = new Widget(startPoint, startingVelocity);
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    physicsEngine.register(node2);
    physicsEngine.runPhysics(1);
    expect(node.position).toNotEqual(startPoint);
    expect(node.velocity).toNotEqual(startingVelocity);
    expect(node2.position).toNotEqual(startPoint);
    expect(node2.velocity).toNotEqual(startingVelocity);
    expect(node.position).toNotEqual(node2.position);
  });

  it("should not aggregate repulsive force on itself", function(){
    var startPoint = new Point(0, 0);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity);
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    expect(physicsEngine.aggregateRepulsiveForcesOnNode(node)).toEqual(new Point(0,0));
  });

  it("should aggregate repulsive force from other nodes", function(){
    var startPoint = new Point(0, 0);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity);
    var node2 = new Widget(startPoint, startingVelocity);
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    physicsEngine.register(node2);
    expect(physicsEngine.aggregateRepulsiveForcesOnNode(node)).toNotEqual(new Point(0,0));
  });

});
