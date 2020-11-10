var exec = require("./exec");
var getQueryStr = require("./getQuery");
const sign = require("./sign");
var urlencode=require("urlencode");

export async function searchApi(title,page) {
  const queryStr = getQueryStr({
    title: title?title:"Jordan",
    page: page,
    limit: 20,
    showHot: -1,
    sortType: 1,
    sortMode: 1,
    unionId: ""
  });
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'accept: */*' -H 'content-type: application/x-www-form-urlencoded' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/117/page-frame.html' -H 'appid: wxapp' -H 'appversion: 4.4.0' -H 'wxapp-login-token: 3f885cf3|5805b23362561089694d1976c3f2ea84|1843f86c|13d7302d' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c2f) NetType/WIFI Language/zh_CN' --compressed 'https://app.poizon.com/api/v1/h5/search/fire/search/list?${queryStr}'`;

  const { stdout, stderr } = await exec(cmdStr);
  //console.log(stderr);
  //console.log(stdout);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout));
  });
}
export async function detailApi(spuId) {
  let signId = sign({
    spuId: spuId,
    productSourceName: "",
    propertyValueId: "0",
  });
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'content-type: application/json' -H 'appid: wxapp' -H 'accept: */*' -H 'appversion: 4.4.0' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/94/page-frame.html' -H 'wxapp-login-token: c6058174|42eeb0c170d1846326a53866ff9f254f|441cd128|b022d0b4' --data-binary '{"sign":"${signId}","spuId":"${spuId}","productSourceName":"","propertyValueId":"0"}' --compressed 'https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  const { stdout, stderr } = await exec(cmdStr);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout).data.saleProperties.list);
  });
}


export async function lastSoldListApi(spuId) {
  let params={
    lastId: 139303601,
    spuId: spuId,
    limit: 20,
    sourceApp:"app"
  };
  let signId = sign(params);
  params.sign=signId;
  console.log(params);
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'content-type: application/json' -H 'appid: wxapp' -H 'accept: */*' -H 'appversion: 4.4.0' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/94/page-frame.html' -H 'wxapp-login-token: c6058174|42eeb0c170d1846326a53866ff9f254f|441cd128|b022d0b4' --data-binary '${JSON.stringify(params)}' --compressed 'https://app.poizon.com/api/v1/h5/commodity/fire/last-sold-list'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  console.log(cmdStr);
  const { stdout, stderr } = await exec(cmdStr);
  console.log(stdout);
  console.log(stderr);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout).data.saleProperties.list);
  });
}


export async function shoppingTabApi() {
  let params={
    lastId: "",
    limit: 20,
    tabId:"4"
  };
  let signId = sign(params);
  params.sign=signId;
  console.log(params);
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'content-type: application/json' -H 'appid: wxapp' -H 'accept: */*' -H 'appversion: 4.4.0' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/94/page-frame.html' -H 'wxapp-login-token: c6058174|42eeb0c170d1846326a53866ff9f254f|441cd128|b022d0b4' --data-binary '${JSON.stringify(params)}' --compressed 'https://app.poizon.com/api/v1/h5/index/ice/shopping'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  console.log(cmdStr);
  const { stdout, stderr } = await exec(cmdStr);
  console.log(stdout);
  console.log(stderr);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout).data.saleProperties.list);
  });
}


export async function getCategoryApi() {
  let params={};
  let signId = sign(params);
  params.sign=signId;
  console.log(params);
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'content-type: application/json' -H 'appid: wxapp' -H 'accept: */*' -H 'appversion: 4.4.0' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/94/page-frame.html' -H 'wxapp-login-token: c6058174|42eeb0c170d1846326a53866ff9f254f|441cd128|b022d0b4' --data-binary '${JSON.stringify(params)}' --compressed 'https://app.poizon.com/api/v1/h5/commodity/ice/search/getCategory'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  
  console.log(cmdStr);
  const { stdout, stderr } = await exec(cmdStr);
  console.log(stdout);
  console.log(stderr);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout).data.saleProperties.list);
  });
}



export async function doCategoryDetailApi(catId) {
  let params={
    catId:catId,
    unionId: "11"
  };
  let signId = sign(params);
  params.sign=signId;
  console.log(params);
  let cmdStr = `curl -H 'Host: app.poizon.com' -H 'content-type: application/json' -H 'appid: wxapp' -H 'accept: */*' -H 'appversion: 4.4.0' -H 'accept-language: zh-cn' -H 'user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 13_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.11(0x17000b21) NetType/WIFI Language/zh_CN' -H 'referer: https://servicewechat.com/wx3c12cdd0ae8b1a7b/94/page-frame.html' -H 'wxapp-login-token: c6058174|42eeb0c170d1846326a53866ff9f254f|441cd128|b022d0b4' --data-binary '${JSON.stringify(params)}' --compressed 'https://app.poizon.com/api/v1/h5/commodity/ice/search/doCategoryDetail'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  
  console.log(cmdStr);
  const { stdout, stderr } = await exec(cmdStr);
  console.log(stdout);
  console.log(stderr);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout).data.saleProperties.list);
  });
}



export async function saveMerchandiseApi(params) {
  var title=params["title"];

  let param={
    dataType: params["dataType"],
    productId: params["productId"],
    spuId: params["spuId"],
    logoUrl: params["logoUrl"],
    brandLogoUrl: params["brandLogoUrl"],
    title: title.replace(/\'/,''),
    subTitle: params["subTitle"].replace(/\'/,''),
    spuMinSalePrice: params["spuMinSalePrice"],
    minSalePrice: params["minSalePrice"],
    maxSalePrice: params["maxSalePrice"],
    soldNum: params["soldNum"],
    price: params["price"],
    articleNumber: params["articleNumber"],
    priceType: params["priceType"],
    goodsType: params["goodsType"],
    type: params["type"],
    page: params["page"]
  };
  //console.log(param);
  let cmdStr = `curl  -H 'content-type: application/json'  --data-binary '${urlencode(JSON.stringify(param))}' --compressed 'http://localhost:9093/api/merchandise/saveMerchandise.do'`; //https://app.poizon.com/api/v1/h5/index/fire/flow/product/detail
  //console.log(cmdStr);
  const { stdout, stderr } = await exec(cmdStr);
  //console.log("stdout:"+stdout);
  return await new Promise((resolve, reject) => {
    resolve(JSON.parse(stdout));
  });
}

