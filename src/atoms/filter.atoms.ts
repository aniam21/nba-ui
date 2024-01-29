import { atom } from 'recoil';

export const loaderState = atom({ key: 'loader', default: false as boolean });

export const queryState = atom({ key: 'query', default: {
    page: 1,
    search: '',
} });
