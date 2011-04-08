function Widget(position, velocity, widget_type, uniqueIdentifier) {
  this.uniqueIdentifier = uniqueIdentifier;
  this.widget_type = widget_type;
  this.width = 50;
  this.height = 20;
  this.position = position;
  this.velocity = velocity;
  this.pinned = false;
  this.connectedNodes = [];
  this.dampening = 0.5;
  this.repulsiveConstant = 100;
  this.attractiveConstant = 0.5;
}

// record and track movement
Widget.prototype.mousedown = function(){
  this.pinned = true;
};

Widget.prototype.updatePositionAndVelocity = function(aggregateForce, ticks) {
  this.velocity = this.velocity.plus(aggregateForce).times(this.dampening);
  this.position = this.position.plus(this.velocity.times(ticks));
};

Widget.prototype.repulsionFrom = function(otherNode) {
  if(this == otherNode) return new Point(0,0);
  var positionDifference = this.position.minus(otherNode.position);
  var distance = this.position.distanceFrom(otherNode.position);
  var magnitude = this.repulsiveConstant / Math.pow(distance,2);
  return positionDifference.times(magnitude/distance);
};

Widget.prototype.attractionTo = function(otherNode) {
  if(this == otherNode) return new Point(0,0);
  var positionDifference = this.position.minus(otherNode.position);
  var distance = this.position.distanceFrom(otherNode.position);
  var magnitude = this.attractiveConstant * -0.001 * distance;
  return positionDifference.times(magnitude/distance);
};

Widget.prototype.distanceFrom = function(otherWidget) {
  return this.position.distanceFrom(otherWidget.position);
};

Widget.prototype.connectTo = function(otherWidget){
  this.connectedNodes.push(otherWidget);
  otherWidget.connectedNodes.push(this);
};

Widget.prototype.aggregateAttraction = function(){
  var self = this;
  var summedAttraction = new Point(0,0);
  $.each(this.connectedNodes, function(index, otherNode){
    summedAttraction = summedAttraction.plus(self.attractionTo(otherNode));
  });
  return summedAttraction;
};

Widget.prototype.contains = function(point){
  var withinXAxis = this.position.x - this.width/2 <= point.x && this.position.x + this.width/2 >= point.x;
  var withinYAxis = this.position.y - this.height/2 <= point.y && this.position.y + this.height/2 >= point.y;
  return withinXAxis && withinYAxis;
};
