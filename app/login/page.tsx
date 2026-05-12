"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const PASSWORD = "darinela";
const COOKIE = "auth";

async function login(formData: FormData) {
    "use server";
    if (formData.get("password") === PASSWORD) {
        (await cookies()).set(COOKIE, PASSWORD, { httpOnly: true, path: "/" });
        redirect("/");
    }
}

export default async function LoginPage() {
    return (
        <html lang="en">
            <body>
                <form
                    action={login}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100dvh",
                        gap: 12,
                    }}
                >
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoFocus
                        style={{ padding: "8px 12px", fontSize: 16 }}
                    />
                    <button
                        type="submit"
                        style={{ padding: "8px 24px", fontSize: 16 }}
                    >
                        Enter
                    </button>
                </form>
            </body>
        </html>
    );
}
