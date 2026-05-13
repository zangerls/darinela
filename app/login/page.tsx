import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Countdown } from "./countdown";

const PASSWORD = "darinela";
const COOKIE = "auth";
const LAUNCH_DATE = "2026-05-18T00:00:00Z";

async function login(formData: FormData) {
    "use server";
    if (formData.get("password") === PASSWORD) {
        (await cookies()).set(COOKIE, PASSWORD, { httpOnly: true, path: "/" });
        redirect("/");
    }
}

export default function LoginPage() {
    return (
        <div className="min-h-dvh bg-background text-foreground flex items-center justify-center px-6 selection:bg-black selection:text-white">
            <div className="w-full max-w-sm flex flex-col items-center gap-10">
                <div className="flex flex-col items-center gap-3 text-center">
                    <h1 className="font-heading text-3xl tracking-tight">
                        Darinela Vangelova
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Launching in
                    </p>
                    <Countdown target={LAUNCH_DATE} />
                </div>

                <form action={login} className="w-full flex flex-col gap-3">
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoFocus
                        className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                    <Button type="submit" className="w-full">
                        Enter
                    </Button>
                </form>
            </div>
        </div>
    );
}
