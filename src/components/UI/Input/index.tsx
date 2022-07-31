import React, {InputHTMLAttributes, Ref,} from 'react'
import styles from './Input.module.css'
import Image from 'next/image'
import {pathToIcon,} from '../../../constants/images'
import {HTMLTag,} from '../@types/HTMLTag'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'


interface Input extends HTMLTag<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>,
	Partial<Icon> {
	error?: boolean;
}

interface InputWithRef extends Input,
	WithUIThemeProps {
	inputRef: Ref<HTMLInputElement>
}

type Icon = {
	icon: pathToIcon;
	alt?: string
}

const Input = withUITheme<InputWithRef>(({icon, alt, error, inputRef, ...props}) => {
	const inputStyle = {
		paddingLeft: icon ? 60 : 20,
		background: error ? props.theme.dangerLight : props.theme.baseLight,
	}

	return (
		<div className={styles.inputBlock}>
			{icon && <InputIcon icon={icon} alt={alt}/>}

			<input style={inputStyle}
				   className={`${styles.input} ${error && styles.inputError}`}
				   ref={inputRef}
				   {...props}/>
		</div>
	)
})

const InputIcon: React.FC<Icon> = React.memo(({icon, alt,}) => (
	<div className={styles.inputIcon}>
		<Image src={icon} height={24} width={24} alt={alt}/>
	</div>
))

export default React.forwardRef<HTMLInputElement, Input>((props, ref) => {
	return <Input {...props} inputRef={ref}/>
})
