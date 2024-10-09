import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";

export default function NavBar() {
    return (
        <header className="bg-background sticky top-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <span className=" font-bold flex items-center gap-2">
                            <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" alt="logo" className="h-20 w-auto" />
                            <span className="flex flex-col">
                                <span className="text-2xl sm:text-3xl">C.P.T.S</span>
                                <span className="">Centre Provinciale de Transfusion Sanguine</span>
                            </span>
                        </span>
                    </div>
                    <nav className="flex items-center gap-4">
                        <Button variant={"link"}>
                            <NavLink
                                to={"/"}
                                type="button"
                            >
                                Home
                            </NavLink>
                        </Button>
                        <Button variant={"link"}>
                            <NavLink
                                to={"/hauth/signin"}
                                type="button"
                            >
                                Hospital Login
                            </NavLink>
                        </Button>

                        <Button variant={"default"}>
                            <NavLink
                                to={"/bauth/signin"}
                                type="button"
                            >
                                Blood Bank
                            </NavLink>
                        </Button>
                        <ModeToggle />
                    </nav>
                </div>
            </div>
        </header>
    )
}
