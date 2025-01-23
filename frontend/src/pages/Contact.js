import React from 'react';

const Contact = () => {
    return (
        <section className="container my-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                    <h1 className="font-semibold text-2xl mb-3">Contact</h1>
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
                        <a href="mailto:office@topkebab.pl" className="block text-2xl">
                            <i className="fa-solid fa-envelope me-3 text-2xl"></i>
                            <span>office@topkebab.pl</span>
                        </a>
                    </div>
                </div>
                <div className="text-justify">
                    <h2 className="font-semibold text-2xl mb-3">O nas</h2>
                    <div className="text-lg">
                        <p className="mb-2">
                            Welcome to TopKebab - your guide to the world of kebabs! Our website
                            was created with all lovers of this delicious dish in mind.
                            We are a community that shares authentic reviews and
                            ratings of kebabs from different places in Poland.
                        </p>
                        <p className="mb-2">
                            TopKebab is not just a portal, it is a meeting place for gourmet kebabs.
                            The administrators of TopKebab are a team of passionate people who make sure that
                            every kebab featured on our site is worthy of attention.
                            Thanks to them, you can discover, rate and comment on the kebabs you
                            you test.
                        </p>
                        <p className="mb-2">
                            Join us and help build the largest kebab knowledge base in the
                            country. Your feedback will help others find the kebabs that deserve to be
                            the best. Are you ready to become an expert on
                            kebabs? Start your adventure with TopKebab today!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
