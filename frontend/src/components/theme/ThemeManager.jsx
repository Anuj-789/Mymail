import { useEffect } from "react";

import { useSelector } from "react-redux";

import {
  selectSettingsTheme,
} from "@/features/settings2/settings2Selectors";


// ============================================================
// THEME MANAGER
// ============================================================

const ThemeManager = () => {

  const theme = useSelector(
    selectSettingsTheme,
  );


  // ==========================================================
  // APPLY THEME
  // ==========================================================

  useEffect(() => {

    const selectedTheme =
      theme || "dark";


    document.documentElement.setAttribute(
      "data-theme",
      selectedTheme,
    );


  }, [theme]);


  return null;
};


export default ThemeManager;