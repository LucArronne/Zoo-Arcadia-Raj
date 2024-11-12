document.getElementById("submitReview").addEventListener("click", function () {
  const username = document.getElementById("username").value;
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review").value;

  if (!username || !rating || !review) {
      alert("Tous les champs doivent être remplis.");
      return;
  }

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
      "pseudo": username,
      "rating": parseInt(rating),
      "text": review,
      "visible": true,
      "createdAt": new Date().toISOString()
  });

  const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
  };

  fetch("http://127.0.0.1:8000/api/home/comments", requestOptions)
      .then((response) => {
          if (!response.ok) {
              throw new Error(`Erreur du serveur : ${response.status}`);
          }
          return response.json();
      })
      .then((result) => console.log("Réponse du serveur :", result))
      .catch((error) => console.error("Erreur :", error));
});
