import Table from "cli-table3";
import { getConfig } from "./configure";
import { getCategoryApi } from "../util/api";
export async function getCategory(args) {
  const title = args.title || args.t;
  const data = await getCategoryApi();
  console.log(data);
  let head = ["productId", "spuId", "title", "price", "soldNum"];
  const table = new Table({
    head: head,
    colWidths: [15, 18, 18, 18, 18],
    wordWrap: true,
  });
  data.forEach((element) => {
    table.push([
      element["productId"],
      element["spuId"],
      element["title"], 
      element["price"],
      element["soldNum"],
    ]);
  });
  console.log(table.toString());
}
