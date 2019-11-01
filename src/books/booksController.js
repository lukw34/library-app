module.exports = ({ booksRepository }) => ({
  async createOrUpdate(req, res, next) {
    try {
      const { title, description, isbn } = req.body;
      await booksRepository.createOrUpdate({ title, description, isbn });
      res.send(204);
    } catch (e) {
      next(e);
    }
  }
});