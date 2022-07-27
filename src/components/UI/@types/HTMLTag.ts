import {DetailedHTMLProps, ParamHTMLAttributes,} from 'react'

export type HTMLTag<El> = Omit<DetailedHTMLProps<ParamHTMLAttributes<El>, El>, 'className'>
