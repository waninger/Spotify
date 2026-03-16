import "./styles/globals.scss";
import { Providers } from "@/providers/providers";
import { getRequestContext } from "@/utils/requestContext";
import { Theme } from "@/types/theme";
import { kanit } from "./styles/fonts";
import Header from "@/components/shared/header/header";
import { parseThemeSettingsCookie, toThemeCssVariables } from "@/utils/themeSettings";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const context = await getRequestContext()
  const theme = context.getCookies().theme ?? "system" as Theme
  const themeSettings = parseThemeSettingsCookie(context.getCookies()["theme-settings"]);
  const cssVars = toThemeCssVariables(themeSettings);

  return (
    <html
      lang="en"
      data-theme={theme}
      className={kanit.variable}
      style={cssVars as React.CSSProperties}
    >
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
