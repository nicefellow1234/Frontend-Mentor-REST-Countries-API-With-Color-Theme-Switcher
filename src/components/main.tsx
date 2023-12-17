"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { Country } from "@/types/Country";
import Header from "@/components/header";
import { useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";

export default function Main({ data }: { data: Country[] }) {
  const { themeMode, setThemeMode } = useContext(GlobalContext);

  return (
    <main>
      <div className={`${themeMode} text-[var(--text-color)]`}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <div className="bg-[var(--background-color)] shadow-[inset_0_3px_5px_0_rgb(0_0_0_/_0.05)] p-3">
          <div className="container mx-auto max-w-7xl px-3 md:px-10">
            <div className="mt-8 block md:flex items-center justify-between">
              <div className="bg-[var(--header-bg-color)] drop-shadow rounded-md flex items-center w-full md:w-1/3">
                <div className="w-[18px] my-4 ml-8 mr-0 text-[var(--search-input-color)]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="text-[13px] md:text-[15px] font-semibold w-full">
                  <input
                    className="p-4 placeholder:text-[var(--search-input-color)] text-[var(--text-color)] bg-[var(--header-bg-color)] w-full hover:outline-none focus:outline-none rounded-r-md"
                    type="text"
                    placeholder="Search for a country..."
                  />
                </div>
              </div>
              <div className="relative group hover:cursor-pointer mt-4 md:mt-0 w-1/2 md:w-auto">
                <div className="bg-[var(--header-bg-color)] drop-shadow rounded-md flex items-center justify-between p-4 px-6 mb-1">
                  <div className="text-[12px] md:text-[15px] font-medium mr-5">
                    Filter by Region
                  </div>
                  <div className="w-[10px] md:w-[13px]">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
                <div className="absolute hidden group-hover:flex w-full z-10 text-[15px] bg-[var(--header-bg-color)] drop-shadow rounded-md flex-col p-4 px-6 gap-y-1">
                  <div>Africa</div>
                  <div>America</div>
                  <div>Asia</div>
                  <div>Europe</div>
                  <div>Oceania</div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 md:gap-14 rounded-md">
              {data.map((country, key: number) => (
                <Link key={key} href={"/viewCountry/" + country.alpha3Code}>
                  <div className="bg-[var(--header-bg-color)] hover:cursor-pointer drop-shadow-md rounded-md">
                    <div>
                      <img
                        className="aspect-video rounded-t-md w-full"
                        src={country.flags.png}
                        alt={country.name + " flag"}
                      />
                    </div>
                    <div className="p-6 pb-7">
                      <div className="text-[17px] font-extrabold mb-4">
                        {country.name}
                      </div>
                      <div className="text-[14px]">
                        <div>
                          <span className="font-semibold mr-1">
                            Population:
                          </span>
                          {country.population.toLocaleString("en-US")}
                        </div>
                        <div>
                          <span className="font-semibold mr-1">Region:</span>
                          {country.region}
                        </div>
                        <div>
                          <span className="font-semibold mr-1">Capital:</span>
                          {country.capital}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
