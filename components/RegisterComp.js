import { SafeAreaView,StyleSheet,ImageBackground, Image, Text, Pressable, TextInput, View } from "react-native";
import { useContext,useEffect,useState } from "react";




import { Theme } from "../theme/Theme";


export function RegisterComp(props){
   
    
    
    const[FirstName,setFirstName]=useState('')
    const[LastName,setLastName]=useState('')
    const[Address, setAddress]=useState('')
    const[PhoneNumber, setPhoneNumber]=useState('')

    const actionHandler=()=>{
        props.handler(FirstName,LastName,Address,PhoneNumber)
    }

    return(
 
             <View style={styles.view}>        
             <Text style={styles.title}>{props.title}</Text>
             <Text style={styles.inputtxt}>First Name</Text>
             <TextInput style={styles.input}  onChangeText={(text)=>setFirstName(text)}/>
             <Text style={styles.inputtxt}>Last Name</Text>

            <TextInput style={styles.input}  onChangeText={(text)=>setLastName(text)}/>
            <Text style={styles.inputtxt}>Address</Text>
            <TextInput style={styles.input}  onChangeText={(text)=>setAddress(text)}/>
            <Text style={styles.inputtxt}>PhoneNumber</Text>
            <TextInput style={styles.input}  onChangeText={(text)=>setPhoneNumber(text)}/>

            <Pressable style={styles.button} onPress={()=> actionHandler}>
                <Text style={styles.buttonText}>{props.action}</Text>
            </Pressable>
            </View>
      
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