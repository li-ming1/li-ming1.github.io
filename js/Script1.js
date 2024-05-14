//                                                                  获取ip
fetch('https://geolocation-db.com/json/')
    .then(response => response.json())
    .then(data => {
        // 创建欢迎消息
        const welcomeMessage = `欢迎来自 ${data.country_name} 的用户！您的 IP 地址是 ${data.IPv4}，您当前位于 ${data.state} ${data.city}。<br />`;
        const webNoticeText = document.querySelector('.web-notice-text');
        // 在现有内容前面插入欢迎消息
        webNoticeText.insertAdjacentHTML('afterbegin', welcomeMessage);
    })
    .catch(error => {
        console.error('无法获取位置信息：', error);
    });



//                                                                  视频
(function (window, document) {
    var get = function (id) { return document.getElementById(id); };
    var bind = function (element, event, callback) { return element.addEventListener(event, callback); };
    var unbind = function (element, event, callback) { return element.removeEventListener(event, callback); };
   
    var auto = true;
    var nextBtn = get('next');
    var switchBtn = get('switch');
    var player = get('player');
    var sourceList = get('source-list');
    var changeSourceBtn = get('change-source');
    var currentSource = 'http://v.nrzj.vip/video.php'; // 当前视频源
    var specialClickHandler; // 用于存储特殊情况下的点击事件处理函数

    function randomVideo() {
        var src = currentSource;
        player.src = src;
        player.load();
    }

    bind(nextBtn, 'click', randomVideo);
    
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

    bind(sourceList, 'click', function (e) {
        var target = e.target;
        if (target.tagName.toLowerCase() === 'li') {
            handleListItemClick(target);
        }
    });

    function bind_handle(){
        unbind(nextBtn, 'click', specialClickHandler)
        bind(nextBtn, 'click', randomVideo);
        player.addEventListener('ended', function () {
            if (auto) randomVideo();
        });
    }

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
            case 'special':               
                const source = target.dataset.source;                                                           
                // 存储特殊情况下的点击事件处理函数
                specialClickHandler = function () {
                    fetchAndPlayVideo(source);
                };
                // 绑定特殊情况下的点击事件处理函数
                unbind(nextBtn, 'click', randomVideo);
                bind(nextBtn, 'click', specialClickHandler);
                player.addEventListener('ended', function () {
                    if (auto) fetchAndPlayVideo(source);
                });
                    
                fetchAndPlayVideo(source);
                break;
            case 'special2':
                bind_handle();

                playRandomVideo();
                break;
            default:  
                bind_handle();

                playDefaultVideo(target);
                break;
        }

        sourceList.classList.remove('active');
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

    }

    function playRandomVideo() {
        const randomType = Math.floor(Math.random() * 61) + 1;
        currentSource = `https://api.zxz.ee/api/video/?format=&type=${randomType}`;
        player.src = currentSource;
        player.load();

    }

    function playDefaultVideo(target) {
        currentSource = target.getAttribute('data-source');
        player.src = currentSource; // 更新视频源
        player.load(); // 重新加载视频
    }
    
    // 接口切换失败则启用默认接口
    bind(player, 'error', function () { randomVideo(); });
   
    // 初始化播放视频
    randomVideo();
})(window, document);




//                                                                 你屏幕有根毛
!function () {
    var bottom = Math.floor(60 * Math.random()),
        right = Math.floor(50 * Math.random()),
        rotate = Math.floor(360 * Math.random());
    var foolsEgg = document.createElement("img");
    foolsEgg.src = "https://search-operate.cdn.bcebos.com/b028c278cbb84660f8bde79d819bc30b.png";
    foolsEgg.style.position = "fixed";
    foolsEgg.style.bottom = "".concat(bottom, "%");
    foolsEgg.style.right = "".concat(right, "%");
    foolsEgg.style.zIndex = "9999";
    foolsEgg.style.pointerEvents = "none";
    foolsEgg.style.width = "40%";
    foolsEgg.style.maxWidth = "190px";
    foolsEgg.style.transform = "".concat("rotate(", rotate, "deg)");
    document.body.append(foolsEgg);
}();





