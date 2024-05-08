//(function (window, document) {
//    var get = function (id) { return document.getElementById(id); };
//    var bind = function (element, event, callback) { return element.addEventListener(event, callback); };
//    var auto = true;
//    var nextBtn = get('next');
//    var switchBtn = get('switch');
//    var player = get('player');
//    var sourceList = get('source-list');
//    var changeSourceBtn = get('change-source');
//    var currentSource = 'http://v.nrzj.vip/video.php'; // ��ǰ��ƵԴ


//    // �������Ĭ����Ƶ�ĺ���
//    function randomVideo() {
//        var src = currentSource;
//        src += '?_t=' + Math.random();
//        player.src = src;
//        player.play();

//        // ����Ƕ��ʽ����һ����Ƶ����ť
//        get('next-video-btn').style.display = 'none';
//    }


//    bind(nextBtn, 'click', randomVideo);
//    bind(switchBtn, 'click', function () {
//        auto = !auto;
//        this.innerText = '��������: ' + (auto ? '��' : '��');
//    });
//    player.addEventListener('ended', function () {
//        if (auto) randomVideo();
//    });
//    bind(changeSourceBtn, 'click', function () {
//        sourceList.classList.toggle('active');
//    });

//    // ��ƵԴ�б��е�Դ�����¼������߼�
//    bind(sourceList, 'click', function (e) {
//        var target = e.target;
//        if (target.tagName.toLowerCase() === 'li') {

//            var isEmbeddedVideo = target.id === 'embedded-video'; // ��ȡǶ��ʽ��Ƶ��id
//            var is_special = target.id === 'special'
//            var is_special2 = target.id === 'special2'

//            if (isEmbeddedVideo) {
//                var embeddedVideoSource = target.getAttribute('data-source'); // ��ȡǶ��ʽ��Ƶ��Դ
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = ''; // ��ղ��Ŵ���
//                var iframe = document.createElement('iframe'); // ���� <iframe> Ԫ��
//                iframe.src = embeddedVideoSource; // ����Ƕ��ʽ��ƵԴ
//                iframe.width = '560'; // ���ÿ��
//                iframe.height = '315'; // ���ø߶�
//                iframe.allowfullscreen = true; // ����ȫ��

//                embeddedVideoContainer.appendChild(iframe); // ���Ƕ��ʽ��Ƶ�����Ŵ���

//                // ��ʾ����һ����Ƶ����ť
//                get('next-video-btn').style.display = 'inline-block';
//            }
//            else if (is_special) {
//                // ���������ȡ��Ƶ����
//                fetch('https://v2.api-m.com/api/meinv')
//                    .then(response => response.json())
//                    .then(data => {
                        
//                        currentSource = data.data.replace(/"/g, ''); // ȥ��˫����
//                        player.src = currentSource;
//                        player.load();
//                    })
//                    .catch(error => {
//                        console.error('Error fetching video:', error);
//                    });

//                // ����Ƕ��ʽ����һ����Ƶ����ť
//                get('next-video-btn').style.display = 'none';

//                // ���л�������Դʱ������Ƕ��ʽ��Ƶ���Ŵ���
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = '';
//            }

//            else if (is_special2) {
//                // ����1��61֮��������������1��61��
//                const randomType = Math.floor(Math.random() * 61) + 1;

//                currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;

//                player.src = currentSource;
//                player.load();
                

//                // ����Ƕ��ʽ����һ����Ƶ����ť
//                get('next-video-btn').style.display = 'none';

//                // ���л�������Դʱ������Ƕ��ʽ��Ƶ���Ŵ���
//                var embeddedVideoContainer = get('embedded-video-container');
//                embeddedVideoContainer.innerHTML = '';
//            }

//            else {
//            currentSource = target.getAttribute('data-source');
//            player.src = currentSource; // ������ƵԴ
//            player.load(); // ���¼�����Ƶ

//            // ����Ƕ��ʽ����һ����Ƶ����ť
//            get('next-video-btn').style.display = 'none';

//            // ���л�������Դʱ������Ƕ��ʽ��Ƶ���Ŵ���
//            var embeddedVideoContainer = get('embedded-video-container');
//            embeddedVideoContainer.innerHTML = '';

//        }
//        sourceList.classList.remove('active');

//    }
//    });

//    // �ӿ��л�ʧ��������Ĭ�Ͻӿ�
//    bind(player, 'error', function () { randomVideo(); });

//    // ʹ��iframe����Ƕ����Ƶ�ĵ������һ����Ƶ����ť���¼�������
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

