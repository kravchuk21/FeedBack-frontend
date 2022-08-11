import React from 'react'
import Input from '../UI/Input'
import IconButton from '../UI/IconButton'
import SendIcon from '../../../public/assets/icons/send.svg'
import {withUITheme,} from '../UI/core/withThemeHOC'
import {WithUIThemeProps,} from '../UI/@types/Theme'
import {socket,} from '../../store/services/socket'
import {useAppSelector,} from '../../store/hooks'
import {selectDialogId,} from '../../store/reducers/dialog'

const DialogInput: React.FC<WithUIThemeProps> = ({theme,}) => {
	const [value, setValue,] = React.useState('')
	const dialogId = useAppSelector(selectDialogId)
	const mateId = useAppSelector(state => state.dialog.mate?._id)

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const handleClick = React.useCallback(() => {
		if (value && dialogId && mateId) {
			socket.emit('MESSAGE:CREATE', {text: value, dialogId, mate: mateId,})
			setValue('')
		}
	}, [dialogId, mateId, value,])

	const DialogInputStyles = {
		background: theme.bg,
	}

	return (
		<div style={DialogInputStyles} className="flex justify-between items-center p-3.5">
			<div className="flex-1 mr-2.5">
				<Input placeholder="Type something..." value={value} onChange={handleChangeInput}/>
			</div>
			<SendButton onClick={handleClick} disabled={!value}/>
		</div>
	)
}

interface SendButton {
	disabled: boolean
	onClick: () => void
}

const SendButton: React.FC<SendButton> =
	React.memo(
		withUITheme<SendButton & WithUIThemeProps>(
			({disabled, theme, onClick,}) => {
				return (
					<IconButton Icon={SendIcon} onClick={onClick} disabled={disabled}
								color={disabled ? theme.base : theme.primary}/>
				)
			}
		))

export default withUITheme(DialogInput)
