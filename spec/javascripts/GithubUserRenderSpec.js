describe("GithubuserRender", function() {

  it("should use the url as the unique identifier", function() {
    var userData = {"name":"Nolan Evans","company":"Involver","gravatar_id":"492d8bf8006b56b62e159d5bbe2df2d5","location":"San Francisco","blog":"http://www.nolanevans.com","type":"User","contributions":8,"login":"nolman","email":null};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubUserRender(userData, context);
    expect(render.uniqueIdentifier().login).toEqual("nolman");
  });

  it("should calculate the dimensions", function(){
    var userData = {"name":"Nolan Evans","company":"Involver","gravatar_id":"492d8bf8006b56b62e159d5bbe2df2d5","location":"San Francisco","blog":"http://www.nolanevans.com","type":"User","contributions":8,"login":"nolman","email":null};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubUserRender(userData, context);
    expect(render.dimensions().x).toBeGreaterThan(50);
    expect(render.dimensions().y).toBeGreaterThan(15);
  });

  it("should render without raising any errors", function(){
    var userData = {"name":"Nolan Evans","company":"Involver","gravatar_id":"492d8bf8006b56b62e159d5bbe2df2d5","location":"San Francisco","blog":"http://www.nolanevans.com","type":"User","contributions":8,"login":"nolman","email":null};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubUserRender(userData, context);
    render.draw(new Point(0,0));
  });

});
