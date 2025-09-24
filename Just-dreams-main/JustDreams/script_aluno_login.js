document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('aluno-login-form');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('aluno-username').value;
        const senha = document.getElementById('aluno-password').value;
        
        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nome: nome,
                    senha: senha,
                    tipo: 'aluno'
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Salvar token no localStorage
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.usuario));
                
                alert('Login realizado com sucesso!');
                // Redirecionar para escolha da profissão
                window.location.href = 'escolha_profissao.html';
            } else {
                alert('Erro no login: ' + data.message);
            }
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro de conexão. Verifique se o servidor está rodando.');
        }
    });
});