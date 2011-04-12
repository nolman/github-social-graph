describe("PhysicsEngine", function() {

  beforeEach(function() {
    repoData = {"repository":{"forks":230,"open_issues":28,"description":"Resque is a Redis-backed Ruby library for creating background jobs, placing those jobs on multiple queues, and processing them later.","watchers":2042,"has_issues":true,"fork":false,"language":"Ruby","pushed_at":"2011/03/22 11:09:54 -0700","has_downloads":false,"homepage":"http://github.com/blog/542-introducing-resque","size":1696,"private":false,"name":"resque","owner":"defunkt","url":"https://github.com/defunkt/resque","has_wiki":true,"created_at":"2009/08/11 17:27:35 -0700"}};
    userData = {"name":"Nolan Evans","company":"Involver","gravatar_id":"492d8bf8006b56b62e159d5bbe2df2d5","location":"San Francisco","blog":"http://www.nolanevans.com","type":"User","contributions":8,"login":"nolman","email":null};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    repo = new GithubRepoRender(repoData, context);
    user = new GithubUserRender(userData, context);
    physicsEngine = new PhysicsEngine();
  });

  it("should drop a widget in the center point if set", function(){
    physicsEngine = new PhysicsEngine(new Point(300, 250));
    physicsEngine.insertOrConnectWidgets([repo]);
    expect(physicsEngine.nodeAt(new Point(300, 250))).not.toBeNull();
  });

  it("should connect a widget if it already existed", function(){
    physicsEngine.insertOrConnectWidgets([repo]);
    physicsEngine.insertOrConnectWidgets([user]);
    physicsEngine.insertOrConnectWidgets([user], repo.uniqueIdentifier());
    expect(physicsEngine.nodeCount()).toEqual(2);
  });

  it("should return the node at a position", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(0, 0), new Point(1, 1), repo);
    physicsEngine.register(node);
    expect(physicsEngine.nodeAt(new Point(400,400))).toBeNull();
    expect(physicsEngine.nodeAt(new Point(0,0))).toEqual(node);
  });

  it("should update widget position based on its velocity", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(0, 0), new Point(1, 1));
    physicsEngine.register(node);
    var expectedPosition = new Point(milliSeconds * node.dampening, milliSeconds * node.dampening);
    physicsEngine.runPhysics(milliSeconds);
    expect(node.position).toBeSamePointAs(expectedPosition);
  });

  it("should not move widgets that have been clicked", function(){
    var milliSeconds = 10;
    var node = new Widget(new Point(2, 3), new Point(1, 1));
    physicsEngine.register(node);
    node.mousedown();
    physicsEngine.runPhysics(10);
    expect(node.position).toBeSamePointAs(new Point(2, 3));
  });

  it("should repell nodes from each other", function(){
    var startPoint = new Point(0, 0);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity, repo);
    var node2 = new Widget(startPoint, startingVelocity, user);
    physicsEngine.register(node, repo.uniqueIdentifier());
    physicsEngine.register(node2, user.uniqueIdentifier());
    physicsEngine.runPhysics(10);
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
    physicsEngine.register(node);
    expect(physicsEngine.aggregateRepulsiveForcesOnNode(node)).toEqual(new Point(0,0));
  });

  it("should aggregate repulsive force from other nodes", function(){
    var startPoint = new Point(0, 0);
    var startingVelocity = new Point(0,0);
    var node = new Widget(startPoint, startingVelocity);
    var node2 = new Widget(startPoint, startingVelocity);
    physicsEngine.register(node);
    physicsEngine.register(node2);
    expect(physicsEngine.aggregateRepulsiveForcesOnNode(node)).toNotEqual(new Point(0,0));
  });

});
