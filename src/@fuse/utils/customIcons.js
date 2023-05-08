import { SvgIcon } from '@material-ui/core';
import React from 'react';

function CustomIcon(props) {
	return (
		<SvgIcon {...props}>
			{props.icon === 'bookmark' ? (
				<path
					transform="translate(5,2)"
					d="M12 15V2H2V15L7 12.82L12 15ZM12 0C12.5304 0 13.0391 0.210714 13.4142 0.585786C13.7893 0.960859 14 1.46957 14 2V18L7 15L0 18V2C0 0.89 0.9 0 2 0H12ZM6 4H8V6H10V8H8V10H6V8H4V6H6V4Z"
				/>
			) : null}
			{props.icon === 'subject' ? (
				<path
					transform="translate(5,2)"
					d="M6 0V15H9V0H6ZM9 2L13 15L16 14L12 1L9 2ZM2 2V15H5V2H2ZM0 16V18H18V16H0Z"
				/>
			) : null}
			{props.icon === 'course' ? (
				<path
					transform="translate(1,2)"
					d="M20 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V15C0 15.5304 0.210714 16.0391 0.585786 16.4142C0.960859 16.7893 1.46957 17 2 17H20C20.5304 17 21.0391 16.7893 21.4142 16.4142C21.7893 16.0391 22 15.5304 22 15V2C22 1.46957 21.7893 0.960859 21.4142 0.585786C21.0391 0.210714 20.5304 0 20 0ZM2 15V2H10V15H2ZM20 15H12V2H20V15ZM13 5.5H19V7H13V5.5ZM13 8H19V9.5H13V8ZM13 10.5H19V12H13V10.5Z"
				/>
			) : null}
			{props.icon === 'blog' ? (
				<path
					transform="translate(5,2)"
					d="M16 2V16H2V2H16ZM18 0H0V18H18V0ZM14 14H4V13H14V14ZM14 12H4V11H14V12ZM14 9H4V4H14V9Z"
				/>
			) : null}
		</SvgIcon>
	);
}

export default CustomIcon;
