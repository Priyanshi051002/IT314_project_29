// Create a function which will take a string as parameter and return a string

const getSearchQuery = (searchString) => {
  const query = {
    query: {
      bool: {
        should: [
          {
            match: {
              title: {
                query: searchString,
                boost: 3,
              },
            },
          },
          {
            match: {
              description: {
                query: searchString,
                boost: 2,
              },
            },
          },
          {
            nested: {
              path: "comments",
              query: {
                match: {
                  "comments.comment": searchString,
                },
              },
              inner_hits: {
                highlight: {
                  fields: {
                    "comments.comment": {
                      fragment_offset: 0,
                      number_of_fragments: 0,
                      pre_tags: ["<mark>"],
                      post_tags: ["</mark>"],
                    },
                  },
                },
              },
            },
          },
        ],
      },
    },
    highlight: {
      fields: {
        description: {
          fragment_offset: 0,
          number_of_fragments: 0,
          pre_tags: ["<mark>"],
          post_tags: ["</mark>"],
        },
      },
    },
  };
  return query;
};

module.exports = getSearchQuery;
