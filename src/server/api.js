import firebase from '../components/firebase/firebase';

/**
 * 
 * @param {number} userId contains users UID 
 */
export async function getUserRecipes(userId) {
    
    let userRecipes = [];
    
    await firebase.firestore().collection('users').doc(userId).collection('recipes').get()
        .then((querySnapshot) => {
          return  querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    console.log(doc.id)
                    userRecipes.push(doc.data());                    
                } else {
                    userRecipes = 'There is no recipe'
                    return  userRecipes 
                }
            });
        })
        .catch(function (error) {
            return {}
        });

        return userRecipes;
}
