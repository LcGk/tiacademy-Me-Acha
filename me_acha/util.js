function disableCEPInputs() {
    const cep_btn = document.getElementById("cep-find");
    cep_btn.textContent = "Buscando...";
    cep_btn.disabled = true;

    document.getElementById("cep-input").disabled = true;
}

function enableCEPInputs() {
    const cep_btn = document.getElementById("cep-find");
    cep_btn.textContent = "BUSCAR";
    cep_btn.disabled = false;
    
    const cep_input = document.getElementById("cep-input");
    cep_input.value = "";
    cep_input.disabled = false;
}

async function handleFindCEPSubmit(e) {
    e.preventDefault(); // prevent form submit

    const cep_btn = document.getElementById("cep-find");
    const cep_input = document.getElementById("cep-input");
    const CEP = cep_input.value.replace(/\D/g, ''); // only numbers

    if (CEP.length != 8) { // invalid
        alert("O CEP inserido é inválido!")
        enableCEPInputs();
        return;
    }

    disableCEPInputs();

    // fetch CEP data
    let request = await fetch(`https://viacep.com.br/ws/${CEP}/json`);
    if (request.status == 400) { // API diz que o formato do CEP está inválido (https://viacep.com.br/)
        alert("CEP em formato inválido!");
    } else if (request.status == 200) {
        let response = await request.json();

        console.log(response);

        if (response.erro) {
            alert("CEP não encontrado!");
        } else {
            // update fields with information
            
            document.getElementById("cep-info-rua").value = response.logradouro;
            document.getElementById("cep-info-bairro").value = response.bairro;
            document.getElementById("cep-info-cidade").value = response.localidade;
            document.getElementById("cep-info-estado").value = response.uf;
        }
    } else {
        alert("Resposta inesperada do servidor.");
    }

    enableCEPInputs();
}

export { handleFindCEPSubmit };