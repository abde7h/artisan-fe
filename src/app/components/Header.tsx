"use client";

import Spinner from "./Spinner";
import Link from "next/link";
import useSession from "@/lib/useSession";
import useStore from "@/store";
import { logoutUser } from "@/lib/api-requests";
import { useRouter } from "next/navigation";

const Header = () => {
    const store = useStore();
    const user = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        store.setRequestLoading(true);
        try {
            await logoutUser();
        } catch (error) {
        } finally {
            store.reset();
            router.push("/login");
        }
    };

    return (
        <>
            <header className="h-20 w-full absolute">
                <nav className="h-full flex justify-between container items-center">
                    <div>
                        <Link href="/" className="text-primario text-4xl font-semibold">
                            Artisan
                        </Link>
                    </div>
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link href="/" className="text-ct-dark-600">
                                Home
                            </Link>
                        </li>
                        {!user && (
                            <>
                                <li>
                                    <Link href="/register" className="text-ct-dark-600">
                                        Register
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="text-ct-dark-600">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        {user && (
                            <>
                                <li>
                                    <Link href="/profile" className="text-ct-dark-600">
                                        Profile
                                    </Link>
                                </li>
                                <li className="cursor-pointer" onClick={handleLogout}>
                                    Logout
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <div className="pt-4 pl-2 bg-ct-blue-600 fixed">
                {store.requestLoading && <Spinner color="text-ct-yellow-600" />}
            </div>
        </>
    );
};

export default Header;
