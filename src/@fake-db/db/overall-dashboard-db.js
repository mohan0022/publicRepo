import mock from '../mock';

const overallDashboardAppDB = {
	widgets: [
		{
			id: 'Totaltimespent',
			// series: {
			// 	2019: [
			// 		{
			// 			name: 'Chemisty',
			// 			data: [2, 4, 6, 8, 2.5, 3.5, 1],
			// 			fill: 'start'
			// 		}
			// 	]
			// },
 "series": {
            "2022": [
                {
                    "data": [
                        3397,
                        93048,
                        87156,
                        0,
                        0,
                        0,
                        0
                    ],
                    "fill": "start",
                    "name": "All"
                }
            ]
        },

		 "options": {
            "fill": {
                "type": "solid",
                "opacity": 0,
                "gradient": {
                    "stops": [
                        30,
                        100,
                        100
                    ],
                    "opacityTo": 0.5,
                    "opacityFrom": 1,
                    "shadeIntensity": 0.4
                }
            },
            "grid": {
                "show": true,
                "xaxis": {
                    "lines": {
                        "show": true
                    }
                },
                "yaxis": {
                    "lines": {
                        "show": true
                    }
                },
                "padding": {
                    "top": 0,
                    "left": 0,
                    "right": 0,
                    "bottom": 0
                },
                "position": "back",
                "strokeDashArray": 3
            },
            "chart": {
                "type": "area",
                "zoom": {
                    "enabled": false
                },
                "height": "100%",
                "toolbar": {
                    "show": false
                },
                "background": "transparent"
            },
            "theme": {
                "mode": "dark"
            },
            "xaxis": {
                "tooltip": {
                    "enabled": false
                },
                "axisBorder": {
                    "show": false
                },
                "categories": [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday"
                ]
            },
            "yaxis": {
                "axisBorder": {
                    "show": false
                }
            },
            "stroke": {
                "show": true,
                "curve": "smooth",
                "width": 1.5,
                "colors": [
                    "#FED441"
                ],
                "lineCap": "butt",
                "dashArray": 0
            },
            "markers": {
                "size": 0,
                "hover": {
                    "size": 5
                },
                "shape": "circle",
                "radius": 2,
                "fillOpacity": 1,
                "strokeWidth": 1.5,
                "strokeOpacity": 1,
                "strokeDashArray": 0
            },
            "dataLabels": {
                "enabled": false
            }
        }
		},
		{
			id: 'CoursesProgress',
			courses: [
				{
					course: 'JEE',
					series: [
						{
							name: 'Study Task',

							data: [44]
						},
						{
							name: 'Practice Task',

							data: [53]
						},
						{
							name: 'Assesment Task',

							data: [100]
						}
					],
					options: {
						colors: ['#4CAF50', '#FEDB60', '#2196F3'],
						chart: {
							type: 'bar',
							height: 200,
							toolbar: {
								show: false,
								tools: {
									download: false
								}
							}
						},

						plotOptions: {
							bar: {
								horizontal: true,
								dataLabels: {
									position: 'top'
								}
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
							show: false
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
							categories: ['', '', '']
						}
					}
				},
				{
					course: 'English',
					series: [
						{
							name: 'Study Task',

							data: [44]
						},
						{
							name: 'Practice Task',

							data: [53]
						},
						{
							name: 'Assesment Task',

							data: [100]
						}
					],
					options: {
						colors: ['#4CAF50', '#FEDB60', '#2196F3'],
						chart: {
							type: 'bar',
							height: 200,
							toolbar: {
								show: false,
								tools: {
									download: false
								}
							}
						},

						plotOptions: {
							bar: {
								horizontal: true,
								dataLabels: {
									position: 'top'
								}
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
							show: false
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
							categories: ['', '', '']
						}
					}
				},
				{
					course: 'Maths',
					series: [
						{
							name: 'Study Task',

							data: [44]
						},
						{
							name: 'Practice Task',

							data: [53]
						},
						{
							name: 'Assesment Task',

							data: [100]
						}
					],
					options: {
						colors: ['#4CAF50', '#FEDB60', '#2196F3'],
						chart: {
							type: 'bar',
							height: 200,
							toolbar: {
								show: false,
								tools: {
									download: false
								}
							}
						},

						plotOptions: {
							bar: {
								horizontal: true,
								dataLabels: {
									position: 'top'
								}
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
							show: false
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
							categories: ['', '', '']
						}
					}
				}
			]
		},
		{
			id: 'Timespentincourses',
			overall: {
				series: [30, 20, 10, 40],
				options: {
					colors: ['#E5C646', '#EFDE96', '#F4E9BD', '#F9F5E5'],

					chart: {
						height: 350,
						type: 'pie'
					},
					labels: ['Botany', 'Zoology', 'Physics', 'Chemistry'],
					legend: {
						position: 'bottom'
					}
				}
			},
			individual: [
				{
					name: 'Study tasks',
					impressions: {
						value: '12',
						ofTarget: 12
					},
					series: [
						{
							name: 'Impression',
							data: [
								67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000,
								110000, 149000, 98000
							]
						}
					],
					options: {
						chart: {
							type: 'area',
							height: '100%',
							sparkline: {
								enabled: true
							}
						},
						xaxis: {
							categories: [
								'Jan 1',
								'Jan 2',
								'Jan 3',
								'Jan 4',
								'Jan 5',
								'Jan 6',
								'Jan 7',
								'Jan 8',
								'Jan 9',
								'Jan 10',
								'Jan 11',
								'Jan 12',
								'Jan 13',
								'Jan 14',
								'Jan 15'
							]
						},
						fill: {
							type: 'solid',
							opacity: 1,
							colors: ['#FEDB60']
						},
						stroke: {
							colors: ['#FEDB60']
						},
						tooltip: {
							followCursor: true,
							theme: 'dark',
							fixed: {
								enabled: false,
								position: 'topRight',
								offsetX: 0,
								offsetY: 0
							}
						}
					}
				},
				{
					name: 'practice tests',
					impressions: {
						value: '87',
						ofTarget: 12
					},
					series: [
						{
							name: 'Impression',
							data: [
								67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000,
								110000, 149000, 98000
							]
						}
					],
					options: {
						chart: {
							type: 'area',
							height: '100%',
							sparkline: {
								enabled: true
							}
						},
						xaxis: {
							categories: [
								'Jan 1',
								'Jan 2',
								'Jan 3',
								'Jan 4',
								'Jan 5',
								'Jan 6',
								'Jan 7',
								'Jan 8',
								'Jan 9',
								'Jan 10',
								'Jan 11',
								'Jan 12',
								'Jan 13',
								'Jan 14',
								'Jan 15'
							]
						},
						fill: {
							type: 'solid',
							colors: ['#FEDB60'],
							opacity: 1
						},
						stroke: {
							colors: ['#FEDB60']
						},
						tooltip: {
							followCursor: true,
							theme: 'dark',
							fixed: {
								enabled: false,
								position: 'topRight',
								offsetX: 0,
								offsetY: 0
							}
						}
					}
				},
				{
					name: 'test',
					impressions: {
						value: '52',
						ofTarget: 12
					},
					series: [
						{
							name: 'Impression',
							data: [
								67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000,
								110000, 149000, 98000
							]
						}
					],
					options: {
						chart: {
							type: 'area',
							height: '100%',
							sparkline: {
								enabled: true
							}
						},
						xaxis: {
							categories: [
								'Jan 1',
								'Jan 2',
								'Jan 3',
								'Jan 4',
								'Jan 5',
								'Jan 6',
								'Jan 7',
								'Jan 8',
								'Jan 9',
								'Jan 10',
								'Jan 11',
								'Jan 12',
								'Jan 13',
								'Jan 14',
								'Jan 15'
							]
						},
						fill: {
							type: 'solid',
							colors: ['#FEDB60'],
							opacity: 1
						},
						stroke: {
							colors: ['#FEDB60']
						},
						tooltip: {
							followCursor: true,
							theme: 'dark',
							fixed: {
								enabled: false,
								position: 'topRight',
								offsetX: 0,
								offsetY: 0
							}
						}
					}
				},
				{
					name: 'scores %',
					impressions: {
						value: '42',
						ofTarget: 12
					},
					series: [
						{
							name: 'Impression',
							data: [
								67000, 54000, 82000, 57000, 72000, 57000, 87000, 72000, 89000, 98700, 112000, 136000,
								110000, 149000, 98000
							]
						}
					],
					options: {
						chart: {
							type: 'area',
							height: '100%',
							sparkline: {
								enabled: true
							}
						},
						xaxis: {
							categories: [
								'Jan 1',
								'Jan 2',
								'Jan 3',
								'Jan 4',
								'Jan 5',
								'Jan 6',
								'Jan 7',
								'Jan 8',
								'Jan 9',
								'Jan 10',
								'Jan 11',
								'Jan 12',
								'Jan 13',
								'Jan 14',
								'Jan 15'
							]
						},
						fill: {
							type: 'solid',
							opacity: 1,
							colors: ['#FEDB60']
						},
						stroke: {
							colors: ['#FEDB60']
						},
						tooltip: {
							followCursor: true,
							theme: 'dark',
							fixed: {
								enabled: false,
								position: 'topRight',
								offsetX: 0,
								offsetY: 0
							}
						}
					}
				}
			]
		}
	]
};

mock.onGet('/api/overall-dashboard-app/widgets').reply(config => {
	return [200, overallDashboardAppDB.widgets];
});
