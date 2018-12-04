import React from 'react';
import Svg, { Defs, G, Path } from 'react-native-svg';
import Palette from '../../common/palette';

const Ruck = props => (
  <Svg width={props.width || 515.971} height={props.height || 514.197} viewBox='389 159 515.971 514.197'><Defs />
    <G clip-path='url(#a)'><Path d='M391.664 160.664l191.5.5c-14.062 3.495-21.444 16.174-22 30l1 3-1.5 4.5-2 1h-2q-33.106-5.107-44.5 11.5-2.75 9.25-9.5 14.5-12.795 4.204-19.5 14.5-5.75 8.25-8.5 19.5-6.7 2.3-17 1h-40c-7.492-1.834-18.419-3.81-24.5 2.5l-1.5 3.5v-106z'
      fill={Palette.primaryColor} />
      <Path d='M583.664 160.664h94q36.845-6.345 49.5 11.5 6.713 10.288 7.5 26.5 35.75-4.75 48.5 13.5 2.135 8.866 8.5 13.5 12.584 4.417 19.5 14.5 5.75 8.25 8.5 19.5 6.7 2.3 17 1h40q17.875-4.375 24.5 2.5 6.429 12.572 2 36v93l-5.5 6.5h-56q-14.85-2.85-22.5 1.5-3 7-1 19v49l2.5 4.5q28.999-2.498 39.5 13.5 11.122 11.879 9 37-5.25 4.25-1 18v51c4.026 3.221 2.813 9.63 1.86 13.891-2.221 9.928-4.668 19.142-12.137 26.519-5.004 4.941-9.562 8.421-16.77 9.605-7.081 1.163-15.335-1.101-21.885 2.552-6.194 3.455-6.885 11.663-11.161 16.839-9.533 11.54-25.54 12.589-39.407 11.094h-260c-7.247-1.025-18.718-4.323-22.5-11.5-3.423-6.496-5.776-12.484-11.5-17.5l-7-1c-2.584 3.877-12.227.658-15.651-.223-3.879-.999-7.639-2.537-10.973-4.778-17.55-11.793-18.378-36.778-15.876-55.499v-72q1.584-22.416 16.5-31.5 12.856-7.644 33.5-7.5v-52q4.5-15-1.5-19.5-23.666-5.333-57-1-17.166 4.167-23.5-2.5-7.166-11.333-2-35v-94l3.5-5.5c4.315-2.826 10.264-2.009 15-1h40q16.125 2.625 25.5-1.5 3.75-18.25 16.5-27.5 9.662-3.338 15.5-10.5 3.417-10.583 11.5-16.5 13.686-8.814 39-6h2l1.5-.5 1-6v-2c.21-9.971 3.341-20.286 12.5-25.5l9-4z'
        fill={props.color || Palette.white} />
      <Path d='M710.664 160.664l192.5.5-.5 106.5-3-6c-4.314-2.826-10.263-2.009-15-1h-40q-16.125 2.625-25.5-1.5-4.001-18.998-17.5-28.5-9.25-2.75-14.5-9.5-3.057-10.942-11.5-16.5-7.125-6.875-23-5-13.187 2.188-19.5-2.5.675-22.674-12.5-31.5l-7.5-3.5c-.875.022-3.292.005-2.5-1.5zm-118 20h81c11.284-2.137 24.028-3.129 34.093 3.408 4.527 2.94 4.187 9.417 3.407 14.092l-1.5 2.5h-52c-7.863-1.592-18.907-2.743-24.5 4.5l-1 9 4.5 5.5c6.74 4.044 15.813 2.623 23 1h65q26.021-4.521 39.5 3.5 7.75 17.25 3 47v117q-2.276 25.224-17.5 37.5-21.702 19.298-70 12-4.5-2-2.5-10.5v-27q3.6-16.6-4.5-21.5-5.125-2.375-14-1h-34l-6.5 4.5c-2.215 3.101-1.699 7.504-1 11v28q3.5 13-2.5 16.5-54.238 7.739-75.5-17.5-18.013-22.986-12-70v-119q.625-5.875 4.5-8.5 11.834-4.666 31-2 14.66 2.659 19.5-4.5-4.044-24.544 6.5-34.5l4-1zm-87 68c3.229 1.845 2.273 6.604 1.5 9.5l-2.5 3.5c-6.172 1.47-7.472-1.662-4.864-6.989a13.35 13.35 0 0 1 5.864-6.011zm282 0l5.5 4.5 3 7c-1.668 3.672-7.52 1.882-9-1-1.643-3.202-.556-7.317.5-10.5zm-374 33h85c2.926-.627 7.206-.951 8.5 2.5v85c.627 2.926.952 7.206-2.5 8.5h-67c-8.075 2.006-19.864 4.213-26.5-2.5v-85c-.627-2.925-.951-7.205 2.5-8.5zm376 0h67q17.813-4.312 25.5 1.5 4.667 7.834 1 24v67l-2.5 3.5h-67c-8.075 2.006-19.864 4.213-26.5-2.5v-85c-.627-2.925-.951-7.205 2.5-8.5zm-398 111l3 5c4.315 2.827 10.264 2.01 15 1h39c8.583-1.38 18.639-1.999 26.5 2.5v52q4.5 15-1.5 19.5-31.473-1.973-42.5 16.5-9.75 15.75-6 45v72a60.23 60.23 0 0 0 1.022 7.604c4.058 19.971 20.84 30.912 40.478 29.896l5-1 6.5 4.5c5.004 13.679 15.058 23.984 30 25l-116.5.5v-280zm511 0l.5 279.5-116.5.5v-1q16.091-.91 22.5-11.5 3.084-9.916 10.5-15.5 28.49.989 40.5-14.5 11.5-11.5 9-37-5.25-4.25-1-18v-51q4.75-3.75 1-16-2.8-19.2-15.5-28.5-12.233-9.266-34.5-8.5-3-7-1-19v-49l1.5-3.5c4.951-2.212 10.786-1.837 16-1h41c7.887 2.045 20.709 4.398 25.5-4.5l.5-1.5zm-404 5q7.25-1.25 9.5 2.5 5.122 29.379 25.5 43.5 15.606 14.894 46 15h26q9.25-2.25 11.5 2.5-.713 19.714 10.5 27.5 7.755 6.745 22 7 15.514-2.487 22.5-13.5 6.331-8.669 6.5-23.5 66.91 7.91 92.5-25.5 11.582-14.919 17.5-35.5l7.5.5c2.979 4.618 2.088 10.953 1 16v219c-.608 6.159-3.062 12.146-8.5 15.5l-1.5-.5v-69q4.076-41.576-18.5-56.5-23.575-17.424-72-10h-149q-20.129 4.371-30.5 18.5-13.75 14.25-10 46l-.5 71.5-5.5-4.5c-4.88-7.182-4.944-16.717-4-25v-220l1.5-1.5zm141 0c5.214-1.422 14.024-3.293 17.5 2.5v48c1.345 8.449 1.75 19.425-5.5 25.5l-6 1-6.5-4.5c-3.68-6.195-3.129-14.185-2-21v-49l2.5-2.5zm181 97c3.208-.412 6.464-.597 9.692-.316 19.977 1.739 18.979 24.621 16.808 39.816v72c-.652 5.374-3.198 10.703-8.066 13.434-5.479 3.074-12.576 2.238-18.434 1.066l-2.5-1.5c-3.918-10.059-2.864-21.648-1-32v-90l3.5-2.5zm-363 1c5.761-1.589 16.678-3.761 19.046 4.017 3.017 9.907 2.27 20.402.454 30.483v88l-1.5 2.5-7 1q-13.208.709-18.5-6.5-6-12-3-33v-72c.492-4.845 2.36-9.647 6.5-12.5l4-2zm100 37h167q17.214-2.214 23.5 6.5 22.342 37.159 19 100-3.5 6-16.5 2.5h-222q-6.562-8.937-1.5-29.5.113-49.387 22.5-76.5l8-3z'
        fill-rule='evenodd'
        fill={Palette.primaryColor} /></G></Svg>
);

export default Ruck;
