import { ThemeProvider } from '@material-ui/core/styles';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectNavbarTheme } from 'app/store/fuse/settingsSlice';
import NavbarStyle from './navbar/NavbarStyle';

function NavbarWrapperLayout1(props) {
	const navbar = useSelector(({ fuse }) => fuse.navbar);

	const navbarTheme = useSelector(selectNavbarTheme);

	return (
		<>
			<ThemeProvider theme={navbarTheme}>
				<NavbarStyle />
			</ThemeProvider>
		</>
	);
}

export default memo(NavbarWrapperLayout1);
