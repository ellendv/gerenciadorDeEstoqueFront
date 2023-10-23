function exibirAba(abaId) {
    const abas = document.getElementsByClassName("aba-conteudo");
    for (let i = 0; i < abas.length; i++) {
        abas[i].style.display = "none";
    }

    document.getElementById(abaId).style.display = "block";
}

exibirAba("aba-index");

document.getElementById("cadastrarProdutoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("cadastrarProdutoForm"));
    const produtoDto = {
        codBarras: formData.get("codBarras"),
        descricao: formData.get("descricao"),
        valor: parseFloat(formData.get("valor")),
        estoqueMinimo: parseInt(formData.get("estoqueMinimo")),
        estoqueAtual: parseInt(formData.get("estoqueAtual")),
        precoCusto: parseFloat(formData.get("precoCusto")),
        precoVenda: parseFloat(formData.get("precoVenda")),
        dataEntradaEstoque: formData.get("dataEntradaEstoque")
    };

    fetch("https://gerenciadordeestoque-production.up.railway.app/produto", {
        method: "POST",
        body: JSON.stringify(produtoDto),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("resultado-cadastrar").innerText = "Salvo com sucesso!";
            } else {
                document.getElementById("resultado-cadastrar").innerText = "Erro ao salvar o produto.";
            }
        });
});

document.getElementById("aba-cadastrar").addEventListener("click", function () {
    exibirAba("aba-cadastrar-conteudo");
});

document.getElementById("aba-preco-custo").addEventListener("click", function () {
    exibirAba("aba-preco-custo-conteudo");
});

document.getElementById("aba-preco-venda").addEventListener("click", function () {
    exibirAba("aba-preco-venda-conteudo");
});

document.getElementById("aba-buscar-produto-por-codigo").addEventListener("click", function () {
    exibirAba("aba-detalhes-conteudo");
});

document.getElementById("aba-listar").addEventListener("click", function () {
    exibirAba("aba-listar-conteudo");
});

document.getElementById("aba-atualizar").addEventListener("click", function () {
    exibirAba("aba-atualizar-conteudo");
});

document.getElementById("aba-excluir").addEventListener("click", function () {
    exibirAba("aba-excluir-conteudo");
});

document.getElementById("aba-buscar-produto-por-nome").addEventListener("click", function () {
    exibirAba("aba-buscar-por-nome-conteudo");
});

document.getElementById("cadastrarPrecoCustoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("cadastrarPrecoCustoForm"));
    const idProduto = formData.get("idProdutoPrecoCusto");
    const custo = parseFloat(formData.get("custo"));
    const quantidadeComprada = parseInt(formData.get("quantidadeComprada"));

    const precoCustoDto = {
        idProduto,
        custo,
        quantidadeComprada
    };

    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}/preco-custo?custo=${custo}&quantidadeComprada=${quantidadeComprada}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("resultado-preco-custo").innerText = "Preço de Custo cadastrado com sucesso!";
            } else {
                document.getElementById("resultado-preco-custo").innerText = "Erro ao cadastrar o Preço de Custo.";
            }
        });
});

document.getElementById("cadastrarPrecoVendaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("cadastrarPrecoVendaForm"));
    const idProduto = formData.get("idProdutoPrecoVenda");
    const precoVenda = parseFloat(formData.get("precoVenda"));

    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}/preco-venda?precoVenda=${precoVenda}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("resultado-preco-venda").innerText = "Preço de Venda cadastrado com sucesso!";
            } else {
                document.getElementById("resultado-preco-venda").innerText = "Erro ao cadastrar o Preço de Venda.";
            }
        });
});

