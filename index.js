const nomeHotel = "| Hotel nosso de cada dia";
let listaHospedes = []; // Array para armazenar os hóspedes

function inicio() {
    alert(`Bem-vindo ao Hotel ${nomeHotel}`);
    const nomeUsuario = prompt("Por favor, digite seu nome:");
    const senha = prompt("Digite a senha:");

    if (senha !== "2678") {
        alert("Senha incorreta. Acesso negado.");
        return;
    }

    alert(`Bem-vindo ao Hotel ${nomeHotel}, ${nomeUsuario}. É um imenso prazer ter você por aqui!`);
    menu();
}

function menu() {
    var escolha = parseInt(prompt('Selecione uma opção 1.) Reserva 2.) Pesquisar 3.) Listar 4.) Eventos 5.)Checar Combustivel 6.)Calcular Manuenção 7.) Sair'));

    switch(escolha){
        case 1:
            reservaHotel();
            break;
        case 2:
            pesquisar();
            break;
        case 3:
            listar();
            break;
         case 4:
            eventos();
            break;
        case 5:
            checarCombustivel();
            break;
        case 6:
            calcularManutencao();
            break;
        case 7:
            sair();
            break;
        default:
            erro();
    }
}

function reservaHotel() {
    const valorDiaria = parseFloat(prompt("Informe o valor da diária no hotel:"));
    const qtdDias = parseInt(prompt("Informe a quantidade de dias de hospedagem:"));

    // Validação das informações
    if (valorDiaria <= 0 || qtdDias <= 0 || qtdDias > 30) {
        alert("Valor inválido. Por favor, insira valores válidos.");
        return; // Retorna e encerra a função
    }

    const nomeHospede = prompt("Qual é o seu nome?");
    let numeroQuarto;

    do {
        numeroQuarto = parseInt(prompt("Informe o número do quarto (de 1 a 20):"));
        if (numeroQuarto < 1 || numeroQuarto > 20) {
            alert("Número de quarto inválido. Por favor, insira um número entre 1 e 20.");
        }
    } while (numeroQuarto < 1 || numeroQuarto > 20);

    // Verificar se o quarto está ocupado
    // Aqui podemos adicionar a lógica para verificar se o quarto está ocupado ou não.

    const confirmacao = prompt(`Confirma a reserva para ${nomeHospede} no quarto ${numeroQuarto}? (S/N)`);

    if (confirmacao.toUpperCase() === 'S') {
        alert("Reserva confirmada!");
    } else {
        alert("Reserva não confirmada.");
    }

    // Chamando a função de cadastro de hóspedes
    cadastroHospedes(valorDiaria);
}

function cadastroHospedes(valorDiaria) {
    alert("Cadastro de hóspedes:");

    // Verifica se já atingiu o limite de cadastros
    if (listaHospedes.length >= 15) {
        alert("Máximo de cadastros atingido.");
        return;
    }

    let totalGratuidades = 0;
    let totalMeias = 0;
    let valorTotal = 0;

    while (true) {
        let nomeHospede = prompt("Nome do hóspede (ou digite 'PARE' para finalizar):");
        if (nomeHospede.toUpperCase() === 'PARE') {
            break;
        }

        // Adiciona o hóspede à lista
        listaHospedes.push(nomeHospede);
        alert(`Hóspede ${nomeHospede} cadastrado com sucesso!`);

        let idadeHospede = parseInt(prompt(`Idade do hóspede ${nomeHospede}:`));
        if (idadeHospede < 6) {
            alert(`${nomeHospede} possui gratuidade.`);
            totalGratuidades++;
        } else if (idadeHospede > 60) {
            alert(`${nomeHospede} paga meia.`);
            totalMeias++;
            valorTotal += valorDiaria / 2;
        } else {
            valorTotal += valorDiaria;
        }

        // Verifica se atingiu o limite de cadastros
        if (listaHospedes.length >= 15) {
            alert("Máximo de cadastros atingido.");
            break;
        }
    }

    alert(`Quantidade de gratuidades: ${totalGratuidades}`);
    alert(`Quantidade de meias hospedagens: ${totalMeias}`);
    alert(`Valor total a pagar: ${valorTotal.toFixed(2)}`);

    menu();

}

