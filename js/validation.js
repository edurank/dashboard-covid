// mudando o texto padrão do required do html
const fields = document.querySelectorAll("[required");

function customValidation(event) {

    const field = event.target;

    // fazendo a mensagem de erro pular de posição
    function errorValidity() {
        let foundError = false;

        for (error in field.validity) {
            if (error != "customError" && field.validity[error]) {
                foundError = error;
            }
        }
        return foundError;
    }

    const mapError = errorValidity();

    if (mapError) {
        // trocando mensagem do required
        field.setCustomValidity("Favor, preencha o campo corretamente");
    } else {
        field.setCustomValidity("");
    }

}


// calling the customValidation for the two requiredd field
for (field of fields) {
    field.addEventListener("invalid", customValidation);
}


// do not submit the form
document.addEventListener("submit", (event) => {
    event.preventDefault();
});