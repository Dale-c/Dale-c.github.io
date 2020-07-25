function query(selector) {
  //selector选择器
  return document.querySelectorAll(selector);
}

//promise封装ajax
class Http {
  //get请求
  get(url) {
    return new Promise((resolved, rejected) => {
      //创建ajax对象
      let xhr = new XMLHttpRequest();
      //监听ajax状态变化
      xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          //凝固结果
          resolved(this.responseText);
        }
      };
      //建立服务器连接
      xhr.open("GET", url, true);
      //发起请求
      xhr.send();
    });
  }
}

let http = new Http();

//发起get请求
http
  .get(
    "http://api.tianapi.com/txapi/ncovcity/index?key=ef6635850a66ff0e8ee1fc5ec8c36fca"
  )
  .then((result) => {
    result = JSON.parse(result);
    // console.log('result ==> ', result);
    let newslist = result.newslist;
    // console.log(newslist)
    let provname = query("#home .details")[0];
    for (let key in newslist) {
      let provinceName = newslist[key].provinceName;
      let currentConfirmedCount = newslist[key].currentConfirmedCount;
      let confirmedCount = newslist[key].confirmedCount;
      let deadCount = newslist[key].deadCount;
      let curedCount = newslist[key].curedCount;
      let cities = newslist[key].cities;
      let dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      dropdown.innerHTML += `
                        <button class="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <ul>
                                <li>${provinceName}</li>
                                <li>${currentConfirmedCount}</li>
                                <li>${confirmedCount}</li>
                                <li>${deadCount}</li>
                                <li>${curedCount}</li>
                                <span class="caret"></span>
                            </ul>
                        </button>`;
      provname.appendChild(dropdown);

      for (let key in cities) {
        // console.log(cities[key])
        let cityName = cities[key].cityName;
        let citycurrentConfirmedCount = cities[key].currentConfirmedCount;
        let cityconfirmedCount = cities[key].confirmedCount;
        let citydeadCount = cities[key].deadCount;
        let citycuredCount = cities[key].curedCount;
        dropdown.innerHTML += `<ul class="dropdown-menu" aria-labelledby="dLabel">
                            <li>
                                <ul>
                                    <li>${cityName}</li>
                                    <li>${citycurrentConfirmedCount}</li>
                                    <li>${cityconfirmedCount}</li>
                                    <li>${citydeadCount}</li>
                                    <li>${citycuredCount}</li>
                                </ul>
                            </li>
                        </ul>`;
        provname.appendChild(dropdown);
      }
    }
  });

