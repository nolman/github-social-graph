function Widget(position, velocity) {
  this.position = position;
  this.velocity = velocity;
}

Widget.prototype.updatePositionAndVelocity = function(aggregateForce, ticks, dampening) {
  this.velocity = this.velocity.plus(aggregateForce).times(dampening);
  this.position = this.position.plus(this.velocity.times(ticks));
};
