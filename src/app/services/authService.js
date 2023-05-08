import FuseUtils from '@fuse/utils/FuseUtils';
import jwtDecode from 'jwt-decode';
import { setAuthToken, setStudentId, setUser } from '@fuse/utils/deps';
import axios from '../axios/axiosInstanceStudent';

/* eslint-disable camelcase */

class AuthService extends FuseUtils.EventEmitter {
	handleAuthentication = () => {
		const access_token = this.getAccessToken();

		if (!access_token) {
			this.emit('onNoAccessToken');

			return;
		}

		if (this.isAuthTokenValid(access_token)) {
			this.setSession(access_token);
			this.emit('onAutoLogin', true);
		} else {
			this.setSession(null);
			this.emit('onAutoLogout', 'access_token expired');
		}
	};

	getStates = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/state').then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getCities = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/Institute').then(response => {
				if (response.data.status) {
					resolve([
						{ id: 1, name: 'Coimbatore' },
						{ id: 2, name: 'Chennai' }
					]);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getCourses = () => {
		return new Promise((resolve, reject) => {
			axios.get('/courses/v1/listSimple').then(response => {
				// console.log('kil-----', response);
				if (response.data.status) {
					resolve(
						response.data.body.map(ele => {
							return { id: ele.id, name: ele.courseName };
						})
					);
					// resolve([
					// 	{ id: 1, name: 'JEE' },
					// 	{ id: 2, name: 'C++' }
					// ]);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getLanguages = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/Language').then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	updateStudentsInfo = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/Language').then(response => {
				if (response.data.status) {
					resolve(true);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	forgetPassword = username => {
		return new Promise((resolve, reject) => {
			axios.post('/user/v1/forgotPassword', { username }).then(response => {
				if (response.data.status) {
					resolve({ message: response.data.message, secret: response.data.body.otpSecret });
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	updateParentsInfo = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/Language').then(response => {
				if (response.data.status) {
					resolve(true);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getStudentsInfo = () => {
		return new Promise((resolve, reject) => {
			axios.get('/user/v1/getUserInfo').then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getInstitutions = () => {
		return new Promise((resolve, reject) => {
			axios.get('Common/v1/Institute').then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getClasses = inititutionId => {
		return new Promise((resolve, reject) => {
			axios.get(`Common/v1/Class?instituteID=${inititutionId}`).then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	getSections = (inititutionId, classID) => {
		return new Promise((resolve, reject) => {
			axios.get(`Common/v1/section?instituteID=${inititutionId}&classID=${classID}`).then(response => {
				if (response.data.status) {
					resolve(response.data.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signup = data => {
		return new Promise((resolve, reject) => {
			axios.post('user/v1/register', data).then(response => {
				if (response.data.status) {
					setStudentId(response.data.body.body.id);
					resolve(response.data.body.body);
				} else {
					reject(response.data.error);
				}
			});
		});
	};

	signInWithEmailAndPassword = userData => {
		return new Promise((resolve, reject) => {
			axios.post('user/v1/login', userData).then(response => {
				if (response.data.status) {
					const { body, message } = response.data;

					const { token } = body;
					this.setSession(token);

					const user = {
						data: {
							displayName: body.userName,
							role: body.userTypeName,
							photoURL: 'assets/images/avatars/Velazquez.jpg',
							email: body.emailId,
							shortcuts: ['calendar', 'mail', 'contacts', 'todo']
						},
						message
					};

					setUser(JSON.stringify(user));
					setAuthToken(token);

					resolve(user);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	signInWithToken = () => {
		return new Promise((resolve, reject) => {
			axios
				.get('/api/auth/access-token', {
					data: {
						access_token: this.getAccessToken()
					}
				})
				.then(response => {
					if (response.data.user) {
						this.setSession(response.data.access_token);
						resolve(response.data.user);
					} else {
						this.logout();
						reject(new Error('Failed to login with token.'));
					}
				})
				.catch(error => {
					this.logout();
					reject(new Error('Failed to login with token.'));
				});
		});
	};

	updateUserData = user => {
		return axios.post('/api/auth/user/update', {
			user
		});
	};

	setSession = access_token => {
		if (access_token) {
			localStorage.setItem('jwt_access_token', access_token);
			axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
		} else {
			localStorage.removeItem('jwt_access_token');
			delete axios.defaults.headers.common.Authorization;
		}
	};

	logout = () => {
		this.setSession(null);
	};

	isAuthTokenValid = access_token => {
		if (!access_token) {
			return false;
		}
		const decoded = jwtDecode(access_token);
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			console.warn('access token expired');
			return false;
		}

		return true;
	};

	getAccessToken = () => {
		return window.localStorage.getItem('jwt_access_token');
	};
}

const instance = new AuthService();

export default instance;
