import serviceEmpresa from "../services/service.empresa.js";

async function InserirFavorito(req, res) {
    try {
        const id_usuario = req.params.id_usuario;
        const id_produto = req.params.id_produto;
        const produtos = await serviceEmpresa.InserirFavorito(id_usuario, id_produto);

        res.status(201).json(produtos);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function ExcluirFavorito(req, res) {
    try {
        const id_usuario = req.params.id_usuario;
        const id_produto = req.params.id_produto;
        const produtos = await serviceEmpresa.ExcluirFavorito(id_usuario, id_produto);

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function Cardapio(req, res) {
    try {
        const produtos = await serviceEmpresa.Cardapio();
        console.log(produtos)
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function Buscar(req, res) {
    try {
        const id_usuario = req.id_usuario;
        const busca = req.query.busca;
        const id_categoria = req.query.id_categoria;
        const produtos = await serviceEmpresa.Buscar(id_usuario, busca, id_categoria);

        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ error });
    }
}

async function ListarProdutoId(req, res) {
    try {
        const id_produto = req.params.id_produto;
        const produto = await serviceEmpresa.ListarProdutoId(id_produto);

        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ error });
    }
}

export default { InserirFavorito, ExcluirFavorito, Cardapio, Buscar, ListarProdutoId };