document.getElementById("detalhesProdutoForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const idProduto = document.getElementById("idProdutoDetalhes").value;

    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}`)
        .then(response => response.json())
        .then(data => {
            const detalhesProduto = document.getElementById("detalhes-produto");
            detalhesProduto.innerHTML = `
                    <p><strong>Código de Barras:</strong> ${data.codBarras}</p>
                    <p><strong>Descrição:</strong> ${data.descricao}</p>
                    <p><strong>Valor:</strong> ${data.valor}</p>
                    <p><strong>Estoque Mínimo:</strong> ${data.estoqueMinimo}</p>
                    <p><strong>Estoque Atual:</strong> ${data.estoqueAtual}</p>
                    <p><strong>Preço de Custo:</strong> ${data.precoCusto}</p>
                    <p><strong>Preço de Venda:</strong> ${data.precoVenda}</p>
                    <p><strong>Data de Entrada no Estoque:</strong> ${data.dataEntradaEstoque}</p>
                `;
        })
        .catch(error => {
            const detalhesProduto = document.getElementById("detalhes-produto");
            detalhesProduto.innerHTML = "Produto não encontrado.";
        });
});

document.getElementById("buscarProdutoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idProduto = document.getElementById("idProdutoAtualizar").value;

    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}`)
    .then(response => response.json())
    .then(data => {
        const detalhesProdutoAtualizacao = document.getElementById("detalhes-produto-atualizacao");
        detalhesProdutoAtualizacao.innerHTML = `
            <label for="codBarrasAtualizacao">Código de Barras:</label>
            <input type="text" id="codBarrasAtualizacao" name="codBarrasAtualizacao" value="${data.codBarras}" required>
            <br>
            <label for="descricaoAtualizacao">Descrição:</label>
            <input type="text" id="descricaoAtualizacao" name="descricaoAtualizacao" value="${data.descricao}" required>
            <br>
            <label for="valorAtualizacao">Valor:</label>
            <input type="number" id="valorAtualizacao" name="valorAtualizacao" value="${data.valor}" required>
            <br>
            <label for="estoqueMinimoAtualizacao">Estoque Mínimo:</label>
            <input type="number" id="estoqueMinimoAtualizacao" name="estoqueMinimoAtualizacao" value="${data.estoqueMinimo}" required>
            <br>
            <label for="estoqueAtualAtualizacao">Estoque Atual:</label>
            <input type="number" id="estoqueAtualAtualizacao" name="estoqueAtualAtualizacao" value="${data.estoqueAtual}" required>
            <br>
            <label for="precoCustoAtualizacao">Preço de Custo:</label>
            <input type="number" id="precoCustoAtualizacao" name="precoCustoAtualizacao" value="${data.precoCusto}" required>
            <br>
            <label for="precoVendaAtualizacao">Preço de Venda:</label>
            <input type="number" id="precoVendaAtualizacao" name="precoVendaAtualizacao" value="${data.precoVenda}" required>
            <br>
            <label for="dataEntradaEstoqueAtualizacao">Data de Entrada no Estoque:</label>
            <input type="date" id="dataEntradaEstoqueAtualizacao" name="dataEntradaEstoqueAtualizacao" value="${data.dataEntradaEstoque}" required>
        `;
    })
    .catch(error => {
        const detalhesProdutoAtualizacao = document.getElementById("detalhes-produto-atualizacao");
        detalhesProdutoAtualizacao.innerHTML = "Produto não encontrado.";
    });
});

document.getElementById("atualizarProdutoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Captura os valores dos campos de atualização
    const idProduto = document.getElementById("idProdutoAtualizar").value;
    const codBarras = document.getElementById("codBarrasAtualizacao").value;
    const descricao = document.getElementById("descricaoAtualizacao").value;
    const valor = parseFloat(document.getElementById("valorAtualizacao").value);
    const estoqueMinimo = parseInt(document.getElementById("estoqueMinimoAtualizacao").value);
    const estoqueAtual = parseInt(document.getElementById("estoqueAtualAtualizacao").value);
    const precoCusto = parseFloat(document.getElementById("precoCustoAtualizacao").value);
    const precoVenda = parseFloat(document.getElementById("precoVendaAtualizacao").value);
    const dataEntradaEstoque = document.getElementById("dataEntradaEstoqueAtualizacao").value;

    // Constrói o objeto produtoDto com os dados de atualização
    const produtoDto = {
        codBarras,
        descricao,
        valor,
        estoqueMinimo,
        estoqueAtual,
        precoCusto,
        precoVenda,
        dataEntradaEstoque
    };

    // Envia uma requisição PUT para atualizar o produto
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}`, {
        method: "PUT",  // Use PUT para atualização
        body: JSON.stringify(produtoDto),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        if (response.status === 200) {
            document.getElementById("resultado-atualizacao").innerText = "Produto atualizado com sucesso!";
        } else {
            document.getElementById("resultado-atualizacao").innerText = "Erro ao atualizar o produto.";
        }
    });
});

document.getElementById("excluirProdutoBtn").addEventListener("click", function () {
    const idProduto = document.getElementById("idProdutoParaExcluir").value;

    // Confirme com o usuário antes de excluir o produto
    const confirmacao = confirm("Tem certeza de que deseja excluir este produto?");

    if (confirmacao) {
        fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}`, {
            method: "DELETE"
        })
            .then(response => {
                if (response.status === 200) {
                    document.getElementById("resultado-exclusao").innerText = "Produto excluído com sucesso!";
                } else {
                    document.getElementById("resultado-exclusao").innerText = "Erro ao excluir o produto.";
                }
            });
    }
});

