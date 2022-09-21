import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme, setLang } from "../../redux/TypeSlice/TypeSlice";
import { BsSun } from "react-icons/bs";
import { BsMoonStars } from "react-icons/bs";

function Header() {
  const Theme = useSelector((state) => state.typing.theme);
  const typingstart = useSelector((state) => state.typing.typingstart);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (Theme === "dark") {
      document.documentElement.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      // document.body.style.background = '#151515';
    } else {
      document.documentElement.classList.remove("dark");
      window.localStorage.setItem("theme", "light");
      // document.body.style.background = '#9b89b3'
    }
  }, [Theme]);

  const handleThemeSwitch = () => {
    dispatch(changeTheme(Theme === "dark" ? "light" : "dark"));
  };
  

  return (
    <div className="w-full flex flex-col p-8 dark:bg-neutral-800 dark:bg-opacity-95" >
         <div className="flex justify-around">
            <div></div>
            <h1 className="text-4xl font-bold dark:text-white ">Typing Speed Test</h1>
            <div className="flex flex-col">
              <button
                type="button"
                onClick={handleThemeSwitch}
                className="p-2 dark:text-white hover:-translate-y-0.5 transition motion-reduce:hover:translate-y-0"
              >
                {Theme === "dark" ? (
                  <BsMoonStars size={25} />
                ) : (
                  <BsSun size={25} />
                )}
              </button>
              <div>
              <select className="dark:text-black rounded-xl p-1 border border-black border-solid" name="lang" id="lang" 
              onChange={(e) => dispatch(setLang(e.target.value))}
              disabled={typingstart}
               >
                 <option value="turkish">Türkçe</option>
                  <option value="english">English</option>
             </select>
              </div>
            </div>
            </div>
    </div>
  )
}

export default Header