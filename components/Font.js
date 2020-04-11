import Head from "next/head";

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
        document.fonts.load('1em "${family}"');
        document.fonts.ready.then(() => {
            document.documentElement.className += " fonts-loaded";
        });
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
            <style>{style.replace(/\n/g, "")}</style>
            <script dangerouslySetInnerHTML={{ __html: script.replace(/\n/g, "") }} />
        </Head>
    );
};

export default Font;
