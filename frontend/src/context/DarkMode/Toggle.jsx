import React from 'react';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { useThemeContext } from './ThemeContext';

const Toggle = () => {
    const { mode, toggleTheme } = useThemeContext();

    return (
      <IconButton onClick={toggleTheme} color="default">
        {mode === "light" ? <BedtimeIcon /> : <LightModeIcon />}
      </IconButton>
    );
};

export default Toggle;
