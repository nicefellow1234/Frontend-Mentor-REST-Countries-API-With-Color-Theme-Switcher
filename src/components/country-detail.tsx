"use client";
import { useContext } from "react";
import Link from "next/link";
import Header from "@/components/header";
import { GlobalContext } from "@/context/GlobalContext";
import { Country } from "@/types/Country";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CountryDetail({
  country,
  borderCountries
}: {
  country: Country;
  borderCountries: Array<{
    name: string;
    alpha3Code: string;
  }>;
}) {
  const { themeMode, setThemeMode } = useContext(GlobalContext);
  return (
    <main>
      <div className={`${themeMode} text-[var(--text-color)]`}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <div className="bg-[var(--background-color)] shadow-[inset_0_3px_5px_0_rgb(0_0_0_/_0.05)] p-3 md:min-h-screen">
          <div className="container mx-auto max-w-7xl px-3 md:px-10 p-5">
            <Link href={"/"}>
              <div className="inline-block bg-[var(--header-bg-color)] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.3)] mt-2 md:mt-12 p-2 px-8 rounded-md hover:cursor-pointer">
                <div className="flex items-center justify-center">
                  <div className="mr-4">
                    <FontAwesomeIcon icon={faArrowLeftLong} />
                  </div>
                  <div>Back</div>
                </div>
              </div>
            </Link>
            <div className="mt-8 md:mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div>
                  <img className="w-full" src={country.flags.svg} />
                </div>
                <div className="py-8 md:px-20 pr-0">
                  <div className="text-[25px] md:text-[30px] font-extrabold">
                    {country.name}
                  </div>
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 md:gap-x-4">
                    <div>
                      <div className="mb-2">
                        <span className="font-bold mr-2">Native Name:</span>
                        {country.nativeName}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold mr-2">Population:</span>
                        {country.population.toLocaleString("en-US")}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold mr-2">Region:</span>
                        {country.region}
                      </div>
                      <div className="mb-2">
                        <span className="font-bold mr-2">Sub Region:</span>
                        {country.subregion}
                      </div>
                      {country.capital ? (
                        <div className="mb-2">
                          <span className="font-bold mr-2">Capital:</span>
                          {country.capital}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      <div className="mb-2">
                        <span className="font-bold mr-2">
                          Top Level Domain:
                        </span>
                        {country.topLevelDomain}
                      </div>
                      {country.currencies?.length ? (
                        <div className="mb-2">
                          <span className="font-bold mr-2">Currencies:</span>
                          {country.currencies
                            .map(({ name }) => name)
                            .join(", ")}
                        </div>
                      ) : null}
                      <div className="mb-2">
                        <span className="font-bold mr-2">Languages:</span>
                        {country.languages.map(({ name }) => name).join(", ")}
                      </div>
                    </div>
                  </div>
                  {borderCountries.length ? (
                    <div className="mt-8 md:mt-14">
                      <span className="font-bold mr-3">Border Countries:</span>
                      {borderCountries.map((borderCountry) => (
                        <Link
                          key={borderCountry.alpha3Code}
                          href={"/viewCountry/" + borderCountry.alpha3Code}
                        >
                          <div className="inline-block bg-[var(--header-bg-color)] shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)] p-2 px-4 rounded-md hover:cursor-pointer mr-2 mb-2">
                            {borderCountry.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
