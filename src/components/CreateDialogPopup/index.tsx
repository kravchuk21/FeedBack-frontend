import React from 'react'
import {Button, Input, Popup,} from '../UI'
import {socket,} from '../../store/socket'

interface CreateDialogPopup {
	mateId: string;
}

const CreateDialogPopup: React.FC<CreateDialogPopup> = ({mateId,}) => {
	const [visible, setVisible,] = React.useState(false)
	const [value, setValue,] = React.useState('Hello')

	const onClose = () => {
		setVisible(false)
	}

	const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.currentTarget.value)
	}

	const handleClick = React.useCallback(() => {
		if (value && mateId) {
			socket.emit('MESSAGE:CREATE', {text: value, mate: mateId,})
			setValue('')
		}
	}, [mateId, value,])

	return (
		<>
			<Button onClick={() => setVisible(true)}>Create dialog</Button>
			<Popup title="Create dialog" isOpened={visible} onClose={onClose}>
				<div className="mb-3">
					<Input value={value} onChange={handleChangeInput} placeholder={'Enter message...'}/>
				</div>
				<Button disabled={!value.trim()} onClick={handleClick}>Send</Button>
			</Popup>
		</>
	)
}

export default CreateDialogPopup
