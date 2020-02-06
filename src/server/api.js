import firebase from '../components/firebase/firebase';

/**
 * 
 * @param {number} userId contains users UID 
 */
export async function getUserRecipes(userId) {
    
    let userRecipes = []
    let recipeId = []
    
    await firebase.firestore().collection('users').doc(userId).collection('recipes').get()
        .then((querySnapshot) => {
          return  querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    userRecipes.push(doc.data()) //Get all user recipes
                    recipeId.push(doc.id) //Get recipe ID number
                } else {
                    return userRecipes
                }
            });
        })
        .catch(function (error) {
            return {}
        });
        
        // creates a new array and add recipe id
        userRecipes.map((recipe, index) => {
            return recipe.id =  recipeId[index]
        })
        return userRecipes;
}

export async function getAllUserRecipes() {
    
    let allUserRecipes = [];
    let recipeId = []
    
    await firebase.firestore().collectionGroup('recipes').get()
        .then((querySnapshot) => {
          return  querySnapshot.forEach((doc) => {
                if (doc.exists) {
                    allUserRecipes.push(doc.data()); 
                    recipeId.push(doc.id) //Get all recipe ID number                   
                }
            });
        })
        .catch(function (error) {
            return {}
        });

        // creates a new array and add recipe id
        allUserRecipes.map((recipe, index) => {
           return recipe.id =  recipeId[index]
        })

        return allUserRecipes;
}