function listarProdutos() {
    fetch("https://gerenciadordeestoque-production.up.railway.app/produto/listar")
        .then(response => response.json())
        .then(data => {
            const listaDeProdutos = document.getElementById("lista-de-produtos");
            listaDeProdutos.innerHTML = "";

            if (data.length === 0) {
                listaDeProdutos.innerHTML = "Nenhum produto encontrado.";
            } else {
                data.forEach(produto => {
                    const produtoHtml = `
                        <div class="produto">
                            <p>ID: ${produto.idProduto}</p>
                            <p>Descrição: ${produto.descricao}</p>
                            <p>Estoque Atual: ${produto.estoqueAtual}</p>
                            <p>Status: ${produto.status}</p>
                        </div>
                    `;
                    listaDeProdutos.innerHTML += produtoHtml;
                });
            }

            document.getElementById("lista-de-produtos").style.display = "block";
        })
        .catch(error => {
            const listaDeProdutos = document.getElementById("lista-de-produtos");
            listaDeProdutos.innerHTML = "Erro ao buscar os produtos.";
        });
}

document.getElementById("aba-listar").addEventListener("click", function() {
    listarProdutos();
});

document.getElementById("buscarPorNome").addEventListener("click", function () {
    // Obtenha o valor inserido no campo de texto
    const nomeDoProduto = document.getElementById("nomeDoProduto").value;

    // Envie uma solicitação GET para buscar produtos por nome
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/buscar-por-nome/${nomeDoProduto}`)
        .then(response => {
            if (response.status === 200) {
                return response.json(); // Continue apenas se a resposta for bem-sucedida
            } else {
                throw new Error('Erro na busca por nome.'); // Lança um erro em caso de falha
            }
        })
        .then(data => {
            const resultadoBuscaPorNome = document.getElementById("resultado-busca-por-nome");
            resultadoBuscaPorNome.innerHTML = "";

            if (data.idProduto) {
                const produtoHtml = `
                    <div class="produto">
                        <p>ID: ${data.idProduto}</p>
                        <p>Descrição: ${data.descricao}</p>
                        <p>Estoque Atual: ${data.estoqueAtual}</p>
                        <p>Status: ${data.status}</p>
                    </div>
                `;
                resultadoBuscaPorNome.innerHTML = produtoHtml;
            } else {
                resultadoBuscaPorNome.innerHTML = "Nenhum produto encontrado com esse nome.";
            }
        })
        .catch(error => {
            const resultadoBuscaPorNome = document.getElementById("resultado-busca-por-nome");
            resultadoBuscaPorNome.innerHTML = "Erro ao buscar produtos por nome.";
            console.error(error); // Registre erros no console para depuração
        });
});

document.getElementById("aba-movimentacao").addEventListener("click", function () {
    exibirAba("aba-movimentacao-conteudo");
});

document.getElementById("movimentacaoProdutoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(document.getElementById("movimentacaoProdutoForm"));
    const movimentacaoDto = {
        produtoId: parseInt(formData.get("produtoIdMovimentacao")),
        tipo: formData.get("tipoMovimentacao"),
        quantidade: parseInt(formData.get("quantidadeMovimentacao"))
    };

    fetch("https://gerenciadordeestoque-production.up.railway.app/produto/movimentacao", {
        method: "POST",
        body: JSON.stringify(movimentacaoDto),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status === 200) {
                document.getElementById("resultado-movimentacao").innerText = "Movimentação registrada com sucesso!";
            } else {
                document.getElementById("resultado-movimentacao").innerText = "Erro ao registrar a movimentação.";
            }
        });
});

document.getElementById("aba-buscar-entradas").addEventListener("click", function () {
    exibirAba("aba-buscar-entradas-conteudo");
});

document.getElementById("buscarEntradasForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idProduto = document.getElementById("idProduto").value;
    const dataInicial = document.getElementById("dataInicial").value;
    const dataFinal = document.getElementById("dataFinal").value;

    // Realize a requisição AJAX para o endpoint "/produto/{id}/entradas" com os parâmetros idProduto, dataInicial e dataFinal
    // Certifique-se de formatar os dados adequadamente

    // Exemplo de requisição usando fetch:
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProduto}/entradas?dataInicial=${dataInicial}&dataFinal=${dataFinal}`)
        .then(response => response.json())
        .then(data => {
            const resultadoBuscarEntradas = document.getElementById("resultado-buscar-entradas");
            resultadoBuscarEntradas.innerHTML = "";

            if (data.length === 0) {
                resultadoBuscarEntradas.innerHTML = "Nenhuma entrada encontrada nesse intervalo de datas.";
            } else {
                data.forEach(entrada => {
                    const entradaHtml = `
                        <div class="entrada">
                            <p>Tipo de Movimentação: ${entrada.tipoMovimentacao}</p>
                            <p>Quantidade Movimentada: ${entrada.quantidadeMovimentada}</p>
                            <p>Data: ${entrada.data}</p>
                            <p>ID do Produto: ${entrada.produto.idProduto}</p>
                            <p>Descrição do Produto: ${entrada.produto.descricao}</p>
                            <p>Estoque Atual do Produto: ${entrada.produto.estoqueAtual}</p>
                            <p>Status do Produto: ${entrada.produto.status}</p>
                        </div>
                    `;
                    resultadoBuscarEntradas.innerHTML += entradaHtml;
                });
            }
        })
        .catch(error => {
            const resultadoBuscarEntradas = document.getElementById("resultado-buscar-entradas");
            resultadoBuscarEntradas.innerHTML = "Erro ao buscar entradas por intervalo de datas.";
        });
});

