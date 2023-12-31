export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    white: string;
    black: string;
    grey0: string;
    grey1: string;
    grey2: string;
    grey3: string;
    grey4: string;
    grey5: string;
    greyOutline: string;
    searchBg: string;
    success: string;
    error: string;
    warning: string;
    divider: string;
    platform: {
      ios: {
        primary: string;
        secondary: string;
        grey: string;
        searchBg: string;
        success: string;
        error: string;
        warning: string;
      };
      android: {
        // Same as ios
      };
      web: {
        // Same as ios
      };
    };
  };
}
