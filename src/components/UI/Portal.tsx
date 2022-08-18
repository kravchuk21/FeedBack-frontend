import React, {useState,} from 'react'
import ReactDOM from 'react-dom'

const Portal: React.FC<{ children: React.ReactNode }> = ({children,}) => {

	const [container,] = useState(() => document.createElement('div'))

	React.useEffect(() => {
		document.body.appendChild(container)
		return () => {
			document.body.removeChild(container)
		}
	}, [container,])

	return ReactDOM.createPortal(children, container)
}

export default Portal
