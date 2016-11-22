Package.describe({
    name: 'zhaoyao91:accounts-wechat-mp',
    version: '0.0.2',
    summary: 'meteor accounts package for wechat-mp',
    git: 'https://github.com/zhaoyao91/meteor-accounts-wechat-mp',
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.versionsFrom('1.2.1');
    api.use('ecmascript');
    api.use('underscore');
    api.use('random');
    api.use('service-configuration');
    api.use('accounts-base');
    api.use('oauth');
    api.use('oauth2');
    api.use('accounts-oauth');
    api.use('http', 'server');
    api.use('templating', 'client');

    api.imply('accounts-base');

    api.addFiles('common.js');
    api.addFiles('client.js', 'client');
    api.addFiles('server.js', 'server');

    api.addFiles('wechat_configure.html', 'client');
    api.addFiles('wechat_configure.js', 'client');
    api.addFiles('wechat_login_button.css', 'client');

    api.export('WeChatMP')
});