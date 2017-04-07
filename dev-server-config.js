module.exports = {
    hostname: "0.0.0.0",
    port: "80",
    webPath: __dirname + "/dist",
    mockPath: __dirname + "/mockdata",
    logLevel: "debug",
    proxies: {
        "/api": {
            prefixPath: "/api",
            host: "120.76.102.47",
            headers: {
                host: "m.yunmodel.com"
            }
        },
    },
    mocks: {
            // 列表
            "/api/list": {
                "post": "test.json"
            },
            '/osc-api/getMobileMallBasicSetting.do': {
                "post": "getMobileMallBasicSetting.json"
            },
    }
}