export default function Banner() {
    return (
        <section className="relative bg-[url(https://cpts-nk.org/wp-content/uploads/2024/06/Kin-marche-et-ces-agents-ont-dit-oui-a-lappel-de-Sauver-des-vies.jpg)] bg-cover bg-center bg-no-repeat">
            <div className="absolute inset-0 bg-zinc-900/75 from-zinc-900/95 to-zinc-900/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
                <div className="max-w-xl flex flex-col items-start text-center ltr:sm:text-left rtl:sm:text-right">
                    <h1 className="text-3xl text-left font-extrabold text-white sm:text-5xl">
                        Electronic Blood Storage and Distribution System
                    </h1>
                    <p className="mt-4 max-w-lg text-left text-white sm:text-xl/relaxed">
                        A platform to connect hospitals to C.P.T.S and vice-versa and to speed up the blood storage and distrubution procedure.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4 text-center">
                        <a href="/create-account" className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto">
                            Register Your Hospital
                        </a>

                        <a href="/hauth/signin" className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                            Login To Your Hospital
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
