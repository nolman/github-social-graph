$(document).ready(function(){

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
      selectedUser = nodeAt.renders.data;
      $.getJSON("http://github.com/api/v2/json/user/show/" + selectedUser + "?callback=?", function(userData){
        if(selectedUser == userData.user.login){
          var target = $("#selectedWidget");
          target.html($('<img/>', {'src':'https://secure.gravatar.com/avatar/' + userData.user.gravatar_id + '?s=140'}));
          target.append($("<a/>", {'text': userData.user.login, 'href':'https://github.com/' + userData.user.login, 'target':"_other"}))
        }
      });
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

  function FetchUserRepos(){
    var data = user_queue.pop();
    fetchUserFollows(data[0], data[1]);
  };

  function enqueueFetch(userName, distance){
    if(!fetchedData[userName] && distance < 1){
      fetchedData[userName] = 1;
      user_queue.push([userName, distance + 1]);
    }
  }

  function fetchUserFollows(userName, distance){
    $.getJSON("http://github.com/api/v2/json/user/show/" + userName + "/followers?callback=?", function(data){
      var userList = data.users;
      if(userList.length > 10){
        userList = userList.slice(0,9);
      }
      var users = jQuery.map(userList, function(user, index){
        enqueueFetch(user, distance);
        return new GithubUserRender(user, animation.canvasContext);
      });
      animation.physicsEngine.insertOrConnectWidgets(users, userName);
    });
    $.getJSON("http://github.com/api/v2/json/user/show/" + userName + "/following?callback=?", function(data){
      var userList = data.users;
      if(userList.length > 10){
        userList = userList.slice(0,9);
      }
      var users = jQuery.map(userList, function(user, index){
        enqueueFetch(user, distance);
        return new GithubUserRender(user, animation.canvasContext);
      });
      animation.physicsEngine.insertOrConnectWidgets(users, userName);
    });
  }

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

  $("#user_selector").submit(function(event){
    event.preventDefault();
    $('#user_selector').hide();
    $('#physics_box').show();
    var userName = $("#user_name").val();
    console.log($("#user_name").val());
    fetchedData = [];
    animation = new Animation();
    animation.physicsEngine.insertOrConnectWidgets([new GithubUserRender(userName, animation.canvasContext)]);
    setInterval(drawIt, 50);
    setInterval(FetchUserRepos, 2200);
    user_queue = $.queue("repofetch")
    
    fetchUserFollows(userName, 0);
    
  });
});
