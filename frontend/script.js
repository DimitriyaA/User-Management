const apiBase = '/api/users';

function renderUsersTable(users) {
    if (!Array.isArray(users) || users.length === 0) {
        return '<p>Няма намерени потребители.</p>';
    }
    const headers = ['ID', 'First Name', 'Last Name', 'Date of Birth', 'Phone Number', 'Email'];
    const rows = users.map(u => `
        <tr>
            <td>${u.id || '-'}</td>
            <td>${u.firstName || '-'}</td>
            <td>${u.lastName || '-'}</td>
            <td>${u.dateOfBirth || '-'}</td>
            <td>${u.phoneNumber || '-'}</td>
            <td>${u.email || '-'}</td>
        </tr>
    `).join('');
    return `
        <table>
            <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

function renderSingleUserTable(user) {
    if (!user) {
        return '<p>Няма намерен потребител.</p>';
    }
    const headers = ['ID', 'First Name', 'Last Name', 'Date of Birth', 'Phone Number', 'Email'];
    const row = `
        <tr>
            <td>${user.id || '-'}</td>
            <td>${user.firstName || '-'}</td>
            <td>${user.lastName || '-'}</td>
            <td>${user.dateOfBirth || '-'}</td>
            <td>${user.phoneNumber || '-'}</td>
            <td>${user.email || '-'}</td>
        </tr>
    `;
    return `
        <table>
            <thead>
                <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
            </thead>
            <tbody>${row}</tbody>
        </table>
    `;
}

document.getElementById('createUserForm').onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch(apiBase, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        const errorText = await res.text();
        document.getElementById('createUserResult').innerHTML = `<p style="color:red;">Грешка: ${errorText}</p>`;
        return;
    }

    const createdUser = await res.json();
    document.getElementById('createUserResult').innerHTML = renderSingleUserTable(createdUser);
    form.reset();
};

async function getUserByEmail() {
    const email = document.getElementById('getUserEmail').value.trim();
    if (!email) {
        alert('Въведете email');
        return;
    }
    const params = new URLSearchParams({ search: email, limit: 1000 });
    const res = await fetch(`${apiBase}?${params}`);
    if (!res.ok) {
        document.getElementById('getUserResult').textContent = 'Грешка при заявката';
        return;
    }
    const users = await res.json();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    const container = document.getElementById('getUserResult');
    if (user) {
        container.innerHTML = renderSingleUserTable(user);
    } else {
        container.textContent = 'Потребител с този email не е намерен';
    }
}

async function getAllUsers() {
    const params = new URLSearchParams({
        search: document.getElementById('search').value,
        sortBy: document.getElementById('sortBy').value,
        page: document.getElementById('page').value,
        limit: document.getElementById('limit').value
    });
    const res = await fetch(`${apiBase}?${params}`);
    if (!res.ok) {
        document.getElementById('allUsersTableContainer').innerHTML = '<p>Грешка при зареждане на потребителите.</p>';
        return;
    }
    const users = await res.json();
    document.getElementById('allUsersTableContainer').innerHTML = renderUsersTable(users);
}

async function loadUserForUpdate() {
    const emailInput = document.getElementById('updateEmail');
    const email = emailInput.value.trim();
    if (!email) {
        alert('Въведете email за зареждане');
        return;
    }
    const params = new URLSearchParams({ search: email, limit: 1000 });
    const res = await fetch(`${apiBase}?${params}`);
    if (!res.ok) {
        document.getElementById('updateUserResult').textContent = 'Грешка при зареждане на потребителя';
        return;
    }
    const users = await res.json();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
        document.getElementById('updateUserResult').textContent = 'Потребител с този email не е намерен';
        return;
    }

    const form = document.getElementById('updateUserForm');
    form.firstName.value = user.firstName || '';
    form.lastName.value = user.lastName || '';
    form.dateOfBirth.value = user.dateOfBirth || '';
    form.phoneNumber.value = user.phoneNumber || '';
    document.getElementById('updateUserResult').textContent = 'Данните са заредени. Можете да редактирате.';
}

document.getElementById('updateUserForm').onsubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const formData = Object.fromEntries(new FormData(form));
    const email = formData.email.trim();
    if (!email) {
        alert('Email е задължителен за обновяване');
        return;
    }
    const params = new URLSearchParams({ search: email, limit: 1000 });
    const resGet = await fetch(`${apiBase}?${params}`);
    if (!resGet.ok) {
        document.getElementById('updateUserResult').textContent = 'Грешка при търсене на потребител';
        return;
    }
    const users = await resGet.json();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        document.getElementById('updateUserResult').textContent = 'Потребител с този email не е намерен';
        return;
    }

    const { email: _e, ...updateData } = formData;

    const resUpdate = await fetch(`${apiBase}/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
    });

    if (!resUpdate.ok) {
        const errorText = await resUpdate.text();
        document.getElementById('updateUserResult').innerHTML = `<p style="color:red;">Грешка: ${errorText}</p>`;
        return;
    }

    const updatedUser = await resUpdate.json();
    document.getElementById('updateUserResult').innerHTML = renderSingleUserTable(updatedUser);
    form.reset();
};

async function deleteUser() {
    const email = document.getElementById('deleteUserEmail').value.trim();
    if (!email) {
        alert('Въведете email');
        return;
    }
    const params = new URLSearchParams({ search: email, limit: 1000 });
    const resGet = await fetch(`${apiBase}?${params}`);
    if (!resGet.ok) {
        document.getElementById('deleteUserResult').textContent = 'Грешка при търсене на потребител';
        return;
    }
    const users = await resGet.json();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        document.getElementById('deleteUserResult').textContent = 'Потребител с този email не е намерен';
        return;
    }

    const resDelete = await fetch(`${apiBase}/${user.id}`, { method: 'DELETE' });
    document.getElementById('deleteUserResult').textContent = resDelete.status === 204
        ? 'Успешно изтрит!'
        : JSON.stringify(await resDelete.json(), null, 2);
}
