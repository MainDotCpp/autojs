"ui";
const common = require("../../common/common");
ui.layout(
    <vertical>
        <webview id="web" h="*"/>
    </vertical>)

ui.web.loadUrl("file://" + files.path("./index.html"))




ui.web.jsBridge.registerHandler("test", (data, callBack) => {
    toastLog("web调用安卓,data:" + data)
    setTimeout(() => {
        //回调web
        callBack("1155")
    }, 2000)
})
//定时器中等待web加载完成
setTimeout(() => {
    ui.web.jsBridge.callHandler('jsTest', '数据', (data) => {
        toastLog('web回调,data:' + data)
    })
}, 1000)
const btnIdMapping = {
    '群聊_放大镜按钮':'ly4',
    '群聊_输入框':'k4n',
    '列表':'k66'
}
const initApp = () => {
    log('打开企业微信')
    common.backHomeReloadApp("企业微信")
    log('初始化mqtt  ')

}

const sendMessage = (user,message) => {
    while(!click('通讯录'));
    // common.xs_控件坐标点击(text('通讯录').findOne())
    common.xs_控件坐标点击(text('群聊').findOne())
    // click('群聊')


    sleep(500)
    id(btnIdMapping.群聊_放大镜按钮).findOne().click()
    setClip(user)
    id(btnIdMapping.群聊_输入框).paste()
    common.xs_控件坐标点击(text(user).findOne())
    while (!click(user,1));
    id('ham').findOne().setText(message)
    click('发送')
    back()
    back()
    back()
}
const main = () => {
    auto()
    initApp()
}

main()