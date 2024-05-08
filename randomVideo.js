//(function (window, document) {
//    var get = function (id) { return document.getElementById(id); };
//    var bind = function (element, event, callback) { return element.addEventListener(event, callback); };
//    var auto = true;
//    var nextBtn = get('next');
//    var switchBtn = get('switch');
//    var player = get('player');
//    var sourceList = get('source-list');
//    var changeSourceBtn = get('change-source');
//    var currentSource = 'http://v.nrzj.vip/video.php'; // 当前视频源


//    // 随机播放默认视频的函数
//    function randomVideo() {
//        var src = currentSource;
//        src += '?_t=' + Math.random();
//        player.src = src;
//        player.play();

//        // 隐藏嵌入式“下一个视频”按钮
//        get('next-video-btn').style.display = 'none';
//    }


//    bind(nextBtn, 'click', randomVideo);
//    bind(switchBtn, 'click', function () {
//        auto = !auto;
//        this.innerText = '连续播放: ' + (auto ? '开' : '关');
//    });
//    player.addEventListener('ended', function () {
//        if (auto) randomVideo();
//    });
//    bind(changeSourceBtn, 'click', function () {
//        sourceList.classList.toggle('active');
//    });

//    // 视频源列表中的源项点击事件处理逻辑
//    bind(sourceList, 'click', function (e) {
//        var target = e.target;
//        if (target.tagName.toLowerCase() === 'li') {

//            var isEmbeddedVideo = target.id === 'embedded-video'; // 获取嵌入式视频项id
//            var is_special = target.id === 'special'
//            var is_special2 = target.id === 'special2'

//            if (isEmbeddedVideo) {
//                var embeddedVideoSource = target.getAttribute('data-source'); // 获取嵌入式视频的源
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = ''; // 清空播放窗口
//                var iframe = document.createElement('iframe'); // 创建 <iframe> 元素
//                iframe.src = embeddedVideoSource; // 设置嵌入式视频源
//                iframe.width = '560'; // 设置宽度
//                iframe.height = '315'; // 设置高度
//                iframe.allowfullscreen = true; // 允许全屏

//                embeddedVideoContainer.appendChild(iframe); // 添加嵌入式视频到播放窗口

//                // 显示“下一个视频”按钮
//                get('next-video-btn').style.display = 'inline-block';
//            }
//            else if (is_special) {
//                // 发送请求获取视频链接
//                fetch('https://v2.api-m.com/api/meinv')
//                    .then(response => response.json())
//                    .then(data => {
                        
//                        currentSource = data.data.replace(/"/g, ''); // 去掉双引号
//                        player.src = currentSource;
//                        player.load();
//                    })
//                    .catch(error => {
//                        console.error('Error fetching video:', error);
//                    });

//                // 隐藏嵌入式“下一个视频”按钮
//                get('next-video-btn').style.display = 'none';

//                // 当切换到其他源时，隐藏嵌入式视频播放窗口
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = '';
//            }

//            else if (is_special2) {
//                // 生成1到61之间的随机数（包括1和61）
//                const randomType = Math.floor(Math.random() * 61) + 1;

//                currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;

//                player.src = currentSource;
//                player.load();
                

//                // 隐藏嵌入式“下一个视频”按钮
//                get('next-video-btn').style.display = 'none';

//                // 当切换到其他源时，隐藏嵌入式视频播放窗口
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = '';
//            }

//            else {
//            currentSource = target.getAttribute('data-source');
//            player.src = currentSource; // 更新视频源
//            player.load(); // 重新加载视频

//            // 隐藏嵌入式“下一个视频”按钮
//            get('next-video-btn').style.display = 'none';

//            // 当切换到其他源时，隐藏嵌入式视频播放窗口
//            var embeddedVideoContainer = get('embedded-video-container');
//            embeddedVideoContainer.innerHTML = '';

//        }
//        sourceList.classList.remove('active');

//    }
//    });

//    // 接口切换失败则启用默认接口
//    bind(player, 'error', function () { randomVideo(); });

