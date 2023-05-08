import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { setDefaultSettings } from 'app/store/fuse/settingsSlice';
import _ from '@lodash';
import { navbarToggleMobile, navbarToggle } from '../../store/fuse/navbarSlice';

function NavbarToggleButton(props) {
	const dispatch = useDispatch();
	const theme = useTheme();
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<IconButton
			className={props.className}
			onClick={ev => dispatch(mdDown ? navbarToggleMobile() : navbarToggle())}
			color="inherit"
			size="small"
		>
			{props.children}
		</IconButton>
	);
}

NavbarToggleButton.defaultProps = {
	children: <Icon fontSize="inherit">menu_open</Icon>
};

export default NavbarToggleButton;
