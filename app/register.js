//This page is used to store user information into database. 
//User id is used as document id in Firebase and other user information is saved inside user doc

import { SafeAreaView,StyleSheet,ImageBackground, Image, Text, Pressable, TextInput, View } from "react-native";
import { useContext,useEffect,useState } from "react";

import { AuthContext } from "../contexts/AuthContext";
import { DBContext } from "../contexts/DBContext";
import { collection, addDoc, query, getDocs, setDoc,doc } from "firebase/firestore";
import { Theme } from "../theme/Theme";
import { router, useRouter } from "expo-router";

export default function register(){         
    const auth=useContext(AuthContext)
    const userId=auth.currentUser.uid
    const db = useContext(DBContext)
    const router=useRouter()
    const[FirstName,setFirstName]=useState('')
    const[LastName,setLastName]=useState('')
    const[Address, setAddress]=useState('')
    const[PhoneNumber, setPhoneNumber]=useState('')

    const saveDetails=async()=>{        //setDoc function from firebase is used to set the document with user id
        const details={FirstName:FirstName, LastName:LastName, Address:Address, PhoneNumber:PhoneNumber}
        await setDoc(doc(db,"User",userId),details)
        console.log("data saved")
        router.replace("/(tabs)/home")
    }

    return(
        <SafeAreaView style={styles.container}>
             <ImageBackground style={styles.ImageBackground} source={require('../assets/background.jpg')}>   
             <View style={styles.view}>        
             <Text style={styles.title}>User Details</Text>
             <Text style={styles.inputtxt}>First Name</Text>
             <TextInput style={styles.input}  onChangeText={(text)=>setFirstName(text)}/>
             <Text style={styles.inputtxt}>Last Name</Text>

            <TextInput style={styles.input}  onChangeText={(text)=>setLastName(text)}/>
            <Text style={styles.inputtxt}>Address</Text>
            <TextInput style={styles.input}  onChangeText={(text)=>setAddress(text)}/>
            <Text style={styles.inputtxt}>PhoneNumber</Text>
            <TextInput style={styles.input}  onChangeText={(text)=>setPhoneNumber(text)}/>

            <Pressable style={styles.button} onPress={()=> saveDetails()}>
                <Text style={styles.buttonText}>Save Details</Text>
            </Pressable>
            </View>
            </ImageBackground>
 
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
    },
    ImageBackground:{
        flex:1,
        justifyContent:"center"

   },
   view:{
    marginHorizontal: 30,
    padding:20,
    backgroundColor:Theme.white,
    borderRadius:30,
    

   },
   title:{
    fontSize:20
   },
   inputtxt:
   {
    margin:2
   },
   input:{
    padding:5,
 borderBottomWidth:2,
 margin:2

   },
   button:{
    marginTop: 30,
    backgroundColor: 'rgb(50, 141, 168)',
    padding: 10,
    borderRadius:15,
   },
   buttonText: {
    fontWeight: 'bold',
    fontSize:20,
    color: "white",
    textAlign: "center",
}
})