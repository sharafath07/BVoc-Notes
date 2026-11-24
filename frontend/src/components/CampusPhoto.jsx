import campus from "../assets/campus.jpg";
import campusMobile from "../assets/campus-mobile.jpg";
import campus480 from "../assets/campus-480.avif";
import campus800 from "../assets/campus-800.avif";
import campus1120 from "../assets/campus-1120.avif";
import campus1600 from "../assets/campus-1600.avif";

const avifSources = `${campus480} 480w, ${campus800} 800w, ${campus1120} 1120w, ${campus1600} 1600w`;
const jpegSources = `${campusMobile} 720w, ${campus} 1680w`;

export default function CampusPhoto({ alt, desktopWidth, priority = false }) {
    const sizes = `(max-width: 760px) calc(100vw - 2rem), ${desktopWidth}vw`;

    return (
        <picture>
            <source type="image/avif" srcSet={avifSources} sizes={sizes} />
            <img
                src={campus}
                srcSet={jpegSources}
                sizes={sizes}
                alt={alt}
                width="1680"
                height="1260"
                fetchPriority={priority ? "high" : "auto"}
                loading={priority ? "eager" : "lazy"}
            />
        </picture>
    );
}
