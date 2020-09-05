import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

export default ({ children, onClick, tip, btnClassName, style, tipClassName }) =>
    <Tooltip title={tip} className={tipClassName} placement='top'>
        <IconButton onClick={onClick} className={btnClassName} style={style}>
            {children}
        </IconButton>
    </Tooltip>
