import React, {InputHTMLAttributes, Ref, SVGProps,} from 'react'
import styles from './Input.module.css'
import {HTMLTag,} from '../@types/HTMLTag'
import {withUITheme,} from '../core/withThemeHOC'
import {WithUIThemeProps,} from '../@types/Theme'

type Icon = {
	Icon: React.ComponentType<SVGProps<SVGAElement>>
}

interface Input extends HTMLTag<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>,
	Partial<Icon> {
	error?: boolean;
}

interface InputWithRef extends Input,
	WithUIThemeProps {
	inputRef: Ref<HTMLInputElement>
}

const Input = withUITheme<InputWithRef>(({Icon, error, inputRef, theme, ...props}) => {
	const inputStyle = {
		paddingLeft: !!Icon ? 60 : 20,
		background: error ? theme.dangerLight : theme.baseLight,
		borderRadius: theme.borderRadius,
		color: theme.typography,
	}

	return (
		<div className={styles.inputBlock}>
			{Icon && <InputIcon Icon={Icon} color={theme.base}/>}

			<input style={inputStyle}
				   className={styles.input}
				   ref={inputRef}
				   {...props}/>
		</div>
	)
})

const InputIcon: React.FC<Icon & { color: string }> = React.memo(({Icon, color,}) => (
	<div className={styles.inputIcon}>
		<Icon fill={color}/>
	</div>
))

export default React.forwardRef<HTMLInputElement, Input>((props, ref) => {
	return <Input {...props} inputRef={ref}/>
})
