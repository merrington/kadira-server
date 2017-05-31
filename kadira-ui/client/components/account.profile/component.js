import IsMobile from 'ismobilejs'

var component = FlowComponents.define("account.profile", function() {
});

component.action.reconnectGitHubAccount = function() {
  var options = {requestPermissions: ['user','repo', 'read:org']};
  if(IsMobile.any) {
    options.loginStyle = "redirect";
  }

  Meteor.loginWithGithub(options, this.showError.bind(this));
};

component.prototype.showError = function(error) {
  if(error) {
    var errorMessage = error.reason || error.message;
    growlAlert.error(errorMessage);
  } else {
    growlAlert.success("Meteor Account Connected Successfully.");
  }
};
