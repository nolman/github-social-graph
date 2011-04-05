function PhysicsEngine() {
  this.nodes = [];
  this.dampening = 0.5;
  this.repulsiveConstant = 30;
}

// TODO: an array is not the best data structure for this
PhysicsEngine.prototype.register = function(node) {
  this.nodes.push(node);
};

PhysicsEngine.prototype.magnitudeOfRepulsiveForceAt = function(distance) {
  var magnitude = this.repulsiveConstant / Math.pow(distance,2);
  return Math.min(magnitude, 10);
};

PhysicsEngine.prototype.runPhysics = function(ticks) {
  var self = this;
  $.each(this.nodes, function(index, node){
    if(node.pinned) return true;
    var aggregateForce = self.aggregateRepulsiveForcesOnNode(node);
    node.updatePositionAndVelocity(aggregateForce, ticks, self.dampening);
  });
};

PhysicsEngine.prototype.aggregateRepulsiveForcesOnNode = function(nodeForceAppliedTo) {
  var self = this;
  var totalRepulsiveForce = new Point(0,0);
  $.each(this.nodes, function(index, node){
    totalRepulsiveForce = totalRepulsiveForce.plus(nodeForceAppliedTo.repulsionFrom(node));
  });
  return totalRepulsiveForce;
};