document.getElementById("aba-buscar-saidas").addEventListener("click", function () {
    exibirAba("aba-buscar-saidas-conteudo");
});

document.getElementById("buscarSaidasForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idProdutoSaida = document.getElementById("idProdutoSaida").value;
    const dataInicialSaida = document.getElementById("dataInicialSaida").value;
    const dataFinalSaida = document.getElementById("dataFinalSaida").value;

    // Realize a requisição AJAX para o endpoint "/produto/{id}/saidas" com os parâmetros idProdutoSaida, dataInicialSaida e dataFinalSaida
    // Certifique-se de formatar os dados adequadamente

    // Exemplo de requisição usando fetch:
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProdutoSaida}/saidas?dataInicial=${dataInicialSaida}&dataFinal=${dataFinalSaida}`)
        .then(response => response.json())
        .then(data => {
            const resultadoBuscarSaidas = document.getElementById("resultado-buscar-saidas");
            resultadoBuscarSaidas.innerHTML = "";

            if (data.length === 0) {
                resultadoBuscarSaidas.innerHTML = "Nenhuma saída encontrada nesse intervalo de datas.";
            } else {
                data.forEach(saida => {
                    const saidaHtml = `
                        <div class="saida">
                            <p>Tipo de Movimentação: ${saida.tipoMovimentacao}</p>
                            <p>Quantidade Movimentada: ${saida.quantidadeMovimentada}</p>
                            <p>Data: ${saida.data}</p>
                            <p>ID do Produto: ${saida.produto.idProduto}</p>
                            <p>Descrição do Produto: ${saida.produto.descricao}</p>
                            <p>Estoque Atual do Produto: ${saida.produto.estoqueAtual}</p>
                            <p>Status do Produto: ${saida.produto.status}</p>
                        </div>
                    `;
                    resultadoBuscarSaidas.innerHTML += saidaHtml;
                });
            }
        })
        .catch(error => {
            const resultadoBuscarSaidas = document.getElementById("resultado-buscar-saidas");
            resultadoBuscarSaidas.innerHTML = "Erro ao buscar saídas por intervalo de datas.";
        });
});

document.getElementById("aba-estornar-entrada").addEventListener("click", function () {
    exibirAba("aba-estornar-entrada-conteudo");
});

document.getElementById("estornarEntradaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idProdutoEstornarEntrada = document.getElementById("idProdutoEstornarEntrada").value;
    const quantidadeEstorno = document.getElementById("quantidadeEstorno").value;

    // Realize a requisição AJAX para o endpoint "/produto/{id}/estornar-entrada" com os parâmetros idProdutoEstornarEntrada e quantidadeEstorno
    // Certifique-se de formatar os dados adequadamente

    // Exemplo de requisição usando fetch:
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProdutoEstornarEntrada}/estornar-entrada`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            produtoId: idProdutoEstornarEntrada,
            tipo: "ENTRADA",
            quantidade: quantidadeEstorno
        })
    })
        .then(response => response.json())
        .then(data => {
            const resultadoEstornarEntrada = document.getElementById("resultado-estornar-entrada");
            resultadoEstornarEntrada.innerHTML = data ? "Entrada estornada com sucesso." : "Erro ao estornar entrada do produto.";
        })
        .catch(error => {
            const resultadoEstornarEntrada = document.getElementById("resultado-estornar-entrada");
            resultadoEstornarEntrada.innerHTML = "Erro ao estornar entrada do produto.";
        });
});

