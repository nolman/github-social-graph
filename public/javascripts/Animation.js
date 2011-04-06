$(document).ready(function(){
  function Animation() {
    this.physicsEngine = new PhysicsEngine();
    var widget1 = new Widget(new Point(200,200), new Point(1,1));
    widget1.pinned = true;
    var widget2 = new Widget(new Point(120,120), new Point(-1,-1));
    widget1.connectTo(widget2);
    this.physicsEngine.register(widget1);
    this.physicsEngine.register(widget2);
    this.canvas = document.getElementById("canvas");
    this.canvasContext = this.canvas.getContext("2d")
    this.lastRunTime = new Date();
  }

  animation = new Animation();
  setInterval(drawIt, 200)

  function drawIt(){
    var currentTime = new Date();
    var timeDiff = new Date() - animation.lastRunTime;
    animation.physicsEngine.runPhysics(timeDiff);
    animation.lastRunTime = currentTime;
    animation.canvas.width = animation.canvas.width;
    $.each(animation.physicsEngine.nodes, function(index, node){
      animation.canvasContext.fillRect(node.position.x - 50, node.position.y - 50, 100, 100);
    });
  }
  
});
