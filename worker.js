importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-auth.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-firestore.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-storage.js');

// TODO: POINT THIS SCRIPT TO THE EXPERIMENTAL 
importScripts('https://www.gstatic.com/firebasejs/7.2.0/firebase-storage.js');


firebase.initializeApp({
    apiKey: 'AIzaSyBJpV-qDoTl_vQsSxgrPIA3QbktYVvo4Rw',
    authDomain: 'prod-task-manager-f075b.firebaseapp.com',
    databaseURL: 'https://prod-task-manager-f075b.firebaseio.com',
    messagingSenderId: '980860900611',
    projectId: 'prod-task-manager-f075b',
    storageBucket: 'prod-task-manager-f075b.appspot.com'
  });

  // TODO: ENABLE PERSISTENCE ON WORKER
  const firestore = firebase.firestore()
//   .enablePersistence({experimentalForce: true})
//   .catch(function(err) {
//       console.error(err);
//   });

self.addEventListener('message', (event) => {
    const data = event.data;
    console.warn('Message received', {data});
    switch (data.action) {
        case "CREATE_PROJECT":
            console.log('entre');
        return addDocumentToCollection(data.data,'projects');
        case "GET_PROJECTS":
             return getCollection('projects');    
        default:
            break;
    }
  });

  function addDocumentToCollection(doc, collection){
      doc._uid = generateKey();
    return firestore
        .collection(collection)
        .doc(doc._uid)
        .set({
          // _created: firebase.firestore.FieldValue.serverTimestamp,
          // _author: firebase.auth().currentUser,
          ...doc
        }).then(()=>{
            console.warn('Document added',{ doc});
        }).catch((e)=> {
            console.error(e);
        })
  }

  function getCollection(collection) {
    return firestore.collection(collection).onSnapshot(
      (querySnapshot) => {
        const data = [];
        for (const doc of querySnapshot.docs) {
          data.push(doc.data());
        }
        console.warn('Firestore answer',{data});
      },
      (err) => {
        console.error(err);
      }
    );
  }

  function generateKey() {
    return (([1e7]) + -1e3 + -4e3 + -8e3 + -1e11).replace(
      /[018]/g,
      (c) =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
    );
  }
  
