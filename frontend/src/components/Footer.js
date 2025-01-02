import React from 'react';

function Footer() {
    return (
        <footer style={{ backgroundColor: '#999', color: '#000', padding: '1rem' }}>
            <p style={{ margin: 0 }}>
                &copy; {new Date().getFullYear()} Moja Strona. Wszelkie prawa zastrzeżone.
            </p>
        </footer>
    );
}

export default Footer;
