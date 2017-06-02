AccountsHelpers = {};
AccountsHelpers.isMeteorLoginConnected = function isMeteorLoginConnected(user){
  var isConnected = user && 
    user.services && 
    user.services["meteor-developer"] && 
    user.services["meteor-developer"].emails && 
    user.services["meteor-developer"].emails.length > 0;

  return isConnected;
};

AccountsHelpers.getGitHubEmail = function getGitHubEmail(user){
   if (!(user && user.services &&
       user.services["github"] &&
       user.services["github"].emails &&
       user.services["github"].emails.length > 0)
   ){ return undefined; }
   var primaryEmail = _.find(user.services["github"].emails, function(email){ return email.primary === true; });
   if (primaryEmail) return primaryEmail.email; else return user.services["github"].emails[0].email
};

AccountsHelpers.getUserEmail = function _getUserEmail(user){
  githubEmail = AccountsHelpers.getGitHubEmail(user);
  if(githubEmail) return githubEmail;
  if(AccountsHelpers.isMeteorLoginConnected(user)){
    var primaryEmail = _.find(user.services && 
      user.services["meteor-developer"].emails,
      function(email){ 
        return email.primary === true; 
      });

    primaryEmail = primaryEmail || {};
    var email = primaryEmail.address || 
      user.services["meteor-developer"].emails[0].address;
    return email;
  } else if(user.emails && user.emails[0].address){
    return user.emails[0].address;
  }
};

AccountsHelpers.getName = function(user) {
  if(user.billingInfo && user.billingInfo.name) {
    return user.billingInfo.name;
  } 

  if(user.profile && user.profile.name) {
    return user.profile.name;
  }
};