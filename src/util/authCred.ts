import { getAuth, onAuthStateChanged } from "firebase/auth";

export const auth = getAuth();
export let uid: any; // Inicialmente, definido como null

onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid; // Atualiza o valor do uid quando o usuário está autenticado
  } else {
    uid = null; // Define como null quando o usuário não está autenticado
  }
});
