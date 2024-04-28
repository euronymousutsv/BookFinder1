import { View, Text, StyleSheet, ImageBackground, FlatList,StatusBar,Pressable } from "react-native"
import { Image } from 'expo-image';
import { Stack, usePathname } from "expo-router"
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {DBContext} from "../../contexts/DBContext"
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router,useRouter } from "expo-router";
import { useBook } from "../../contexts/BookContext";



export default function Home( props ) {
const auth=useContext(AuthContext)
const userId=auth.currentUser.uid
const db = useContext(DBContext)

const{updateBookId}=useBook();



const [ listData, setListData ] = useState([])
const [start,setstart] = useState(false)
const[selectedId,setSelectedId]= useState();

const readData= async()=>{
  const q=query(collection(db, 'Book'))
  const querySnapshot = await getDocs(q)
  let data = [];
      querySnapshot.forEach((doc)=>{

       const {Name, Author, Image} = doc.data();
          let item={
              id: doc.id,
              Name,
              Author,
              Image
          };
          {/*  let item = doc.data()
          item.id = doc.id*/}
          data.push( item )
         
      })
    setListData(data)
  
}


useEffect( () => {
  readData()
 
},[start,db])

console.log(listData)

const router=useRouter()
const actionHandler=(itemId)=>{
updateBookId(itemId)
  router.push("/Bookinfo")
}

const Item = (props) => (

  <View style={styles.item}>

   <Pressable onPress={()=>actionHandler(props.itemId)}>
    <Image style={styles.Image} source ={props.Image}
        transition={1000} contentFit="fill"/> 
            <Text style={styles.title}>{props.Name}</Text>
    </Pressable>
  </View>
);

    return (
        <SafeAreaView> 
      <FlatList
       data={listData}
       renderItem={({item})=><Item itemId={item.id} Name={item.Name}  Image={item.Image}/>}
        
       //

       keyExtractor={item => item.id}
       extraData = {selectedId}
      /> 
      </SafeAreaView>  

       )
}

const styles=StyleSheet.create({
    ImageBackground:{
        flex:1,

          },
          container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
          },
          item: {
            
            justifyContent:'center',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
          },
          title: {
            fontSize: 20,
            marginLeft:'auto',
            marginRight:'auto',
          },
          Image:{
            marginLeft:'auto',
            marginRight:'auto',
            height:160,
            width:110,
            flex: 1,
            
            backgroundColor: '#0553',
          },
          flatlist:{
            
          },

})