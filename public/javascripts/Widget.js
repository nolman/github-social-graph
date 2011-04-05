function Widget(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.pinned = false;
}

// record and track movement
Widget.prototype.mousedown = function(){
  this.pinned = true;
};

Widget.prototype.updatePositionAndVelocity = function(aggregateForce, ticks, dampening) {
  this.velocity = this.velocity.plus(aggregateForce).times(dampening);
  this.position = this.position.plus(this.velocity.times(ticks));
};

Widget.prototype.repulsionFrom = function(otherNode, repulsiveConstant) {
  if(this == otherNode) return new Point(0,0);
  var positionDifference = this.position.minus(otherNode.position);
  var distance = this.position.distanceFrom(otherNode.position);
  var magnitude = repulsiveConstant / Math.pow(distance,2);
  return positionDifference.times(magnitude/distance);
};
