import { getIronSession, IronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface SessionData {
  pid: string;
  trxId: string;
}

export const sessionOptions: SessionOptions = {
  password: `${process.env.NEXT_PUBLIC_IRON_SESSION_PASSWORD}`,
  cookieName: "pid-and-trxid",
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: process.env.NODE_ENV === "production",
    //   secure: true,
  },
};
export async function getOrderDataCookie() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  //   if (!session.isLoggedIn) {
  //     session.isLoggedIn = defaultSession.isLoggedIn;
  //     session.username = defaultSession.username;
  //   }

  //   if (shouldSleep) {
  //     // simulate looking up the user in db
  //     await sleep(250);
  //   }

  return session;
}

export async function setOrderDataCookie(pid: string, trxId: string) {
  "use server";

  const session = await getOrderDataCookie();

  session.pid = pid;
  session.trxId = trxId;
  await session.save();
}