//    // ��ʼ��������Ƶ
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
    var currentSource = 'http://v.nrzj.vip/video.php'; // ��ǰ��ƵԴ

    

    // ��ʵ���next�������⣬�������randomVideo������ֻ������Ĭ��Դ
    function randomVideo() {
        //// ����Ƕ��ʽ����һ����Ƶ����ť
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
        this.innerText = '��������: ' + (auto ? '��' : '��');
    });
    player.addEventListener('ended', function () {
        if (auto) randomVideo();
    });
    bind(changeSourceBtn, 'click', function () {
        sourceList.classList.toggle('active');
    });


    // ����1
    /*����Ƕ��ʽԪ��*/
    //function hideEmbeddedVideo() {
    //    get('next-video-btn').style.display = 'none';
    //    var embeddedVideoContainer = get('embedded-video-container');
    //    embeddedVideoContainer.innerHTML = '';
    //}
     /*��ƵԴ�б��е�Դ�����¼������߼�*/
    //bind(sourceList, 'click', function (e) {
    //    var target = e.target;
    //    if (target.tagName.toLowerCase() === 'li') {
    //        // �Ƴ�֮ǰ�� active ����б������
    //        const previousActive = document.querySelector('#source-list li.active');
    //        if (previousActive) {
    //            previousActive.classList.remove('active');
    //        }
    //        // Ϊ��ǰ������б������ active ��
    //        target.classList.add('active');

    //        var isEmbeddedVideo = target.id === 'embedded-video'; // ��ȡǶ��ʽ��Ƶ��id
    //        var is_special = target.id === 'special'
    //        var is_special2 = target.id === 'special2'

    //        if (isEmbeddedVideo) {
    //            var embeddedVideoSource = target.getAttribute('data-source'); // ��ȡǶ��ʽ��Ƶ��Դ
    //            var embeddedVideoContainer = get('embedded-video-container');
    //            embeddedVideoContainer.innerHTML = ''; // ��ղ��Ŵ���
    //            var iframe = document.createElement('iframe'); // ���� <iframe> Ԫ��
    //            iframe.src = embeddedVideoSource; // ����Ƕ��ʽ��ƵԴ
    //            iframe.width = '560'; // ���ÿ��
    //            iframe.height = '315'; // ���ø߶�
    //            iframe.allowfullscreen = true; // ����ȫ��

    //            embeddedVideoContainer.appendChild(iframe); // ���Ƕ��ʽ��Ƶ�����Ŵ���

    //            // ��ʾ����һ����Ƶ����ť
    //            get('next-video-btn').style.display = 'inline-block';
    //        }
    //        else if (is_special) {
    //            // ���������ȡ��Ƶ����
    //            fetch('https://v2.api-m.com/api/meinv')
    //                .then(response => response.json())
    //                .then(data => {

    //                    currentSource = data.data.replace(/"/g, ''); // ȥ��˫����
    //                    player.src = currentSource;
    //                    player.load();
    //                })
    //                .catch(error => {
    //                    console.error('Error fetching video:', error);
    //                });

    //            hideEmbeddedVideo()
    //        }

    //        else if (is_special2) {
    //            // ����1��61֮��������������1��61��
    //            const randomType = Math.floor(Math.random() * 61) + 1;

    //            currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;

    //            player.src = currentSource;
    //            player.load();

    //            hideEmbeddedVideo()
    //        }

    //        else {
    //            currentSource = target.getAttribute('data-source');
    //            player.src = currentSource; // ������ƵԴ
    //            player.load(); // ���¼�����Ƶ

    //            hideEmbeddedVideo()

    //        }
    //        sourceList.classList.remove('active');

    //    }
    //});





    // ai�Ż�����
    bind(sourceList, 'click', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() === 'li') {
            handleListItemClick(target);
        }
    });

    function handleListItemClick(target) {
        const id = target.id;
        

        // �Ƴ�֮ǰ�� active ����б������
        const previousActive = document.querySelector('#source-list li.active');
        if (previousActive) {
            previousActive.classList.remove('active');
        }
        // Ϊ��ǰ������б������ active ��
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
        embeddedVideoContainer.innerHTML = ''; // ��ղ��Ŵ���
        var iframe = document.createElement('iframe'); // ���� <iframe> Ԫ��
        iframe.src = embeddedVideoSource; // ����Ƕ��ʽ��ƵԴ
        iframe.width = '560'; // ���ÿ��
        iframe.height = '315'; // ���ø߶�
        iframe.allowfullscreen = true; // ����ȫ��

        embeddedVideoContainer.appendChild(iframe); // ���Ƕ��ʽ��Ƶ�����Ŵ���

        // ��ʾ����һ����Ƶ����ť
        get('next-video-btn').style.display = 'inline-block';
    }

    function fetchAndPlayVideo(url) {
        if (url === 'https://v2.api-m.com/api/meinv') {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    currentSource = data.data.replace(/"/g, ''); // ȥ��˫����
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
                    currentSource = data.data.replace(/"/g, ''); // ȥ��˫����
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
                    currentSource = videoUrl.trim(); // ȥ�����ܵĿո�ͻ��з�
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
        player.src = currentSource; // ������ƵԴ
        player.load(); // ���¼�����Ƶ
        hideEmbeddedVideo();
    }

    function hideEmbeddedVideo() {
        get('next-video-btn').style.display = 'none';
        var embeddedVideoContainer = get('embedded-video-container');
        embeddedVideoContainer.innerHTML = '';
    }




    // �ӿ��л�ʧ��������Ĭ�Ͻӿ�
    bind(player, 'error', function () { randomVideo(); });

    // ʹ��iframe����Ƕ����Ƶ�ĵ������һ����Ƶ����ť���¼�������
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

    // ��ʼ��������Ƶ
    randomVideo();
})(window, document);








