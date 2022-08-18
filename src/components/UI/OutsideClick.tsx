import React from 'react'


interface IOutsideClick {
	onOutsideClick: () => void;
	children: React.ReactNode;
}

class OutsideClick extends React.Component<IOutsideClick> {
	wrapperRef = React.createRef<HTMLDivElement>()

	componentDidMount() {
		document.addEventListener('mousedown', this.handleClickOutside)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleClickOutside)
	}

	handleClickOutside = (event: Event) => {
		if (
			this.wrapperRef.current &&
			!this.wrapperRef.current.contains((event.target as Node))
		) {
			this.props.onOutsideClick()
		}
	}

	render() {
		const {children,} = this.props

		return <div ref={this.wrapperRef}>{children}</div>
	}
}

export default OutsideClick
