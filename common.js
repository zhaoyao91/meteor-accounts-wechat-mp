WeChatMP = {
    serviceName: (Meteor.settings && Meteor.settings.public && Meteor.settings.public.wechatMPServiceName) || 'wechat-mp'
};

Accounts.oauth.registerService(WeChatMP.serviceName);