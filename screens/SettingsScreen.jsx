import { View, Text, TouchableOpacity, TextInput } from "react-native"
import React from "react"
import Icon from "react-native-vector-icons/Ionicons"
import { SafeAreaView } from "react-native-safe-area-context"
import { COLORS } from "../constants"
import { useNavigation } from "@react-navigation/native"

const CURRENT_COLOR_THEME = COLORS.dark

const SettingsScreen = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      <Body />
    </SafeAreaView>
  )
}

const Body = () => (
  <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
    <InputField name="Fokus" />
    <InputField name="Fasilə" />

    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        overflow: "visible",
        borderRadius: 10,
        shadowColor: COLORS.gray,
        backgroundColor: CURRENT_COLOR_THEME,
        elevation: 10,
        marginVertical: 5,
      }}
    >
      <Text
        style={{
          fontFamily: "Poppins_500Medium",
          color: COLORS.white,
          fontSize: 16,
        }}
      >
        Yadda Saxla
      </Text>
    </TouchableOpacity>
  </View>
)

const InputField = ({ name }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      overflow: "visible",
      borderRadius: 10,
      shadowColor: COLORS.gray,
      backgroundColor: COLORS.white,
      elevation: 1,
      marginVertical: 5,
    }}
  >
    <Text
      style={{
        color: COLORS.gray,
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
      }}
    >
      {name}
    </Text>
    <TextInput
      placeholder="25"
      style={{
        borderWidth: 1,
        borderColor: COLORS.light,
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        borderRadius: 10,
        width: 70,
        paddingVertical: 5,
        paddingHorizontal: 10,
        color: COLORS.dark,
      }}
    />
  </View>
)

const Header = ({ navigation }) => (
  <View
    style={{
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomColor: COLORS.divider,
      borderBottomWidth: 0.25,
    }}
  >
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon
        name="chevron-back-outline"
        size={25}
        style={{ color: CURRENT_COLOR_THEME }}
      />
    </TouchableOpacity>

    <Text
      style={{
        fontFamily: "Poppins_500Medium",
        fontSize: 20,
        color: CURRENT_COLOR_THEME,
      }}
    >
      Ayarlar
    </Text>

    {/* For Centering */}

    <Icon name="chevron-back-outline" size={25} style={{ opacity: 0 }} />
  </View>
)

export default SettingsScreen
