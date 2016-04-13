Template.configureLoginServiceDialogForWechatMP.helpers({
  siteUrl: function () {
    return Meteor.absoluteUrl();
  }
});

Template.configureLoginServiceDialogForWechatMP.fields = function () {
  return [
    {property: 'appId', label: 'APP Id'},
    {property: 'secret', label: 'APP Secret'}
  ];
};
