function Point(x,y) {
  this.x = x;
  this.y = y;
}
// TODO: an array is not the best data structure for this
Point.prototype.plus = function(otherPoint) {
  return new Point(this.x + otherPoint.x, this.y + otherPoint.y);
};

Point.prototype.times = function(multiple) {
  return new Point(this.x * multiple, this.y * multiple);
};