let http1 = new Http();
//发起get请求
http1
  .get(
    "http://api.tianapi.com/txapi/ncovabroad/index?key=ef6635850a66ff0e8ee1fc5ec8c36fca"
  )
  .then((result) => {
    result = JSON.parse(result);
    // console.log("result ==> ", result);
    let newslist = result.newslist;
    // console.log(newslist)
    let type = [];
    newslist.map((v) => {
      if (type.indexOf(v.continents) === -1) {
        type.push(v.continents);
      }
    });

    let products = {};
    type.map((v) => {
      products[v] = [];
      newslist.map((item) => {
        if (v == item.continents) {
          products[v].push(item);
        }
      });
    });
    // console.log('continents ==> ', products);
    console.log('products ==> ', products);
    let provname = query("#profile .details")[0];
      let ljcurrentConfirmedCount = 0;
      let ljconfirmedCount = 0;
      let ljdeadCount = 0;
      let ljcuredCount = 0;
      
      let USconfirmedCount = 0;
      let BXconfirmedCount = 0;
      let YDconfirmedCount = 0;
      let ELSconfirmedCount = 0;

    for (let i = 0; i < type.length; i++) {
      let acurrentConfirmedCount = 0;
      let aconfirmedCount = 0;
      let adeadCount = 0;
      let acuredCount = 0;

      let continent = type[i];
      let dropdown = document.createElement("div");
      dropdown.className = "dropdown";

      provname.appendChild(dropdown);
      for (let key in products) {
        // console.log(products[key])
        let aaa = products[key]; 
        for (let i in aaa) {
          if (continent == aaa[i].continents) {
            acurrentConfirmedCount += aaa[i].currentConfirmedCount;
            aconfirmedCount += aaa[i].confirmedCount;
            adeadCount += aaa[i].deadCount;
            acuredCount += aaa[i].curedCount;
            ljcurrentConfirmedCount += aaa[i].currentConfirmedCount;
            ljconfirmedCount += aaa[i].confirmedCount;
            ljdeadCount += aaa[i].deadCount;
            ljcuredCount += aaa[i].curedCount;
          }
        }
      }
      dropdown.innerHTML += `
                        <button class="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                            aria-expanded="false">
                            <ul>
                                <li>${continent}</li>
                                <li>${acurrentConfirmedCount}</li>
                                <li>${aconfirmedCount}</li>
                                <li>${adeadCount}</li>
                                <li>${acuredCount}</li>
                                <span class="caret"></span>
                            </ul>
                        </button>`;
      for (let key in products) {
        // console.log(products[key])
        let aaa = products[key];
        // console.log(continents[i])
        for (let i in aaa) {
          if (continent == aaa[i].continents) {
            let provinceName = aaa[i].provinceName;
            let currentConfirmedCount = aaa[i].currentConfirmedCount;
            let confirmedCount = aaa[i].confirmedCount;
            let deadCount = aaa[i].deadCount;
            let curedCount = aaa[i].curedCount;
            // console.log(provinceName)
            dropdown.innerHTML += `<ul class="dropdown-menu" aria-labelledby="dLabel">
                            <li>
                                <ul>
                                    <li>${provinceName}</li>
                                    <li>${currentConfirmedCount}</li>
                                    <li>${confirmedCount}</li>
                                    <li>${deadCount}</li>
                                    <li>${curedCount}</li>
                                </ul>
                            </li>
                        </ul>`;
          }
          
          // console.log(aaa[i])
        if(aaa[i].provinceName == "美国"){
          // console.log(aaa[i].confirmedCount)
          USconfirmedCount = aaa[i].confirmedCount;
        }
        if(aaa[i].provinceName == "巴西"){
          BXconfirmedCount = aaa[i].confirmedCount;
        }
        if(aaa[i].provinceName == "印度"){
          YDconfirmedCount = aaa[i].confirmedCount;
        }
        if(aaa[i].provinceName == "俄罗斯"){
          ELSconfirmedCount = aaa[i].confirmedCount;
        }
        }
        
      }
    }
    
    // console.log("累计",ljconfirmedCount)
    let messagess = query(".messages")[0];
      messagess.innerHTML += `<ul class="addUp">
                        <li>
                            <h5>累计确诊</h5>
                            <h3>${ljconfirmedCount}</h3>
                            <p>较上日<span>+278390</span></p>
                        </li>
                        <li>
                            <h5>现有确诊</h5>
                            <h3 style="color: #ff5500;">${ljcurrentConfirmedCount}</h3>
                            <p>较上日<span style="color: #f1590d;">+85930</span></p>
                        </li>
                        <li>
                            <h5>累计治愈</h5>
                            <h3 style="color: #028d5d;">${ljcuredCount}</h3>
                            <p>较上日<span style="color: #3eb68e;">+186187</span></p>
                        </li>
                        <li>
                            <h5>累计死亡</h5>
                            <h3 style="color: #666666;">${ljdeadCount}</h3>
                            <p>较上日<span style="color: #777b7e;">+6273</span></p>
                        </li>
                    </ul> 
                    <ul class="nowHave">
                        <li>
                            <h5>美国确诊</h5>
                            <h3>${USconfirmedCount}</h3>
                            <p>较上日<span style = "color : #ccc">+69116</span></p>
                        </li>
                        <li>
                            <h5>巴西确诊</h5>
                            <h3>${BXconfirmedCount}</h3>
                            <p>较上日<span style = "color : #ccc">+58080</span></p>
                        </li>
                        <li>
                            <h5>印度确诊</h5>
                            <h3>${YDconfirmedCount}</h3>
                            <p>较上日<span style = "color : #ccc">+48446</span></p>
                        </li>
                        <li>
                            <h5>俄罗斯确诊</h5>
                            <h3>${ELSconfirmedCount}</h3>
                            <p>较上日<span style = "color : #ccc">+5848</span></p>
                        </li>
                    </ul>`;
  });

let qtotal = 0;
let http3 = new Http();
//发起get请求
http3
  .get(
    "http://api.tianapi.com/txapi/ncov/index?key=ef6635850a66ff0e8ee1fc5ec8c36fca"
  )
  .then((result) => {
    result = JSON.parse(result);
    console.log("result ==> ", result);
    let newslist = result.newslist;
    for (let key in newslist) {
      // console.log(newslist[key].desc);
      let desc = newslist[key].desc;
      // console.log(desc.confirmedCount);

      let statistics = query(".statistics")[0];
      statistics.innerHTML += `<ul class="addUp">
                        <li>
                            <h5>累计确诊</h5>
                            <h3>${desc.confirmedCount}</h3>
                            <p>较上日<span>+${desc.confirmedIncr}</span></p>
                        </li>
                        <li>
                            <h5>累计治愈</h5>
                            <h3 style="color: #028d5d;">${desc.curedCount}</h3>
                            <p>较上日<span style="color: #3eb68e;">+${
                              desc.curedIncr
                            }</span></p>
                        </li>
                        <li>
                            <h5>累计死亡</h5>
                            <h3 style="color: #666666;">${desc.deadCount}</h3>
                            <p>较上日<span style="color: #777b7e;">+${
                              desc.deadIncr
                            }</span></p>
                        </li>
                    </ul>
                    <ul class="nowHave">
                        <li>
                            <h5>现有确诊</h5>
                            <h3 style="color: #ff5500;">${
                              desc.currentConfirmedCount
                            }</h3>
                            <p>较上日<span style="color: #f1590d;">+${
                              desc.currentConfirmedIncr
                            }</span></p>
                        </li>
                        <li>
                            <h5>境外输入确诊</h5>
                            <h3 style="color: #638aa7;">${
                              desc.suspectedCount
                            }</h3>
                            <p>较上日<span style="color: #638aa7;">+${
                              desc.suspectedIncr
                            }</span></p>
                        </li>
                        <li>
                            <h5>现有疑似</h5>
                            <h3 style="color: #e68500;">2</h3>
                            <p>较上日<span style="color: #ec9450;">+1</span></p>
                        </li>
                    </ul>`;

      
    }
  });