//                                                                   随机一言
var YiYan = function (element) {
    function randomColor() {
        return colorPalette[Math.floor(Math.random() * colorPalette.length)];
    }

    function randomCharacter() {
        return String.fromCharCode(94 * Math.random() + 33);
    }

    function createRandomSpan(spanLength) {
        for (var fragment = document.createDocumentFragment(), i = 0; spanLength > i; i++) {
            var span = document.createElement("span");
            span.textContent = randomCharacter();
            span.style.color = randomColor();
            fragment.appendChild(span);
        }
        return fragment;
    }

    function updateTextAnimation() {
        // 清除当前存在的定时器
        if (currentTimeout) {
            clearTimeout(currentTimeout);
        }

        // 获取当前语录
        var currentQuote = quotes[animationState.quoteIndex];

        // 更新动画文字内容
        if (animationState.step) {
            animationState.step--; // 步进减少
        } else {
            // 如果步进为 0，则执行以下操作

            // 检查是否还有前缀需要添加
            if (animationState.prefixPosition < textPrefix.length) {
                if (animationState.prefixPosition >= 0) {
                    animationState.displayText += textPrefix[animationState.prefixPosition];
                }
                animationState.prefixPosition++;
            } else {
                // 根据动画方向进行文字内容的更新
                if (animationState.direction === "forward") {
                    if (animationState.skillPosition < currentQuote.length) {
                        animationState.displayText += currentQuote[animationState.skillPosition];
                        animationState.skillPosition++;
                    } else {
                        if (animationState.delay) {
                            animationState.delay--;
                        } else {
                            animationState.direction = "backward";
                            animationState.delay = backwardStep;
                        }
                    }
                } else {
                    if (animationState.skillPosition > 0) {
                        animationState.displayText = animationState.displayText.slice(0, -1);
                        animationState.skillPosition--;
                    } else {
                        animationState.quoteIndex = (animationState.quoteIndex + 1) % quotes.length;
                        animationState.direction = "forward";
                    }
                }
            }
        }

        // 更新文本内容
        element.textContent = animationState.displayText;

        // 创建随机样式的 `<span>` 元素并添加到文本中
        var fragment = createRandomSpan(animationState.prefixPosition < textPrefix.length ?
            Math.min(maxSpanLength, maxSpanLength + animationState.prefixPosition) :
            Math.min(maxSpanLength, currentQuote.length - animationState.skillPosition));
        element.appendChild(fragment);

        // 设置下一次更新动画的定时器
        currentTimeout = setTimeout(updateTextAnimation, animationInterval);
    }

    var currentTimeout = null; // 用于记录当前的定时器 ID

    var textPrefix = "", // 动画中最初显示的文字内容
        quotes = [], // 存储语录的数组
        backwardStep = 2, // 文字动画后退的速度
        forwardStep = 1, // 文字动画前进的速度
        maxSpanLength = 5,
        animationInterval = 75, // 更新文字动画的时间间隔
        colorPalette = ["rgb(110,64,170)", "rgb(150,61,179)", "rgb(191,60,175)", "rgb(228,65,157)", "rgb(254,75,131)", "rgb(255,94,99)", "rgb(255,120,71)", "rgb(251,150,51)", "rgb(226,183,47)", "rgb(198,214,60)", "rgb(175,240,91)", "rgb(127,246,88)", "rgb(82,246,103)", "rgb(48,239,130)", "rgb(29,223,163)", "rgb(26,199,194)", "rgb(35,171,216)", "rgb(54,140,225)", "rgb(76,110,219)", "rgb(96,84,200)"],

        // 动画的状态对象，包含了当前动画的各种状态信息，如显示的文字内容、前缀位置、语录索引、当前字符位置、步进值、方向和延迟等。
        animationState = {
            displayText: "",
            prefixPosition: 0,
            quoteIndex: 0,
            skillPosition: 0,
            step: 0,
            direction: "forward",
            delay: 0
        };

    // 定义获取语录并更新显示的函数
    function fetchAndDisplayRandomQuote() {
        const apiSources = [
            'https://api.qqij.cn/Api/WaSentence?format=json',
            'https://api.gumengya.com/Api/YiYan?format=json',
            'https://api.qqij.cn/Api/YiYan?format=json'           
        ];

        const requests = apiSources.map(source => fetch(source));

        // 获取访问最快的api
        Promise.race(requests)
            .then(response => response.json())
            .then(data => {
                quotes = [data.data.text];
                updateTextAnimation(); // 更新动画显示
            })
            .catch(error => console.error('获取语录时出错:', error));
    }

    // 初始获取并显示语录
    fetchAndDisplayRandomQuote();
    // 每隔十秒更新一次语录
    setInterval(fetchAndDisplayRandomQuote, 10000);
};

YiYan(document.getElementById("YiYan"));




//                                                                 动态标题
var OriginTitile = document.title, titleTime;
document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
        document.title = "╮(╯﹏╰）╭ 网页崩溃啦！"; clearTimeout(titleTime)
    }
    else {
        document.title = "(/≧▽≦/) 咦！又好了！ "; titleTime = setTimeout(function () {
            document.title = OriginTitile
        }, 1000)
    }
});



