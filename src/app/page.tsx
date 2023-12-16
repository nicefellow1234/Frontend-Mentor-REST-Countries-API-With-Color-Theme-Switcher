"use server";
import Main from "@/components/main";

export default async function Home() {
  const data = require("./data.json");
  return <Main data={data} />;
}
