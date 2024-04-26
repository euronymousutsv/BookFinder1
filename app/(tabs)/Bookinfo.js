import { View,SafeAreaView,StyleSheet,Text,Image } from "react-native";
import { AuthContext } from "../../contexts/AuthContext";
import { DBContext } from "../../contexts/DBContext";
import {useRouter} from "expo-router";
import { useBook } from "../../contexts/BookContext";
import { useEffect } from "react";
export default function Bookinfo(){
   const router = useRouter();
   const {bookId}=useBook();

   useEffect(() => {
    console.log("Book ID:", bookId);
}, [bookId]);
return(
    <SafeAreaView>
<View>
    <Text></Text>
    <Image></Image>
</View>
    </SafeAreaView>
)

}
const styles=StyleSheet.create({

})