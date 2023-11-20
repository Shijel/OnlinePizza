var firebaseConfig = {
    apiKey: "AIzaSyAbObvLRyjEinjsirTt2Ns2KxWH_f1WIVo",
    authDomain: "signup-and-login-d7765.firebaseapp.com",
    projectId: "signup-and-login-d7765",
    storageBucket: "signup-and-login-d7765.appspot.com",
    messagingSenderId: "312993188744",
    appId: "1:312993188744:web:bb3c7aa820875ee66d483d",
    measurementId: "G-X0RXD677TV"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

var dataB = firebase.database().ref('data')
function UserRegister(){
    var email= document.getElementById('email').value;
    var password= document.getElementById('password').value;
    firebase.auth().createUserWithEmailAndPassword(email.password).then(function(){})
    .catch(function(error){
        var errorcode = error.code;
        var errormsg = error.message;
    });
}

const auth = firebase.auth();
function Signin(){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    const promise = auth.SignInWithEmailAndPassword(email,password);
    promise.catch(e => alert(e.msg));
    window.open("https://www.Google.com","__self");
}   
document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var userinfo = dataB.push();
    iseromfp.set({
        name:getid('fname'),
        email:getid('email'),
        password:getid('password'),
    });
    alert("Succesfully Signed Up");
    console.log("sent");
    document.getElementById('form'.reset());
})
function getid(id){
    return document.getElementById(id).value;
}