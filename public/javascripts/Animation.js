$(document).ready(function(){
  base_repo_url = "http://github.com/api/v2/json/repos/show/";
  function Animation() {
    this.canvas = document.getElementById("canvas");
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
    console.log(repoRender)
    $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque/contributors?callback=?",function(data){
      console.log(data);
      var contributors = jQuery.map(data.contributors, function(contributor, index){
        return new GithubUserRender(contributor, animation.canvasContext);
      });
      animation.physicsEngine.insertOrConnectWidgets(contributors, repoRender.uniqueIdentifier());
    });
    
  }
  
  $.getJSON("http://github.com/api/v2/json/repos/show/defunkt/resque?callback=?", function(resqueData){
    console.log(resqueData);
    var repoRender = new GithubRepoRender(resqueData, animation.canvasContext);
    animation.physicsEngine.insertOrConnectWidgets([repoRender]);
    setTimeout(fetchRepoContributors, 1000, repoRender);
  });
  

  function drawIt(){
    animation.physicsEngine.runPhysics();
    animation.canvas.width = animation.canvas.width;
    for (var index in animation.physicsEngine.nodes) {
      var node = animation.physicsEngine.nodes[index];
      $.each(node.connectedNodes, function(index, connectedNode){
        animation.canvasContext.moveTo(node.position.x, node.position.y);
        animation.canvasContext.lineTo(connectedNode.position.x, connectedNode.position.y)
        animation.canvasContext.strokeStyle = "#ddd";
        animation.canvasContext.stroke();
      });
    }
    for (var index in animation.physicsEngine.nodes) {
      var node = animation.physicsEngine.nodes[index];
      node.drawIt();
    }
  }

});
