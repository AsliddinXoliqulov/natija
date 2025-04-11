document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await fetch("https://67f57460913986b16fa4a14c.mockapi.io/imtihon2/login", {
        method: "GET",
      });
  
      const users = await response.json();
  
      const user = users.find(user => user.name === username && user.password === password);
  
      if (user) {
        window.location.href = "https://natija.vercel.app/html/main.html"; 
      } else {
      
        document.getElementById("errorMessage").classList.remove("hidden");
      }
    } catch (error) {
      console.error("Error:", error);
      document.getElementById("errorMessage").classList.remove("hidden");
    }
  });
  