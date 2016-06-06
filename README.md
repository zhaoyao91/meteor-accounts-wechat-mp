# zhaoyao91:accounts-wechat-mp
Meteor accounts package for wechat-mp.
Because this package is generally used in China, this doc will be written in chinese.

## 简介
- 使Meteor应用支持微**微信公众平台**登录
- 支持绑定**微信开放平台**登录
- 若需支持**微信开放平台**登录，请查看[https://github.com/zhaoyao91/meteor-accounts-wechat](https://github.com/zhaoyao91/meteor-accounts-wechat)
- 请自行了解微信开放平台和公众平台的关系和区别

## 用法

### 1. 添加包
```
meteor add zhaoyao91:accounts-wechat-mp
meteor add zhaoyao91:short-oauth-state
meteor add service-configuration
```

### 2. 配置
server端：
```
ServiceConfiguration.configurations.upsert({
    service: "wechat-mp"
}, {
    $set: {
        appId: '...',
        secret: '...',
        scope: 'base_userinfo',
        loginStyle: 'redirect',
        mainId: 'openId'
    }
});
```

### 3. 登录
client端：
```
Meteor.loginWithWeChatMP(function(err, res){
   ... 
})
```
注意，本服务仅能在微信浏览器中使用，且只能按redirect的方式打开

## 如何绑定微信开放平台登录？
微信开放平台和微信公众平台对于meteor来说，是两个不同的服务，对微信来说，登录的接口也有所不同。所以如果一个meteor同时支持开放
平台登录和公众平台登录，那么同一微信用户若使用两种不同的方式登录，会分别进入到不同的meteor账号。

微信提供了unionId机制来打通开放平台和公众平台（详情请查看微信相关文档）。在meteor应用中，如果所使用的开放平台账号和公众平台账号
已经绑定，那么登录应用后不仅可以获得openId，还可以获得unionId，此时，只要应用使用unionId作为服务微信服务的mainId，就可以打通两
种方式登录。

### 配置指南
注意，该配置仅供参考，表达原理，具体方式还需要根据应用实际情况确定。

0. 应用使用的开放平台账号和公众平台账号要进行绑定
1. meteor应用同时安装accounts-wechat和accounts-wechat-mp
2. 配置服务时，mainId均使用unionId(而非openId)
3. 同步meteor用户的两种服务的id字段，比如，若用户A绑定到wechat时，则设置A.services['wechat-mp'].id = A.services['wechat'].id。
再比如，若用户系统设计为用户只能使用微信登录，而没有其他方式变更用户绑定的微信，则可以
```
Accounts.onCreateUser(function (options, user) {
    if (options.profile) {
        user.profile = options.profile;
    }

    const wechatUnionId = _.get(user, 'services.wechat.id') || _.get(user, 'services.wechat-mp.id');
    if (wechatUnionId) {
        _.set(user, 'services.wechat.id', wechatUnionId);
        _.set(user, 'services.wechat-mp.id', wechatUnionId);
    }

    return user;
});
```
### Note:
在绑定微信所有平台，需要先进行开发者认证，微信需要你有自己的服务器资源，填写的URL需要正确响应微信发送的Token验证，具体的js 在这里可以找到：[如何接入微信公众平台（meteor）](http://www.essamjo.com/2016/02/18/meteor%E9%AA%8C%E8%AF%81%E5%BE%AE%E4%BF%A1%E5%85%AC%E4%BC%97%E5%B9%B3%E5%8F%B0/)

## 参考
- [boxfish/meteor-accounts-wechat](https://github.com/boxfish/meteor-accounts-wechat/)
- [boxfish/meteor-wechat](https://github.com/boxfish/meteor-wechat/)
