import {DetailedHTMLProps, ParamHTMLAttributes,} from 'react'

export type HTMLTag<El, Attr = ParamHTMLAttributes<El>> = Omit<DetailedHTMLProps<Attr, El>, 'className'>
