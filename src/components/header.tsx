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
      <div className="w-full py-5">
        <div className="container mx-auto max-w-7xl px-3 md:px-10">
          <div className="flex items-center justify-between">
            <div className="w-full text-[14px] md:text-[25px] font-extrabold">
              Where in the world?
            </div>
            <div
              className="flex justify-center items-center hover:cursor-pointer"
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
