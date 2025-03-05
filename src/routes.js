import { Router } from "express";
import controllerEmpresa from "./controllers/controller.empresa.js";
import controllerCategoria from "./controllers/controller.categoria.js";
import controllerPedido from "./controllers/controller.pedido.js";
import controllerUsuario from "./controllers/controller.usuario.js";
import jwt from "./token.js";

const router = Router();

// Empresas
router.post("/empresas/:id_usuario/:id_produto/favoritos", jwt.ValidateJWT, controllerEmpresa.InserirFavorito);
router.delete("/empresas/:id_usuario/:id_produto/favoritos", jwt.ValidateJWT, controllerEmpresa.ExcluirFavorito);
router.get("/categorias", jwt.ValidateJWT, controllerCategoria.Listar);
router.get("/empresas/cardapio", jwt.ValidateJWT, controllerEmpresa.Cardapio);
router.get("/empresas/:id_usuario", jwt.ValidateJWT, controllerEmpresa.Buscar);
router.get("/empresas/produtos/:id_produto", jwt.ValidateJWT, controllerEmpresa.ListarProdutoId);


// Pedidos
router.get("/:id_usuario/pedidos", jwt.ValidateJWT, controllerPedido.Listar);
router.get("/:id_usuario/pedidos/:id_pedido", jwt.ValidateJWT, controllerPedido.ListarId);
router.post("/:id_usuario/pedidos", jwt.ValidateJWT, controllerPedido.Inserir);


// Usuarios
router.get("/usuarios/:id_usuario/favoritos", jwt.ValidateJWT, controllerUsuario.Favoritos);
router.post("/usuarios/login", controllerUsuario.Login);
router.post("/usuarios", controllerUsuario.Inserir);
router.get("/usuarios/:id_usuario/perfil", jwt.ValidateJWT, controllerUsuario.Perfil);

export default router;