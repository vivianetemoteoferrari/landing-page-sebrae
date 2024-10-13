document.getElementById('next-button').addEventListener('click', function () {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const consentChecked = document.getElementById('data-consent').checked;
    const consentError = document.getElementById('consent-error');

    let valid = true;

    emailError.style.display = 'none';
    phoneError.style.display = 'none';
    consentError.style.display = 'none';

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\(\d{2}\) \d{5}-\d{4}$/;

    if (!name) valid = false;
    if (!email || !emailPattern.test(email)) {
        valid = false;
        emailError.style.display = 'block';
    }
    if (!phone || !phonePattern.test(phone)) {
        valid = false;
        phoneError.style.display = 'block';
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