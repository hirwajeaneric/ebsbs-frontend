export default function Footer() {
    return (
        <footer className="bg-background">
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="flex justify-center sm:justify-start">
                        <span className="text-2xl font-bold sm:text-3xl flex items-center flex-col gap-2">
                            <img src="https://cpts-nk.org/wp-content/uploads/2024/06/CPTS-NK-logo.png" alt="logo" className="h-20 w-auto" />
                            {/* <span className="">C.P.T.S</span> */}
                        </span>
                    </div>

                    <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
                        Copyright &copy; {new Date().getFullYear()}. All rights reserved C.P.T.S.
                    </p>
                </div>
            </div>
        </footer>
    )
}
