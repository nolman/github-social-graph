describe("PhysicsEngine", function() {

  beforeEach(function() {
  });

  it("should return the node at a position", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(0, 0), new Point(1, 1));
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    expect(physicsEngine.nodeAt(new Point(400,400))).toBeNull();
    expect(physicsEngine.nodeAt(new Point(0,0))).toEqual(node);
  });

  it("should update widget position based on its velocity", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(0, 0), new Point(1, 1));
    var physicsEngine = new PhysicsEngine();
    physicsEngine.register(node);
    var expectedPosition = new Point(milliSeconds * node.dampening, milliSeconds * node.dampening);
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

  it("should attract two connected nodes together", function(){
    var startPoint = new Point(0, 0);
    var startPoint2 = new Point(1000, 1000);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity);
    var node2 = new Widget(startPoint2, startingVelocity);
    var physicsEngine = new PhysicsEngine();
    node.connectTo(node2);
    physicsEngine.register(node);
    physicsEngine.register(node2);
    var previousDistance = node.distanceFrom(node2);
    physicsEngine.runPhysics(1);
    expect(node.distanceFrom(node2)).toBeLessThan(previousDistance);
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
