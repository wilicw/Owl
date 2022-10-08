import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { appState, AppDispatch } from './store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<appState> = useSelector;
