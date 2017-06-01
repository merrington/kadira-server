Accounts.emailTemplates.siteName =  i18n("common.site_name");
Accounts.emailTemplates.from = "Kadira <no-reply@kadira.io>";
Accounts.emailTemplates.resetPassword.subject = function () {
  return i18n("emails.reset_password_subject");
};

ServiceConfiguration.configurations.remove({
    service : 'github'
});

ServiceConfiguration.configurations.insert({
    service : 'github',
    clientId: Meteor.settings.github.client_id,
    secret  : Meteor.settings.github.client_secret
});