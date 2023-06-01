import { registerUser, signInWithGoogle } from '../lib/auth.js';

function signup(navigateTo) {
  // Creación de elementos
  const section = document.createElement('section');
  const sectionForm = document.createElement('section');
  const sectionHeader = document.createElement('section');
  const UserSignup = document.createElement('h4');
  const emailSignup = document.createElement('h4');
  const passwordSignup = document.createElement('h4');
  const form = document.createElement('form');
  const inputUser = document.createElement('input');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');
  const passwordBox = document.createElement('div');
  const buttonEnterSignup = document.createElement('button');
  const buttonReturnSignup = document.createElement('img');
  const showPassword = document.createElement('img');
  const logo = document.createElement('img');
  const header = document.createElement('div');
  const errorPassword = document.createElement('span');
  const buttonGoogleSignup = document.createElement('button');

  // Ingresar texto
  inputEmail.placeholder = 'example@gmail.com';
  inputPassword.placeholder = 'Ingresa minimo 6 caracteres';
  inputUser.placeholder = 'Ingresa nombre usuaria';

  // Agregar atributos
  logo.setAttribute('src', 'images/logo.png');
  errorPassword.setAttribute('id', 'errorPassword');
  buttonReturnSignup.setAttribute('src', 'images/arrow.png');
  inputEmail.setAttribute('id', 'inputEmail');
  inputPassword.setAttribute('id', 'inputPassword');
  inputUser.setAttribute('id', 'inputUser');
  inputPassword.setAttribute('type', 'password');
  inputPassword.setAttribute('src', 'images/ojoOculto.png');
  showPassword.setAttribute('src', 'images/ojoOculto.png');
  passwordBox.setAttribute('id', 'passwordBox');

  buttonGoogleSignup.textContent = 'Registrarse con Google';
  emailSignup.textContent = 'Correo electrónico';
  passwordSignup.textContent = 'Contraseña';
  UserSignup.textContent = 'Nombre de Usuario';
  buttonEnterSignup.textContent = 'Registrarte';

  // Registro con Google
  buttonGoogleSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signInWithGoogle(navigateTo);
  });
  // Registro de usuario//
  buttonEnterSignup.addEventListener('click', (e) => {
    e.preventDefault();
    const email = inputEmail.value;
    const password = inputPassword.value;
    const user = inputUser.value;
    errorPassword.textContent = '';
    registerUser(email, password, user)
      .then((userResult) => {
        inputEmail.value = '';
        inputPassword.value = '';
        inputUser.value = '';
        navigateTo('/wall');
        return userResult;
      })

      .catch((error) => {
        errorPassword.innerHTML = error;
      });
  });

  // ruteado para button de retornar
  buttonReturnSignup.addEventListener('click', () => {
    navigateTo('/');
  });
  // Ocultar y mostrar contraseña//
  showPassword.addEventListener('click', (e) => {
    e.preventDefault();
    if (inputPassword.type === 'password') {
      inputPassword.type = 'text';
      showPassword.src = 'images/ojonoOculto.png';
    } else {
      inputPassword.type = 'password';
      showPassword.src = 'images/ojoOculto.png';
    }
  });

  // // agregar clases//

  header.classList.add('header');
  logo.classList.add('logo');
  sectionForm.classList.add('sectionFormSignup');
  sectionHeader.classList.add('sectionHeaderSignup');
  form.classList.add('formSignup');
  buttonReturnSignup.classList.add('buttonReturnSignup');
  UserSignup.classList.add('subTitlesSignup');
  emailSignup.classList.add('subTitlesSignup');
  passwordSignup.classList.add('subTitlesSignup');
  buttonEnterSignup.classList.add('buttonEnterSignup');
  errorPassword.classList.add('errors');
  showPassword.classList.add('showPassword');
  buttonGoogleSignup.classList.add('buttonGoogleSignup');

  // Agrupar secciones
  passwordBox.append(inputPassword, showPassword);
  form.append(
    UserSignup,
    inputUser,
    emailSignup,
    inputEmail,
    passwordSignup,
    passwordBox,
    errorPassword,

  );
  sectionForm.append(form, buttonEnterSignup, buttonGoogleSignup);
  sectionHeader.append(header, logo);
  section.append(sectionHeader, buttonReturnSignup, sectionForm);

  return section;
}
export default signup;
