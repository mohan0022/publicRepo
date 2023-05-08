import FuseUtils from '@fuse/utils/FuseUtils';
import axios from '../axios/axiosInstanceStudent';

/* eslint-disable camelcase */

class ReportService extends FuseUtils.EventEmitter {
	fetchSectionWiseCourse = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/SectionWiseCourse').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchQuestionWiseAnalysisBar = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/QuestionWiseAnalysisBar').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchQuestionWiseAnalysisPie = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/QuestionWiseAnalysisPie').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchTopicsToImprove = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/TopicsToImprove').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchQuestionsAttempted = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/QuestionsAttempted').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchMarkScored = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/MarkScored').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchTopicsWiseAnalysis = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/TopicsWiseAnalysis').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchQuestionWiseAnalysis = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/QuestionWiseAnalysis').then(response => {
				if (response.data.status) {
					const { body } = response.data;
					resolve(body);
				} else {
					reject(response.data.message);
				}
			});
		});
	};

	fetchQuestionsWithAnswer = () => {
		return new Promise((resolve, reject) => {
			axios.get('/api/reports/QuestionsWithAnswer').then(response => {
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

const instance = new ReportService();

export default instance;
