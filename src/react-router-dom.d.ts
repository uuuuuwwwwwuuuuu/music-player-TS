import 'react-router-dom';
import { NavigateOptions } from 'react-router-dom';

declare module 'react-router-dom' {
    type Path = 
        | '/' 
        | '/auth' 
        | '/home' 
        | `/artist/${string}` 
        | '/home/fullscreen' 
        | '/home/liked'

    interface NavigateFunction {
        (to: Path, options?: NavigateOptions): void;
        (delta: number): void;
    }
}