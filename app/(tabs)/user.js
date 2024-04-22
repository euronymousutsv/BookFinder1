import { View, Text,Image,StyleSheet, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '../../contexts/AuthContext';
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth";
import { useContext } from 'react';
import{Link, router,useRouter} from "expo-router"
export default function Tab() {
    const auth=useContext(AuthContext)
    const router=useRouter()
    onAuthStateChanged(auth, (user)=>{
        if(!user){
          router.replace('../login')
        }
      })
    const signUserOut =()=>{
        signOut(auth)
        .then(()=> console.log("signed out"),
        router.replace("../login")
        

    )
        .catch((error)=> console.log(error.code))
    }
    
  return (

    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
     
   <FontAwesome style={styles.icon} size={100} name="user-circle"/>
   <Pressable style={styles.signOutbtn} onPress={()=> signUserOut()}>
    <Text>Sign Out</Text>
     <FontAwesome style={{marginHorizontal: 10}}size={20} name="sign-out"/> 
   </Pressable>

    </View>
  );
}
const styles= StyleSheet.create({
    icon:{
     color:'gray',
    
    
    },
    signOutbtn:{
        flexDirection:'row',
        marginTop:20,
        padding: 10,
        backgroundColor: 'rgb(50, 168, 125)',
        borderRadius: 15,
    }


});