import repositoryEmpresa from "../repositories/repository.empresa.js";

async function InserirFavorito(id_usuario, id_produto) {

    const produtos = await repositoryEmpresa.InserirFavorito(id_usuario, id_produto);

    return produtos;
}

async function ExcluirFavorito(id_usuario, id_produto) {

    const produtos = await repositoryEmpresa.ExcluirFavorito(id_usuario, id_produto);

    return produtos;
}

async function Cardapio() {

    const produtos = await repositoryEmpresa.Cardapio();

    return produtos;
}

async function Buscar(id_usuario, busca, id_categoria) {

    const produtos = await repositoryEmpresa.Buscar(id_usuario, busca, id_categoria);

    return produtos;
}

async function ListarProdutoId(id_produto, id_usuario) {

    const produto = await repositoryEmpresa.ListarProdutoId(id_produto, id_usuario);

    return produto;
}

export default { InserirFavorito, ExcluirFavorito, Cardapio, Buscar, ListarProdutoId };