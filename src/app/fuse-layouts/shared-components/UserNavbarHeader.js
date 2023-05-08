import CustomIcon from '@fuse/utils/customIcons';
import { Icon } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		color: '#ffffff',
		'&.user': {
			'& .username, & .email': {
				transition: theme.transitions.create('opacity', {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeInOut
				})
			}
		}
	},
	avatar: {
		boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.50) ',
		background: theme.palette.background.default,
		transition: theme.transitions.create('all', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.easeInOut
		}),
		bottom: 0,
		'& > img': {
			borderRadius: '50%'
		}
	}
}));

function UserNavbarHeader(props) {
	const user = useSelector(({ auth }) => auth.user);
	const activeRoute = useSelector(({ fuse }) => fuse.navigation.activeRoute || {});

	const classes = useStyles();
	const { t } = useTranslation();

	return (
		<AppBar
			style={{ height: '150px' }}
			position="static"
			color="primary"
			classes={{ root: classes.root }}
			className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0 shadow-0"
		>
			{/* {JSON.stringify(activeRoute)} */}
			<Typography className="username text-18 whitespace-nowrap font-semibold mb-4" color="inherit">
				{/* {user.data.displayName} */}
				{/* {activeRoute?.title} */}
				{/* {t(activeRoute?.title)} */}
				{activeRoute?.title}
			</Typography>
			{/* <Typography className="email text-13 opacity-50 whitespace-nowrap font-medium" color="inherit">
				{user.data.email}
			</Typography> */}
			<div className="flex items-center justify-center absolute bottom-0 -mb-44">
				{/* <Avatar
					className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')}
					alt="user photo"
					src={user?.photoURL && user?.photoURL !== '' ? user?.photoURL : 'assets/images/avatars/profile.jpg'}
				/> */}
				<Avatar className={clsx(classes.avatar, 'avatar w-72 h-72 p-8 box-content')} alt={activeRoute?.title}>
					{activeRoute?.icon &&
						(activeRoute?.icon === 'bookmark' ||
						activeRoute?.icon === 'subject' ||
						activeRoute?.icon === 'course' ||
						activeRoute?.icon === 'blog' ? (
							<CustomIcon
								style={{ fontSize: 50 }}
								icon={activeRoute?.icon}
								className={clsx('fuse-list-item-icon text-20 flex-shrink-0', activeRoute?.iconClass)}
								color="primary"
							/>
						) : (
							<Icon
								style={{ fontSize: 50 }}
								className={clsx('fuse-list-item-icon text-20 flex-shrink-0', activeRoute?.iconClass)}
								color="primary"
							>
								{activeRoute?.icon}
							</Icon>
						))}
				</Avatar>
			</div>
		</AppBar>
	);
}

export default UserNavbarHeader;
