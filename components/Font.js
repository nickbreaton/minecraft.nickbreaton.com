import Head from "next/head";

const shorten = (text) => text.replace(/\n/g, "");

const Font = ({ family, href, format }) => {
    const style = `
        html {
            visibility: hidden;
        }
        html.fonts-loaded {
            visibility: visible;
        }
        body {
            font-family: '${family}';
        }
        @font-face {
            font-family: '${family}';
            src: url('${href}') format('${format}');
            font-weight: normal;
            font-style: normal;
            font-display: block;
        }
    `;
    const script = `
        const font = new FontFace('${family}', 'url("${href}")');
        document.fonts.add(font);
        font.loaded.then(() => document.documentElement.className += " fonts-loaded");
    `;
    return (
        <Head>
            <link
                rel="preload"
                href={href}
                as="font"
                type={`font/${format}`}
                crossorigin="anonymous"
            />
            <style>{shorten(style)}</style>
            <script dangerouslySetInnerHTML={{ __html: shorten(script) }} />
        </Head>
    );
};

export default Font;
