import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    boxColor: string;
    accentColor: string;
    focusColor: string;
    red: string;
    green: string;
    greyColor: string;
  }
}
