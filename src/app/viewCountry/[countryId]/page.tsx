import CountryDetail from "@/components/country-detail";
import { Country } from "@/types/Country";

export default function ViewCountry({
  params
}: {
  params: { countryId: string };
}) {
  const data = require("../../data.json");
  const country = data.find((c: Country) => c.alpha3Code == params.countryId);
  const borderCountries =
    country && country.borders
      ? data
          .filter(({ alpha3Code }: { alpha3Code: string }) =>
            country.borders.includes(alpha3Code)
          )
          .map((c: Country) => ({
            name: c.name,
            alpha3Code: c.alpha3Code
          }))
      : [];
  return <CountryDetail country={country} borderCountries={borderCountries} />;
}
