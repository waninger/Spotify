import { cookies } from "next/headers";
import { cache } from "react";

type Params = Record< string, string | string[] | undefined>;
type CookieMap = Record<string, string>
/** 
 * Request Context 
 * Holds per-request data (cookies, route-params, etc)
 */
class RequestContext {
  private cookies: CookieMap;
  private params: Params;
  private value: number;
  constructor() {
    this.params = {};
    this.cookies = {};
    this.value = 0;
  }

  setParams(paramsKey: RequestContext["params"]) {
    if (Object.keys(this.params).length === 0) {
      this.params = paramsKey;
    }
  }
  getParams(): Params{
    return this.params;
  }

  setCookies(cookies: CookieMap) {
    if (Object.keys(this.cookies).length === 0) {
      this.cookies = cookies;
    }
  }

  getCookies(): CookieMap{
    return this.cookies;
  }
  
  setValue(value: number){
    this.value = value
  }

  getValue(): number {
    return this.value;
  }
}

const createContext = cache(async (): Promise<RequestContext> => {
    const context = new RequestContext()
    const cookies = await normalizeCookies()
    context.setCookies(cookies)
    return context;
});

export const getRequestContext = async (value?: number) =>{
  const context = await createContext()
  if(value !== undefined) context.setValue(value)
  return context;
}

export async function normalizeCookies() {
  const cookieStore = await cookies();
  const allCookies: CookieMap = {};
  for (const cookie of cookieStore.getAll()) {
    allCookies[cookie.name] = cookie.value;
  }
  return allCookies;
}