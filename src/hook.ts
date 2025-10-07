import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import type {RootState, AddDispatch} from './store/store'
import { useNavigate } from "react-router-dom";

export const useAppDispatch = () => useDispatch<AddDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type Path = '/' | '/auth' | '/home' | `/artist/${string}` | '/home/fullscreen' | '/home/liked'
// export const 