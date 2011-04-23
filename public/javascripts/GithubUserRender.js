function GithubUserRender(data, context) {
  this.data = data;
  this.context = context;
}

GithubUserRender.prototype = new Renderable();

GithubUserRender.prototype.name = function() {
  return this.data;
};

GithubUserRender.prototype.color = function() {
  return "blue";
};

GithubUserRender.prototype.uniqueIdentifier = function() {
  return this.data;
};
