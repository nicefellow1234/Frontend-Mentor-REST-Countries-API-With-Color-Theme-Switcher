"use server";
import Homepage from "@/components/homepage";

export default async function Home() {
  const data = require("./data.json");
  return <Homepage data={data} />;
}
