PUT my_index
{
    "settings": {
        "analysis": {
            "analyzer": {
                "content_analyzer": {
                    "char_filter": [
                        "html_strip"
                    ],
                    "tokenizer": "standard",
                    "filter": [
                        "asciifolding",
                        "lowercase",
                        "stop",
                        "trim",
                        // "keyword_repeat",
                        "stemmer",
                        // "unique"
                    ]
                },
                "query_analyzer": {
                    "char_filter": [
                        "html_strip"
                    ],
                    "tokenizer": "standard",
                    "filter": [
                        "asciifolding",
                        "lowercase",
                        "stop",
                        "trim",
                        // "keyword_repeat",
                        "stemmer",
                        // "unique",
                        "my_edge_filter"
                    ]
                }
            },
            "filter": {
                "my_edge_filter": {
                    "type": "edge_ngram",
                    "min_gram": 1,
                    "max_gram": 7
                }
            }
        }
    },
    "mappings": {
        "properties": {
            "user_id": {
                "type": "keyword"
            },
            "title": {
                "type": "text",
                "analyzer": "query_analyzer",
                "search_analyzer": "query_analyzer"
            },
            "description": {
                "type": "text",
                "analyzer": "content_analyzer",
                "search_analyzer": "query_analyzer"
            },
            "comments": {
                "type": "nested",
                "properties": {
                    "user_id": {
                        "type": "keyword"
                    },
                    "comment": {
                        "type": "text",
                        "analyzer": "content_analyzer",
                        "search_analyzer": "query_analyzer"
                    }
                }
            }
        }
    }
}

// Test the description_analyzer
GET my_index/_analyze
{
  "analyzer": "query_analyzer",
  "text": "MS Dhoni"
}

POST my_index/_doc
{
    "user_id": "1",
    "title": "Sorting Allgorithms Extra",
    "description": "A Sorting Algorithm is used to rearrange a given array or list of elements according to a comparison operator on the elements. The comparison operator programming is is sis is used to decide the new order of elements in the respective data structure.",
    "comments": [
        {
            "user_id": "2",
            "comment": "Sorting is important in programming"
        },
        {
            "user_id": "3",
            "comment": "Hey There!"
        }
    ]
}

POST my_index/_doc
{
    "user_id": "2",
    "title": "Quick Sort",
    "description": "QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot.",
    "comments": [
        {
            "user_id": "1",
            "comment": "Quick Sort is a good algorithm"
        },
        {
            "user_id": "3",
            "comment": "Sorting is good in programming"
        }
    ]
}

POST my_index/_doc
{
    "user_id": "3",
    "title": "Merge Sort",
    "description": "Merge Sort is a Divide and Conquer algorithm. It divides input array in two halves, calls itself for the two halves and then merges the two sorted halves.",
    "comments": [
        {
            "user_id": "1",
            "comment": "Merge Sort is a good algorithm"
        },
        {
            "user_id": "2",
            "comment": "Quick sort is better than merge sort"
        }
    ]
}

POST my_index/_doc
{
    "user_id": "4",
    "title": "Fastest Sorting Algorithms",
    "description": "The fastest sorting algorithm is Quick Sort",
    "comments": [
        {
            "user_id": "1",
            "comment": "Quick Sort is a good algorithm"
        },
        {
            "user_id": "2",
            "comment": "Quick sort is better than merge sort"
        },
        {
            "user_id": "3",
            "comment": "Sorting is good in programming"
        }
    ]
}

POST my_index/_doc
{
    "user_id": "4",
    "title": "SpiderMan",
    "description": "Spider-Man is a popular comic book superhero created by Stan Lee and Steve Ditko and featured in Marvel Comics publications. The character’s alter ego is Peter Parker, a teenage science whiz who was bitten by a radioactive spider and gained amazing spider-like abilities. He uses his powers to fight crime while facing many obstacles in his personal life 1. Spider-Man has also appeared in numerous theatrical and made-for-television films, including the recent “Spider-Man: No Way Home” (2021) directed by Jon Watts and starring Tom Holland as Peter Parker 2.",
    "comments": [
        {
            "user_id": "1",
            "comment": "Quick Sort is a good algorithm"
        },
        {
            "user_id": "2",
            "comment": "Quick sort is better than merge sort"
        },
        {
            "user_id": "3",
            "comment": "Sorting is good in programming"
        }
    ]
}

GET my_index/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "title": {
              "query": "msdhoni",
              "boost": 3
            }
          }
        },
        {
          "match": {
            "description": {
              "query": "spiderman",
              "boost": 2
            }
          }
        },
        {
          "nested": {
            "path": "comments",
            "query": {
              "match": {
                "comments.comment": "spiderman"
              }
            }
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "description": {},
    },
    "boundary_scanner": "sentence"
  }
}

// Search documents randomly each time with no matching with any strings. Just random documents

GET my_index/_search
{
  "query": {
    "function_score": {
      "query": {
        "match_all": {}
      },
      "random_score": {}
    }
  }
}