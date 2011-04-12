$(document).ready(function(){
  base_repo_url = "http://github.com/api/v2/json/repos/show/";

  // Taken from: http://diveintohtml5.org/canvas.html
  function getCursorPosition(e) {
    var x;
    var y;
    if (e.pageX != undefined && e.pageY != undefined) {
      x = e.pageX;
      y = e.pageY;
    }
    else {
      x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
      y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    var canvasOffset = new Point(animation.canvas.offsetLeft, animation.canvas.offsetTop);
    return (new Point(x,y)).minus(canvasOffset);
  }

  function widgetOnClick(e){
    var point = getCursorPosition(e);
    var nodeAt = animation.physicsEngine.nodeAt(point);
    if(nodeAt){
      nodeAt.pinned = true;
      animation.selectedWidget = nodeAt;
    }
  }

  function widgetMoved(e){
    if(animation.selectedWidget){
      animation.selectedWidget.updatePosition(getCursorPosition(e));
    }
  }

  function widgetRelease(e){
    if(animation.selectedWidget){
      animation.selectedWidget.pinned = false;
      animation.selectedWidget = null
    }
  }

  function Animation() {
    this.selectedWidget = null;
    this.canvas = document.getElementById("canvas");
    this.canvas.addEventListener("mousedown", widgetOnClick, false);
    this.canvas.addEventListener("mouseup", widgetRelease, false);
    this.canvas.addEventListener("mousemove", widgetMoved, false);
    this.canvasContext = this.canvas.getContext("2d")
    this.physicsEngine = new PhysicsEngine(new Point(this.canvas.width/2, this.canvas.height/2));
  }

  var animation = new Animation();
  setInterval(drawIt, 100);
  function FetchUserRepos(user, contributorWidget){
    // $.getJSON(base_repo_url + user + "?callback=?", function(data){
    //   var repoWidget = new Widget(new Point(Math.random()* 300,Math.random()* 300), new Point(0,0), "red");
    //   contributorWidget.connectTo(repoWidget);
    //   animation.physicsEngine.register(repoWidget);
    // });
  }
  function fetchRepoContributors(repoRender){
    $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque/contributors?callback=?",function(data){
      var contributors = jQuery.map(data.contributors, function(contributor, index){
        return new GithubUserRender(contributor, animation.canvasContext);
      });
      animation.physicsEngine.insertOrConnectWidgets(contributors, repoRender.uniqueIdentifier());
    });
    
  }
  
  $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque?callback=?", function(resqueData){
    var repoRender = new GithubRepoRender(resqueData, animation.canvasContext);
    animation.physicsEngine.insertOrConnectWidgets([repoRender]);
    setTimeout(fetchRepoContributors, 1000, repoRender);
  });
  

  function drawIt(){
    animation.physicsEngine.runPhysics();
    animation.canvas.width = animation.canvas.width;
    for (var index in animation.physicsEngine.nodes) {
      var node = animation.physicsEngine.nodes[index];
      node.drawConnections();
    }
    for (var index in animation.physicsEngine.nodes) {
      var node = animation.physicsEngine.nodes[index];
      node.drawIt();
    }
  }

});
