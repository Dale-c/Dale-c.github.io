var playList = [
  {
    id: 169185,
    name: "认真的雪",
    artists: "薛之谦",
    picUrl:
      "https://p2.music.126.net/yWtj0UXRJBCT9YI7csmAcw==/109951164190741294.jpg",
    playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
  },
  {
    id: 5253734,
    name: "恋爱达人",
    artists: "罗志祥",
    picUrl:
      "https://p1.music.126.net/n4YTVSO7QK1VRQMCEeOPqA==/80264348845281.jpg",
    playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
  },
  {
    id: 277302,
    name: "爱",
    artists: "莫文蔚",
    picUrl:
      "https://p1.music.126.net/hcY73QYZt36DeGf91euboQ==/18921495602636668.jpg",
    playSrc: "https://music.163.com/song/media/outer/url?id=id.mp3",
  },
];

var audio = document.querySelector("audio");
var totaltime = document.querySelector(".totaltime");
var nowtime = document.querySelector(".nowtime");
var progress = document.querySelector(".progress input");
var slider = document.querySelector(".progress .slider");
var btn_play = document.querySelector(".btn_play");
var btn_next = document.querySelector(".icon-next");
var btn_prev = document.querySelector(".icon-prev");
var btn_loop = document.querySelectorAll(".btn .iconfont")[3];
var songname = document.querySelector(".top h3");
var singername = document.querySelector(".top p");
var songpic = document.querySelector(".glue img");
var mask = document.querySelector(".mask");

//-----------时间样式----------------
function a(sum) {
  if (sum < 10) {
    return (sum = "0" + sum);
  } else if (sum == 0) {
    return (sum = 00);
  } else {
    return sum;
  }
}
function b(totalTime, wz) {
  wz.innerHTML =
    a(Math.floor(totalTime / 60)) + ":" + a(Math.floor(totalTime % 60));
}
audio.addEventListener("durationchange", function () {
  console.log(audio.duration);
  progress.max = audio.duration; //总时长赋给input最大值
  b(audio.duration, totaltime);
});

//-------------改变播放位置------------
audio.addEventListener("timeupdate", function () {
//   console.log(audio.currentTime);
  // 调整input 当前位置
//   console.log("inputing", inputing);
  b(audio.currentTime, nowtime);
  if (inputing) {
    return;
  }
  // 调整slider 当前位置
  slider.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

var inputing = false;
// input 输入 滑块滑动时
progress.addEventListener("input", function () {
  inputing = true;
  console.log(this.value);

  // 设置slider 滑块位置
  slider.style.width = (this.value / this.max) * 100 + "%";
});

progress.addEventListener("change", function () {
  // 设置 歌曲播放位置
  audio.currentTime = this.value;
  inputing = false;
});

//----------监听歌曲停止、播放-------------
var stage = document.querySelector(".stage");
audio.addEventListener("play", function () {
  stage.classList.add("playing");
  btn_play.classList.add("icon-pause");
  btn_play.classList.remove("icon-play");
});
audio.addEventListener("pause", function () {
  stage.classList.remove("playing");
  btn_play.classList.remove("icon-pause");
  btn_play.classList.add("icon-play");
});
//判断当前的状态是否为暂停
function isStop(obj) {
  if (audio.paused) {
    audio.play();
    obj.classList.add("icon-pause");
    obj.classList.remove("icon-play");
  } else {
    audio.pause();
    obj.classList.remove("icon-pause");
    obj.classList.add("icon-play");
  }
}
//若是暂停则点击播放，否则暂停
btn_play.onclick = function () {
  isStop(this);
};

//-----------点击切歌---------------------
audio.src =
  "https://music.163.com/song/media/outer/url?id=" + playList[0].id + ".mp3";
var clickNum = 0;

function qie(index) {
  audio.src =
    "https://music.163.com/song/media/outer/url?id=" +
    playList[index].id +
    ".mp3";
  songname.innerHTML = playList[index].name;
  singername.innerHTML = playList[index].artists;
  songpic.src = playList[index].picUrl;
  mask.style.backgroundImage = "url(" + playList[index].picUrl + ")";
}
function isnp() {
  if (clickNum > playList.length -1) {
    clickNum = 0;
  } else if (clickNum < 0) {
    clickNum = playList.length - 1;
  }
}
btn_next.onclick = function () {
    // clickNum++;
  console.log("下一首3"+clickNum)
  isnp();
  pd(true);
};
btn_prev.onclick = function () {
  isnp();
  pd(false);
};
//--------------------------------------------------

var num = 0;
btn_loop.onclick = function () {
  if (num == 0) {
    this.classList.remove("icon-loop");
    this.classList.add("icon-random");
    num++;
  } else if (num == 1) {
    this.classList.remove("icon-random");
    this.classList.add("icon-single");
    num++;
  } else {
    this.classList.remove("icon-single");
    this.classList.add("icon-loop");
    num = 0;
  }
};
//----------------监听是否结束----------------------
audio.addEventListener("ended", function () {
  if (btn_loop.classList.contains("icon-single")) {
    console.log("自动播放下一首:"+clickNum);
    qie(clickNum);
  }else{
    
    pd(true);
  }
});

function pd(flag) {
    if (btn_loop.classList.contains("icon-random")) {
        console.log("随机")
        var randomItem = Math.floor(Math.random() * playList.length);
        while (clickNum == randomItem) {
          randomItem = Math.floor(Math.random() * playList.length);
        }
        clickNum = randomItem;
        isnp();
        qie(clickNum);
      }else {
        if(flag){
            clickNum++;
            console.log('11111111111111111111111111111111')
        }else{
          clickNum--;
        }
        isnp();
        qie(clickNum);

      }
}
