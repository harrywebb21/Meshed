interface LogoProps {
  className?: string;
  green?: boolean;
}

export default function Logo({ className, green }: LogoProps) {
  if (!green) {
    return (
      <svg
        className={`${className}`}
        viewBox="0 0 208 125"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M96.5977 36.4775C92.5217 32.3601 85.8692 32.3601 81.7932 36.4775L65.3574 53.0802C60.7281 57.7565 60.7281 65.2885 65.3574 69.9648L95.4719 100.385C100.168 105.129 107.832 105.129 112.528 100.385L142.643 69.9648C147.272 65.2885 147.272 57.7565 142.643 53.0802L126.207 36.4775C122.131 32.3601 115.478 32.3601 111.402 36.4775C107.326 40.5949 100.674 40.5949 96.5977 36.4775Z"
          fill="url(#paint0_linear_1_2)"
        />
        <g filter="url(#filter0_d_1_2)">
          <path
            d="M77.4241 17.0488C73.7818 13.4314 68.2419 12.5314 63.6418 14.8099L30.6738 31.1391C26.5862 33.1638 24 37.3309 24 41.8924L24 94.665C24 103.566 33.3501 109.369 41.3262 105.418L98.6738 77.0135C102.03 75.3511 105.97 75.3511 109.326 77.0135L166.674 105.418C174.65 109.369 184 103.566 184 94.665V41.8924C184 37.3309 181.414 33.1638 177.326 31.1392L144.358 14.8099C139.758 12.5314 134.218 13.4314 130.576 17.0488L112.456 35.0447C107.777 39.6923 100.223 39.6923 95.5439 35.0447L77.4241 17.0488Z"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_d_1_2"
            x="20"
            y="13.5628"
            width="168"
            height="101.118"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="4" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1_2"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1_2"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_1_2"
            x1="104"
            y1="29"
            x2="104"
            y2="109"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#002936" />
            <stop offset="1" stop-color="#05FF69" />
          </linearGradient>
        </defs>
      </svg>
    );
  }

  return (
    <svg
      className={`${className}`}
      viewBox="0 0 208 125"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M96.5977 36.4775C92.5217 32.3601 85.8692 32.3601 81.7932 36.4775L65.3574 53.0802C60.7281 57.7565 60.7281 65.2885 65.3574 69.9648L95.4719 100.385C100.168 105.129 107.832 105.129 112.528 100.385L142.643 69.9648C147.272 65.2885 147.272 57.7565 142.643 53.0802L126.207 36.4775C122.131 32.3601 115.478 32.3601 111.402 36.4775V36.4775C107.326 40.5949 100.674 40.5949 96.5977 36.4775V36.4775Z"
        fill="#009D3F"
      />
      <g filter="url(#filter0_d_7_3)">
        <path
          d="M77.4241 17.0488C73.7818 13.4314 68.2419 12.5314 63.6418 14.8099L30.6738 31.1391C26.5862 33.1638 24 37.3309 24 41.8924L24 94.665C24 103.566 33.3501 109.369 41.3262 105.418L98.6738 77.0135C102.03 75.3511 105.97 75.3511 109.326 77.0135L166.674 105.418C174.65 109.369 184 103.566 184 94.665V41.8924C184 37.3309 181.414 33.1638 177.326 31.1392L144.358 14.8099C139.758 12.5314 134.218 13.4314 130.576 17.0488L112.456 35.0447C107.777 39.6923 100.223 39.6923 95.5439 35.0447L77.4241 17.0488Z"
          fill="#025423"
        />
        <path
          d="M77.4241 17.0488C73.7818 13.4314 68.2419 12.5314 63.6418 14.8099L30.6738 31.1391C26.5862 33.1638 24 37.3309 24 41.8924L24 94.665C24 103.566 33.3501 109.369 41.3262 105.418L98.6738 77.0135C102.03 75.3511 105.97 75.3511 109.326 77.0135L166.674 105.418C174.65 109.369 184 103.566 184 94.665V41.8924C184 37.3309 181.414 33.1638 177.326 31.1392L144.358 14.8099C139.758 12.5314 134.218 13.4314 130.576 17.0488L112.456 35.0447C107.777 39.6923 100.223 39.6923 95.5439 35.0447L77.4241 17.0488Z"
          fill="#05FF69"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_7_3"
          x="20"
          y="13.5628"
          width="168"
          height="101.118"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_7_3"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_7_3"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
