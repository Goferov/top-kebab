import React from 'react';

function Header() {
    return (
        <header style={{ backgroundColor: '#333', color: '#fff', padding: '1rem' }}>
            <h1>Moja Strona</h1>

            <nav>
                <a href="/" style={{ color: '#fff', marginRight: '1rem' }}>
                    Strona główna
                </a>
                <a href="/about" style={{ color: '#fff' }}>
                    O nas
                </a>
            </nav>
        </header>
    );
}

export default Header;
