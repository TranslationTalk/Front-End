import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset'

const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing:border-box;
    }
    a {
        text-decoration:none;
        color: inherit;
        cursor: pointer;
    }
    ol, ul, li {
        list-style: none;
    }
    body * {  
        font-family: 'Noto Sans KR', sans-serif;
    }

    body::-webkit-scrollbar{
    width: 6px;
    }

    body::-webkit-scrollbar-thumb{
        height: 15%;
        background-color: rgba(61, 80, 255, 0.3);
        border-radius: 10px;  
    }

    body::-webkit-scrollbar-track{
        background-color: var(--white);
    }

    :root {
        /* common-color */
        --main-color: #3D51FF;
        --white: #FFFFFF;
        --light-gray: #F4F4F4;
        --gray-c4: #C4C4C4;
        --gray-bc: #BCBCBC;
        --gray: #464646;
        --light-blue: #EDF2FF;
        --dark-blue: #363842;
        --orange-red: #FF5F5F;
        
        /* common-font-size */
        --fs-12: 14px;
        --fs-14: 16px;
        --fs-16: 18px;
        --fs-18: 20px;
        --fs-20: 24px;
        --fs-24: 26px;
        --fs-28: 30px;
        --fs-32: 34px;
        --fs-36: 38px;
        @media screen and (max-width: 360px) { 
            --fs-12: 12px;
            --fs-14: 14px;
            --fs-16: 16px;
            --fs-18: 18px;
            --fs-20: 20px;
            --fs-24: 24px;
            --fs-28: 28px;
            --fs-32: 32px;
            --fs-36: 36px;
        }
    }

    /* Noto-Sans-KR 웹폰트 */
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 100;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Thin.otf) format('opentype');
    }
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 300;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff2) format('woff2'),
            url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.woff) format('woff'),
            url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Light.otf) format('opentype');
    }
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 400;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Regular.otf) format('opentype');
    }
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 500;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Medium.otf) format('opentype');
    }
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 700;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Bold.otf) format('opentype');
    }
    @font-face { 
        font-family: 'Noto Sans KR';
        font-style: normal;
        font-weight: 900;
        src: url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff2) format('woff2'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.woff) format('woff'),
        url(//fonts.gstatic.com/ea/notosanskr/v2/NotoSansKR-Black.otf) format('opentype');
    };
`

export default GlobalStyles
