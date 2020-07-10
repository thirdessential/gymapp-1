import React, {Component} from "react";
import {Text, StyleSheet, View, FlatList} from "react-native";
import PostCard from "./PostCard";
import {spacing} from "../../constants/dimension";

// Demo Data

const data = [
  {
    id: 1,
    profilePicUri:
      "https://www.usnews.com/dims4/USNEWS/410224b/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fd1%2Fd8%2F8501ba714a21aed9a7327e02ade1%2F180515-10thingselonmusk-editorial.jpg",
    title: "GymAdda",
    bio: "Indore",
    discription:
      "Eat the right amount of calories for you based on your age, sex, height, weight, and physical activity level. Some people use calorie counting apps, which can help you plan, analyze, and track your diet and physical activity.",
    postPicSrc: require('../../../assets/images/post1.jpeg'),
    // like: 45,
    // calorie: 90,
    // comment: 30,
    // timeStatus: "4 Hours ago",
  },
  {
    id: 2,
    profilePicUri:
      "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
    title: "GymAdda",
    bio: "Indore",
    discription:
      "The scale measures everything—every sip of water, every bite of food, your bones, muscles, organs, fat. There's no way to distinguish between what you're gaining (which could just be water) or losing (which, again, could be water).\n" +
      "\n" +
      "That's where body measurements come in. Taking your measurements is a better way to track progress because you get an idea of what's really happening with your body.",
    postPicSrc: require('../../../assets/images/scale.jpeg'),
    // like: 45,
    // calorie: 90,
    // comment: 30,
    // timeStatus: "4 Hours ago",
  },
  {
    id: 3,
    profilePicUri:
      "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
    title: "GymAdda",
    bio: "Indore",
    discription:
      'A diet is anything that you consume on a regular basis. If you drink Diet Coke for breakfast every day, that’s part of your diet. When people talk about “going on a diet,” they usually mean changing their existing dietary habits in order to lose weight or change their body shape. All people are on a diet because everyone eats! Having a healthy diet means making food choices that contribute to short- and long-term health. It means getting the right amounts of nutrient-rich foods and avoiding foods that contain excessive amounts of less healthy foods. The right mix can help you be healthier now and in the future.',
    postPicSrc: require('../../../assets/images/post4.jpeg'),
    // like: 45,
    // calorie: 90,
    // comment: 30,
    // timeStatus: "4 Hours ago",
  },
{
    id: 4,
    profilePicUri:
      "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
    title: "GymAdda",
    bio: "Indore",
    discription:
      ' Get a plan and then grab a pen. People who have a process goal, such as a target number of weekly workouts, stick to their routines with significantly more success than those who focus on a big-picture outcome—such as losing 20 pounds—or go along without any specific goal, a study in the International Journal of Sport and Exercise Psychology found; they also feel less stressed about squeezing in exercise. Next, schedule your gym time just as you would a business meeting. "That way, when someone asks if you can meet at 5, you can honestly say, \'Sorry, I have an appointment; how about 4 instead?\'" ',
    postPicSrc: require('../../../assets/images/post5.jpeg'),
    // like: 45,
    // calorie: 90,
    // comment: 30,
    // timeStatus: "4 Hours ago",
  },

];

const renderPostCard = (data, index) => {
  return (
    <View style={styles.renderPostCard} key={data.id}>
      <PostCard
        profilePicUri={data.profilePicUri}
        title={data.title}
        bio={data.bio}
        discription={data.discription}
        postPicSrc={data.postPicSrc}
        // like={data.like}
        // calorie={data.calorie}
        // comment={data.comment}
        // timeStatus={data.timeStatus}
      />
    </View>
  );
};
Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

const postCardList = (props) => {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={[data.random()]}
      renderItem={({item, index}) => renderPostCard(item, index)}
    />
  );
}


const styles = StyleSheet.create({
  renderPostCard: {
    marginBottom: spacing.medium,
  },
});

export default postCardList;