import React from 'react'
import SendIcon from '../../../public/assets/icons/send.svg'
import {IconButton, Input, withUITheme, WithUIThemeProps, } from '../UI'

interface DialogInput {
	value: string;
	setValue: (value: string) => void;
	handleSend: () => void;
	disabled: boolean;
}

const DialogInput: React.FC<DialogInput & WithUIThemeProps> = ({setValue, value, handleSend, disabled, theme,}) => {
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const DialogInputStyles = {
		background: theme.bg,
	}

	return (
		<div style={DialogInputStyles} className="flex justify-between items-center p-3.5">
			<div className="flex-1 mr-2.5">
				<Input placeholder="Type something..." value={value} onChange={handleChangeInput}/>
			</div>
			<SendButton onClick={handleSend} disabled={disabled}/>
		</div>
	)
}

interface SendButton {
	disabled: boolean
	onClick: () => void
}

const SendButton: React.FC<SendButton> = React.memo(withUITheme<SendButton & WithUIThemeProps>(
	({disabled, theme, onClick,}) => {
		return (
			<IconButton
				Icon={SendIcon}
				onClick={onClick}
				disabled={disabled}
				color={disabled ? theme.base : theme.primary}/>
		)
	}
))

export default withUITheme(DialogInput)
