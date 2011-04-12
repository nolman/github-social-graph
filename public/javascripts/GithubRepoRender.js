function GithubRepoRender(data, context) {
  this.data = data.repository;
  this.context = context;
}

GithubRepoRender.prototype = new Renderable();

GithubRepoRender.prototype.name = function() {
  return this.data.name;
};

GithubRepoRender.prototype.uniqueIdentifier = function() {
  return this.data.url;
};

GithubRepoRender.prototype.color = function() {
  return "red";
};
