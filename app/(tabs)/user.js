import { View, Text,Image,StyleSheet, Pressable, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { AuthContext } from '../../contexts/AuthContext';
import {getAuth,signOut,onAuthStateChanged} from "firebase/auth";
import { useContext, useState ,useEffect} from 'react';
import { DBContext } from '../../contexts/DBContext';

import{Link, router,useRouter} from "expo-router"
import { setDoc,doc,getDoc } from 'firebase/firestore';
export default function Tab() {
    const auth=useContext(AuthContext)
    const userId =auth.currentUser.uid 
    const db =useContext(DBContext)

    const [start,setstart] = useState(false)
    const [ listData, setListData ] = useState([])
    const[FirstName,setFirstName]=useState('')
    const[LastName,setLastName]=useState('')
    const[Address, setAddress]=useState('')
    const[PhoneNumber, setPhoneNumber]=useState('')

    const UpdateDetails=async()=>{  //this is the function used to update the userData in firebase Db
        const details={FirstName:FirstName, LastName:LastName, Address:Address, PhoneNumber:PhoneNumber}
        await setDoc(doc(db,"User",userId),details)
        console.log("data saved")
        
    }
    const router=useRouter()
    onAuthStateChanged(auth, (user)=>{ //Navigate to loginPage while signing Out
        if(!user){
          router.replace('../login')
        }
      })
    const signUserOut =()=>{    //SignOut Function
        signOut(auth)
        .then(()=> console.log("signed out"),
        router.replace("../login")
        

    )
        .catch((error)=> console.log(error.code))
    }
    
    const userData=async()=>{       //Function to get userData from firebase 

        const docRef=doc(db,"User",userId)
        const docSnap = await getDoc(docRef)
  
        if(docSnap.exists()){

    const userData=docSnap.data();
    setFirstName(userData.FirstName)
    setLastName(userData.LastName)
    setAddress(userData.Address)
    setPhoneNumber(userData.PhoneNumber)
    setListData(userData);

        }else{
            console.log("No such document")
        }

        // setListData(data)

    }
    useEffect( () => {
        userData()
       console.log(listData)
      
      },[start])

      
      
      
  return (
   
    <View style={{ justifyContent: 'center', flex: 1 }}>
     
   <FontAwesome style={styles.icon} size={100} name="user-circle"/>
   <View style={styles.view}>                                           
             {/* Loaded data from firebase are displayed inside input text component by using default value props */}
             <Text style={styles.title}>User Details</Text>
             <Text style={styles.inputtxt}>First Name</Text>
             <TextInput style={styles.input} editable={false} defaultValue={FirstName}  onChangeText={(text)=>setFirstName(text)}/>
             <Text style={styles.inputtxt}>Last Name</Text>

            <TextInput style={styles.input} defaultValue={LastName} editable={false} onChangeText={(text)=>setLastName(text)}/>
            <Text style={styles.inputtxt}>Address</Text>
            <TextInput style={styles.input}  defaultValue={Address} onChangeText={(text)=>setAddress(text)}/>
            <Text style={styles.inputtxt}>PhoneNumber</Text>
            <TextInput style={styles.input}  defaultValue={PhoneNumber} onChangeText={(text)=>setPhoneNumber(text)}/>

            <Pressable style={styles.button} onPress={()=> UpdateDetails()}>
                <Text style={styles.buttonText}>Update Details</Text>
            </Pressable>
            </View>
   <Pressable style={styles.signOutbtn} onPress={()=> signUserOut()}>
    <Text style={styles.buttonText}>Sign Out</Text>
     <FontAwesome style={{marginHorizontal: 10}}size={30} name="sign-out" color={'white'}/> 
   </Pressable>

    </View>
  );
}
const styles= StyleSheet.create({
    icon:{
     color:'gray',
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom:20,
    },
    signOutbtn:{
        flexDirection:'row',
        marginTop:20,
        padding: 10,
        backgroundColor: 'rgb(50, 168, 125)',
        borderRadius: 15,
        marginLeft:"auto",
        marginRight:"auto",
    },
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
    backgroundColor:'white',
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

});