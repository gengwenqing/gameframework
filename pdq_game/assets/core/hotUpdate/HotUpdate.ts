/**
 * 封装热更 ts版本
 * @author parker
 * 2020-01-22
 */

export default class HotUpdate {

    /**远端下载后的文件存放的地址 */
    private _storagePath: string;
    /**jsb assetManager */
    private _am: any;
    /**普通manifest */
    private _customManiFest: any = {
        "packageUrl": "http://10.137.9.18:8080/",
        "remoteManifestUrl": "http://10.137.9.18:8080/project.manifest",
        "remoteVersionUrl": "http://10.137.9.18:8080/version.manifest",
        "version": "1.0.0",
        "assets": {
            "src/cocos2d-jsb.js": {
                "size": 1692402,
                "md5": "9961bc7de936e4a41ac10905dee0fc0c"
            },
            "src/project.js": {
                "size": 16668,
                "md5": "c0d5d915850f243bd50b73f8b8e2b2bb"
            },
            "src/settings.js": {
                "size": 1453,
                "md5": "897c0271f98d2b70431c3a66e9b805b6"
            },
            "res/import/01/01a899b6b.json": {
                "size": 212,
                "md5": "7c178f3044146b37b951e248d9bd3fe5"
            },
            "res/import/03/03f133834.json": {
                "size": 6068,
                "md5": "738a0d00195ac168d63a27b8bdf5dbd8"
            },
            "res/import/0e/0e93aeaa-0b53-4e40-b8e0-6268b4e07bd7.json": {
                "size": 4493,
                "md5": "7ab4e930219c634e8770e5df46bf3929"
            },
            "res/import/14/144c3297-af63-49e8-b8ef-1cfa29b3be28.json": {
                "size": 2479,
                "md5": "9f5df1fc3a6cec89f5206f1438d68753"
            },
            "res/import/28/2874f8dd-416c-4440-81b7-555975426e93.json": {
                "size": 3891,
                "md5": "d1c10726e488596a32eb9e36e2aba69d"
            },
            "res/import/2a/2a296057-247c-4a1c-bbeb-0548b6c98650.json": {
                "size": 209,
                "md5": "1b5bca4928ae7711748d4df8a315720a"
            },
            "res/import/3a/3a7bb79f-32fd-422e-ada2-96f518fed422.json": {
                "size": 138,
                "md5": "981c40ba296e103931091e1f10337bd1"
            },
            "res/import/6d/6d91e591-4ce0-465c-809f-610ec95019c6.json": {
                "size": 14888,
                "md5": "87124e23c93c589d9adbfea6f7684dc3"
            },
            "res/import/6f/6f801092-0c37-4f30-89ef-c8d960825b36.json": {
                "size": 131,
                "md5": "f229e9bfb838203fa3ea43e012c549bc"
            },
            "res/import/79/79eafaef-b7ef-45d9-9c3f-591dc836fc7a.json": {
                "size": 14949,
                "md5": "5e0cc5c144f1ef5b6ee45cbc7fc04717"
            },
            "res/import/7a/7afd064b-113f-480e-b793-8817d19f63c3.json": {
                "size": 132,
                "md5": "f2861821c13148981fc13fc08b75eeed"
            },
            "res/import/c0/c0040c95-c57f-49cd-9cbc-12316b73d0d4.json": {
                "size": 863,
                "md5": "2c1876af0af761b6839bd0cadaaad1ec"
            },
            "res/import/cf/cf7e0bb8-a81c-44a9-ad79-d28d43991032.json": {
                "size": 137,
                "md5": "3e17852da0f6ca0c2e9098462d947710"
            },
            "res/import/ec/eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432.json": {
                "size": 151,
                "md5": "c7ab7a7403c9710e3d7fc883071b80de"
            },
            "res/raw-assets/02/0275e94c-56a7-410f-bd1a-fc7483f7d14a.png": {
                "size": 82,
                "md5": "cea68f0d7cba38440224f6f74531e2d8"
            },
            "res/raw-assets/6a/6aa0aa6a-ebee-4155-a088-a687a6aadec4.png": {
                "size": 37864,
                "md5": "55ea4e952bf080f300379ec26723598b"
            },
            "res/raw-assets/71/71561142-4c83-4933-afca-cb7a17f67053.png": {
                "size": 1050,
                "md5": "c06a93f5f1a8a1c6edc4fd8b52e96cbf"
            },
            "res/raw-assets/a8/a8027877-d8d6-4645-97a0-52d4a0123dba.png": {
                "size": 82,
                "md5": "cea68f0d7cba38440224f6f74531e2d8"
            },
            "res/raw-assets/b4/b43ff3c2-02bb-4874-81f7-f2dea6970f18.png": {
                "size": 1114,
                "md5": "83fcc9912e01ae5411c357651fb8b1cf"
            },
            "res/raw-assets/e8/e851e89b-faa2-4484-bea6-5c01dd9f06e2.png": {
                "size": 1082,
                "md5": "90cf45d059d0408bec327f66eae5764c"
            }
        },
        "searchPaths": [
            
        ]
    };


