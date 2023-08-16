import {
  signUpFirebase,
  signInFirebase,
  postAdToDb,
  uploadImage,
  getRealtimeAds,
} from "./app.js";

window.signUp = function () {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let age = document.getElementById("age").value;

  try {
    signUpFirebase({ email, password, name, age });

    swal({
      title: "Bravo!",
      text: "User Registered Successfully",
      icon: "success",
      button: "Okay",
    });

   // Clear input fields
   document.getElementById("name").value = "";
   document.getElementById("email").value = "";
   document.getElementById("password").value = "";
   document.getElementById("age").value = "";
  } catch (e) {
    const error_msg = document.getElementById("error");
    error_msg.innerHTML = e.message;
  }
};

window.logIn = async function () {
  let email = document.getElementById("login_email");
  let password = document.getElementById("login_password");
  try {
    let userCredential = await signInFirebase(email.value, password.value);

    {
      // alert(
      //   "Successfully signed in with the Id --> " + userCredential.user.uid
      // );

      swal({
        title: "Good Job!",
        text: `User SignedIn with the Id = ${userCredential.user.uid}`,
        icon: "success",
        button: "okay",
      });
    }
  } catch (e) {
    const error_msg = document.getElementById("error");
    error_msg.innerHTML = e.message;
  }
  email.value = "";
  password.value = "";
};

window.show_Ad = async function () {
  var title_input = document.getElementById("title");
  var price_input = document.getElementById("price");
  var des_input = document.getElementById("description");
  var loc_input = document.getElementById("location");
  var contact_number = document.getElementById("contact");

  debugger;
  var image = document.getElementById("image").files[0];

  try {
    const imageURL = await uploadImage(image);
    postAdToDb(
      title_input.value,
      price_input.value,
      des_input.value,
      imageURL,
      loc_input.value,
      contact_number.value
    );
    {
      // alert("Post is live now and also stored in database.");

      swal({
        title: "Excellent",
        text: "Your Product Ad is Live Now",
        icon: "success",
        buttons: ["oh no!", "oh yes!"],
      });
    }
  } 
  
  catch (e) {
    // alert("An error occurred in posting an Ad -->\n " + e.message);
    swal({
      title: "Oops",
      text: `Error occurred in posting an Ad \n ${e.message}`,
      icon: "error",
      button: "oh no!",
    });
  }

  title_input.value = "";
  price_input.value = "";
  des_input.value = "";
  image.value = "";
  loc_input.value = "";
  contact_number.value = "";
};

getAds();
function getAds() {
  //1
  getRealtimeAds((ads) => {
    //4
    const adsElem = document.getElementById("ads_2");

    adsElem.innerHTML = "";
    for (let item of ads) {
      adsElem.innerHTML += `
          <div class="ads_styling_main_div" onclick="goToDetail('${item.id}')">
             <img src=${item.imageURL} alt="product_image">

             <div class="ads_styling_inner_div">

             <div class="ads_styling_inner_price_div">
             <h2> Rs ${item.price} </h2>
             <img class="heart_image" onclick="changeImage()" src=${"https://i.pinimg.com/originals/a4/d7/d0/a4d7d0f5f3b6ed7e94cc9d7cc9b8788a.gif"} alt="heart_image"  />
             </div>

             <h2>${item.title} </h2>
             <h3> ${item.location} </h3>
             <h5> <span> Seller Id: </span> ${item.userId} </h5>
           
      </div>`;
    }
  });
}

window.changeImage = function () {
  let heartImages = document.querySelectorAll(".heart_image");
  var source1 =
    "https://i.pinimg.com/originals/a4/d7/d0/a4d7d0f5f3b6ed7e94cc9d7cc9b8788a.gif";
  var source2 = "https://cdn-icons-png.flaticon.com/512/56/56986.png";

  // Add a click event listener to each heart image
  heartImages.forEach(function (image) {
    image.addEventListener("click", function () {
      // Get the current source of the clicked image
      var currentSource = this.getAttribute("src");

      // Toggle the source based on the current source
      if (currentSource === source1) {
        this.setAttribute("src", source2);
      } else {
        this.setAttribute("src", source1);
      }
    });
  });
};

window.goToDetail = async function (id) {
  location.href = `details.html?id=${id}`;
};

// window.goToDetail2 = async function (title) {
//   location.href = `olx details.html?title=${title}`;
// }

// Open login form function --> self-made f(n).
window.open_login = function () {
  let login_container = document.getElementById("login_form");
  login_container.style.display = "block";
};

window.open_login_2 = function () {
  let login_container = document.getElementById("login_2_div");
  login_container.style.display = "block";
};

// Open ad details form.
window.openForm = function () {
  var form_div = document.getElementById("Ad_details");
  form_div.style.display = "block";
};

// Open ad details form.
window.hide_form = function () {
  var form_div = document.getElementById("Ad_details");
  form_div.style.display = "none";
};

// close login form function --> self-made f(n).
window.remove_login = function () {
  let login_container = document.getElementById("login_form");
  let login_container2 = document.getElementById("login_2_div");
  login_container2.style.display = "none";
  login_container.style.display = "none";
};

window.openHiddenDivs = function () {
  let sec2_container = document.getElementById("sec2_container");
  let selectCity = document.getElementById("sec2_part1_p");
  if (sec2_container.style.display == "none") {
    sec2_container.style.display = "block";
  } else {
    sec2_container.style.display = "none";
  }

  selectCity.innerHTML = "Select Your Location:";
};
