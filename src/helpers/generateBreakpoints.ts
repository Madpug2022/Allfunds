import { css } from 'styled-components';

// Definición de los tamaños para breakpoints
const sizes: Record<string, string> = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
    tablet: '768px',
    desktop: '1024px'
};

// Tipo para las funciones de media queries
type Media = {
    [key: string]: (...args: TemplateStringsArray[]) => ReturnType<typeof css>;
};

// Creación de la función media con reduce
const media = Object.keys(sizes).reduce<Media>((acc, label) => {
    acc[label] = (...args: TemplateStringsArray[]) => css`
            @media (max-width: ${sizes[label]}) {
                ${css(...args as [TemplateStringsArray])}
            }
        `;
    return acc;
}, {});

export default media;
