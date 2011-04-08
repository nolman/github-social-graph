$(document).ready(function(){
  base_repo_url = "http://github.com/api/v2/json/repos/show/";
  function Animation() {
    this.physicsEngine = new PhysicsEngine();
    this.canvas = document.getElementById("canvas");
    this.canvasContext = this.canvas.getContext("2d")
  }
  var animation = new Animation();
  setInterval(drawIt, 200);
  function FetchUserRepos(user, contributorWidget){
    // $.getJSON(base_repo_url + user + "?callback=?", function(data){
    //   var repoWidget = new Widget(new Point(Math.random()* 300,Math.random()* 300), new Point(0,0), "red");
    //   contributorWidget.connectTo(repoWidget);
    //   animation.physicsEngine.register(repoWidget);
    // });
  }  
  $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque/contributors?callback=?",function(data){
    var resqueWidget = new Widget(new Point(500,400), new Point(1,1), "red"); //resque
    resqueWidget.pinned = true;
    animation.physicsEngine.register(resqueWidget);
    $.each(data.contributors, function(index, contributor){
      var contributorWidget = new Widget(new Point(Math.random()* 200,Math.random()* 200), new Point(0,0), "blue");
      FetchUserRepos(contributor.login, contributorWidget);
      contributorWidget.connectTo(resqueWidget);
      animation.physicsEngine.register(contributorWidget);
    });
  });

  function drawIt(){
    animation.physicsEngine.runPhysics();
    animation.canvas.width = animation.canvas.width;
    $.each(animation.physicsEngine.nodes, function(index, node){
      $.each(node.connectedNodes, function(index, connectedNode){
        animation.canvasContext.moveTo(node.position.x, node.position.y);
        animation.canvasContext.lineTo(connectedNode.position.x, connectedNode.position.y)
        animation.canvasContext.strokeStyle = "#ddd";
        animation.canvasContext.stroke();
      });
    });

    $.each(animation.physicsEngine.nodes, function(index, node){
      var width = 50;
      var height = 20;
      var node_center_x_point = node.position.x - width/2;
      var node_center_y_point = node.position.y - height/2;
      roundRect(animation.canvasContext, node_center_x_point, node_center_y_point, width, height, 5, node.widget_type);
    });
  }

  function roundRect(context, x, y, w, h, radius, color)
  {
    var r = x + w;
    var b = y + h;
    context.beginPath();
    context.strokeStyle=color;
    context.lineWidth="1";
    context.moveTo(x+radius, y);
    context.lineTo(r-radius, y);
    context.quadraticCurveTo(r, y, r, y+radius);
    context.lineTo(r, y+h-radius);
    context.quadraticCurveTo(r, b, r-radius, b);
    context.lineTo(x+radius, b);
    context.quadraticCurveTo(x, b, x, b-radius);
    context.lineTo(x, y+radius);
    context.quadraticCurveTo(x, y, x+radius, y);
    context.fillStyle="#FFFFFF";
    context.fill();
    // context.fillStyle="#000000";
    // context.font = "bold 12px sans-serif";
    // context.fillText("nolan", x+5, y+10);
    context.stroke();
  }

});
