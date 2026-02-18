import { Theme } from "@/app/types/theme";
import ThemeToggleClient from "./themeToggleClient";
import { cookies } from "next/headers";
import { ReactElement } from "react";

export default async function ThemeToggle():Promise<ReactElement<unknown,string>> {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme")?.value || "system";

  return await (<ThemeToggleClient theme={theme as Theme} />);
}

// export default async function ThemeToggle():Promise<ReactElement<unknown,string>> {
//   return (
//     <ThemeToggleClient />
//   );
// }