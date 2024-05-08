function refreshAudio() {
    // ��ȡ��ƵԪ��
    var audio = document.getElementById('audio_player');
    // ��ȡ��������Ԫ��
    var description = document.getElementById('description');
    // ���ѡ����ƵԴ
    var audioSources = [
        { src: "http://api.yujn.cn/api/lvcha.php", description: "�̲����԰�" }, 
        { src: "http://api.yujn.cn/api/sjkunkun.php", description: "iqun���԰�" },
        { src: "https://api.zxz.ee/api/bbyy", description: "�аְ����԰�" },
        { src: "https://api.zxz.ee/api/sjyjsj", description: "�����������԰�" }
    ];
    var randomIndex = Math.floor(Math.random() * audioSources.length);
    var randomSource = audioSources[randomIndex];
    // ������ƵԴ
    audio.src = randomSource.src;
    // ������������
    description.innerText = randomSource.description;
    // �����µ���ƵԪ��
    audio.play();
}
// ҳ�����ʱˢ��һ����Ƶ
window.onload = refreshAudio;