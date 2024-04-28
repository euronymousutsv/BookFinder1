// This page is used for user Signup

import { SafeAreaView,StyleSheet, ImageBackground, Image, Text } from "react-native"
import { useContext } from "react"
import { AuthenticationForm } from "../components/AuthenticationForm"
import { AlternateAuth } from "../components/AlternateAuth"
import { Theme } from "../theme/Theme"
import { AuthContext } from "../contexts/AuthContext"
import { signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth"
import{router, useRouter} from "expo-router"
export default function Login () {
    const auth = useContext( AuthContext )
    const router=useRouter()

    
onAuthStateChanged(auth, (user)=>{ //This will route to Home page which Have tabs on it 
    if(user){
      router.replace('/(tabs)/home')
    }
  })

    const SignIn = ( email, password ) => { //Function to login into firebase Authentication system
       signInWithEmailAndPassword(auth,email,password)
            .then( (userCredential) => {
                console.log( userCredential.user )
                router.replace('/(tabs)/home')
            })
            .catch( (error) => {
                console.log( error.code, error.message )
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
            <AuthenticationForm title="Sign in to your account" action="Sign in" handler={SignIn}/>
            <AlternateAuth 
            text="Don't have an account?" 
            route="/"
            linkText="Sign up here"
            />
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

        justifyContent: "center",
    },
    ImageBackground:{
        flex:1,
justifyContent:"center"
    },
    Image:{
        width: 200,
        height: 200,
        marginLeft:'auto',
        marginRight:'auto'
      },
      bookFinder: {
  
        fontWeight:"bold", 
        fontSize:40, 
        color: 'white',
        marginLeft:'auto',
        marginRight:'auto'
    
      },
})