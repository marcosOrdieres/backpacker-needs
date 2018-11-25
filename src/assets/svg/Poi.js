import React from 'react';
import Svg, { Path } from 'react-native-svg';
// To convert .svg to .js we should run this command: Marcoss-MBP:assets marcos$ msvgc -f ./svg/poiYES.svg -o ./svg/ --react-native

const Poi = props => (
  <Svg width={props.width || 512} height={props.height || 512} viewBox='0 0 512 512'><Path d='M509.235 495.097l-112.596-118a9.998 9.998 0 0 0-7.235-3.097H345.18l54.534-69.866c.211-.27.407-.549.587-.836 26.882-33.034 41.673-74.644 41.673-117.325C441.974 83.428 358.547 0 256 0c-30.791 0-61.299 7.684-88.227 22.221-4.86 2.624-6.673 8.69-4.049 13.55 2.624 4.86 8.689 6.672 13.55 4.049C201.293 26.854 228.516 20 256 20c91.518 0 165.974 74.456 165.974 165.974 0 38.498-13.479 76.014-37.955 105.639-.333.403-.63.827-.892 1.268L256.002 455.746 127.679 291.267a10.33 10.33 0 0 0-.396-.52c-24.025-29.477-37.256-66.686-37.256-104.773 0-34.848 10.677-68.196 30.876-96.439 3.213-4.492 2.176-10.738-2.316-13.951s-10.738-2.176-13.951 2.316c-22.641 31.658-34.609 69.029-34.609 108.074 0 42.526 14.721 84.076 41.465 117.055l.143.188L166.859 374h-44.944a9.998 9.998 0 0 0-7.256 3.119l-111.914 118A10 10 0 0 0 10 512h329.333c5.523 0 10-4.477 10-10s-4.477-10-10-10H33.267l92.945-98h56.25l65.654 84.151a10.004 10.004 0 0 0 7.883 3.849H256a10 10 0 0 0 7.883-3.847L329.569 394h55.555l93.512 98h-61.303c-5.523 0-10 4.477-10 10s4.477 10 10 10H502a9.999 9.999 0 0 0 7.235-16.903z' data-original='#000000' class='active-path' data-old_color='#9796ce' fill='#9796ce' />
    <Path d='M357.222 151.304l-94.774-79.947a9.999 9.999 0 0 0-12.895 0l-94.774 79.947a10 10 0 0 0 6.447 17.644H176V256h-1.894c-5.523 0-10 4.477-10 10s4.477 10 10 10h167.249c5.523 0 10-4.477 10-10s-4.477-10-10-10H336v-87.053h14.774a10 10 0 0 0 6.448-17.643zM272.021 256h-32.042v-24.958c0-8.834 7.187-16.021 16.021-16.021s16.021 7.187 16.021 16.021V256zM316 256h-23.979v-24.958c0-19.862-16.159-36.021-36.021-36.021s-36.021 16.159-36.021 36.021V256H196v-87.053h120V256zM188.59 148.948L256 92.083l67.411 56.865H188.59zM145.65 47.84a10.058 10.058 0 0 0-7.07-2.93c-2.63 0-5.21 1.07-7.07 2.93a10.076 10.076 0 0 0-2.93 7.07c0 2.63 1.07 5.21 2.93 7.07 1.86 1.86 4.44 2.93 7.07 2.93 2.64 0 5.21-1.07 7.07-2.93 1.87-1.86 2.93-4.44 2.93-7.07s-1.06-5.21-2.93-7.07zM386.4 494.93a10.058 10.058 0 0 0-7.07-2.93c-2.63 0-5.21 1.07-7.07 2.93s-2.93 4.44-2.93 7.07 1.07 5.21 2.93 7.07c1.86 1.86 4.44 2.93 7.07 2.93 2.64 0 5.21-1.07 7.07-2.93 1.87-1.86 2.93-4.44 2.93-7.07s-1.06-5.21-2.93-7.07z' data-original='#000000' class='active-path' data-old_color='#9796ce' fill='#9796ce' /></Svg>
);

export default Poi;
