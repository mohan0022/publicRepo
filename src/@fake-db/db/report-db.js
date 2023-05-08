import mock from '../mock';

const analyticsDashboardAppDB = {
	widgets:[
    {
      "id": "SectionWiseScore",
      "series": [
        {
          "name": "Marks",
          "data": [
            "3",
            "2"
          ]
        },
        {
          "name": "Total Marks",
          "data": [
            "3",
            "3"
          ]
        }
      ],
      "options": {
        "colors": [
          "#4CAF50",
          "#2196F3"
        ],
        "chart": {
          "type": "bar",
          "height": 420
        },
        "plotOptions": {
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
          "width": 1,
          "colors": [
            "#fff"
          ]
        },
        "legend": {
          "position": "top"
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
            "Section-A",
            "Section-B"
          ]
        }
      }
    },
    {
      "id": "TestMarks",
      "markScored": 5,
      "TotalMarks": 6,
      "precentage": 83
    },
    {
      "id": "QuestionWiseAnalysisBar",
      "series": [
        {
          "name": "Questions",
          "data": [
            6
          ]
        },
        {
          "name": "Correct Answers",
          "data": [
            5
          ]
        },
        {
          "name": "Wrong Answers",
          "data": [
            1
          ]
        }
      ],
      "options": {
        "colors": [
          "#2196F3",
          "#4CAF50",
          "#FED441"
        ],
        "chart": {
          "type": "bar",
          "height": 420
        },
        "plotOptions": {
          "bar": {
            "horizontal": false,
            "columnWidth": "55%",
            "endingShape": "rounded"
          }
        },
        "dataLabels": {
          "enabled": false
        },
        "legend": {
          "position": "top"
        },
        "stroke": {
          "show": true,
          "width": 2,
          "colors": [
            "transparent"
          ]
        },
        "xaxis": {
          "categories": [
            "Online Writing"
          ]
        },
        "fill": {
          "opacity": 1
        },
        "tooltip": {
          "y": {}
        }
      }
    },
    {
      "id": "QuestionWiseAnalysisPie",
      "series": [
        5,
        1
      ],
      "options": {
        "chart": {
          "height": 420,
          "type": "pie"
        },
        "labels": [
          "Online Writing",
          "Wrong Answers"
        ]
      }
    },
    {
      "id": "TopicsToImprove",
      "body": [
        {
          "topic": "Online Writing",
          "subTopics": [
            {
              "data": "Benefits of Online Writing",
              "courseID": "236c2ffc-738c-11ec-9d51-0242c0a86002",
              "taskID": "c94e80f5-73af-11ec-9d51-0242c0a86002",
              "topicID": "dae23e9d-73a3-11ec-9d51-0242c0a86002"
            },
            {
              "data": "Writing",
              "courseID": "236c2ffc-738c-11ec-9d51-0242c0a86002",
              "taskID": "c94e8372-73af-11ec-9d51-0242c0a86002",
              "topicID": "dae23e9d-73a3-11ec-9d51-0242c0a86002"
            }
          ]
        }
      ]
    },
    {
      "id": "QuestionsAttempted",
      "series": [
        {
          "name": "Questions Attempted",
          "data": [
            1,
            2,
            3,
            4,
            5,
            6
          ]
        }
      ],
      "options": {
        "chart": {
          "height": 350,
          "type": "line",
          "zoom": {
            "enabled": false
          }
        },
        "dataLabels": {
          "enabled": false
        },
        "stroke": {
          "curve": "smooth",
          "colors": [
            "#FED441"
          ]
        },
        "title": {
          "text": "Questions Attempted",
          "align": "left"
        },
        "legend": {
          "position": "top",
          "show": false
        },
        "grid": {
          "row": {
            "colors": [
              "transparent",
              "transparent"
            ],
            "opacity": 0.5
          },
          "xaxis": {
            "lines": {
              "show": true
            }
          },
          "yaxis": {
            "lines": {
              "show": true
            }
          }
        },
        "xaxis": {
          "categories": [
            2,
            6,
            7,
            8,
            10,
            11
          ]
        }
      }
    },
    {
      "id": "MarkScored",
      "series": [
        {
          "name": "Online Writing test",
          "data": [
            1,
            2,
            3,
            4,
            5,
            5
          ]
        }
      ],
      "options": {
        "chart": {
          "height": 350,
          "type": "line",
          "zoom": {
            "enabled": false
          }
        },
        "dataLabels": {
          "enabled": false
        },
        "stroke": {
          "curve": "smooth",
          "colors": [
            "#FED441"
          ]
        },
        "title": {
          "text": "Marks Scored",
          "align": "left"
        },
        "legend": {
          "position": "top",
          "show": false
        },
        "grid": {
          "row": {
            "colors": [
              "transparent",
              "transparent"
            ],
            "opacity": 0.5
          },
          "xaxis": {
            "lines": {
              "show": true
            }
          },
          "yaxis": {
            "lines": {
              "show": true
            }
          }
        },
        "xaxis": {
          "categories": [
            2,
            6,
            7,
            8,
            10,
            11
          ]
        }
      }
    },
    {
      "id": "TopicsWiseAnalysis",
      "body": [
        {
          "sno": 1,
          "subject": "Online Writing",
          "topics": "Writing",
          "proficiency": 1
        },
        {
          "sno": 2,
          "subject": "Online Writing",
          "topics": "Benefits of Online Writing",
          "proficiency": 2
        }
      ]
    },
    {
      "id": "QuestionWiseAnalysis",
      "series": [
        {
          "name": "Online Writing test",
          "data": [
            7,
            4
          ]
        }
      ],
      "options": {
        "chart": {
          "height": 420,
          "type": "line",
          "zoom": {
            "enabled": false
          }
        },
        "dataLabels": {
          "enabled": false
        },
        "stroke": {
          "curve": "straight",
          "colors": [
            "#FED441"
          ]
        },
        "title": {
          "text": "Time Taken",
          "align": "left"
        },
        "legend": {
          "position": "top",
          "show": false
        },
        "grid": {
          "row": {
            "colors": [
              "transparent",
              "transparent"
            ],
            "opacity": 0.5
          },
          "xaxis": {
            "lines": {
              "show": true
            }
          },
          "yaxis": {
            "lines": {
              "show": true
            }
          }
        },
        "xaxis": {
          "categories": [
            "Section-A",
            "Section-B"
          ]
        }
      }
    },
    {
      "id": "QuestionsWithAnswer",
      "body": [
        {
          "question": "Choose the Suitable Answer for \" You ............................. to use your mobile so there's no point in leaving it on.\"",
          "questionType": "Html",
          "correctAnswer": "Are Allowed ",
          "answerSelected": "Are Allowed ",
          "explanation": "You cannot use the mobile phone",
          "isOpend": false,
          "isCorrect": true
        },
        {
          "question": "Choose the Suitable Answer for \"If they ............ next to each other on the plane, they wouldn't have got married.\"",
          "questionType": "Html",
          "correctAnswer": "Hadn't Sat",
          "answerSelected": "Hadn't Sat",
          "explanation": "They are wild animals",
          "isOpend": false,
          "isCorrect": true
        },
        {
          "question": "Choose the Best Answer for \"When I got home, someone ............... the window\"",
          "questionType": "Html",
          "correctAnswer": "Had Broken",
          "answerSelected": "Had Broken",
          "explanation": "I have already told the teacher",
          "isOpend": false,
          "isCorrect": true
        },
        {
          "question": "Choose the correct Answer for \" ................. the better team, we lost the match.\"",
          "questionType": "Html",
          "correctAnswer": "Despite Being",
          "answerSelected": "Despite of Being",
          "explanation": "Win or Lose play well",
          "isOpend": false,
          "isCorrect": false
        },
        {
          "question": "Choose the Suitable Answer for \"You ....... see a doctor \"",
          "questionType": "Html",
          "correctAnswer": "should",
          "answerSelected": "should",
          "explanation": "I have to see the match",
          "isOpend": false,
          "isCorrect": true
        },
        {
          "question": "Choose the Suitable Answer for \"Is that purse ............. \"",
          "questionType": "Html",
          "correctAnswer": "Yes, its Mine",
          "answerSelected": "Yes, its Mine",
          "explanation": "did anyone leave the purse?",
          "isOpend": false,
          "isCorrect": true
        }
      ]
    }
  ]
};

mock.onGet('/api/analytics-dashboard-app/widgets').reply(config => {
	return [200, analyticsDashboardAppDB.widgets];
});
