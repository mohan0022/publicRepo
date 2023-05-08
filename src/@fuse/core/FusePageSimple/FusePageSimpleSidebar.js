import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useState } from 'react';
import FusePageSimpleSidebarContent from './FusePageSimpleSidebarContent';

function FusePageSimpleSidebar(props, ref) {
	const [isOpen, setIsOpen] = useState(!(window.screen.width < 700));
	const { classes } = props;

	useImperativeHandle(ref, () => ({
		toggleSidebar: handleToggleDrawer
	}));

	const handleToggleDrawer = () => {
		setIsOpen(!isOpen);
		try {
			props.setIsDrawer(!isOpen);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<Hidden lgUp={props.variant === 'permanent'}>
				<SwipeableDrawer
					variant="temporary"
					anchor={props.position}
					open={isOpen}
					onOpen={ev => {}}
					onClose={ev => handleToggleDrawer()}
					disableSwipeToOpen
					classes={{
						root: clsx(classes.sidebarWrapper, props.variant),
						paper: clsx(
							classes.sidebar,
							props.variant,
							props.position === 'left' ? classes.leftSidebar : classes.rightSidebar
						)
					}}
					ModalProps={{
						keepMounted: true // Better open performance on mobile.
					}}
					container={props.rootRef.current}
					BackdropProps={{
						classes: {
							root: classes.backdrop
						}
					}}
					style={{ position: 'absolute' }}
				>
					{/* <p>fool</p> */}
					<FusePageSimpleSidebarContent {...props} />
				</SwipeableDrawer>
			</Hidden>
			{props.variant === 'permanent' && (
				<Hidden mdDown>
					<Drawer
						// variant="permanent"
						variant="persistent"
						className={clsx(isOpen ? classes.sidebarWrapper : classes.sidebarWrapperHidden, props.variant)}
						open={isOpen}
						classes={{
							paper: clsx(
								classes.sidebar,
								props.variant,
								props.position === 'left' ? classes.leftSidebar : classes.rightSidebar
							)
						}}
					>
						{/* <p>dude</p> */}

						<FusePageSimpleSidebarContent {...props} />
					</Drawer>
				</Hidden>
			)}
		</>
	);
}

export default forwardRef(FusePageSimpleSidebar);
