import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { BurgerSlice } from './slices/menu-slice';
import { SearchSlice } from './slices/search-slice';
import { SidebarSlice } from '@/redux/slices/sidebar-slice';
import { ModalSlice } from '@/redux/slices/modal-slices';
import { GenreSLice } from '@/redux/slices/genre-slice';
import { CountrySLice } from '@/redux/slices/country-slice';
import { YearSlice } from '@/redux/slices/year-slice';
import { RatingSlice } from '@/redux/slices/rating-slice';
import { TypeSlice } from '@/redux/slices/type-slice';
import { SortSlice } from '@/redux/slices/sort-slice';

const rootReducer = combineReducers({
  burger: BurgerSlice.reducer,
  search: SearchSlice.reducer,
  sidebar: SidebarSlice.reducer,
  modal: ModalSlice.reducer,
  genre: GenreSLice.reducer,
  country: CountrySLice.reducer,
  year: YearSlice.reducer,
  rating: RatingSlice.reducer,
  type: TypeSlice.reducer,
  sort: SortSlice.reducer,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
