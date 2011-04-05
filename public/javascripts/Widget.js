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
