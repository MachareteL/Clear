function Footer() {
    return (<footer
        className="bg-neutral-100 text-center dark:bg-neutral-600 lg:text-left w-full">
        <div className="container p-6 text-neutral-800 dark:text-neutral-200 m-auto">
            <div className="grid gap-4 lg:grid-cols-2">
                <div className="mb-6 md:mb-0">
                    <h5 className="mb-2 font-medium uppercase">Footer text</h5>

                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                        atque ea quis molestias. Fugiat pariatur maxime quis culpa
                        corporis vitae repudiandae aliquam voluptatem veniam, est atque
                        cumque eum delectus sint!
                    </p>
                </div>

                <div className="mb-6 md:mb-0">
                    <h5 className="mb-2 font-medium uppercase">Footer text</h5>

                    <p className="mb-4">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                        atque ea quis molestias. Fugiat pariatur maxime quis culpa
                        corporis vitae repudiandae aliquam voluptatem veniam, est atque
                        cumque eum delectus sint!
                    </p>
                </div>
            </div>
        </div>

        <div
            className="bg-neutral-200 p-4 text-center text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
            © 2023 Copyright: Clear <a href="https://www.github.com/machareteL" target={'_blank'}>Macharete</a>
            
        </div>
    </footer>
    );
}

export default Footer;