//                                                                  音频
function refreshAudio() {
    // 获取音频元素
    var audio = document.getElementById('audio_player');
    // 获取描述内容元素
    var description = document.getElementById('description');
    // 随机选择音频源
    var audioSources = [
        { src: "http://api.yujn.cn/api/lvcha.php", description: "绿茶语音包" },
        { src: "http://api.yujn.cn/api/sjkunkun.php", description: "iqun语音包" },
        { src: "https://api.zxz.ee/api/bbyy", description: "叫爸爸语音包" },
        { src: "https://api.zxz.ee/api/sjyjsj", description: "御姐撒娇语音包" },
        { src: "http://api.yujn.cn/api/and.php", description: "阿脑袋可爱配音" },
        { src: "http://api.yujn.cn/api/yujie.php", description: "随机御姐撒娇语音" }       
    ];
    var randomIndex = Math.floor(Math.random() * audioSources.length);
    var randomSource = audioSources[randomIndex];
    // 设置音频源
    audio.src = randomSource.src;
    // 设置描述内容
    description.innerText = randomSource.description;
    // 播放新的音频元素
    audio.play();
}
// 页面加载时刷新一次音频
window.onload = refreshAudio;




//                                                              鼠标点击特效
(function () {
    var a_idx = 0;
    window.onclick = function (event) {
        var a = new Array("❤富强❤", "❤民主❤", "❤文明❤", "❤和谐❤", "❤自由❤", "❤平等❤", "❤公正❤", "❤法治❤", "❤爱国❤",
            "❤敬业❤", "❤诚信❤", "❤友善❤");

        var heart = document.createElement("b"); //创建b元素
        heart.onselectstart = new Function('event.returnValue=false'); //防止拖动

        document.body.appendChild(heart).innerHTML = a[a_idx]; //将b元素添加到页面上
        a_idx = (a_idx + 1) % a.length;
        heart.style.cssText = "position: fixed;left:-100%;"; //给p元素设置样式

        var f = 16, // 字体大小
            x = event.clientX - f / 2, // 横坐标
            y = event.clientY - f, // 纵坐标
            c = randomColor(), // 随机颜色
            a = 1, // 透明度
            s = 1.2; // 放大缩小

        var timer = setInterval(function () { //添加定时器
            if (a <= 0) {
                document.body.removeChild(heart);
                clearInterval(timer);
            } else {
                heart.style.cssText = "font-size:16px;cursor: default;position: fixed;color:" +
                    c + ";left:" + x + "px;top:" + y + "px;opacity:" + a + ";transform:scale(" +
                    s + ");";

                y--;
                a -= 0.016;
                s += 0.002;
            }
        }, 15)

    }
    // 随机颜色
    function randomColor() {
        return "rgb(" + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + "," + (~~(Math.random() * 255)) + ")";

    }
}());



//                                                             本站运行时间
function show_date_time() {
    window.setTimeout("show_date_time()", 1000);
    BirthDay = new Date("5/6/2024 17:37:00");
    today = new Date();
    timeold = (today.getTime() - BirthDay.getTime());
    sectimeold = timeold / 1000
    secondsold = Math.floor(sectimeold);
    msPerDay = 24 * 60 * 60 * 1000
    e_daysold = timeold / msPerDay
    daysold = Math.floor(e_daysold);
    e_hrsold = (e_daysold - daysold) * 24;
    hrsold = Math.floor(e_hrsold);
    e_minsold = (e_hrsold - hrsold) * 60;
    minsold = Math.floor((e_hrsold - hrsold) * 60);
    seconds = Math.floor((e_minsold - minsold) * 60);
    span_dt_dt.innerHTML = '<font style=color:#FF0000>' + daysold + '</font> 天 <font style=color:#FF0000>' + hrsold + '</font> 时 <font style=color:#FF0000>' + minsold + '</font> 分 <font style=color:#FF0000>' + seconds + '</font> 秒';

}
show_date_time();




