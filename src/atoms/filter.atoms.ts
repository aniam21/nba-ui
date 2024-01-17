import { atom } from 'recoil';

export const loaderState = atom({ key: 'loader', default: false as boolean });

export const pageState = atom({ key: 'page', default: 1 as number });

