/* eslint-disable prettier/prettier */
import { Button, StyleSheet, View } from "react-native";
import { theme } from "../theme";
import { useRouter } from "expo-router";
import { useUserStore } from "../store/userStore";

export default function OnboardingScreen() {
    const router = useRouter();
    const toggleHasOnboarded = useUserStore((state) => state.toggleHasOnboarded);
    const handlePress = () => {
        toggleHasOnboarded()
        router.replace("/");
    };

    return (
        <View style={styles.container} >
            <Button title="let me in !" onPress={handlePress} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colorWhite,
    },

})