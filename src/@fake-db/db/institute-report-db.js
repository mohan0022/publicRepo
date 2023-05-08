import mock from '../mock';

const instituteReportAppDB = {
	widgets: [
		{
			id: 'BatchwiseAnalysis',
			series: [
				{
					name: 'High Score',
					data: [44, 55, 12, 33, 50]
				},
				{
					name: 'Average Score',
					data: [55, 44, 12, 33, 50]
				}
			],
			options: {
				chart: {
					type: 'bar',
					height: 350
				},
				plotOptions: {
					bar: {
						horizontal: false,
						columnWidth: '55%',
						endingShape: 'rounded'
					}
				},
				dataLabels: {
					enabled: false
				},
				stroke: {
					show: true,
					width: 2,
					colors: ['transparent']
				},
				legend: {
					position: 'top',
					show: true
				},
				xaxis: {
					categories: ['Batch 1', 'Batch 2', 'Batch 3', 'Batch 4', 'Batch 5']
				},
				yaxis: {
					title: {}
				},
				fill: {
					opacity: 1
				},
				tooltip: {
					y: {
						formatter: function (val) {
							return '$ ' + val + ' thousands';
						}
					}
				}
			}
		},
		{
			id: 'CourseReport',
			headers: ['S.No', 'Batch Name', 'Student Name', 'Hours Spent', 'Progress %'],
			body: [
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2], userID: '1' }
			]
		}
	]
};

mock.onGet('/api/institute-report-app/widgets').reply(config => {
	return [200, instituteReportAppDB.widgets];
});