    constructor() {
        this._storagePath = (jsb.fileUtils ? jsb.fileUtils.getWritablePath() : '/') + "myApp";
        console.log("存放远端地址mainfest文件地址:" + this._storagePath);
        this._am = new jsb.AssetsManager('', this._storagePath, this.versionCompareHandle);
        let manifest = new jsb.Manifest(JSON.stringify(this._customManiFest), this._storagePath);
        this._am.loadLocalManifest(manifest, this._storagePath);

        this._am.setVerifyCallback(this.verifyCb.bind(this));

        if (cc.sys.os === cc.sys.OS_ANDROID) {
            // Some Android device may slow down the download process when concurrent tasks is too much.
            // The value may not be accurate, please do more test and find what's most suitable for your game.
            this._am.setMaxConcurrentTask(2);
        }

    }

    private verifyCb(path, asset): void {
        // When asset is compressed, we don't need to check its md5, because zip file have been deleted.
        var compressed = asset.compressed;
        // Retrieve the correct md5 value.
        var expectedMD5 = asset.md5;
        // asset.path is relative path and path is absolute.
        var relativePath = asset.path;
        // The size of asset file, but this value could be absent.
        var size = asset.size;
    }

    private versionCompareHandle(versionA, versionB): number {
        var vA = versionA.split('.');
        var vB = versionB.split('.');
        for (var i = 0; i < vA.length; ++i) {
            var a = parseInt(vA[i]);
            var b = parseInt(vB[i] || 0);
            if (a === b) {
                continue;
            }
            else {
                return a - b;
            }
        }
        if (vB.length > vA.length) {
            return -1;
        }
        else {
            return 0;
        }
    }

    /**是否正在更新中 */
    private _updating: boolean;
    /**本地mianfest */
    private manifestUrl: any;
    /**检测函数 */
    private checkCbFunc: Function;
    /**执行域 */
    private thisObj: any;
    /**
     * 检测是否可以更新
     * @param cb  检测完毕后回调函数
     * @param thisObj  执行域
     */
    public checkUpdate(cb: Function, thisObj: any) {
        this.checkCbFunc = cb;
        this.thisObj = thisObj;
        if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
            // Resolve md5 url
            let url = this.manifestUrl.nativeUrl;
            if (cc.loader.md5Pipe) {
                url = cc.loader.md5Pipe.transformURL(url);
            }
            console.log(url);
            this._am.loadLocalManifest(url);
        }

        if (!this._am.getLocalManifest() || !this._am.getLocalManifest().isLoaded()) {
            console.log("加载 local mainfest文件失败");
            return;
        }

        this._am.setEventCallback(this.checkCb.bind(this));

