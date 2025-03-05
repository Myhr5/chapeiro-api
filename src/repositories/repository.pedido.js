import { execute } from "../database/sqlite.js";

async function Listar(id_usuario) {

    const sql = `select p.* from pedido p
    where p.id_usuario = ?
    order by p.id_pedido desc`;

    const pedidos = await execute(sql, id_usuario);

    return pedidos;
}

async function ListarId(id_usuario, id_pedido) {

    const sql = `select p.*
    from pedido p
    where p.id_pedido = ? and p.id_usuario = ?
    order by p.id_pedido desc`;

    const sqlItens = `select i.*, p.nome, p.descricao, p.icone
    from pedido_item i
    join produto p on (p.id_produto = i.id_produto)
    where i.id_pedido = ?
    order by i.id_item`;

    const pedido = await execute(sql, [id_usuario, id_pedido]);
    const itens = await execute(sqlItens, id_pedido);

    pedido[0].itens = itens;

    return pedido[0];
}

async function Inserir(id_usuario, dados) {

    // Dados pedido
    let sql = `insert into pedido(id_usuario, id_empresa, vl_subtotal, 
        vl_taxa_entrega, vl_total, dt_pedido, status) values(?, ?, ?, ?, ?, CURRENT_TIMESTAMP, 'P')
        returning id_pedido`;

    const pedido = await execute(sql, [id_usuario, dados.id_empresa, dados.vl_subtotal,
        dados.vl_taxa_entrega, dados.vl_total]);

    const id_pedido = pedido[0].ID_PEDIDO;

    // Dados dos itens
    dados.itens.map(async (item) => {
        sql = `insert into pedido_item(id_pedido, id_produto, obs, qtd, vl_unitario, vl_total)
        values(?, ?, ?, ?, ?, ?)`;

        await execute(sql, [id_pedido, item.id_produto, item.obs, item.qtd,
            item.vl_unitario, item.vl_total]);
    });

    return pedido[0];
}

export default { Listar, ListarId, Inserir };