import { createContext, useState } from 'react';

const DEFAULT_THEME = 'light';

const initialState = {
    theme: DEFAULT_THEME,
    changeTheme: () => {}
}

export const ThemeContext = createContext(initialState);

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    const changeTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
