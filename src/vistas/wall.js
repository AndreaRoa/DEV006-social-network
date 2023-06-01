import {
  savePost, onGetPosts, deletePost, getPost,
} from '../lib/firestore.js';

function wall(navigateTo) {
  const section = document.createElement('section');
  const sectionHeader = document.createElement('section');
  const sectionPosts = document.createElement('section');
  const sectionFooter = document.createElement('section');
  const house = document.createElement('img');
  const logo = document.createElement('img');
  const config = document.createElement('img');
  const bell = document.createElement('img');
  const profile = document.createElement('img');
  const newPost = document.createElement('img');
  const popUp = document.createElement('div');
  const popUpClose = document.createElement('img');
  const popUpButton = document.createElement('button');
  const formPost = document.createElement('form');
  const postTitle = document.createElement('h3');
  const postDescription = document.createElement('h3');
  const textTitle = document.createElement('input');
  const textDescription = document.createElement('textarea');
  const errorPostTitle = document.createElement('p');
  const errorPostDescription = document.createElement('p');

  // agregar clases//
  section.classList.add('section');
  sectionHeader.classList.add('sectionHeader');
  sectionPosts.classList.add('sectionPosts');
  sectionFooter.classList.add('sectionFooter');
  bell.classList.add('bell');
  profile.classList.add('profile');
  newPost.classList.add('newPost');
  logo.classList.add('logoWall');
  house.classList.add('house');
  config.classList.add('config');
  popUp.classList.add('popUp');
  popUpButton.classList.add('popUpButton');
  formPost.classList.add('formPost');
  postTitle.classList.add('postTitle');
  postDescription.classList.add('postDescription');
  textTitle.classList.add('textTitle');
  textDescription.classList.add('textDescription');
  popUpClose.classList.add('popUpClose');

  // agregar atributos//
  logo.setAttribute('src', 'images/logo.png');
  house.setAttribute('src', 'images/home.png');
  config.setAttribute('src', 'images/Settings.png');
  bell.setAttribute('src', 'images/bell.png');
  profile.setAttribute('src', 'images/user.png');
  newPost.setAttribute('src', 'images/post.png');
  popUpClose.setAttribute('src', 'images/close.png');

  // se agrega el textContent a botones
  popUpButton.textContent = 'Post';
  postTitle.textContent = 'Titulo';
  postDescription.textContent = 'Descripción';

  // clickeado para img de house
  house.addEventListener('click', () => {
    navigateTo('/wall');
  });
  // clickeado para img de config
  config.addEventListener('click', () => {
    navigateTo('/settings');
  });
  // clickeado para img de notificaciones
  bell.addEventListener('click', () => {
    navigateTo('/buildsite');
  });
  // clickeado para img de perfil
  profile.addEventListener('click', () => {
    navigateTo('/buildsite');
  });
  // Pop up para crear nuevo post
  newPost.addEventListener('click', () => {
    popUp.style.display = 'block';
  });
  // Boton para publicar nuevo post
  popUpButton.addEventListener('click', async (e) => {
    e.preventDefault();
    // condicional para validar que los campos de titulo y descripcion tengan contenido
    if (textTitle.value === '') {
      errorPostTitle.innerHTML = '*Por favor escribe un título';
    } else {
      errorPostTitle.innerHTML = '';
    }

    if (textDescription.value === '') {
      errorPostDescription.innerHTML = '*Por favor escribe una descripción';
    } else {
      errorPostDescription.innerHTML = '';
    }
    // se valida que los input de textTitle y textDescription no esten vacios
    if (textTitle.value !== '' && textDescription.value !== '') {
      await savePost(textTitle.value, textDescription.value);
      formPost.reset();
      popUp.style.display = 'none';
    }
  });
  // Boton para cerrar pop up de nuevo post
  popUpClose.addEventListener('click', () => {
    popUp.style.display = 'none';
  });
  // Funcion para crear el contenedor y tarjeta de cada post
  function createPostCard(title, description, name, fullDate, id) {
    const resultTitle = document.createElement('h2');
    const containerPost = document.createElement('div');
    const resultDescription = document.createElement('p');
    const deleteButton = document.createElement('img');
    const resultUser = document.createElement('p');
    const resultFullDate = document.createElement('p');
    const yesDelete = document.createElement('button');
    const deletePopup = document.createElement('div');
    const noDelete = document.createElement('button');
    const editButton = document.createElement('img');
    // Insertar textos
    resultTitle.textContent = title;
    resultDescription.textContent = description;
    resultUser.textContent = name;
    resultFullDate.textContent = fullDate;
    yesDelete.textContent = 'SI';
    noDelete.textContent = 'NO';
    deletePopup.textContent = '¿Estas segura de que deseas eliminar tu post?';

    // Crear clases
    resultTitle.classList.add('resultTitle');
    containerPost.classList.add('containerPost');
    resultDescription.classList.add('resultDescription');
    deleteButton.classList.add('deleteButton');
    resultUser.classList.add('resultUser');
    errorPostTitle.classList.add('errorsPosts');
    errorPostDescription.classList.add('errorsPosts');
    resultFullDate.classList.add('resultFullDate');
    deletePopup.classList.add('deletePopup');
    noDelete.classList.add('buttonNoDelete');
    yesDelete.classList.add('buttonYesDelete');
    editButton.classList.add('editButton');

    // Agregar atributos
    deleteButton.setAttribute('src', 'images/delete.png');
    yesDelete.setAttribute('data-id', id);
    editButton.setAttribute('data-id', id);
    editButton.setAttribute('src', 'images/edit.png');
    // funcion para que al momento de clickear se esconda el popup de delete
    noDelete.addEventListener('click', () => {
      deletePopup.style.display = 'none';
    });
    // Funcion del yesDelete, se importo deletePost
    yesDelete.addEventListener('click', ({ target: { dataset } }) => {
      deletePost(dataset.id);
    });
    // Boton para mostrar la confirmacion de eliminar post
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      deletePopup.style.display = 'block';
    });

    editButton.addEventListener('click', async ({ target: { dataset } }) => {
      popUp.style.display = 'block';
      const doc = await getPost(dataset.id);
      const post = (doc.data());
      textTitle.value = post.title;
      textDescription.value = post.description;
    });
    // Agrupar por secciones
    deletePopup.append(yesDelete, noDelete);
    containerPost.append(
      resultUser,
      resultTitle,
      resultDescription,
      resultFullDate,
      deleteButton,
      editButton,
      deletePopup,
    );
    sectionPosts.append(containerPost);
  }

  // funcion para organizar por post
  function showPosts(arrayPosts) {
    sectionPosts.innerHTML = '';
    arrayPosts.forEach((post) => {
      createPostCard(post.title, post.description, post.name, post.fullDate, post.id);
    });
  }
  onGetPosts(showPosts);

  // Agrupar por secciones

  popUp.append(formPost);
  formPost.append(
    popUpClose,
    postTitle,
    textTitle,
    errorPostTitle,
    postDescription,
    textDescription,
    errorPostDescription,
    popUpButton,
  );
  sectionHeader.append(house, logo, config);
  sectionFooter.append(bell, newPost, profile);
  section.append(sectionHeader, sectionPosts, popUp, sectionFooter);

  return section;
}
export default wall;
