document.addEventListener('DOMContentLoaded', () => {
    // Função para alternar entre os formulários de Aluno e Professor
    window.showForm = function(formId) {
        // Remove a classe 'active' de todos os botões e formulários
        document.querySelectorAll('.tab-button').forEach(button => {
            button.classList.remove('active');
        });
        document.querySelectorAll('.form').forEach(form => {
            form.classList.remove('active');
        });

        // Adiciona a classe 'active' ao botão e formulário corretos
        document.querySelector(`#${formId}-form`).classList.add('active');
        document.querySelector(`.tab-button[onclick="showForm('${formId}')"]`).classList.add('active');
    };

    // Adiciona event listener para o formulário de aluno
    const studentForm = document.getElementById('student-form');
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        
        const name = document.getElementById('student-name').value;
        const age = document.getElementById('student-age').value;
        const studentClass = document.getElementById('student-class').value;

        // Validação básica
        if (name && age >= 6 && age <= 8 && studentClass) {
            console.log('Aluno cadastrado:', { name, age, studentClass });
            alert(`Aluno ${name} cadastrado com sucesso!`);
            studentForm.reset(); // Limpa o formulário
        } else {
            alert('Por favor, preencha todos os campos corretamente. A idade deve ser entre 6 e 8 anos.');
        }
    });

    // Adiciona event listener para o formulário de professor
    const teacherForm = document.getElementById('teacher-form');
    teacherForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário
        
        const name = document.getElementById('teacher-name').value;
        const email = document.getElementById('teacher-email').value;
        const school = document.getElementById('teacher-school').value;

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (name && emailRegex.test(email) && school) {
            console.log('Professor cadastrado:', { name, email, school });
            alert(`Professor ${name} cadastrado com sucesso!`);
            teacherForm.reset(); // Limpa o formulário
        } else {
            alert('Por favor, preencha todos os campos corretamente. Verifique o formato do e-mail.');
        }
    });
});