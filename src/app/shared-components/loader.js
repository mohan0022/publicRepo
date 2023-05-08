import FuseLoading from '@fuse/core/FuseLoading';
import React from 'react';

function Loader() {
	return (
		<div
			style={{
				position: 'absolute',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 9999
			}}
		>
			<FuseLoading />
		</div>
	);
}

export default Loader;