//                                                                绘制时钟
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// 将角度转换为弧度
function degToRad(degree) {
    var factor = Math.PI / 180;
    return degree * factor;
}
// 绘制时钟
function renderTime() {
    var now = new Date();
    var today = now.toDateString();
    var time = now.toLocaleTimeString();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var sec = now.getSeconds();
    var mil = now.getMilliseconds();
    var smoothsec = sec + (mil / 1000);
    var smoothmin = min + (smoothsec / 60);

    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 计算中心点坐标
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // 绘制背景弧
    ctx.beginPath();
    ctx.arc(centerX, centerY, 130, 0, Math.PI * 2);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 10;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#00ffff';
    ctx.stroke();

    // 绘制背景渐变
    var gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, 150);
    gradient.addColorStop(0, "#03303a");
    gradient.addColorStop(1, "black");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 绘制小时指针
    ctx.beginPath();
    ctx.arc(centerX, centerY, 120, degToRad(270), degToRad((hrs * 30) - 90));
    ctx.stroke();

    // 绘制分钟指针
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, degToRad(270), degToRad((smoothmin * 6) - 90));
    ctx.stroke();

    // 绘制秒钟指针
    ctx.beginPath();
    ctx.arc(centerX, centerY, 80, degToRad(270), degToRad((smoothsec * 6) - 90));
    ctx.stroke();

    // 绘制日期
    ctx.font = "15px Helvetica";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)'
    ctx.fillText(today, centerX - 60, centerY - 10);

    // 绘制时间
    ctx.font = "15px Helvetica Bold";
    ctx.fillStyle = 'rgba(00, 255, 255, 1)';
    ctx.fillText(time + ":" + mil, centerX - 60, centerY + 10);
}
renderTime();
setInterval(renderTime, 40);





//                                                           控制台信息
console.log("%c%c源码作者%c许你无忧", "line-height:26px;", "line-height:16px;padding:2px 6px;border-radius: 5px 0px 0px 5px;background:#35495e;color:#fff;font-size:12px;", "padding:2px 8px;background:#0093ff;color:#fff;line-height:16px;font-size:12px;border-radius: 0px 5px 5px 0px;");
console.log("%c%c网站地址%chttps://github.com/li-ming1/li-ming1.github.io", "line-height:26px;", "line-height:16px;padding:2px 6px;border-radius: 5px 0px 0px 5px;background:#35495e;color:#fff;font-size:12px;", "padding:2px 8px;background:#0093ff;color:#fff;line-height:16px;font-size:12px;border-radius: 0px 5px 5px 0px;");
console.log("%c%c站长QQ%c2707541940", "line-height:26px;", "line-height:16px;padding:2px 6px;border-radius: 5px 0px 0px 5px;background:#35495e;color:#fff;font-size:12px;", "padding:2px 8px;background:#0093ff;color:#fff;line-height:16px;font-size:12px;border-radius: 0px 5px 5px 0px;");




//                                                           友情提醒
function getRandomNoticeContent() {
    // 定义一组不同的通知内容及其链接
    var noticeContents = [
        { text: "客官已经看了5分钟哦，请放松一下眼睛，或者玩一玩贪吃蛇哦。", color: "#ff0000", link: "https://www.baidu.com" },
        { text: "客官已经看了5分钟哦，请放松一下眼睛，或者玩一玩吃豆人小游戏哦。", color: "#ff0000", link: "https://www.douyin.com/" },
        { text: "客官已经看了5分钟哦，请放松一下眼睛，或者玩一玩僵尸失重掉落解压小游戏哦。", color: "#ff0000", link: "https://www.bilibili.com/" },
    ];
    // 随机选择一个通知内容
    var randomIndex = Math.floor(Math.random() * noticeContents.length);
    return noticeContents[randomIndex];
}

var timeout; // 用于存储定时器的引用
var yesButton; // 将yesButton定义为全局变量

function generatePopup() {
    var noticeOverlay = document.getElementById('NoticeOverlay');
    noticeOverlay.style.display = 'block';
    var noticeText = document.querySelector('.notice-text');
    var noticeContent = getRandomNoticeContent(); // 获取随机的通知内容
    noticeText.textContent = noticeContent.text; // 设置通知文本内容
    noticeText.style.color = noticeContent.color; // 设置通知文本颜色
    yesButton = document.querySelectorAll('.notice-button')[0]; // 将yesButton赋值为全局变量

    yesButton.href = noticeContent.link; // 设置"Yes"按钮的链接
}

function handleYes() {
    var link = yesButton.href;
    var dynamicLink = document.createElement('a');
    dynamicLink.href = link;
    dynamicLink.click();
    // 清除定时器
    clearTimeout(timeout);
}

function handleNo() {
    var noticeOverlay = document.getElementById('NoticeOverlay');
    noticeOverlay.style.display = 'none';
}

// 设置自动关闭定时器
function startAutoClose() {
    timeout = setTimeout(function () {
        handleNo();
    }, 10000); // 30秒后自动执行
}

// 在弹窗打开时调用 startAutoClose() 函数启动定时器
startAutoClose();

setInterval(generatePopup, 5 * 60 * 1000)