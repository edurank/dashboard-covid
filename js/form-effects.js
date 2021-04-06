const fieldFocus = document.querySelectorAll("[required]");

for (let i = 0; i < fieldFocus.length; i++) {
    // On focus, span goes 5px above
    fieldFocus[i].addEventListener("focus", () => {
        fieldFocus[i].classList.add("focus");
    }); 

    // on blur, the span text turn back to normal
    fieldFocus[i].addEventListener("blur", () => {
        if (fieldFocus[i].value == "") {
            fieldFocus[i].classList.remove("focus");
        }
    })
}

function mostraSenha(id, elemento) {
    var aux = document.getElementById(id);
    if (aux.type === "password") {
        aux.type = "text";
        elemento.className = "fas fa-eye";
    } else {
        aux.type = "password";
        elemento.className = "far fa-eye-slash";
    }
}