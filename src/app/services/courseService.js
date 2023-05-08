import FuseUtils from '@fuse/utils/FuseUtils';
import axios from '../axios/axiosInstanceStudent';

/* eslint-disable camelcase */

class CourseService extends FuseUtils.EventEmitter {
	fetchCourses = () => {
		return new Promise((resolve, reject) => {
			axios.get('courses/v1/list').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};
}

const instance = new CourseService();

export default instance;
