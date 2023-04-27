const indexSettings = {
  settings: {
    analysis: {
      analyzer: {
        content_analyzer: {
          char_filter: ["html_strip"],
          tokenizer: "standard",
          filter: [
            "asciifolding",
            "lowercase",
            "stop",
            "trim",
            "keyword_repeat",
            "stemmer",
            "unique",
          ],
        },
        query_analyzer: {
          char_filter: ["html_strip"],
          tokenizer: "standard",
          filter: [
            "asciifolding",
            "lowercase",
            "stop",
            "trim",
            "keyword_repeat",
            "stemmer",
            "unique",
            "my_edge_filter",
          ],
        },
      },
      filter: {
        my_edge_filter: {
          type: "edge_ngram",
          min_gram: 1,
          max_gram: 7,
        },
      },
    },
  },
  mappings: {
    properties: {
      user_id: {
        type: "keyword",
      },
      title: {
        type: "text",
        analyzer: "query_analyzer",
        search_analyzer: "query_analyzer",
      },
      description: {
        type: "text",
        analyzer: "content_analyzer",
        search_analyzer: "query_analyzer",
      },
      comments: {
        type: "nested",
        properties: {
          user_id: {
            type: "keyword",
          },
          comment: {
            type: "text",
            analyzer: "content_analyzer",
            search_analyzer: "query_analyzer",
          },
        },
      },
      likes: {
        type: "nested",
        properties: {
          user_id: {
            type: "keyword",
          },
        },
      },
    },
  },
};

module.exports = indexSettings;
