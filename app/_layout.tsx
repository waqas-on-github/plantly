import { Stack } from "expo-router";

/* eslint-disable prettier/prettier */
export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, animation: "fade" }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          title: "New plant",
        }}
      />
      <Stack.Screen name="onboarding" options={{ animation: "fade" }} />
    </Stack>
  );
}
