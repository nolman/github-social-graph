function Renderable() {
}

Renderable.prototype.dimensions = function() {
  var dimensions = this.context.measureText(this.name());
  return new Point(dimensions.width + 10, 16);
};

Renderable.prototype.draw = function(centerPoint) {
  // $("#selectedWidget #name").html(this.name);
  this.context.fillStyle="#000000";
  this.context.strokeStyle = 'black';
  this.context.font = "bold 12px sans-serif";
  var dimensions = this.dimensions();
  var point = centerPoint.minus(dimensions.times(0.5));
  var radius = 5;
  var x = point.x;
  var y = point.y;
  var w = dimensions.x;
  var h = dimensions.y;
  var r = x + w;
  var b = y + dimensions.y;
  this.context.beginPath();
  this.context.strokeStyle=this.color();
  this.context.lineWidth="1";
  this.context.moveTo(x+radius, y);
  this.context.lineTo(r-radius, y);
  this.context.quadraticCurveTo(r, y, r, y+radius);
  this.context.lineTo(r, y+h-radius);
  this.context.quadraticCurveTo(r, b, r-radius, b);
  this.context.lineTo(x+radius, b);
  this.context.quadraticCurveTo(x, b, x, b-radius);
  this.context.lineTo(x, y+radius);
  this.context.quadraticCurveTo(x, y, x+radius, y);
  this.context.fillStyle="#FFFFFF";
  this.context.fill();
  this.context.stroke();
  this.context.fillStyle="#000";
  this.context.fillText(this.name(), centerPoint.x - (dimensions.x *.5) + 4, point.y+(dimensions.y *.75));
};
