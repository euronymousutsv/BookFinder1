
import { useContext } from 'react';
import { AuthenticationForm } from '../components/AuthenticationForm';
import { SafeAreaView,StyleSheet,Text,Button, View } from 'react-native';

import { AlternateAuth } from '../components/AlternateAuth';
import { AuthContext } from '../contexts/AuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import{router} from "expo-router"
import { Theme } from '../theme/Theme';



export default function Register(props) {
const auth= useContext(AuthContext)
const createAccount=(email,password)=>{
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        console.log(userCredential.user)
        router.push('/home')
    })
    .catch((error)=>{
        console.log(error.code,error.message)

    })
}




  return (
    <SafeAreaView style={styles.container}>
    <Text style={{fontWeight:"bold", fontSize:40, color:Theme.Paynegray}}>Book Finder</Text>
    <AuthenticationForm  title="Register for an account" action="Sign up"  handler={createAccount}/>
   <AlternateAuth text="Already have an account?"
   route="/login"
   linkText="Login"/>
</SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection:"column",
    flex: 1,
    backgroundColor: Theme.welcome,
   
    justifyContent: 'center',
  },
  bookFinder: {
    flex: 1,
    justify: "around"

  },
 
});
