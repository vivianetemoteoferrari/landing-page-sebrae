function validacaoEmail(field) {
    let usuario = field.value.substring(0, field.value.indexOf("@"));
    let dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    const dominiosInvalidos = ["exemplo.com", "teste.com", "dominio.com"];

    if (dominiosInvalidos.includes(dominio)) {
        document.getElementById("email-error").style.display = 'block';
        return false;
    }

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        document.getElementById("email-error").style.display = 'none';
        return true;
    } else {
        document.getElementById("email-error").style.display = 'block';
        return false;
    }
}


function validacaoPhone(field) {
    const phone = field.value.replace(/\D/g, '');


    const isValid = phone.length >= 10 && phone.length <= 11 &&
        !/(\d)\1{7,}/.test(phone);

    if (isValid) {
        document.getElementById("phone-error").style.display = 'none';
        return true;
    } else {
        document.getElementById("phone-error").style.display = 'block';
        return false;
    }
}


document.getElementById('next-button').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const consentChecked = document.getElementById('data-consent').checked;
    const consentError = document.getElementById('consent-error');

    let valid = true;

    consentError.style.display = 'none';

    

    if (!name) valid = false;
    if (!validacaoEmail(email)) {
        valid = false;
    }
    if (!validacaoPhone(phone)) {
        valid = false;
    }
    if (!consentChecked) {
        valid = false;
        consentError.style.display = 'block';
    }

    if (valid) {
        document.querySelector('.form-step-active').classList.remove('form-step-active');
        document.querySelector('.form-step:nth-child(2)').classList.add('form-step-active');
        document.getElementById('step-indicator').textContent = "2 de 2";
    }
});

document.getElementById('prev-button').addEventListener('click', function () {
    document.querySelector('.form-step-active').classList.remove('form-step-active');
    document.querySelector('.form-step:nth-child(1)').classList.add('form-step-active');
    document.getElementById('step-indicator').textContent = "1 de 2";
});


document.getElementById('multi-step-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const cpfCnpj = document.getElementById('cpf-cnpj').value.trim();
    const cpfError = document.getElementById('cpf-cnpj-error');

    let valid = true;

    cpfError.style.display = 'none';

    const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const cnpjPattern = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

    if (cpfCnpj.length <= 14) {
        if (!cpfCnpj || !cpfPattern.test(cpfCnpj) || !testaCPF(cpfCnpj)) {
            valid = false;
            cpfError.style.display = 'block';
            cpfError.textContent = 'CPF inválido.';
        }
    } else {
        if (!cpfCnpj || !cnpjPattern.test(cpfCnpj) || !testaCNPJ(cpfCnpj)) {
            valid = false;
            cpfError.style.display = 'block';
            cpfError.textContent = 'CNPJ inválido.';
        }
    }
    if (valid) {
        alert('Formulário enviado com sucesso!');
        location.reload();
    }
});

document.getElementById('hamburguer-menu').addEventListener('click', function () {
    this.classList.toggle('active');
    const navbar = document.getElementById('navbar');
    navbar.classList.toggle('active');
});

// Máscaras para os campos
function applyMask(input, maskFunction) {
    input.addEventListener('input', function () {
        this.value = maskFunction(this.value);
    });
}

applyMask(document.getElementById('cpf-cnpj'), function (value) {
    value = value.replace(/\D/g, "")

    if (value.length <= 11) {
        value = value
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
        value = value
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2}).(\d{3})(\d)/, "$1.$2.$3")
            .replace(/.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .substring(0, 18);
    }

    return value;
});

applyMask(document.getElementById('phone'), function (value) {
    return value.replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .substring(0, 15);
});