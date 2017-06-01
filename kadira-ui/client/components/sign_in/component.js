import IsMobile from 'ismobilejs'

var component = FlowComponents.define("signIn", function(params) {
  var options = params.options || {};
  this.set("isSignUpPage", !!options.isSignUpPage);
  this.set("isSignInPage", !!options.isSignInPage);
  if(!options.isSignUpPage && !options.isSignInPage) {
    this.set("isSignInPage", true);
  }
});

component.state.isLoggedIn = function() {
  // cannot use !!Meteor.userId() here because it will show "already logged in"
  // message untill loading animation fade in
  return !!Meteor.userId() && !Meteor.loggingIn();
};

component.action.signInWithEmail = function(email, password) {
  Meteor.loginWithPassword(email, password, this.showError.bind(this));
};

component.prototype.signInWithGithub = function() {
  var options = {requestPermissions: ['user','repo', 'read:org']};
  if(IsMobile.any) {
    options.loginStyle = "redirect";
  }
  Meteor.loginWithGithub(options, this.showError.bind(this));
};

component.action.signInWithGithub = function() {
  this.signInWithGithub();
};

component.action.signInWithGithub = function() {
  this.signInWithGithub();
};

component.prototype.resetView = function() {
  this.set("error", null);
};

component.prototype.showError = function(error) {
  if(error) {
    this.set("error", error.reason);
  } else {
    this.resetView();
  }
};
