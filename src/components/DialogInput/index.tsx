import React from 'react'
import SendIcon from '../../../public/assets/icons/send.svg'
import {IconButton, Input, withUITheme, WithUIThemeProps,} from '../UI'

interface DialogInput {
	value: string;
	onChange: (value: string) => void;
	handleSend: () => void;
	disabled: boolean;
}

const DialogInput: React.FC<DialogInput> = ({onChange, value, handleSend, disabled,}) => {
	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.currentTarget.value)
	}


	return (
		<form className="flex justify-between items-center p-3.5">
			<div className="flex-1 mr-2.5">
				<Input autoFocus placeholder="Type something..." value={value} onChange={handleChangeInput}/>
			</div>
			<SendButton onClick={handleSend} disabled={disabled}/>
		</form>
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
				type="submit"
				color={disabled ? theme.base : theme.primary}/>
		)
	}
))

export default DialogInput
