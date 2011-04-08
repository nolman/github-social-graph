function PhysicsEngine() {
  this.nodes = new Array();
  this.lastRunTime = new Date();
}

// TODO: an array is not the best data structure for this
PhysicsEngine.prototype.register = function(node) {
  this.nodes.push(node);
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
  var self = this;
  $.each(this.nodes, function(index, node){
    if(node.pinned) return true;
    var aggregateRepulsiveForce = self.aggregateRepulsiveForcesOnNode(node);
    var aggregateForce = aggregateRepulsiveForce.plus(node.aggregateAttraction());
    node.updatePositionAndVelocity(aggregateForce, ticks, self.dampening);
  });
};

PhysicsEngine.prototype.aggregateRepulsiveForcesOnNode = function(nodeForceAppliedTo) {
  var self = this;
  var totalRepulsiveForce = new Point(0,0);
  $.each(this.nodes, function(index, node){
    totalRepulsiveForce = totalRepulsiveForce.plus(nodeForceAppliedTo.repulsionFrom(node, self.repulsiveConstant));
  });
  return totalRepulsiveForce;
};

PhysicsEngine.prototype.nodeAt = function(point) {
  var match = null
  $.each(this.nodes, function(index, node){
    if(node.contains(point)){
      match = node
      return false;
    }
  });
  return match;
};
