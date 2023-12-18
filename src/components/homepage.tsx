"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { Country } from "@/types/Country";
import { Pagination } from "@/types/Pagination";
import Header from "@/components/header";
import { ChangeEvent, useContext, useState } from "react";
import { GlobalContext } from "@/context/GlobalContext";
import { DataFilters } from "@/types/DataFilters";

export default function Homepage({ data }: { data: Country[] }) {
  // Theme Mode
  const { themeMode, setThemeMode } = useContext(GlobalContext);

  // Data
  const NAME_FILTER_FIELD: keyof DataFilters = "name";
  const REGION_FILTER_FIELD: keyof DataFilters = "region";
  const regions: string[] = ["Africa", "America", "Asia", "Europe", "Oceania"];
  const defaultDataFilters: DataFilters = {
    name: "",
    region: ""
  };
  const [dataFilters, setDataFilters] = useState(defaultDataFilters);

  // Pagination
  const INITIAL_PAGE = 1;
  const RECORDS_PER_PAGE = 16;
  const paginateData = (pageNumber: number, allCountries: Country[] = data) => {
    let startIndex = (pageNumber - 1) * RECORDS_PER_PAGE;
    let paginatedData = allCountries.slice(
      startIndex,
      startIndex + RECORDS_PER_PAGE
    );
    return paginatedData;
  };
  const createPaginationInfo = (
    currentPage: number = INITIAL_PAGE,
    allCount: number = data.length
  ): Pagination => {
    let totalPages = Math.ceil(allCount / RECORDS_PER_PAGE);
    let totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    let pageIndex = totalPagesArray.indexOf(currentPage);
    let pages =
      pageIndex <= 1
        ? totalPagesArray.slice(0, 5)
        : pageIndex >= totalPages - 2
        ? totalPagesArray.slice(-5)
        : totalPagesArray.slice(Math.max(0, pageIndex - 2), pageIndex + 3);
    return { currentPage, totalPages, pages };
  };
  const defaultPaginationInfo = createPaginationInfo();
  const [paginationInfo, setPaginationInfo] = useState<Pagination>(
    defaultPaginationInfo
  );
  const [countriesData, setCountriesData] = useState(
    paginateData(defaultPaginationInfo.currentPage)
  );
  const handlePagination = (pageNumber: number) => {
    let calculatedPaginationInfo = createPaginationInfo(
      pageNumber,
      filteredCountriesData.length ? filteredCountriesData.length : data.length
    );
    setPaginationInfo(calculatedPaginationInfo);
    let paginatedData = paginateData(
      pageNumber,
      filteredCountriesData.length ? filteredCountriesData : data
    );
    setCountriesData(paginatedData);
  };

  // Data Filteration
  const [filteredCountriesData, setFilteredCountriesData] = useState<Country[]>(
    []
  );
  const filterCountriesData = (updatedDataFilters: DataFilters) => {
    var updatedCountriesData: Country[] = data;
    for (const filter in dataFilters) {
      updatedCountriesData = updatedCountriesData.filter((c: Country) =>
        c[filter as keyof DataFilters]
          .toLowerCase()
          .includes(
            updatedDataFilters[filter as keyof DataFilters].toLowerCase()
          )
      );
    }
    setFilteredCountriesData(updatedCountriesData);
    let paginatedData = paginateData(INITIAL_PAGE, updatedCountriesData);
    setCountriesData(paginatedData);
    let calculatedPaginationInfo = createPaginationInfo(
      INITIAL_PAGE,
      updatedCountriesData.length
    );
    setPaginationInfo(calculatedPaginationInfo);
  };
  const updateDataFilter = (field: keyof DataFilters, value: string) => {
    let updatedDataFilters = { ...dataFilters };
    if (
      (field == REGION_FILTER_FIELD && value != dataFilters[field]) ||
      field == NAME_FILTER_FIELD
    ) {
      updatedDataFilters[field] = value;
    } else {
      updatedDataFilters[field] = "";
    }
    setDataFilters(updatedDataFilters);
    return updatedDataFilters;
  };
  const handleNameFilter = (e: ChangeEvent<EventTarget>) => {
    let target = e.target as HTMLInputElement;
    let updatedDataFilters = updateDataFilter(NAME_FILTER_FIELD, target.value);
    filterCountriesData(updatedDataFilters);
  };
  const handleRegionFilter = (region: string) => {
    let updatedDataFilters = updateDataFilter(REGION_FILTER_FIELD, region);
    filterCountriesData(updatedDataFilters);
  };

  return (
    <main>
      <div className={`${themeMode} text-[var(--text-color)]`}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <div className="bg-[var(--background-color)] shadow-[inset_0_3px_5px_0_rgb(0_0_0_/_0.05)] p-3 min-h-screen">
          <div className="container mx-auto max-w-7xl px-3 md:px-10">
            <div className="mt-8 block md:flex items-center justify-between">
              <div className="bg-[var(--header-bg-color)] drop-shadow rounded-md flex items-center w-full md:w-1/3 hover:shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)]">
                <div className="w-[18px] my-4 ml-8 mr-0 text-[var(--search-input-color)]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="text-[13px] md:text-[15px] font-semibold w-full">
                  <input
                    className="p-4 placeholder:text-[var(--search-input-color)] text-[var(--text-color)] bg-[var(--header-bg-color)] w-full hover:outline-none focus:outline-none rounded-r-md"
                    type="text"
                    placeholder="Search for a country..."
                    onInput={(e) => handleNameFilter(e)}
                  />
                </div>
              </div>
              <div className="relative group hover:cursor-pointer mt-4 md:mt-0 w-1/2 md:w-auto group">
                <div className="bg-[var(--header-bg-color)] drop-shadow rounded-md flex items-center justify-between p-4 px-6 mb-1 group-hover:shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)]">
                  <div className="text-[12px] md:text-[15px] font-medium mr-5">
                    Filter by Region
                  </div>
                  <div className="w-[10px] md:w-[13px]">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
                <div className="absolute hidden group-hover:flex w-full z-10 text-[15px] bg-[var(--header-bg-color)] drop-shadow rounded-md flex-col p-4 px-6 gap-y-1">
                  {regions.map((region) => (
                    <div
                      className={`hover:font-bold ${
                        dataFilters.region == region ? "font-bold" : ""
                      }`}
                      key={region}
                      onClick={() => handleRegionFilter(region)}
                    >
                      {region}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 md:gap-14 rounded-md">
              {countriesData.map((country, key: number) => (
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
            {paginationInfo.totalPages > 1 ? (
              <div className="px-3 md:px-0 mt-14 mb-6 flex justify-center items-center">
                <div className="bg-[var(--header-bg-color)] flex hover:cursor-pointer rounded-md shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)]">
                  <div
                    className="p-2 px-3 md:px-6 rounded-l-md hover:bg-pink-400 hover:text-white hover:font-semibold"
                    onClick={() =>
                      handlePagination(
                        paginationInfo.currentPage == 1
                          ? paginationInfo.currentPage
                          : paginationInfo.currentPage - 1
                      )
                    }
                  >
                    Prev
                  </div>
                  {paginationInfo.pages.map((page) => (
                    <div
                      key={page}
                      className={`p-2 border-l-[1.5px] w-[45px] md:w-[80px] text-center border-black border-opacity-30 ${
                        paginationInfo.currentPage == page
                          ? "bg-pink-400 text-white font-semibold"
                          : "hover:bg-pink-400 hover:text-white hover:font-bold"
                      }`}
                      onClick={() => handlePagination(page)}
                    >
                      {page}
                    </div>
                  ))}

                  <div
                    className="p-2 px-3 md:px-6 rounded-r-md border-l-[1.5px] border-black border-opacity-30 hover:bg-pink-400 hover:text-white hover:font-semibold"
                    onClick={() =>
                      handlePagination(
                        paginationInfo.currentPage == paginationInfo.totalPages
                          ? paginationInfo.totalPages
                          : paginationInfo.currentPage + 1
                      )
                    }
                  >
                    Next
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  );
}
