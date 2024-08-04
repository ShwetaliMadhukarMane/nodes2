export const apiUrl = 'http://localhost:3000/api';
export let token = '';

async function register() {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    alert(data.message); 
    
}

async function deposit() {
    const amount = document.getElementById('amount').value;
    const response = await fetch(`${apiUrl}/deposit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
    });
    const data = await response.json();
    alert(data.message);
}

async function withdraw() {
    const amount = document.getElementById('amount').value;
    const response = await fetch(`${apiUrl}/withdraw`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: parseFloat(amount) })
    });
    const data = await response.json();
    alert(data.message);
}
