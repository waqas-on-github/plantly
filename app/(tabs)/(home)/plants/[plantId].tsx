import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import {
  Text,
  StyleSheet,
  Pressable,
  Alert,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import { usePlantStore } from "../../../../store/plantsStore";
import { useEffect } from "react";
import { PlantlyImage } from "../../../../components/PlantlyImage";
import { PlantlyButton } from "../../../../components/PlantlyButton";
import { theme } from "../../../../theme";
import { differenceInCalendarDays, format } from "date-fns";

const fullDateFormat = "LLL d yyyy, h:mm aaa";

export default function PlantDetails() {
  const router = useRouter();
  const waterPlant = usePlantStore((store) => store.waterPlant);
  const removePlant = usePlantStore((store) => store.removePlant);
  const params = useLocalSearchParams();
  const plantId = params.plantId;
  const plant = usePlantStore((state) =>
    state.plants.find((plant) => String(plant.id) === plantId),
  );
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: plant?.name,
    });
  }, [plant?.name, navigation]);

  const handleWaterPlant = () => {
    if (typeof plantId === "string") {
      waterPlant(plantId);
    }
  };

  const handleDeletePlant = () => {
    if (!plant?.id) {
      return;
    }

    Alert.alert(
      `Are you sure you want to delete ${plant?.name}?`,
      "It will be gone for good",
      [
        {
          text: "Yes",
          onPress: () => {
            removePlant(plant.id);
            router.navigate("/");
          },
          style: "destructive",
        },
        { text: "Cancel", style: "cancel" },
      ],
    );
  };

  if (!plant) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>
          Plant with ID {plantId} not found
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.detailsContainer}>
      <View style={{ alignItems: "center" }}>
        {plant.imageInDevice ? (
          <PlantlyImage imageUri={plant?.imageInDevice} styles={styles.image} />
        ) : (
          <PlantlyImage />
        )}
        <Text style={styles.key}>Water me every</Text>
        <Text style={styles.value}>{plant.wateringFrequencyDays} days</Text>
        <Text style={styles.key}>Last watered at</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? `${format(plant.lastWateredAtTimestamp, fullDateFormat)}`
            : "Never 😟"}
        </Text>
        <Text style={styles.key}>Days since last watered</Text>
        <Text style={styles.value}>
          {plant.lastWateredAtTimestamp
            ? differenceInCalendarDays(Date.now(), plant.lastWateredAtTimestamp)
            : "N/A"}
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <PlantlyButton title="Water me!" onPress={handleWaterPlant} />
        <Pressable style={styles.deleteButton} onPress={handleDeletePlant}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colorWhite,
  },
  notFoundText: {
    fontSize: 16,
    textAlign: "center",
    color: theme.colorBlack,
  },
  detailsContainer: {},
  image: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: 8,
    marginBottom: 16,
  },
  key: {
    fontSize: 14,
    color: theme.colorBlack,
    textAlign: "center",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: theme.colorGreen,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
  },
  deleteButton: {
    marginTop: 12,
    padding: 12,
    alignItems: "center",
  },
  deleteButtonText: {
    color: theme.colorGrey,
    fontWeight: "bold",
  },
});
