// const image = document.getElementById("image"); // <img>
// const paragraph = document.getElementById("text"); // <p></p>

// image.onclick = () => {
//   paragraph.textContent = "Change Text";
// }

$(document).ready(function() {
  $("#image").click(function() {
    $("#text").text("Hello jQuery");
  });
});

// const user = {
//   firstName: "David",
//   lastName: "Beckham",
//   age: 45,
//   favourites: {
//     music: ["Classic", "Rock"],
//     sport: ["football", "MMA"],
//   },
// };

// image.onclick = () => {
//   const newUser = {
//     ...user,
//     favourites: {
//       ...user.favourites,
//       music: [...user.favourites.music],
//       sport: [...user.favourites.sport],
//     },
//   }; // new object
//   newUser.favourites.music.push("Hiphop");
//   console.log(user);
//   // paragraph.textContent = newUser;
// };

// Deep Clone
