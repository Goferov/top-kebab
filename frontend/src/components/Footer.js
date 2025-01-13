import React from 'react';

function Footer() {
    return (
        <footer className='text-white'>
            <div className="bg-brandRed py-5">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                        <a href="/" title="Home" className="mb-5 block"><img src="/logo-white.svg" alt="TopKebab logo"/></a>
                        <p className="max-w-72">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus fermentum vitae dolor ut cursus. Phasellus tempor congue nunc. Nullam eget vestibulum nibh.
                        </p>
                    </div>
                    <div>
                        <h6 className="uppercase mb-3 font-bold ">Kontakt</h6>
                        <ul className="list-none">
                            <li>
                                <a href="tel:+48514343443" className="hover:text-red-400">
                                    <i className="fa-solid fa-phone-flip me-2"></i> +48 514 343 443
                                </a>
                            </li>
                            <li>
                                <a href="mailto:redakcja@topkebab.pl" className="hover:text-red-400">
                                    <i className="fa-solid fa-envelope me-2"></i> redakcja@topkebab.pl
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h6 className="uppercase mb-3 font-bold ">Menu</h6>
                        <ul className="list-none">
                            <li className="hover:text-red-400"><a href="#">Home</a></li>
                            <li className="hover:text-red-400"><a href="/restaurant">Restauracje</a></li>
                            <li className="hover:text-red-400"><a href="/contact">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='bg-brandBlack'>
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 py-1 text-xs text-center md:text-start">
                    <div>
                        TOPKEBAB &copy; {new Date().getFullYear()} Wszelkie prawa zastrzeżone.
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="md:text-end">
                        Realizacja: Marcin Godfryd
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
