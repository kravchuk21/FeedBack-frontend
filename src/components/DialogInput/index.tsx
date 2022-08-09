import React from 'react'
import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import SendIcon from '../../../public/assets/icons/send.svg'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'

const DialogInput: React.FC<WithUIThemeProps> = ({theme,}) => {
	const [value, setValue,] = React.useState('')
	const DialogInputStyles = {
		background: theme.bg,
	}

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}
	return (
		<div style={DialogInputStyles} className="flex justify-between items-center p-3.5">
			<div className="flex-1 mr-2.5">
				<Input placeholder="Type something.." value={value} onChange={handleChangeInput}/>
			</div>
			<SendButton disabled={!value}/>
		</div>
	)
}

interface SendButton {
	disabled: boolean
}

const SendButton: React.FC<SendButton> =
	React.memo(
		withUITheme<SendButton & WithUIThemeProps>(
			({disabled, theme,}) => {
				return (
					<IconButton Icon={SendIcon} disabled={disabled} color={disabled ? theme.base : theme.primary}/>
				)
			}
		))

export default withUITheme(DialogInput)
