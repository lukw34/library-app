module.exports = books => ({
  async createOrUpdate({ title, description, isbn }) {
    console.log(isbn);
  },
  async buildIndex() {
    await books.createIndex(
      {title: "text", description: "text", authors: "text"},
      {
        background: true,
        weights: {
          title: 10,
          description: 1,
          authors: 3
        }
      }
    );
  }
});