function validation() {
    let name = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let repSenha = document.getElementById("rep_senha").value;

    
    /* formating name ruler: Bigger than 4 and lass than 150 char
        cannot contain numbers and especial characteres
    */
    var re = /^[A-Za-z]+$/;
    if (re.name && name.length <= 150 && name.length > 4) {
        alert(name.toLowerCase());
    }


}
