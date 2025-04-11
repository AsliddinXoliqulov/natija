async function loadUsers() {
    try {
        const response = await fetch("https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/login");
        const users = await response.json();

        const foydalanuvchilar = document.getElementById("foydalanuvchilar");
        foydalanuvchilar.innerHTML = "";  

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-4 py-2 border">${user.name}</td>
                <td class="px-4 py-2 border">${user.password}</td>
                <td class="px-4 py-2 border text-center">
                    <button class="text-blue-500" onclick="editUser('${user.id}')">
                        <i class="fas fa-edit"></i> Tahrirlash
                    </button>
                    <button class="text-red-500 ml-2" onclick="deleteUser('${user.id}')">
                        <i class="fas fa-trash"></i> O'chirish
                    </button>
                </td>
            `;
            foydalanuvchilar.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading users:", error);
    }
}

async function editUser(userId) {
    const newName = prompt("Yangi Username kiriting:");
    const newPassword = prompt("Yangi Password kiriting:");

    if (newName && newPassword) {
        try {
            const response = await fetch(`https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/login/${userId}`, {
                method: "PUT", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: newName,
                    password: newPassword
                })
            });

            if (response.ok) {
                alert("Foydalanuvchi muvaffaqiyatli tahrirlandi!");
                loadUsers(); 
            } else {
                alert("Foydalanuvchini tahrir qilishda xato yuz berdi");
            }
        } catch (error) {
            console.error("Error editing user:", error);
        }
    }
}

async function deleteUser(userId) {
    if (confirm("Ushbu foydalanuvchi o'chirilsinmi")) {
        try {
            const response = await fetch(`https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/login/${userId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                loadUsers();
            } else {
                alert("Foydalanuvchini o'chirishda xato yuz berdi");
            }
        } catch (error) {
            console.error("Xatolik:", error);
        }
    }
}

loadUsers();
