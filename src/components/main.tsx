import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import {
  faMagnifyingGlass,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import { Country } from "@/types/Country";

export default function Main({ data }: { data: Country[] }) {
  return (
    <main>
      <div className="">
        <div className="w-full py-5 shadow-md mb-1">
          <div className="container mx-auto max-w-7xl px-10">
            <div className="flex items-center justify-between">
              <div className="w-full text-[20px] font-extrabold">
                Where in the world?
              </div>
              <div className="flex justify-center items-center hover:cursor-pointer">
                <div className="w-[15px] mr-2 rotate-[-20deg]">
                  <FontAwesomeIcon icon={faMoon} />
                </div>
                <div className="w-max text-[15px] font-semibold">Dark Mode</div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[var(--very-light-gray)] p-3">
          <div className="container mx-auto max-w-7xl px-10">
            <div className="mt-8 flex items-center justify-between">
              <div className="bg-white drop-shadow rounded flex items-center w-1/3">
                <div className="w-[18px] my-4 ml-8 mr-0 text-[var(--dark-gray)]">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
                <div className="text-[15px] font-semibold w-full">
                  <input
                    className="p-4 w-full hover:outline-none focus:outline-none"
                    type="text"
                    placeholder="Search for a country..."
                  />
                </div>
              </div>
              <div className="relative group hover:cursor-pointer w-1/6">
                <div className="bg-white drop-shadow rounded flex items-center justify-between p-4 px-6 mb-1">
                  <div className="text-[15px] font-medium">
                    Filter by Region
                  </div>
                  <div className="w-[13px]">
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                </div>
                <div className="absolute hidden group-hover:flex w-full z-10 text-[15px] bg-white drop-shadow rounded flex-col p-4 px-6 gap-y-1">
                  <div>Africa</div>
                  <div>America</div>
                  <div>Asia</div>
                  <div>Europe</div>
                  <div>Oceania</div>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-4 gap-14 rounded-md">
              {data.map((country, key: number) => (
                <div
                  className="bg-white hover:cursor-pointer drop-shadow-md rounded"
                  key={key}
                >
                  <div>
                    <img
                      className="aspect-video rounded-t-md"
                      src={country.flags.png}
                    />
                  </div>
                  <div className="p-6 pb-7">
                    <div className="text-[17px] font-extrabold mb-4">
                      {country.name}
                    </div>
                    <div className="text-[14px]">
                      <div>
                        <span className="font-semibold mr-1">Population:</span>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
