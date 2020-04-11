import Head from "next/head";

const Font = ({ family, href, format }) => {
    const style = `
        body {
            font-family: '${family}';
        }
        @font-face {
            font-family: '${family}';
            src: url('${href}') format('${format}');
            font-weight: normal;
            font-style: normal;
        }
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
        </Head>
    );
};

export default Font;
