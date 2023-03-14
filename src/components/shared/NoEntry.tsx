import { Box, Button, SvgIcon, Typography } from '@mui/material'
import { ReactComponent as NoContentIcon } from '../svgs/no-content.svg'

interface INoEntry {
    title?: string
    onClick?: () => void
    btnText?: string
}

const NoEntry = ({
    title = 'No entries found',
    onClick,
    btnText = 'Add new entry'
}: INoEntry) => {
    return (
        <Box sx={{
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            flexDirection: 'column',
            py: 10
        }}>
            <SvgIcon component={NoContentIcon} inheritViewBox fontSize="large" sx={{
                fontSize: '8rem',
            }} />
            <Typography variant="h6" align="center">
                {title}
            </Typography>
            <Button onClick={onClick} variant="contained">
                {btnText}
            </Button>
        </Box>
    )
}

export default NoEntry