function pesquisar() {
    const nomePesquisar = prompt("Digite o nome do hóspede que deseja pesquisar:");
    let encontrado = false;

    // Verifica se o nome está na lista de hóspedes
    for (let i = 0; i < listaHospedes.length; i++) {
        if (nomePesquisar === listaHospedes[i]) {
            encontrado = true;
            alert(`Hóspede ${nomePesquisar} foi encontrado.`);
            break;
        }
    }

    // Se não foi encontrado, exibe mensagem adequada
    if (!encontrado) {
        alert("Hóspede não encontrado.");
    }
}


function listar() {
    alert("Lista de hóspedes:");

    // Verifica se há hóspedes na lista
    if (listaHospedes.length === 0) {
        alert("Nenhum hóspede cadastrado.");
    } else {
        for (let i = 0; i < listaHospedes.length; i++) {
            alert(`Hóspede ${i + 1}: ${listaHospedes[i]}`);
        }
    }

    // Retorna ao menu principal
    menu();
}

function eventos() {
    var opcaoEvento = parseInt(prompt('Selecione uma opção:\n1.) Verificar local do evento\n2.) Agendar evento\n3.) Calcular custos\n4.) Voltar'));

    switch(opcaoEvento){
        case 1:
            verificarLocalEvento();
            break;
        case 2:
            agendarEvento();
            break;
        case 3:
            calcularCustos();
            break;
        case 4:
            menu();
            break;
        default:
            alert("Opção inválida. Por favor, selecione uma opção válida.");
            eventos();
    }
}

function verificarLocalEvento() {
    const numConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));

    if (numConvidados < 0 || numConvidados > 350) {
        alert("Número de convidados inválido.");
    } else if (numConvidados > 150) {
        alert("Use o auditório Colorado.");
    } else {
        const cadeirasAdicionais = numConvidados > 80 ? numConvidados - 150 : 0;
        alert(`Use o auditório Laranja (inclua mais ${cadeirasAdicionais} cadeiras).`);
    }
    eventos();
}

function agendarEvento() {
    const diaEvento = prompt("Qual o dia do seu evento? (segunda, terca, quarta, quinta, sexta, sabado, domingo)").toLowerCase();
    const horaEvento = parseInt(prompt("Qual é a hora do evento?"));

    const disponibilidade = verificarDisponibilidade(diaEvento, horaEvento);

    if (disponibilidade) {
        const nomeEmpresa = prompt("Qual o nome da empresa?");
        alert(`Auditório reservado para ${nomeEmpresa}. ${diaEvento} às ${horaEvento}hs.`);
    } else {
        alert("Auditório indisponível.");
    }

    eventos();
}

function calcularCustos() {
    const duracaoEvento = parseInt(prompt("Qual a duração do evento em horas?"));
    const numConvidados = parseInt(prompt("Qual o número de convidados para o seu evento?"));

    const numGarcons = Math.ceil(numConvidados / 12) + Math.ceil(duracaoEvento / 2);
    const custoGarcons = numGarcons * 10.5 * duracaoEvento;
    alert(`São necessários ${numGarcons} garçons.\nCusto: R$ ${custoGarcons.toFixed(2)}`);

    const qtdCafe = numConvidados * 0.2;
    const qtdAgua = numConvidados * 0.5;
    const qtdSalgados = numConvidados * 7;

    const custoCafe = qtdCafe * 0.8;
    const custoAgua = qtdAgua * 0.4;
    const custoSalgados = (qtdSalgados / 100) * 34;

    const custoTotalBuffet = custoCafe + custoAgua + custoSalgados;

    alert(`O evento precisará de ${qtdCafe.toFixed(2)} litros de café, ${qtdAgua.toFixed(2)} litros de água, ${qtdSalgados} salgados.\nCusto total do buffet: R$ ${custoTotalBuffet.toFixed(2)}`);

    eventos();
}

