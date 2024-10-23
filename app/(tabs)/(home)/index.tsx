import { FlatList, StyleSheet } from "react-native";

import { useRouter } from "expo-router";
import { usePlantStore } from "../../../store/plantsStore";
import { PlantCard } from "../../../components/PlantCard";
import { PlantlyButton } from "../../../components/PlantlyButton";
import { theme } from "../../../theme";

export default function App() {
  const router = useRouter();
  const plants = usePlantStore((state) => state.plants);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      data={plants}
      renderItem={({ item }) => <PlantCard plant={item} />}
      // if there is no plant
      ListEmptyComponent={
        <PlantlyButton
          title="Add your first plant"
          onPress={() => {
            router.navigate("/new");
          }}
        />
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colorWhite,
  },
  contentContainer: {
    padding: 12,
  },
});
