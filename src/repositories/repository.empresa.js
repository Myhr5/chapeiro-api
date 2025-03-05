import { execute } from "../database/sqlite.js";

async function InserirFavorito(id_usuario, id_produto) {

    await ExcluirFavorito(id_usuario, id_produto);

    const sql = `insert into usuario_favorito(id_usuario, id_produto) values(?, ?) 
    returning id_favorito`;

    const fav = await execute(sql, [id_usuario, id_produto]);

    return fav[0];
}

async function ExcluirFavorito(id_usuario, id_produto) {

    const sql = `delete from usuario_favorito where id_produto = ? and id_usuario = ? 
    returning id_favorito`;

    const fav = await execute(sql, [id_produto, id_usuario]);

    return fav[0];
}

async function Cardapio() {

    sql = `select *
     from produto
     where id_empresa = ?`;

    const produtos = await execute(sql, );
    console.log(produtos)

    return produtos;
}

async function ListarProdutoId(id_produto) {

    let sql = `select *
    from  produto 
    where id_produto = ?`;

    const produto = await execute(sql, id_produto);

    return produto[0];
}

export default { InserirFavorito, ExcluirFavorito, Cardapio, ListarProdutoId };