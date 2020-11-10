import Table from "cli-table3";
import { getConfig } from "./configure";
import { searchApi } from "../util/api";
import { saveMerchandiseApi } from "../util/api";

function sleep(n) {
  var startTime=new Date().getTime();
  //console.log(startTime);
  var endTime=new Date().getTime();
  while((endTime-startTime)<n){
    //console.log(endTime);
    endTime=new Date().getTime();
  }
}

export async function search(args) {
  const title = args.title || args.t;
  var page = args.page || args.p;
  var total=0;
  var pageSize=20;
  var maxPage=0;
  const data = await searchApi(title,page);
  let projectList=data.data.productList;
  if(total==0){
    total=data.data.total;
    maxPage=total%pageSize==0?(total/pageSize):(total/pageSize>>0)+1;
  }
  console.log("total : "+total+" maxPage : "+maxPage);
  if(projectList.length>0){
    saveMerchandise(projectList,page);
  }
  console.log(" for start ");
  do{
    page++;
    console.log("search title : "+ title+" page : "+page);
    const data = await searchApi(title,page);
    let nextProjectList=data.data.productList;
    if(nextProjectList.length>0){
      saveMerchandise(nextProjectList,page);
    }
    if(page<maxPage){
      if(page!=0&&page%50==0){
        sleep(120000);
      }else{
        sleep(30000);
      }
    }
    
  }while(page<maxPage)
  console.log(" for end ");
}

function saveMerchandise(projectList,page){
  /*let head = ["productId", "spuId", "title", "price", "soldNum","page"];
  const table = new Table({
    head: head,
    colWidths: [15, 18, 18, 18, 18],
    wordWrap: true,
  });*/
  projectList.forEach((element) => {
    element["page"]=page;
    /*table.push([
      element["productId"],
      element["spuId"],
      element["title"], 
      element["price"],
      element["soldNum"],
      element["page"]
    ]);*/
    saveMerchandiseApi(element);
  });
  //console.log(table.toString()); 
}