document.getElementById("aba-estornar-saida").addEventListener("click", function () {
    exibirAba("aba-estornar-saida-conteudo");
});

document.getElementById("estornarSaidaForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const idProdutoEstornarSaida = document.getElementById("idProdutoEstornarSaida").value;
    const quantidadeEstornoSaida = document.getElementById("quantidadeEstornoSaida").value;

    // Realize a requisição AJAX para o endpoint "/produto/{id}/estornar-saida" com os parâmetros idProdutoEstornarSaida e quantidadeEstornoSaida
    // Certifique-se de formatar os dados adequadamente

    // Exemplo de requisição usando fetch:
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/${idProdutoEstornarSaida}/estornar-saida`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            produtoId: idProdutoEstornarSaida,
            tipo: "SAIDA",
            quantidade: quantidadeEstornoSaida
        })
    })
        .then(response => response.json())
        .then(data => {
            const resultadoEstornarSaida = document.getElementById("resultado-estornar-saida");
            resultadoEstornarSaida.innerHTML = data ? "Saída estornada com sucesso." : "Erro ao estornar saída do produto.";
        })
        .catch(error => {
            const resultadoEstornarSaida = document.getElementById("resultado-estornar-saida");
            resultadoEstornarSaida.innerHTML = "Erro ao estornar saída do produto.";
        });
});

document.getElementById("aba-comparativo").addEventListener("click", function () {
    exibirAba("aba-comparativo-conteudo");
});

document.getElementById("comparativoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const dataComparativo = document.getElementById("dataComparativo").value;
    const intervaloComparativo = document.getElementById("intervaloComparativo").value;

    // Realize a requisição AJAX para o endpoint com os parâmetros dataComparativo e intervaloComparativo
    // Certifique-se de formatar os dados adequadamente

    // Exemplo de requisição usando fetch:
    fetch(`https://gerenciadordeestoque-production.up.railway.app/produto/?data=${dataComparativo}&intervalo=${intervaloComparativo}`)
        .then(response => response.json())
        .then(data => {
            const resultadoComparativo = document.getElementById("resultado-comparativo");

            if (data.totalEntradas !== undefined && data.totalSaidas !== undefined) {
                resultadoComparativo.innerHTML = `Total de Entradas: ${data.totalEntradas}<br>Total de Saídas: ${data.totalSaidas}`;
            } else {
                resultadoComparativo.innerHTML = "Erro ao buscar comparativo de entradas e saídas.";
            }
        })
        .catch(error => {
            const resultadoComparativo = document.getElementById("resultado-comparativo");
            resultadoComparativo.innerHTML = "Erro ao buscar comparativo de entradas e saídas.";
        });
});






