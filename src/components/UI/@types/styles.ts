export type FW = 400 | 500 | 600 | 700 | number;
export type FS = 'normal' | 'italic';
export type TA = 'left' | 'right' | 'center';

export type FontStyles = {
	size?: number;
	color?: string;
	fontFamily?: string;
	fontWeight?: FW;
	fontStyle?: FS;
	textAlign?: TA;
}