//    // 使用iframe方法嵌入视频的点击‘下一个视频’按钮的事件处理函数
//    bind(get('next-video-btn'), 'click', function () {
//        var videoSources = [
//            'http://api.mrz6.cn/sese/yuzu_mp4.php',
//            'http://api.mrz6.cn/sese/yuzu_mp4.php',
//            'http://api.mrz6.cn/sese/yuzu_mp4.php'
//        ];
//        var embeddedVideoContainer = get('embedded-video-container');
//        var currentIframe = embeddedVideoContainer.querySelector('iframe');
//        if (currentIframe) {
//            var currentSourceIndex = videoSources.indexOf(currentIframe.src);
//            var nextIndex = (currentSourceIndex + 1) % videoSources.length;
//            var nextSource = videoSources[nextIndex];
//            currentIframe.src = nextSource;
//        }
//    });

//    // 初始化播放视频
//    randomVideo();
//})(window, document);






(function (window, document) {
    var get = function (id) { return document.getElementById(id); };
    var bind = function (element, event, callback) { return element.addEventListener(event, callback); };
    var auto = true;
    var nextBtn = get('next');
    var switchBtn = get('switch');
    var player = get('player');
    var sourceList = get('source-list');
    var changeSourceBtn = get('change-source');
    var currentSource = 'http://v.nrzj.vip/video.php'; // 当前视频源

    

    // 其实这个next绑定有问题，还有这个randomVideo函数他只适用于默认源
    function randomVideo() {
        //// 隐藏嵌入式“下一个视频”按钮
        //get('next-video-btn').style.display = 'none';
        hideEmbeddedVideo();
        var src = currentSource;
        /*src += '?_t=' + Math.random();*/
        player.src = src;
        player.load();
    }
    bind(nextBtn, 'click', randomVideo);//

   
    bind(switchBtn, 'click', function () {
        auto = !auto;
        this.innerText = '连续播放: ' + (auto ? '开' : '关');
    });
    player.addEventListener('ended', function () {
        if (auto) randomVideo();
    });
    bind(changeSourceBtn, 'click', function () {
        sourceList.classList.toggle('active');
    });


    // 方案1
    /*隐藏嵌入式元素*/
    //function hideEmbeddedVideo() {
    //    get('next-video-btn').style.display = 'none';
    //    var embeddedVideoContainer = get('embedded-video-container');
    //    embeddedVideoContainer.innerHTML = '';
    //}
     /*视频源列表中的源项点击事件处理逻辑*/
    //bind(sourceList, 'click', function (e) {
    //    var target = e.target;
    //    if (target.tagName.toLowerCase() === 'li') {
    //        // 移除之前有 active 类的列表项的类
    //        const previousActive = document.querySelector('#source-list li.active');
    //        if (previousActive) {
    //            previousActive.classList.remove('active');
    //        }
    //        // 为当前点击的列表项添加 active 类
    //        target.classList.add('active');

    //        var isEmbeddedVideo = target.id === 'embedded-video'; // 获取嵌入式视频项id
    //        var is_special = target.id === 'special'
    //        var is_special2 = target.id === 'special2'

    //        if (isEmbeddedVideo) {
    //            var embeddedVideoSource = target.getAttribute('data-source'); // 获取嵌入式视频的源
    //            var embeddedVideoContainer = get('embedded-video-container');
    //            embeddedVideoContainer.innerHTML = ''; // 清空播放窗口
    //            var iframe = document.createElement('iframe'); // 创建 <iframe> 元素
    //            iframe.src = embeddedVideoSource; // 设置嵌入式视频源
    //            iframe.width = '560'; // 设置宽度
    //            iframe.height = '315'; // 设置高度
    //            iframe.allowfullscreen = true; // 允许全屏

    //            embeddedVideoContainer.appendChild(iframe); // 添加嵌入式视频到播放窗口

    //            // 显示“下一个视频”按钮
    //            get('next-video-btn').style.display = 'inline-block';
    //        }
    //        else if (is_special) {
    //            // 发送请求获取视频链接
    //            fetch('https://v2.api-m.com/api/meinv')
    //                .then(response => response.json())
    //                .then(data => {

    //                    currentSource = data.data.replace(/"/g, ''); // 去掉双引号
    //                    player.src = currentSource;
    //                    player.load();
    //                })
    //                .catch(error => {
    //                    console.error('Error fetching video:', error);
    //                });

    //            hideEmbeddedVideo()
    //        }

    //        else if (is_special2) {
    //            // 生成1到61之间的随机数（包括1和61）
    //            const randomType = Math.floor(Math.random() * 61) + 1;

    //            currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;

    //            player.src = currentSource;
    //            player.load();

    //            hideEmbeddedVideo()
    //        }

    //        else {
    //            currentSource = target.getAttribute('data-source');
    //            player.src = currentSource; // 更新视频源
    //            player.load(); // 重新加载视频

    //            hideEmbeddedVideo()

    //        }
    //        sourceList.classList.remove('active');

    //    }
    //});





    // ai优化方案
    bind(sourceList, 'click', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() === 'li') {
            handleListItemClick(target);
        }
    });

    function handleListItemClick(target) {
        const id = target.id;
        

        // 移除之前有 active 类的列表项的类
        const previousActive = document.querySelector('#source-list li.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        // 为当前点击的列表项添加 active 类
        target.classList.add('active');

        switch (id) {
            case 'embedded-video':
                handleEmbeddedVideo(target);
                break;
            case 'special':
                const source = target.dataset.source;
                fetchAndPlayVideo(source);                
                break;
            case 'special2':
                playRandomVideo();
                break;
            default:
                playDefaultVideo(target);
                break;
        }

        sourceList.classList.remove('active');
    }

    function handleEmbeddedVideo(target) {
        var embeddedVideoSource = target.getAttribute('data-source');
        var embeddedVideoContainer = get('embedded-video-container');
        embeddedVideoContainer.innerHTML = ''; // 清空播放窗口
        var iframe = document.createElement('iframe'); // 创建 <iframe> 元素
        iframe.src = embeddedVideoSource; // 设置嵌入式视频源
        iframe.width = '560'; // 设置宽度
        iframe.height = '315'; // 设置高度
        iframe.allowfullscreen = true; // 允许全屏

        embeddedVideoContainer.appendChild(iframe); // 添加嵌入式视频到播放窗口

        // 显示“下一个视频”按钮
        get('next-video-btn').style.display = 'inline-block';
    }

    function fetchAndPlayVideo(url) {
        if (url === 'https://v2.api-m.com/api/meinv') {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    currentSource = data.data.replace(/"/g, ''); // 去掉双引号
                    player.src = currentSource;
                    player.load();
                })
                .catch(error => {
                    console.error('Error fetching video:', error);
                });
        }
        else if (url === 'http://www.wudada.online/Api/ScSp') {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    currentSource = data.data.replace(/"/g, ''); // 去掉双引号
                    player.src = currentSource;
                    player.load();
                })
                .catch(error => {
                    console.error('Error fetching video:', error);
                });
        }
        else { 
            fetch(url)
                .then(response => response.text())
                .then(videoUrl => {
                    currentSource = videoUrl.trim(); // 去掉可能的空格和换行符
                    player.src = currentSource;
                    player.load();
                })
                .catch(error => {
                    console.error('Error fetching video:', error);
                });
        }

        hideEmbeddedVideo();
    }


    function playRandomVideo() {
        const randomType = Math.floor(Math.random() * 61) + 1;
        currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;
        player.src = currentSource;
        player.load();
        hideEmbeddedVideo();
    }

    function playDefaultVideo(target) {
        currentSource = target.getAttribute('data-source');
        player.src = currentSource; // 更新视频源
        player.load(); // 重新加载视频
        hideEmbeddedVideo();
    }

    function hideEmbeddedVideo() {
        get('next-video-btn').style.display = 'none';
        var embeddedVideoContainer = get('embedded-video-container');
        embeddedVideoContainer.innerHTML = '';
    }




    // 接口切换失败则启用默认接口
    bind(player, 'error', function () { randomVideo(); });

    // 使用iframe方法嵌入视频的点击‘下一个视频’按钮的事件处理函数
    bind(get('next-video-btn'), 'click', function () {
        var videoSources = [
            'http://api.mrz6.cn/sese/yuzu_mp4.php',
            'http://api.mrz6.cn/sese/yuzu_mp4.php',
            'http://api.mrz6.cn/sese/yuzu_mp4.php'
        ];
        var embeddedVideoContainer = get('embedded-video-container');
        var currentIframe = embeddedVideoContainer.querySelector('iframe');
        if (currentIframe) {
            var currentSourceIndex = videoSources.indexOf(currentIframe.src);
            var nextIndex = (currentSourceIndex + 1) % videoSources.length;
            var nextSource = videoSources[nextIndex];
            currentIframe.src = nextSource;
        }
    });

    // 初始化播放视频
    randomVideo();
})(window, document);








