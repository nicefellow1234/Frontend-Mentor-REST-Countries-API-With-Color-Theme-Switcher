"use client";
import Header from "@/components/header";
import { GlobalContext } from "@/context/GlobalContext";
import { useContext } from "react";

export default function ViewCountry({
  params
}: {
  params: { countryId: string };
}) {
  const { themeMode, setThemeMode } = useContext(GlobalContext);
  return (
    <div className={`${themeMode} text-[var(--text-color)]`}>
      <Header themeMode={themeMode} setThemeMode={setThemeMode} />
      {params.countryId}
    </div>
  );
}
