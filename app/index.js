// this page is used for Registering user into firebase Authentication System. Authentication component has been used in this page to get user email and passsword
import { useContext } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { SafeAreaView,StyleSheet,Text,Button, View, ImageBackground, Image } from 'react-native';

import { AlternateAuth } from '../components/AlternateAuth';
import { AuthContext } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import{router, useRouter} from "expo-router"
import { Theme } from '../theme/Theme';



export default function Register(props) {
const auth= useContext(AuthContext)
const router=useRouter()

onAuthStateChanged(auth, (user)=>{    //This will route to register Page
  if(user){
    router.replace('./register')
  }
})

const createAccount=(email,password)=>{ //Function to interact with firebase Authentication for registering user
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        console.log(userCredential.user)
        router.replace('/register')
    })
    .catch((error)=>{
        console.log(error.code,error.message)

    })
}




  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground source={require('../assets/background.jpg')} style={styles.ImageBackground}>
      <Image
        style={styles.Image}
        source={require("../assets/book.png")}
      />
    <Text style={styles.bookFinder}>Book Finder</Text>
    <AuthenticationForm  title="Register for an account" action="Sign up"  handler={createAccount}/>
   
   <AlternateAuth text="Already have an account?"
   route="/login"
   linkText="Login"/>
   </ImageBackground>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    flex: 1,
    
   
    justifyContent: 'center',
  },
  bookFinder: {
  
    fontWeight:"bold", 
    fontSize:40, 
    color: 'white',
    marginLeft:'auto',
    marginRight:'auto'

  },
  ImageBackground:{
flex:1,
justifyContent:"center"
  },
  Image:{
   
    width:200,
    height: 200,
    marginLeft:'auto',
    marginRight:'auto'
  }
 
});
