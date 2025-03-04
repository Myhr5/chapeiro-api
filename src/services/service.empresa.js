import repositoryEmpresa from "../repositories/repository.empresa.js";

async function InserirFavorito(id_usuario, id_produto) {

    const produtos = await repositoryproduto.InserirFavorito(id_usuario, id_produto);

    return produtos;
}

async function ExcluirFavorito(id_usuario, id_produto) {

    const produtos = await repositoryproduto.ExcluirFavorito(id_usuario, id_produto);

    return produtos;
}

async function Cardapio(id_usuario, id_empresa) {

    const card = await repositoryEmpresa.Cardapio(id_usuario, id_empresa);

    return card;
}

async function ListarProdutoId(id_empresa, id_produto) {

    const produto = await repositoryEmpresa.ListarProdutoId(id_empresa, id_produto);

    return produto;
}

export default { Destaques, Listar, InserirFavorito, ExcluirFavorito, Cardapio, ListarProdutoId };