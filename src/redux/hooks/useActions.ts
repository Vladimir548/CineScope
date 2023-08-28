import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useMemo } from 'react';
import { AppDispatch } from '@/redux/store';

export const useAppDispatch: () => AppDispatch = useDispatch;
