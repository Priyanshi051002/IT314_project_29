// Bring all documents from index post

GET /post/_search
{
  "query": {
    "match_all": {}
  }
}

// Get all post where any filed contains spiderman

GET /post/_search
{
  "query": {
    "match": {
      "description": "spiderman"
    }
  }
}

// Analyze the analyzer

GET /post/_analyze
{
  "analyzer": "query_analyzer",
  "text": "MS dhon"
}

// Get maping of index post

GET /post/_mapping

GET /post/_settings

GET /post/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "title": {
              "query": "MS Dhoni",
              "boost": 3
            }
          }
        },
        {
          "match": {
            "description": {
              "query": "MS Dhoni",
              "boost": 2
            }
          }
        },
        {
          "nested": {
            "path": "comments",
            "query": {
              "match": {
                "comments.comment": "MS Dhoni"
              }
            },
            "inner_hits": {
              "highlight": {
                "fields": {
                  "comments.comment": {
                    "fragment_offset": 0,
                    "number_of_fragments": 0
                  }
                }
              }
            }
          }
        }
      ]
    }
  },
  "highlight": {
    "fields": {
      "description": {
        "fragment_offset": 0,
        "number_of_fragments": 0
      }
    }
  }
}

