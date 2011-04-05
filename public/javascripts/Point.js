function Point(x,y) {
  this.x = x;
  this.y = y;
}
// TODO: an array is not the best data structure for this
Point.prototype.plus = function(otherPoint) {
  return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
};

Point.prototype.minus = function(otherPoint) {
  return new Point(this.x - otherPoint.x, this.y - otherPoint.y);
};

Point.prototype.times = function(multiple) {
  return new Point(this.x * multiple, this.y * multiple);
};

Point.prototype.distanceFrom = function(otherPoint) {
  var dx = this.x - otherPoint.x;
  var dy = this.y - otherPoint.y;
  return Math.sqrt(dx*dx + dy*dy);
};
