import mock from '../mock';

const subjectDashboardAppDB = {
	widgets: [
    {
      "id": "Achievements",
      "title": "Achievements",
      "data": [
        {
          "title": "Time Spent",
          "score": 3
        },
        {
          "title": "Practice Task",
          "score": 1
        },
        {
          "title": "Assesment Task",
          "score": 0
        },
        {
          "title": "Overall Score",
          "score": 1
        }
      ]
    },
    {
      "id": "tasks",
      "data": [
        {
          "id": "StudyTasks",
          "title": "Study Tasks",
          "color": "#2196F3",
          "data": {
            "name": "Tasks",
            "count": "29",
            "extra": [
              {
                "name": "Class Highest",
                "count": "29"
              },
              {
                "name": "Total Subjects",
                "count": 31
              }
            ]
          },
          "detail": "You can show some detailed information about this widget in here."
        },
        {
          "id": "PracticeTasks",
          "title": "Practice Tasks",
          "color": "#F44336",
          "data": {
            "name": "Tasks",
            "count": 0,
            "extra": [
              {
                "name": "Class Highest",
                "count": "0"
              },
              {
                "name": "Total Tasks",
                "count": 1
              }
            ]
          },
          "detail": "You can show some detailed information about this widget in here."
        },
        {
          "id": "AssesmentTasks",
          "title": "Assesment Tasks",
          "color": "#FF9800",
          "data": {
            "name": "Tasks",
            "count": 0,
            "extra": [
              {
                "name": "Class Highest",
                "count": "0"
              },
              {
                "name": "Total Test",
                "count": 0
              }
            ]
          },
          "detail": "You can show some detailed information about this widget in here."
        },
        {
          "id": "OverallScore",
          "title": "Overall Score",
          "color": "#4CAF50",
          "data": {
            "name": "Tasks",
            "count": 29,
            "extra": [
              {
                "name": "Class Highest",
                "count": 29
              },
              {
                "name": "Total Score",
                "count": 32
              }
            ]
          },
          "detail": "You can show some detailed information about this widget in here."
        }
      ]
    },
    {
      "id": "SubjectWiseScores",
      "courses": [
        {
          "course": "E-Learning Content - Verbal",
          "series": [
            {
              "name": "Study Task",
              "data": [
                "100"
              ]
            },
            {
              "name": "Practice Task",
              "data": [
                0
              ]
            },
            {
              "name": "Assesment Task",
              "data": [
                0
              ]
            }
          ],
          "options": {
            "colors": [
              "#4CAF50",
              "#F2A91B",
              "#2196F3"
            ],
            "chart": {
              "type": "bar",
              "height": 200,
              "toolbar": {
                "show": false,
                "tools": {
                  "download": false
                }
              }
            },
            "plotoptions": {
              "bar": {
                "horizontal": true,
                "dataLabels": {
                  "position": "top"
                }
              }
            },
            "dataLabels": {
              "enabled": false,
              "offsetX": -6,
              "style": {
                "fontSize": "12px",
                "colors": [
                  "#fff"
                ]
              }
            },
            "stroke": {
              "show": true,
              "width": 10,
              "colors": [
                "transparent"
              ]
            },
            "legend": {
              "position": "top",
              "show": false
            },
            "tooltip": {
              "shared": true,
              "intersect": false
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
                  "show": false
                }
              }
            },
            "xaxis": {
              "categories": [
                "",
                "",
                ""
              ]
            }
          }
        },
        {
          "course": "E-Learning Content - Verbal",
          "series": [
            {
              "name": "Study Task",
              "data": [
                "90"
              ]
            },
            {
              "name": "Practice Task",
              "data": [
                0
              ]
            },
            {
              "name": "Assesment Task",
              "data": [
                0
              ]
            }
          ],
          "options": {
            "colors": [
              "#4CAF50",
              "#F2A91B",
              "#2196F3"
            ],
            "chart": {
              "type": "bar",
              "height": 200,
              "toolbar": {
                "show": false,
                "tools": {
                  "download": false
                }
              }
            },
            "plotoptions": {
              "bar": {
                "horizontal": true,
                "dataLabels": {
                  "position": "top"
                }
              }
            },
            "dataLabels": {
              "enabled": false,
              "offsetX": -6,
              "style": {
                "fontSize": "12px",
                "colors": [
                  "#fff"
                ]
              }
            },
            "stroke": {
              "show": true,
              "width": 10,
              "colors": [
                "transparent"
              ]
            },
            "legend": {
              "position": "top",
              "show": false
            },
            "tooltip": {
              "shared": true,
              "intersect": false
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
                  "show": false
                }
              }
            },
            "xaxis": {
              "categories": [
                "",
                "",
                ""
              ]
            }
          }
        },
        {
          "course": "Test",
          "series": [
            {
              "name": "Study Task",
              "data": [
                0
              ]
            },
            {
              "name": "Practice Task",
              "data": [
                "62"
              ]
            },
            {
              "name": "Assesment Task",
              "data": [
                0
              ]
            }
          ],
          "options": {
            "colors": [
              "#4CAF50",
              "#F2A91B",
              "#2196F3"
            ],
            "chart": {
              "type": "bar",
              "height": 200,
              "toolbar": {
                "show": false,
                "tools": {
                  "download": false
                }
              }
            },
            "plotoptions": {
              "bar": {
                "horizontal": true,
                "dataLabels": {
                  "position": "top"
                }
              }
            },
            "dataLabels": {
              "enabled": false,
              "offsetX": -6,
              "style": {
                "fontSize": "12px",
                "colors": [
                  "#fff"
                ]
              }
            },
            "stroke": {
              "show": true,
              "width": 10,
              "colors": [
                "transparent"
              ]
            },
            "legend": {
              "position": "top",
              "show": false
            },
            "tooltip": {
              "shared": true,
              "intersect": false
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
                  "show": false
                }
              }
            },
            "xaxis": {
              "categories": [
                "",
                "",
                ""
              ]
            }
          }
        }
      ]
    },
    {
      "id": "ActivityTracker",
      "overall": {
        "series": [
          {
            "name": "Study Task",
            "data": [
              0,
              100,
              60,
              70,
              35,
              82,
              15
            ]
          },
          {
            "name": "Test Task",
            "data": [
              0,
              0,
              0,
              100,
              0,
              0,
              0
            ]
          }
        ],
        "options": {
          "colors": [
            "#64C6D3",
            "#FEDB60"
          ],
          "chart": {
            "type": "bar",
            "height": 400,
            "stacked": true,
            "toolbar": {
              "show": false
            },
            "zoom": {
              "enabled": true
            }
          },
          "plotoptions": {
            "bar": {
              "horizontal": false,
              "borderRadius": 0
            }
          },
          "dataLabels": {
            "enabled": false
          },
          "xaxis": {
            "categories": [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat"
            ]
          },
          "legend": {
            "show": false,
            "position": "right",
            "offsetY": 40
          },
          "fill": {
            "opacity": 1
          }
        }
      },
      "individual": [
        {
          "name": "E-Learning Content - Algo",
          "impressions": {
            "value": 162,
            "ofTarget": 162
          },
          "series": [
            {
              "name": "Impression",
              "data": [
                "96",
                "119",
                "92201",
                "46",
                "244",
                "113",
                "3035",
                "3698",
                "272",
                "93",
                "12",
                "18",
                "24",
                "1426"
              ]
            }
          ],
          "options": {
            "chart": {
              "type": "area",
              "height": "100%",
              "sparkline": {
                "enabled": true
              }
            },
            "xaxis": {
              "categories": [
                "5th January",
                "10th January",
                "11th January",
                "14th January",
                "15th January",
                "18th January",
                "19th January",
                "20th January",
                "22nd January",
                "25th January",
                "28th January",
                "29th January",
                "4th February",
                "10th February"
              ]
            },
            "fill": {
              "type": "solid",
              "opacity": 1,
              "colors": [
                "#FEDB60"
              ]
            },
            "stroke": {
              "colors": [
                "#FEDB60"
              ]
            },
            "tooltip": {
              "followCursor": true,
              "theme": "dark",
              "fixed": {
                "enabled": false,
                "position": "topRight",
                "offsetX": 0,
                "offsetY": 0
              }
            }
          }
        },
        {
          "name": "E-Learning Content - Verbal",
          "impressions": {
            "value": 18,
            "ofTarget": 18
          },
          "series": [
            {
              "name": "Impression",
              "data": [
                "3278",
                "301",
                "17689",
                "5",
                "4"
              ]
            }
          ],
          "options": {
            "chart": {
              "type": "area",
              "height": "100%",
              "sparkline": {
                "enabled": true
              }
            },
            "xaxis": {
              "categories": [
                "10th January",
                "11th January",
                "25th January",
                "28th January",
                "4th February"
              ]
            },
            "fill": {
              "type": "solid",
              "opacity": 1,
              "colors": [
                "#FEDB60"
              ]
            },
            "stroke": {
              "colors": [
                "#FEDB60"
              ]
            },
            "tooltip": {
              "followCursor": true,
              "theme": "dark",
              "fixed": {
                "enabled": false,
                "position": "topRight",
                "offsetX": 0,
                "offsetY": 0
              }
            }
          }
        },
        {
          "name": "Test",
          "impressions": {
            "value": 1,
            "ofTarget": 1
          },
          "series": [
            {
              "name": "Impression",
              "data": [
                "0"
              ]
            }
          ],
          "options": {
            "chart": {
              "type": "area",
              "height": "100%",
              "sparkline": {
                "enabled": true
              }
            },
            "xaxis": {
              "categories": [
                "9th February"
              ]
            },
            "fill": {
              "type": "solid",
              "opacity": 1,
              "colors": [
                "#FEDB60"
              ]
            },
            "stroke": {
              "colors": [
                "#FEDB60"
              ]
            },
            "tooltip": {
              "followCursor": true,
              "theme": "dark",
              "fixed": {
                "enabled": false,
                "position": "topRight",
                "offsetX": 0,
                "offsetY": 0
              }
            }
          }
        }
      ]
    },
    {
      "id": "WeeklyScores",
      "title": "Weekly Scores",
      "ranges": {
        "TW": "This Week",
        "LW": "Last Week",
        "2W": "2 Weeks Ago"
      },
      "currentRange": "TW",
      "mainChart": {
        "series": {
          "TW": [
          44, 55, 13, 43, 5,
                44, 55, 13, 43, 5,
                44, 55, 13, 43, 5,44, 55, 13, 43, 5
          ],
          "LW": [
            0
          ],
          "2W": [
            0
          ]
        },
       options: {
              chart: {
               "height": "100%",
            "type": "pie"
              },
 "colors": [
            "#E5C646",
            "#EAD26E",
            "#EFDE96",
            "#F4E9BD",
            "#F9F5E5"
          ],
              labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                    position: 'right'
                  }
                }
              }]
            },
      },
      "footerLeft": {
        "title": "Practice Test Scores",
        "count": {
          "TW": "0",
          "LW": "0",
          "2W": "0"
        }
      },
      "footerRight": {
        "title": "Test Scores",
        "count": {
          "TW": "0",
          "LW": "0",
          "2W": "0"
        }
      }
    }
  ],

};

mock.onGet('/api/subject-dashboard-app/widgets').reply(config => {
	return [200, subjectDashboardAppDB.widgets];
});

mock.onGet('/api/subject-dashboard-app/projects').reply(config => {
	return [200, subjectDashboardAppDB.projects];
});
