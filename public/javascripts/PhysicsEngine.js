function PhysicsEngine() {
  this.nodes = [];
}

// TODO: an array is not the best data structure for this
PhysicsEngine.prototype.register = function(node) {
  this.nodes.push(node);
};

PhysicsEngine.prototype.runPhysics = function(ticks) {
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
