import React from 'react'
import {dateFormat,} from '../../utils/dateFormat'
import {Typography, withUITheme, WithUIThemeProps,} from '../UI'

interface Time {
	time: Date
}

const Time: React.FC<Time & WithUIThemeProps> = ({time, theme,}) => (
	<Typography size={12} color={theme.base}>{dateFormat(time)}</Typography>
)


export default React.memo(withUITheme(Time))
