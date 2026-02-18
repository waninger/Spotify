import "./styles/globals.scss";
import { Providers } from "../providers/providers";
import { getRequestContext } from "../utils/requestContext";
import { Theme } from "./types/theme";
import { kanit } from "./styles/fonts";
import Header from "../components/header/header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const context = await getRequestContext()
  const theme = context.getCookies().theme ?? "system" as Theme

  return (
    <html lang="en" data-theme={theme} className={kanit.variable}>
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