        this._am.checkUpdate();
        this._updating = true;
    }

    private checkCb(event): void {
        cc.log('Code: ' + event.getEventCode());
        let result = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log("No local manifest file found, hot update skipped.");
                result = false;
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log("Fail to download manifest file, hot update skipped.");
                result = false;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log("Already up to date with the latest remote version.");
                result = false;
                break;
            case jsb.EventAssetsManager.NEW_VERSION_FOUND:
                console.log('New version found, please try to update.');
                result = true;
                break;
            default:
                return;
        }
        this._am.setEventCallback(null);
        this._updating = false;
        this.checkCbFunc.apply(this.thisObj, [result]);
    }
    /**
     * 更新函数
     * @param cbComplete 完成回调
     * @param cbProgress 进度回调
     * @param cbError    错误回调
     */

    private onComplete: Function;
    private onProgress: Function;
    private onError: Function;
    public hotUpdate(cbComplete: Function, cbProgress: Function, cbError: Function): void {
        console.log("进入热更新方法体")
        this.onComplete = cbComplete;
        this.onProgress = cbProgress;
        this.onError = cbError;
        if (this._am && !this._updating) {
            console.log("调用c++ 更新函数")
            this._am.setEventCallback(this.updateCb.bind(this));

            if (this._am.getState() === jsb.AssetsManager.State.UNINITED) {
                // Resolve md5 url
                var url = this.manifestUrl.nativeUrl;
                if (cc.loader.md5Pipe) {
                    url = cc.loader.md5Pipe.transformURL(url);
                }
                this._am.loadLocalManifest(url);
            }
            this._am.update();
            this._updating = true;
        }
    }

    /**是否可以重新更新标记 */
    private _canRetry: boolean;

    private updateCb(event): void {
        let needRestart = false;
        let failed = false;
        switch (event.getEventCode()) {
            case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
                console.log('No local manifest file found, hot update skipped.');
                failed = true;
                this.onError.apply(this.thisObj, ['没有局部manifest文件']);
                break;
            case jsb.EventAssetsManager.UPDATE_PROGRESSION:
                console.log("字节细节:" + event.getPercent());
                console.log("文件细节:" + event.getPercentByFile());
                console.log("字节百分比" + event.getDownloadedFiles() + ' / ' + event.getTotalFiles());
                console.log("文件百分比" + event.getDownloadedBytes() + ' / ' + event.getTotalBytes());
                this.onProgress.apply(this.thisObj, [event.getDownloadedFiles() + ' / ' + event.getTotalFiles()]);
                break;
            case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
            case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
                console.log('Fail to download manifest file, hot update skipped.');
                this.onError.apply(this.thisObj, ['manifest 文件下载失败']);
                failed = true;
                break;
            case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
                console.log('Already up to date with the latest remote version.');
                this.onComplete.apply(this.thisObj,['已经是最新版本了'])
                failed = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FINISHED:
                console.log('Update finished. ' + event.getMessage());
                this.onProgress.apply(this.thisObj,[1]);
                needRestart = true;
                break;
            case jsb.EventAssetsManager.UPDATE_FAILED:
                console.log('Update failed. ' + event.getMessage());
                this._updating = false;
                this._canRetry = true;
                break;
            case jsb.EventAssetsManager.ERROR_UPDATING:
                console.log('Asset update error: ' + event.getAssetId() + ', ' + event.getMessage());
                break;
            case jsb.EventAssetsManager.ERROR_DECOMPRESS:
                console.log(event.getMessage());
                break;
            default:
                break;
        }

        if (failed) {
            this._am.setEventCallback(null);
            this._updating = false;
        }

        if (needRestart) {
            this._am.setEventCallback(null);
            // Prepend the manifest's search path
            let searchPaths = jsb.fileUtils.getSearchPaths();
            let newPaths = this._am.getLocalManifest().getSearchPaths();
            console.log(JSON.stringify(newPaths));
            Array.prototype.unshift.apply(searchPaths, newPaths);
            // This value will be retrieved and appended to the default search path during game startup,
            // please refer to samples/js-tests/main.js for detailed usage.
            // !!! Re-add the search paths in main.js is very important, otherwise, new scripts won't take effect.
            cc.sys.localStorage.setItem('myApp', JSON.stringify(searchPaths));
            jsb.fileUtils.setSearchPaths(searchPaths);

            cc.audioEngine.stopAll();
            cc.game.restart();
        }
    }
}