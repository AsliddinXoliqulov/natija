document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();  

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const newUser = {
        name: username,
        password: password
    };

    try {
        const response = await fetch("https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser) 
        });

        if (response.ok) {
            window.location.href = "https://natija.vercel.app/"; 
        } else {
            document.getElementById("errorMessage").classList.remove("hidden");
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("errorMessage").classList.remove("hidden");
    }
});
