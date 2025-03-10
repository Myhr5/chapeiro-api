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

    const test = ` select * from empresa e
    where e.id_empresa = ?`

    const empresa = await execute(test, 1);
    let retorno = empresa[0];

    retorno.categorias = [];


    const sql = `select distinct c.id_categoria, c.categoria
    from produto p
    join categoria c on (c.id_categoria = p.id_categoria)
    order by c.ordem, p.nome`;

    const categorias_unicas = await execute(sql, []);

    for (const cat of categorias_unicas) {
        const sql = `select p.*, c.categoria
        from produto p
        join categoria c on (c.id_categoria = p.id_categoria)
        and p.id_categoria = ?
        order by c.ordem, p.nome`;

        const itens = await execute(sql, cat.id_categoria);

        cat.itens = itens;

        retorno.categorias.push(cat);
    }

    return retorno;
}

async function Buscar(id_usuario, busca, id_categoria) {

    let filtro = [id_usuario];

    let sql = `select case when u.id_favorito is null then 'N' else 'S' end as favorito, e.*
    from  produto e
    left join usuario_favorito u on (u.id_produto = e.id_produto and u.id_usuario = ?)
    where e.id_produto > 0 `;

    if (busca) {
        filtro.push('%' + busca + '%');
        sql = sql + " and e.nome like ? ";
    }

    if (id_categoria) {
        filtro.push(id_categoria);
        sql = sql + " and e.id_categoria = ? ";
    }

    sql = sql + " order by e.nome";

    const produtos = await execute(sql, filtro);

    return produtos;
}

async function ListarProdutoId(id_produto) {

    let sql = `select *
    from  produto 
    where id_produto = ?`;

    const produto = await execute(sql, id_produto);

    return produto[0];
}

export default { InserirFavorito, ExcluirFavorito, Cardapio, Buscar, ListarProdutoId };