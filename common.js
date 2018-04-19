WeChatMP = {
    serviceName: (Meteor.settings && Meteor.settings.public && Meteor.settings.public.wechatMPServiceName) || 'wechat-mp',
    whitelistedFields: [
	    'nickname',
	    'sex',
	    'language',
	    'province',
	    'city',
	    'country',
	    'headimgurl',
	    'privilege'
	]
};

Accounts.oauth.registerService(WeChatMP.serviceName);