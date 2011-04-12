describe("GithubRepoRender", function() {

  it("should use the url as the unique identifier", function() {
    var repoData = {"repository":{"forks":230,"open_issues":28,"description":"Resque is a Redis-backed Ruby library for creating background jobs, placing those jobs on multiple queues, and processing them later.","watchers":2042,"has_issues":true,"fork":false,"language":"Ruby","pushed_at":"2011/03/22 11:09:54 -0700","has_downloads":false,"homepage":"http://github.com/blog/542-introducing-resque","size":1696,"private":false,"name":"resque","owner":"defunkt","url":"https://github.com/defunkt/resque","has_wiki":true,"created_at":"2009/08/11 17:27:35 -0700"}};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubRepoRender(repoData, context);
    expect(render.uniqueIdentifier()).toEqual("https://github.com/defunkt/resque");
  });

  it("should calculate the dimensions", function(){
    var repoData = {"repository":{"forks":230,"open_issues":28,"description":"Resque is a Redis-backed Ruby library for creating background jobs, placing those jobs on multiple queues, and processing them later.","watchers":2042,"has_issues":true,"fork":false,"language":"Ruby","pushed_at":"2011/03/22 11:09:54 -0700","has_downloads":false,"homepage":"http://github.com/blog/542-introducing-resque","size":1696,"private":false,"name":"resque","owner":"defunkt","url":"https://github.com/defunkt/resque","has_wiki":true,"created_at":"2009/08/11 17:27:35 -0700"}};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubRepoRender(repoData, context);
    expect(render.dimensions().x).toBeGreaterThan(39);
    expect(render.dimensions().y).toBeGreaterThan(15);
  });

  it("should render without raising any errors", function(){
    var repoData = {"repository":{"forks":230,"open_issues":28,"description":"Resque is a Redis-backed Ruby library for creating background jobs, placing those jobs on multiple queues, and processing them later.","watchers":2042,"has_issues":true,"fork":false,"language":"Ruby","pushed_at":"2011/03/22 11:09:54 -0700","has_downloads":false,"homepage":"http://github.com/blog/542-introducing-resque","size":1696,"private":false,"name":"resque","owner":"defunkt","url":"https://github.com/defunkt/resque","has_wiki":true,"created_at":"2009/08/11 17:27:35 -0700"}};
    $(document.body).append($("<canvas/>", {"id":'canvas'}))
    var context = document.getElementById("canvas").getContext("2d");
    var render = new GithubRepoRender(repoData, context);
    render.draw(new Point(0,0));
  });

});
