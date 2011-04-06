$(document).ready(function(){
  function Animation() {
    this.physicsEngine = new PhysicsEngine();
    this.canvas = document.getElementById("canvas");
    this.canvasContext = this.canvas.getContext("2d")
    this.lastRunTime = new Date();
  }

  animation = new Animation();
  setInterval(drawIt, 200)

  $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque/contributors?callback=?",function(data){
    console.log(data)
    var resqueWidget = new Widget(new Point(500,400), new Point(1,1)); //resque
    resqueWidget.pinned = true;
    animation.physicsEngine.register(resqueWidget);
    $.each(data.contributors, function(index, contributor){
      var contributorWidget = new Widget(new Point(Math.random()* 200,Math.random()* 200), new Point(0,0));
      contributorWidget.connectTo(resqueWidget);
      animation.physicsEngine.register(contributorWidget);
    });
  });
  

  function drawIt(){
    var currentTime = new Date();
    var timeDiff = new Date() - animation.lastRunTime;
    animation.physicsEngine.runPhysics(timeDiff);
    animation.lastRunTime = currentTime;
    animation.canvas.width = animation.canvas.width;
    $.each(animation.physicsEngine.nodes, function(index, node){
      var width = 100;
      var height = 50;
      roundRect(animation.canvasContext, node.position.x - width/2, node.position.y - height/2, width, height, 10, "blue")
    });
  }

  function roundRect(context, x, y, w, h, radius, color)
  {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle=color;
    context.lineWidth="4";
    context.moveTo(x+radius, y);
    context.lineTo(r-radius, y);
    context.quadraticCurveTo(r, y, r, y+radius);
    context.lineTo(r, y+h-radius);
    context.quadraticCurveTo(r, b, r-radius, b);
    context.lineTo(x+radius, b);
    context.quadraticCurveTo(x, b, x, b-radius);
    context.lineTo(x, y+radius);
    context.quadraticCurveTo(x, y, x+radius, y);
    context.stroke();
  }
  
});
