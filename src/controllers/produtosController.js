const Produto = require('../models/produtos');
const logger = require('../logger');

exports.createProduto = async (req, res) => {
  try {
    const { nome, descricao, preco, estoque, categoria } = req.body;
    const produto = await Produto.create({ nome, descricao, preco, estoque, categoria });
    res.status(201).json(produto);
    logger.info(`Produto criado: ${produto.nome}`);
  } catch (error) {
    console.error("❌ Erro ao criar produto:", error); // Mostra erro no terminal
    logger.error(`Erro ao criar produto: ${error.message}`);
    res.status(500).json({ error: 'Erro ao criar o produto', detalhes: error.message });
  }
};

exports.getAllProdutos = async (req, res) => {
  const produtos = await Produto.findAll();
  res.json(produtos);
};

exports.getProdutoById = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  produto ? res.json(produto) : res.status(404).json({ error: 'Produto não encontrado' });
};

exports.updateProduto = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  logger.info(`Produto atualizado id: ${produto.id}`);
  if (!produto){
    logger.info(`Produto não encontrado: ${produto.id}`);
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  await produto.update(req.body);
  res.json(produto);
};

exports.deleteProduto = async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);
  logger.info(`Produto deletado id: ${produto.id}`);
  if (!produto) {
    logger.info(`Produto não encontrado: ${produto.id}`);
    return res.status(404).json({ error: 'Produto não encontrado' });
  }

  await produto.destroy();
  res.status(204).send();
};
