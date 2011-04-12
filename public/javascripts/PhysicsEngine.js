function PhysicsEngine(centerPoint) {
  this.nodes = new Array();
  this.startingPoint = centerPoint || new Point(0, 0);
  this.lastRunTime = new Date();
  this.empty = true;
}

PhysicsEngine.prototype.insertOrConnectWidgets = function(renders, linkedIdentifier) {
  var self = this;
  $.each(renders, function(index, render){
    if(self.empty){
      var widget = new Widget(self.startingPoint, new Point(0,0), render);
      widget.pinned = true;
      self.empty = false
    } else{
      var x = (Math.random() > 0.5 ? -1 : 1) * Math.random() * 300;
      var y = (Math.random() > 0.5 ? -1 : 1) * Math.random() * 300;
      var startingPoint = self.startingPoint.plus(new Point(x,y));
      var widget = new Widget(startingPoint, new Point(0,0), render);
    }
    var existingWidget = self.nodes[linkedIdentifier];
    if(existingWidget){
      existingWidget.connectTo(widget);
    }
    self.register(widget, render.uniqueIdentifier());
  });
};

PhysicsEngine.prototype.register = function(node, uniqueIdentifier) {
  this.nodes[uniqueIdentifier] = node;
};

PhysicsEngine.prototype.timeSinceLastRun = function() {
  var currentTime = new Date();
  var timeDiff = new Date() - this.lastRunTime;
  this.lastRunTime = currentTime;
  return timeDiff;
};

PhysicsEngine.prototype.runPhysics = function(ticks) {
  if(!ticks){
    ticks = this.timeSinceLastRun();
  }
  for (var index in this.nodes) {
    var node = this.nodes[index];
    if(!node.pinned){
      var aggregateRepulsiveForce = this.aggregateRepulsiveForcesOnNode(node);
      var aggregateForce = aggregateRepulsiveForce.plus(node.aggregateAttraction());
      node.updatePositionAndVelocity(aggregateForce, ticks, this.dampening);
    }
  }
};

PhysicsEngine.prototype.aggregateRepulsiveForcesOnNode = function(nodeForceAppliedTo) {
  var self = this;
  var totalRepulsiveForce = new Point(0,0);
  for (var index in this.nodes) {
    var node = this.nodes[index];
    totalRepulsiveForce = totalRepulsiveForce.plus(nodeForceAppliedTo.repulsionFrom(node, this.repulsiveConstant));
  }
  return totalRepulsiveForce;
};

PhysicsEngine.prototype.nodeAt = function(point) {
  var match = null;
  for (var index in this.nodes) {
    var node = this.nodes[index];
    if(node.contains(point)){
      return node;
    }
  }
  return match;
};

PhysicsEngine.prototype.nodeCount = function() {
  var i = 0
  for (var index in this.nodes) {
    i += 1;
  }
  return i;
};
