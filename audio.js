function refreshAudio() {
    // 获取音频元素
    var audio = document.getElementById('audio_player');
    // 获取描述内容元素
    var description = document.getElementById('description');
    // 随机选择音频源
    var audioSources = [
        { src: "http://api.yujn.cn/api/lvcha.php", description: "绿茶语言包" }, 
        { src: "http://api.yujn.cn/api/sjkunkun.php", description: "iqun语言包" },
        { src: "https://api.zxz.ee/api/bbyy", description: "叫爸爸语言包" },
        { src: "https://api.zxz.ee/api/sjyjsj", description: "御姐撒娇语言包" }
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