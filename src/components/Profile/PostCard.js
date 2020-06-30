import React, { Component } from "react";
import { Text, StyleSheet, View, Image,TouchableOpacity } from "react-native";
import { spacing } from "../../constants/dimension";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default class PostCard extends Component {
  render() {
    return (
      <View style={{ marginTop: spacing.medium_sm ,margin:10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            marginBottom: spacing.medium_sm,
           
          }}
        >
          <View
            style={{
              flex: 2,
              backgroundColor: "",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri:
                  "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
              }}
              style={{
                height: 70,
                width: 70,
                borderRadius: spacing.thumbnail,
              }}
            />
          </View>
          <View style={{ flex: 4, backgroundColor: "" }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "",
                justifyContent: "flex-end",
              }}
            >
              <Text
                numberOfLines={1}
                style={{ color: "#000", fontWeight: "bold", fontSize: 25 }}
              >
                
                Bessie Malone
              </Text>
            </View>
            <View style={{ flex: 1, backgroundColor: "" }}>
              <Text
                numberOfLines={1}
                style={{ color: "#000", fontSize: 18 }}
              >
             
                A Good AutoResponder
              </Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
             <FontAwesome
          name="ellipsis-v"
          
          size={20}
        />
          </View>
        </View>



<View style={{flex:1,backgroundColor:"",marginBottom:spacing.medium_sm,}}>
<Text numberOfLines={4} style={{fontSize:18,textAlign:"justify"}}>
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make 
</Text>
</View>

{/* for Imagess */}

<View >

<Image
source={{uri:"https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/05/04/Pictures/fitness-couple-giving-after-other-training-five_da6904f2-4f81-11e8-a9dc-143d85bacf22.jpg"}}

style={{height:250,width:"100%",borderRadius:20}}
/>



</View>

<View style={{flex:1,flexDirection:"row",margin:spacing.medium_sm}}>
<View style={{flex:1,backgroundColor:"",flexDirection:"row",justifyContent:"space-around"}}>
<FontAwesome
          name="thumbs-up"
          color="#A9A9A9"
          size={30}
        />
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,color:"#A9A9A9"}}>
            45
        </Text>
        </View>
</View>
<View style={{flex:1,backgroundColor:"",flexDirection:"row",justifyContent:"space-between"}}>
<FontAwesome
          name="circle"
          color="#A9A9A9"
          size={30}
        />
        <View style={{justifyContent:"space-around",alignItems:"center"}}>
        <Text style={{fontSize:18,color:"#A9A9A9"}}>
            45
        </Text>
        </View>
</View>
<View style={{flex:1,backgroundColor:"",flexDirection:"row",justifyContent:"space-around"}}>
<FontAwesome
          name="comment"
          color="#A9A9A9"
          size={30}
        />
        <View style={{justifyContent:"center",alignItems:"center"}}>
        <Text style={{fontSize:18,color:"#A9A9A9"}}>
            45
        </Text>
        </View>
</View>
<View style={{flex:3,backgroundColor:"",justifyContent:"center",alignItems:"flex-end"}}>
    <Text style={{fontSize:18,color:"#A9A9A9"}}>4 Hous ago</Text>
</View>


</View>

<View style={{marginTop:spacing.medium_sm,flexDirection:"row"}}>
<View style={{flex:1,backgroundColor:""}}></View>
<View style={{flex:2,backgroundColor:"",flexDirection:"row",justifyContent:"space-around"}}>
<View style={{flex:1,backgroundColor:""}}>
    <TouchableOpacity style={{height:30,width:"90%",backgroundColor:"black",borderRadius:10,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
    <FontAwesome
          name="comment"
          color="#A9A9A9"
          size={25}
        />

        <Text style={{color:"#fff",fontSize:18}}>
            Cheer
        </Text>
    </TouchableOpacity>
</View>
<View style={{flex:1,backgroundColor:""}}>
<TouchableOpacity style={{height:30,backgroundColor:"black",borderRadius:10,flexDirection:"row",justifyContent:"space-around",alignItems:"center"}}>
    <FontAwesome
          name="comment"
          color="#A9A9A9"
          size={25}
        />

        <Text style={{color:"#fff",fontSize:18}}>
        Comment
        </Text>
    </TouchableOpacity>
</View>
</View>
</View>

      </View>
    );
  }
}

const styles = StyleSheet.create({});
