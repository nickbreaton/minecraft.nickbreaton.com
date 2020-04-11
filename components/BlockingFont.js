import Head from "next/head";

const shorten = (text) => text.replace(/\n/g, "");

const BlockingFont = ({ family, href, format }) => {
    const style = `
        html.loading-${family} {
            visibility: hidden;
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
        {
            const font = new FontFace('${family}', 'url("${href}")');
            document.documentElement.classList.add('loading-${family}');
            document.fonts.add(font);
            font.loaded.then(() => document.documentElement.classList.remove('loading-${family}'));
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
            <style dangerouslySetInnerHTML={{ __html: shorten(style) }} />
            <script dangerouslySetInnerHTML={{ __html: shorten(script) }} />
        </Head>
    );
};

export default BlockingFont;
