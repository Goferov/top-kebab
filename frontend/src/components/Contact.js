import React from 'react';

const Contact = () => {
    return (
        <section className="container my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <h1 className="font-semibold text-2xl mb-3">Kontakt</h1>
                    <img
                        src="/logo.svg"
                        className="mb-10"
                        alt="TopKebab logo"
                    />
                    <div>
                        <a href="tel:+48514343443" className="block me-1 text-2xl mb-3">
                            <i className="fa-solid fa-phone-flip me-3 text-2xl"></i>
                            <span>+48 514 343 443</span>
                        </a>
                        <a href="mailto:redakcja@topkebab.pl" className="block text-2xl">
                            <i className="fa-solid fa-envelope me-3 text-2xl"></i>
                            <span>redakcja@topkebab.pl</span>
                        </a>
                    </div>
                </div>
                <div className="text-justify">
                    <h2 className="font-semibold text-2xl mb-3">O nas</h2>
                    <div className="text-lg">
                        <p className="mb-2">
                            Witaj w TopKebab – Twoim przewodniku po świecie kebabów! Nasza strona
                            powstała z myślą o wszystkich miłośnikach tego pysznego dania.
                            Jesteśmy społecznością, która dzieli się autentycznymi recenzjami i
                            ocenami kebabów z różnych miejsc w Polsce.
                        </p>
                        <p className="mb-2">
                            TopKebab to nie tylko portal, to miejsce spotkań dla smakoszy kebaba.
                            Administratorzy TopKebab to zespół pasjonatów, którzy dbają o to, aby
                            każdy kebab, który znajduje się na naszej stronie, był godny uwagi.
                            To dzięki nim, możesz odkrywać, oceniać i komentować kebaby, które
                            testujesz.
                        </p>
                        <p className="mb-2">
                            Dołącz do nas i pomóż budować największą bazę wiedzy o kebabach w
                            kraju. Twoje opinie pomogą innym znaleźć kebaby, które zasługują na
                            miano najlepszych. Czy jesteś gotowy, aby zostać ekspertem od
                            kebabów? Rozpocznij swoją przygodę z TopKebab już dzisiaj!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
