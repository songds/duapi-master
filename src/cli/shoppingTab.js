import Table from "cli-table3";
import { getConfig } from "./configure";
import { shoppingTabApi } from "../util/api";
export async function shoppingTab(args) {
 
  //const spuId = args.id || args.i;
  const data = await shoppingTabApi();
  console.log(data);
  let head = ["name", "value"];
  const table = new Table({
    head: head,
    colWidths: [15, 23],
    wordWrap: true,
  });
  data.forEach((element) => {
    table.push([element["name"], element["value"]]);
  });
  console.log(table.toString());
}
