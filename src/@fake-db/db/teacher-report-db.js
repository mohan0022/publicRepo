import mock from '../mock';

const teacherReportAppDB = {
	widgets: [
		{
			id: 'TestProgress',
			series: [
				{
					data: [400, 430, 448, 470]
				}
			],
			options: {
				colors: ['#EA4335', '#4CAF50', '#F2A91B', '#2196F3'],
				chart: {
					type: 'bar',
					height: 300,
					toolbar: {
						show: false,
						tools: {
							download: false
						}
					}
				},

				plotOptions: {
					bar: {
						distributed: true,
						horizontal: true,
						dataLabels: {
							position: 'top'
						},
						columnWidth: '1%'
						//   barHeight: '30%'
					}
				},
				dataLabels: {
					enabled: false,
					offsetX: -6,
					style: {
						fontSize: '12px',
						colors: ['#fff']
					}
				},
				stroke: {
					show: true,
					width: 10,
					colors: ['transparent']
				},

				legend: {
					position: 'top',
					show: true
				},

				tooltip: {
					shared: true,
					intersect: false
				},
				grid: {
					show: true,
					xaxis: {
						lines: {
							show: true
						}
					},
					yaxis: {
						lines: {
							show: false
						}
					}
				},
				xaxis: {
					categories: ['Absent', 'Completed', 'In Progress', 'Enrolled']
				}
			}
		},
		{
			id: 'CourseComletion',

			series: [
				{
					name: 'Poor 0% To 20%',
					data: [44, 55, 41, 67, 22]
				},
				{
					name: 'Avergae 20% To 40%',
					data: [11, 17, 15, 15, 21]
				},
				{
					name: 'Good 40% To 60%',
					data: [13, 23, 20, 8, 13]
				},
				{
					name: 'Very Good 60% To 80%',
					data: [11, 17, 15, 15, 21]
				},
				{
					name: 'Excellent 80% To 100%',
					data: [11, 17, 15, 15, 21]
				}
			],
			options: {
				colors: ['#EA4335', '#4CAF50', '#F2A91B', '#2196F3'],

				chart: {
					type: 'bar',
					height: 350,
					stacked: true,
					stackType: '100%'
				},
				plotOptions: {
					bar: {
						distributed: false,
						dataLabels: {
							position: 'top'
						},
						columnWidth: '40%'
					}
				},
				responsive: [
					{
						breakpoint: 480,
						options: {
							legend: {
								position: 'bottom',
								offsetX: -10,
								offsetY: 0
							}
						}
					}
				],
				dataLabels: {
					enabled: false,
					offsetX: -6,
					style: {
						fontSize: '12px',
						colors: ['#fff']
					}
				},
				xaxis: {
					categories: ['IT', 'CSE', 'MECH', 'ECE', 'EEE']
				},
				fill: {
					opacity: 1
				},
				legend: {
					position: 'bottom'
					// offsetX: 0,
					// offsetY: 50
				}
			}
		},

		{
			id: 'TestWiseReport',
			headers: ['S.No', 'Batch Name', 'Student Name', 'Parameter 1', 'Parameter 2', 'Parameter 3', 'Parameter 4'],
			body: [
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' },
				{ data: [1, 'lorem lypsum', 'Lorem Ipsum dolar sit', 2, 2, 2, 2], userID: '1' }
			]
		}
	]
};

mock.onGet('/api/teacher-report-app/widgets').reply(config => {
	return [200, teacherReportAppDB.widgets];
});
