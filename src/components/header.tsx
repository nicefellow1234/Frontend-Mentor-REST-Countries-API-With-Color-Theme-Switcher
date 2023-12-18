import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as faMoonRegular } from "@fortawesome/free-regular-svg-icons";
import { faMoon as faMoonSolid } from "@fortawesome/free-solid-svg-icons";
import { ThemeMode } from "@/context/GlobalContext";
import { LIGHT_MODE, DARK_MODE } from "@/context/GlobalContext";

interface HeaderProps {
  themeMode: string;
  setThemeMode: (mode: ThemeMode) => void;
}

export default function Header({ themeMode, setThemeMode }: HeaderProps) {
  const toggleTheme = () => {
    const newMode = themeMode === LIGHT_MODE ? DARK_MODE : LIGHT_MODE;
    setThemeMode(newMode);
  };

  return (
    <div className="bg-[var(--header-bg-color)]">
      <div className="w-full">
        <div className="container mx-auto max-w-7xl px-3 md:px-10">
          <div className="flex items-center justify-between">
            <div className="w-full text-[17px] md:text-[25px] font-extrabold py-5">
              Where in the world?
            </div>
            <div
              className="flex justify-center items-center hover:cursor-pointer p-2 px-4 rounded-lg hover:shadow-[0px_0px_5px_0px_rgba(0,0,0,0.3)]"
              onClick={() => toggleTheme()}
            >
              <div className="w-[10px] md:w-[15px] mr-2 rotate-[-20deg]">
                <FontAwesomeIcon
                  icon={themeMode == LIGHT_MODE ? faMoonRegular : faMoonSolid}
                />
              </div>
              <div className="w-max text-[13px] md:text-[17px] font-semibold">
                {themeMode == LIGHT_MODE ? "Dark Mode" : "Light Mode"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
