import { execute } from "../database/sqlite.js";

async function Favoritos(id_usuario) {

    const sql = `select f.*, e.icone, e.nome, e.descricao, e.vl_produto
    from usuario_favorito f
    join produto e on (e.id_produto = f.id_produto)
    where f.id_usuario = ?`;

    const favoritos = await execute(sql, [id_usuario]);

    return favoritos;
}

async function Inserir(nome, email, senha, endereco, complemento, bairro, cidade, uf, cep) {

    const sql = `insert into usuario(nome, email, senha, 
            endereco, complemento, bairro, cidade, uf, cep, dt_cadastro) 
            values(?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP) returning id_usuario`;

    let usuario = await execute(sql, [nome, email, senha, endereco, complemento,
        bairro, cidade, uf, cep]);

    return usuario[0];
}

async function ListarByEmail(email) {

    const sql = `select id_usuario, senha, nome, email, endereco, complemento,
    bairro, cidade, uf, cep, dt_cadastro
    from usuario    
    where email = ?`;

    const usuario = await execute(sql, [email]);

    if (usuario.length == 0)
        return [];
    else
        return usuario[0];
}

async function ListarById(id_usuario) {

    const sql = `select id_usuario, nome, email, endereco, complemento,
    bairro, cidade, uf, cep, dt_cadastro
    from usuario    
    where id_usuario = ?`;

    const usuario = await execute(sql, id_usuario);

    if (usuario.length == 0)
        return [];
    else
        return usuario[0];
}

export default { Favoritos, Inserir, ListarByEmail, ListarById };