function verificarDisponibilidade(dia, hora) {
    if ((dia === "segunda" || dia === "terca" || dia === "quarta" || dia === "quinta" || dia === "sexta") && (hora >= 7 && hora <= 23)) {
        return true;
    } else if ((dia === "sabado" || dia === "domingo") && (hora >= 7 && hora <= 15)) {
        return true;
    } else {
        return false;
    }
}

function checarCombustivel() {
    const precoAlcoolWayneOil = parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?"));
    const precoGasolinaWayneOil = parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"));
    const precoAlcoolStarkPetrol = parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?"));
    const precoGasolinaStarkPetrol = parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"));

    const volumeTanque = 42; // Capacidade do tanque em litros

    const custoAbastecimentoAlcoolWayneOil = precoAlcoolWayneOil * volumeTanque;
    const custoAbastecimentoGasolinaWayneOil = precoGasolinaWayneOil * volumeTanque;
    const custoAbastecimentoAlcoolStarkPetrol = precoAlcoolStarkPetrol * volumeTanque;
    const custoAbastecimentoGasolinaStarkPetrol = precoGasolinaStarkPetrol * volumeTanque;

    const percentualEconomia = 0.3; // 30%

    const economiaWayneOil = precoGasolinaWayneOil - (precoAlcoolWayneOil * (1 - percentualEconomia));
    const economiaStarkPetrol = precoGasolinaStarkPetrol - (precoAlcoolStarkPetrol * (1 - percentualEconomia));

    let mensagem;

    if (economiaWayneOil < 0 && economiaStarkPetrol < 0) {
        mensagem = "Ambos postos têm gasolina mais barata que álcool.";
    } else if (economiaWayneOil <= 0 || (economiaStarkPetrol > 0 && economiaStarkPetrol < economiaWayneOil)) {
        mensagem = "É mais barato abastecer com gasolina no posto Stark Petrol.";
    } else {
        mensagem = "É mais barato abastecer com gasolina no posto Wayne Oil.";
    }

    alert(mensagem);
    menu();
}

function calcularManutencao() {
    let empresas = [];
    let menorValor = Number.MAX_VALUE;
    let empresaMenorValor = '';

    do {
        const nomeEmpresa = prompt("Qual o nome da empresa?");
        const valorPorAparelho = parseFloat(prompt("Qual o valor por aparelho?"));
        const quantidadeAparelhos = parseInt(prompt("Qual a quantidade de aparelhos?"));
        const percentualDesconto = parseInt(prompt("Qual a porcentagem de desconto?"));
        const quantidadeMinimaDesconto = parseInt(prompt("Qual o número mínimo de aparelhos para conseguir o desconto?"));

        let totalCalculado = valorPorAparelho * quantidadeAparelhos;

        if (quantidadeAparelhos >= quantidadeMinimaDesconto) {
            const desconto = (percentualDesconto / 100) * totalCalculado;
            totalCalculado -= desconto;
        }

        empresas.push({ nome: nomeEmpresa, total: totalCalculado });

        if (totalCalculado < menorValor) {
            menorValor = totalCalculado;
            empresaMenorValor = nomeEmpresa;
        }

        alert(`O serviço de ${nomeEmpresa} custará R$ ${totalCalculado.toFixed(2)}`);

        var continuar = prompt("Deseja informar novos dados? (S/N)").toUpperCase();
    } while (continuar === 'S');

    alert(`O orçamento de menor valor é o de ${empresaMenorValor} por R$ ${menorValor.toFixed(2)}`);
    menu();
}

function erro(){
    alert("Por favor, informe um número entre 1 a 7");
    menu();
}

function sair() {
    var confirma = confirm('Você deseja sair?');
    if (confirma) {
        alert(`Muito obrigado e até logo.`);
        // window.close(); // Você pode remover essa linha se quiser evitar fechar a janela do navegador
    } else {
        menu();
    }
}

// Iniciar o programa
inicio();
